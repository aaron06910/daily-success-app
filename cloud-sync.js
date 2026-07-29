(function () {
  "use strict";

  const config = window.DAILY_SUCCESS_SUPABASE;

  const cloudStorageKeys = new Set([
    "scheduledTasksV2",
    "checkedTasksV5",
    "pushedTasksV1",
    "customListsV1",
    "goalsV2",
    "workoutExercisesV1",
    "workoutLogsV1",
    "appThemeV2",
    "successGoalV1",
    "appAppearanceV1"
  ]);

  let supabaseClient = null;
  let currentUser = null;
  let loadedUserId = null;

  let cloudReady = false;
  let applyingCloudData = false;
  let saveTimer = null;

  function getElement(id) {
    return document.getElementById(id);
  }

  function setAuthMessage(message, type = "") {
    const element = getElement("authMessage");

    if (!element) return;

    element.textContent = message;
    element.className = "auth-message";

    if (type) {
      element.classList.add(type);
    }
  }

  function setSyncStatus(message, type = "") {
    const element = getElement("syncStatus");

    if (!element) return;

    element.textContent = message;
    element.className = "sync-status";

    if (type) {
      element.classList.add(type);
    }
  }

  function showAuthScreen(message = "") {
    getElement("authScreen")?.classList.remove("hidden");
    getElement("mainAppShell")?.classList.add("hidden");

    if (message) {
      setAuthMessage(message);
    }
  }

  function showMainApp(user) {
    getElement("authScreen")?.classList.add("hidden");
    getElement("mainAppShell")?.classList.remove("hidden");

    const accountEmail = getElement("accountEmail");

    if (accountEmail) {
      accountEmail.textContent = user.email || "Signed-in user";
    }

    renderApp();

    setTimeout(() => {
      if (typeof drawAllCharts === "function") {
        drawAllCharts();
      }
    }, 100);
  }

  function buildCloudSnapshot() {
    return {
      version: "v23",
      scheduledTasks,
      checkedTasks,
      pushedTasks,
      customLists,
      goals,
      workoutExercises,
      workoutLogs,
      appTheme,
      successGoal,
      appAppearance
    };
  }

  function applyCloudSnapshot(snapshot) {
    applyingCloudData = true;

    try {
      scheduledTasks = normalizeTasks(
        snapshot.scheduledTasks || []
      );

      checkedTasks = snapshot.checkedTasks || {};
      pushedTasks = snapshot.pushedTasks || {};
      customLists = snapshot.customLists || [];

      goals = normalizeGoals(
        snapshot.goals || []
      );

      workoutExercises =
        snapshot.workoutExercises || [];

      workoutLogs = (
        snapshot.workoutLogs || []
      ).map(normalizeWorkoutLog);

      appTheme = snapshot.appTheme || "blue";

      successGoal =
        snapshot.successGoal ?? 75;

      appAppearance =
        snapshot.appAppearance || "light";

      saveAllMainData();

      applyTheme(appTheme);
      renderSettings();
      renderApp();
    } finally {
      applyingCloudData = false;
    }
  }

  async function saveNow(silent = false) {
    if (
      !supabaseClient ||
      !currentUser ||
      !cloudReady ||
      applyingCloudData
    ) {
      return;
    }

    if (!silent) {
      setSyncStatus("Saving...");
    }

    const snapshot = buildCloudSnapshot();

    const { error } = await supabaseClient
      .from("app_data")
      .upsert(
        {
          user_id: currentUser.id,
          data: snapshot,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: "user_id"
        }
      );

    if (error) {
      console.error("Cloud save failed:", error);
      setSyncStatus("Sync failed", "sync-error");
      return;
    }

    const savedTime = new Date().toLocaleTimeString(
      [],
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );

    setSyncStatus(
      "Saved " + savedTime,
      "sync-success"
    );
  }

  function scheduleSave(storageKey) {
    if (
      !cloudStorageKeys.has(storageKey) ||
      !cloudReady ||
      applyingCloudData
    ) {
      return;
    }

    clearTimeout(saveTimer);

    setSyncStatus("Waiting to save...");

    saveTimer = setTimeout(() => {
      saveNow();
    }, 900);
  }

  async function loadOrCreateCloudData(user) {
    cloudReady = false;

    setAuthMessage("Loading your saved information...");

    const { data, error } = await supabaseClient
      .from("app_data")
      .select("data, updated_at")
      .eq("user_id", user.id)
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      applyCloudSnapshot(data[0].data || {});

      cloudReady = true;

      const updatedAt = data[0].updated_at
        ? new Date(data[0].updated_at)
            .toLocaleString()
        : "recently";

      setSyncStatus(
        "Loaded cloud data from " + updatedAt,
        "sync-success"
      );
    } else {
      /*
        No cloud row exists yet.

        The existing local data on this device becomes
        the user's first cloud backup.
      */
      cloudReady = true;
      await saveNow(true);

      setSyncStatus(
        "Local data uploaded",
        "sync-success"
      );
    }
  }

  async function handleSignedIn(user) {
    if (
      loadedUserId === user.id &&
      cloudReady
    ) {
      currentUser = user;
      showMainApp(user);
      return;
    }

    currentUser = user;
    loadedUserId = user.id;

    showAuthScreen(
      "Signing in and loading your information..."
    );

    try {
      await loadOrCreateCloudData(user);
      showMainApp(user);
    } catch (error) {
      console.error("Cloud load failed:", error);

      cloudReady = false;
      loadedUserId = null;

      setAuthMessage(
        "Signed in, but your saved data could not be loaded: " +
          error.message,
        "error"
      );
    }
  }

  function resetLocalAppState() {
    applyingCloudData = true;

    try {
      scheduledTasks = [];
      checkedTasks = {};
      pushedTasks = {};
      customLists = [];
      goals = [];
      workoutExercises = [];
      workoutLogs = [];

      appTheme = "blue";
      successGoal = 75;
      appAppearance = "light";

      saveAllMainData();

      applyTheme(appTheme);
      renderSettings();
      renderApp();
    } finally {
      applyingCloudData = false;
    }
  }

  async function signIn() {
    const email =
      getElement("authEmailInput").value.trim();

    const password =
      getElement("authPasswordInput").value;

    if (!email || !password) {
      setAuthMessage(
        "Enter your email and password.",
        "error"
      );
      return;
    }

    setAuthMessage("Signing in...");

    const { error } =
      await supabaseClient.auth
        .signInWithPassword({
          email,
          password
        });

    if (error) {
      setAuthMessage(error.message, "error");
    }
  }

  async function signUp() {
    const email =
      getElement("authEmailInput").value.trim();

    const password =
      getElement("authPasswordInput").value;

    if (!email) {
      setAuthMessage(
        "Enter your email address.",
        "error"
      );
      return;
    }

    if (password.length < 6) {
      setAuthMessage(
        "Use a password with at least 6 characters.",
        "error"
      );
      return;
    }

    setAuthMessage("Creating your account...");

    const productionUrl =
      "https://aaron06910.github.io/daily-success-app/";

    const redirectUrl =
      window.location.protocol === "file:"
        ? productionUrl
        : window.location.origin +
          window.location.pathname;

    const { data, error } =
      await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

    if (error) {
      setAuthMessage(error.message, "error");
      return;
    }

    if (data.session) {
      setAuthMessage(
        "Account created. Loading your app...",
        "success"
      );
    } else {
      setAuthMessage(
        "Account created. Check your email and click the confirmation link.",
        "success"
      );
    }
  }

  async function signOut() {
    setSyncStatus("Saving before sign out...");

    await saveNow(true);

    resetLocalAppState();

    cloudReady = false;
    currentUser = null;
    loadedUserId = null;

    const { error } =
      await supabaseClient.auth.signOut();

    if (error) {
      console.error("Sign-out failed:", error);

      setAuthMessage(
        "Sign-out failed: " + error.message,
        "error"
      );

      return;
    }

    showAuthScreen("You have been signed out.");
  }

  function wireButtons() {
    getElement("signInBtn")
      ?.addEventListener("click", signIn);

    getElement("signUpBtn")
      ?.addEventListener("click", signUp);

    getElement("signOutBtn")
      ?.addEventListener("click", signOut);

    getElement("syncNowBtn")
      ?.addEventListener("click", () => {
        saveNow();
      });

    getElement("authPasswordInput")
      ?.addEventListener(
        "keydown",
        event => {
          if (event.key === "Enter") {
            signIn();
          }
        }
      );
  }

  async function initialize() {
    wireButtons();

    if (
      !config ||
      !config.url ||
      !config.publishableKey ||
      config.url.includes("PASTE_") ||
      config.publishableKey.includes("PASTE_")
    ) {
      showAuthScreen();

      setAuthMessage(
        "Supabase is not configured yet. Add your project URL and publishable key to supabase-config.js.",
        "error"
      );

      return;
    }

    if (
      !window.supabase ||
      typeof window.supabase.createClient !==
        "function"
    ) {
      showAuthScreen();

      setAuthMessage(
        "The Supabase library could not be loaded.",
        "error"
      );

      return;
    }

    supabaseClient =
      window.supabase.createClient(
        config.url,
        config.publishableKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        }
      );

    const {
      data: { session },
      error
    } = await supabaseClient.auth.getSession();

    if (error) {
      showAuthScreen();

      setAuthMessage(
        "Could not check your login: " +
          error.message,
        "error"
      );

      return;
    }

    if (session?.user) {
      await handleSignedIn(session.user);
    } else {
      showAuthScreen();
    }

    supabaseClient.auth.onAuthStateChange(
      (_event, newSession) => {
        setTimeout(() => {
          if (newSession?.user) {
            handleSignedIn(newSession.user);
          } else {
            currentUser = null;
            loadedUserId = null;
            cloudReady = false;
            showAuthScreen();
          }
        }, 0);
      }
    );

    window.addEventListener("online", () => {
      if (currentUser) {
        setSyncStatus("Back online — syncing...");
        saveNow();
      }
    });

    window.addEventListener("offline", () => {
      setSyncStatus("Offline — saved locally");
    });
  }

  window.cloudSync = {
    initialize,
    scheduleSave,
    saveNow
  };
})();