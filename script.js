const APP_VERSION = "v23";

/* -----------------------------
   ELEMENTS
----------------------------- */
const currentDateText = document.getElementById("currentDate");
const miniDay = document.getElementById("miniDay");

const todayScreen = document.getElementById("todayScreen");
const calendarScreen = document.getElementById("calendarScreen");
const listsScreen = document.getElementById("listsScreen");
const workoutScreen = document.getElementById("workoutScreen");
const statsScreen = document.getElementById("statsScreen");
const goalsScreen = document.getElementById("goalsScreen");
const settingsScreen = document.getElementById("settingsScreen");

const todayNavBtn = document.getElementById("todayNavBtn");
const calendarNavBtn = document.getElementById("calendarNavBtn");
const listsNavBtn = document.getElementById("listsNavBtn");
const workoutNavBtn = document.getElementById("workoutNavBtn");
const statsNavBtn = document.getElementById("statsNavBtn");
const goalsNavBtn = document.getElementById("goalsNavBtn");
const settingsNavBtn = document.getElementById("settingsNavBtn");

const prevDayBtn = document.getElementById("prevDayBtn");
const todayBtn = document.getElementById("todayBtn");
const nextDayBtn = document.getElementById("nextDayBtn");
const dayScroll = document.getElementById("dayScroll");

const openCalendarBtn = document.getElementById("openCalendarBtn");
const calendarTodayBtn = document.getElementById("calendarTodayBtn");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const calendarGrid = document.getElementById("calendarGrid");

const toggleTaskFormBtn = document.getElementById("toggleTaskFormBtn");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDescriptionInput = document.getElementById("taskDescriptionInput");
const taskStartDateInput = document.getElementById("taskStartDateInput");
const taskEndDateInput = document.getElementById("taskEndDateInput");
const taskRepeatSelect = document.getElementById("taskRepeatSelect");
const everyXDaysField = document.getElementById("everyXDaysField");
const taskIntervalInput = document.getElementById("taskIntervalInput");
const weeklyDaysField = document.getElementById("weeklyDaysField");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskEditBtn = document.getElementById("cancelTaskEditBtn");
const scheduledTaskList = document.getElementById("scheduledTaskList");

const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");
const completedCount = document.getElementById("completedCount");

const weeklySummary = document.getElementById("weeklySummary");
const weeklyAverage = document.getElementById("weeklyAverage");
const resetBtn = document.getElementById("resetBtn");

const newListInput = document.getElementById("newListInput");
const addListBtn = document.getElementById("addListBtn");
const listsContainer = document.getElementById("listsContainer");

const exerciseNameInput = document.getElementById("exerciseNameInput");
const addExerciseBtn = document.getElementById("addExerciseBtn");
const exerciseSelect = document.getElementById("exerciseSelect");
const exerciseLastLog = document.getElementById("exerciseLastLog");
const exerciseBestLog = document.getElementById("exerciseBestLog");
const workoutDateInput = document.getElementById("workoutDateInput");
const workoutSetsBuilder = document.getElementById("workoutSetsBuilder");
const addWorkoutSetBtn = document.getElementById("addWorkoutSetBtn");
const workoutNotesInput = document.getElementById("workoutNotesInput");
const saveWorkoutLogBtn = document.getElementById("saveWorkoutLogBtn");
const workoutHistoryList = document.getElementById("workoutHistoryList");
const workoutChart = document.getElementById("workoutChart");
const exerciseChartTitle = document.getElementById("exerciseChartTitle");

const toggleGoalFormBtn = document.getElementById("toggleGoalFormBtn");
const goalForm = document.getElementById("goalForm");
const goalNameInput = document.getElementById("goalNameInput");
const goalTypeSelect = document.getElementById("goalTypeSelect");
const goalDeadlineInput = document.getElementById("goalDeadlineInput");
const numberGoalFields = document.getElementById("numberGoalFields");
const milestoneGoalFields = document.getElementById("milestoneGoalFields");
const progressGoalFields = document.getElementById("progressGoalFields");
const goalCurrentInput = document.getElementById("goalCurrentInput");
const goalTargetInput = document.getElementById("goalTargetInput");
const goalMilestonesInput = document.getElementById("goalMilestonesInput");
const goalProgressInput = document.getElementById("goalProgressInput");
const goalProgressNoteInput = document.getElementById("goalProgressNoteInput");
const saveGoalBtn = document.getElementById("saveGoalBtn");
const cancelGoalEditBtn = document.getElementById("cancelGoalEditBtn");
const goalsList = document.getElementById("goalsList");

const currentStreakText = document.getElementById("currentStreak");
const bestStreakText = document.getElementById("bestStreak");
const successGoalLabel = document.getElementById("successGoalLabel");
const sevenDayAverage = document.getElementById("sevenDayAverage");
const thirtyDayAverage = document.getElementById("thirtyDayAverage");
const totalSuccessfulDays = document.getElementById("totalSuccessfulDays");
const totalPerfectDays = document.getElementById("totalPerfectDays");
const totalCompletedTasks = document.getElementById("totalCompletedTasks");

const monthAverage = document.getElementById("monthAverage");
const monthBest = document.getElementById("monthBest");
const monthSuccessfulDays = document.getElementById("monthSuccessfulDays");

const momentumScore = document.getElementById("momentumScore");
const momentumRank = document.getElementById("momentumRank");
const momentumMessage = document.getElementById("momentumMessage");
const momentumProgressFill = document.getElementById("momentumProgressFill");
const momentumNextRank = document.getElementById("momentumNextRank");

const scoreChart = document.getElementById("scoreChart");
const tasksChart = document.getElementById("tasksChart");

const themeButtons = document.querySelectorAll(".theme-btn");
const successGoalInput = document.getElementById("successGoalInput");
const successGoalValue = document.getElementById("successGoalValue");
const appearanceButtons = document.querySelectorAll(".appearance-btn");

const exportDataBtn = document.getElementById("exportDataBtn");
const importDataBtn = document.getElementById("importDataBtn");
const importDataInput = document.getElementById("importDataInput");

/* -----------------------------
   STATE
----------------------------- */
let selectedDateKey = getTodayKey();
let calendarMonthDate = keyToDate(selectedDateKey);
let currentScreen = "today";

let scheduledTasks = normalizeTasks(safeLoad("scheduledTasksV2", null) || safeLoad("scheduledTasksV1", []));
let checkedTasks = safeLoad("checkedTasksV5", {});
let pushedTasks = safeLoad("pushedTasksV1", {});
let customLists = safeLoad("customListsV1", []);
let goals = normalizeGoals(safeLoad("goalsV2", null) || safeLoad("goalsV1", []));
let workoutExercises = safeLoad("workoutExercisesV1", []);
let workoutLogs = safeLoad("workoutLogsV1", []);

let appTheme = safeLoad("appThemeV2", "blue");
let successGoal = safeLoad("successGoalV1", 75);
let appAppearance = safeLoad("appAppearanceV1", "light");

let editingTaskId = null;
let editingGoalId = null;

/* -----------------------------
   STORAGE / HELPERS
----------------------------- */
function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveData(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify(data)
  );

  window.cloudSync?.scheduleSave(key);
}

function saveAllMainData() {
  saveData("scheduledTasksV2", scheduledTasks);
  saveData("checkedTasksV5", checkedTasks);
  saveData("pushedTasksV1", pushedTasks);
  saveData("customListsV1", customLists);
  saveData("goalsV2", goals);
  saveData("workoutExercisesV1", workoutExercises);
  saveData("workoutLogsV1", workoutLogs);
  saveData("appThemeV2", appTheme);
  saveData("successGoalV1", successGoal);
  saveData("appAppearanceV1", appAppearance);
}

function getTodayKey() {
  return dateToKey(new Date());
}

function dateToKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function keyToDate(dateKey) {
  const parts = dateKey.split("-");
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function daysBetween(startKey, endKey) {
  const start = keyToDate(startKey);
  const end = keyToDate(endKey);
  const ms = end - start;
  return Math.floor(ms / 86400000);
}

function shiftDateKey(dateKey, amount) {
  const date = keyToDate(dateKey);
  date.setDate(date.getDate() + amount);
  return dateToKey(date);
}

function formatFullDate(dateKey) {
  return keyToDate(dateKey).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatDayTop(dateKey) {
  return keyToDate(dateKey).toLocaleDateString("en-US", { weekday: "short" });
}

function formatDayBottom(dateKey) {
  return keyToDate(dateKey).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

function formatShortDate(dateKey) {
  return keyToDate(dateKey).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

function formatDeadline(deadline) {
  if (!deadline) return "No deadline";

  return keyToDate(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function ensureCheckedDateExists(dateKey) {
  if (!checkedTasks[dateKey]) checkedTasks[dateKey] = [];
}

function ensurePushedDateExists(dateKey) {
  if (!pushedTasks[dateKey]) pushedTasks[dateKey] = {};
}

function isTaskPushedOnDate(taskId, dateKey) {
  ensurePushedDateExists(dateKey);
  return Boolean(pushedTasks[dateKey][taskId]);
}

function getPushedInfo(taskId, dateKey) {
  ensurePushedDateExists(dateKey);
  return pushedTasks[dateKey][taskId] || null;
}

function normalizeTasks(tasks) {
  return (tasks || []).map(task => {
    if (task.repeatType === "once" || task.repeatType === "daily" || task.repeatType === "weekly" || task.repeatType === "custom") {
      const startDate = task.startDate || task.date || getTodayKey();
      let repeatType = task.repeatType;

      if (repeatType === "custom") repeatType = "weekly";

      return {
        id: task.id || "task-" + Date.now() + "-" + Math.random(),
        text: task.text || "",
        description: task.description || "",
        repeatType,
        startDate,
        endDate: task.endDate || "",
        intervalDays: task.intervalDays || 2,
        weeklyDays: task.weeklyDays || task.customDays || (task.weekday !== null && task.weekday !== undefined ? [Number(task.weekday)] : [])
      };
    }

    return {
      id: task.id || "task-" + Date.now() + "-" + Math.random(),
      text: task.text || "",
      description: task.description || "",
      repeatType: task.repeatType || "once",
      startDate: task.startDate || getTodayKey(),
      endDate: task.endDate || "",
      intervalDays: task.intervalDays || 2,
      weeklyDays: task.weeklyDays || []
    };
  });
}

function normalizeGoals(oldGoals) {
  return (oldGoals || []).map(goal => {
    if (goal.type === "habit") {
      return {
        id: goal.id || "goal-" + Date.now() + "-" + Math.random(),
        name: goal.name || "Habit goal",
        type: "progress",
        deadline: goal.deadline || "",
        progress: 0,
        notes: [
          {
            id: "note-" + Date.now() + "-" + Math.random(),
            date: getTodayKey(),
            text: "Imported from old habit-linked goal."
          }
        ]
      };
    }

    if (goal.type === "number") {
      const current = Number(goal.current || 0);
      return {
        id: goal.id || "goal-" + Date.now() + "-" + Math.random(),
        name: goal.name || "Number goal",
        type: "number",
        deadline: goal.deadline || "",
        current,
        target: Number(goal.target || 1),
        history: goal.history || [
          {
            id: "goal-log-" + Date.now() + "-" + Math.random(),
            date: getTodayKey(),
            value: current
          }
        ]
      };
    }

    if (goal.type === "milestone") {
      return {
        id: goal.id || "goal-" + Date.now() + "-" + Math.random(),
        name: goal.name || "Milestone goal",
        type: "milestone",
        deadline: goal.deadline || "",
        milestones: goal.milestones || []
      };
    }

    return {
      id: goal.id || "goal-" + Date.now() + "-" + Math.random(),
      name: goal.name || "Progress goal",
      type: "progress",
      deadline: goal.deadline || "",
      progress: Number(goal.progress || 0),
      notes: goal.notes || []
    };
  });
}

/* -----------------------------
   NAV / THEME
----------------------------- */
function showScreen(screenName) {
  currentScreen = screenName;

  const screens = [todayScreen, calendarScreen, listsScreen, workoutScreen, statsScreen, goalsScreen, settingsScreen];
  const buttons = [todayNavBtn, calendarNavBtn, listsNavBtn, workoutNavBtn, statsNavBtn, goalsNavBtn, settingsNavBtn];

  screens.forEach(screen => screen.classList.add("hidden"));
  buttons.forEach(button => button.classList.remove("active"));

  if (screenName === "today") {
    todayScreen.classList.remove("hidden");
    todayNavBtn.classList.add("active");
  }

  if (screenName === "calendar") {
    calendarScreen.classList.remove("hidden");
    calendarNavBtn.classList.add("active");
  }

  if (screenName === "lists") {
    listsScreen.classList.remove("hidden");
    listsNavBtn.classList.add("active");
  }

  if (screenName === "workout") {
    workoutScreen.classList.remove("hidden");
    workoutNavBtn.classList.add("active");
    setTimeout(drawWorkoutChart, 50);
  }

  if (screenName === "stats") {
    statsScreen.classList.remove("hidden");
    statsNavBtn.classList.add("active");
    setTimeout(drawStatsCharts, 50);
  }

  if (screenName === "goals") {
    goalsScreen.classList.remove("hidden");
    goalsNavBtn.classList.add("active");
    setTimeout(drawGoalMiniCharts, 50);
  }

  if (screenName === "settings") {
    settingsScreen.classList.remove("hidden");
    settingsNavBtn.classList.add("active");
  }
}

function applyTheme(themeName) {
  document.body.classList.remove(
    "theme-blue",
    "theme-green",
    "theme-purple",
    "theme-orange",
    "theme-red",
    "theme-pink"
  );

  document.body.classList.add("theme-" + themeName);

  themeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.theme === themeName);
  });

  appTheme = themeName;
  saveData("appThemeV2", appTheme);
}

function applyAppearance(appearance) {
  appAppearance = appearance;
  saveData("appAppearanceV1", appAppearance);

  document.body.classList.toggle("dark-mode", appearance === "dark");

  appearanceButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.appearance === appearance);
  });

  setTimeout(drawAllCharts, 50);
}

/* -----------------------------
   TASKS
----------------------------- */
function shouldTaskShowOnDate(task, dateKey) {
  const startDate = task.startDate || task.date || getTodayKey();

  if (dateKey < startDate) return false;
  if (task.endDate && dateKey > task.endDate) return false;

  const diff = daysBetween(startDate, dateKey);
  const weekday = keyToDate(dateKey).getDay();

  if (task.repeatType === "once") return dateKey === startDate;
  if (task.repeatType === "daily") return true;
  if (task.repeatType === "everyOtherDay") return diff >= 0 && diff % 2 === 0;
  if (task.repeatType === "everyXDays") return diff >= 0 && diff % Number(task.intervalDays || 1) === 0;
  if (task.repeatType === "weekly") return (task.weeklyDays || []).includes(weekday);

  return false;
}

function getTasksForDate(dateKey) {
  return scheduledTasks.filter(task => shouldTaskShowOnDate(task, dateKey));
}

function weekdayName(dayNumber) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][Number(dayNumber)];
}

function getRepeatLabel(task) {
  let label = "";

  if (task.repeatType === "once") label = "One-time task";
  if (task.repeatType === "daily") label = "Repeats daily";
  if (task.repeatType === "everyOtherDay") label = "Repeats every other day";
  if (task.repeatType === "everyXDays") label = "Repeats every " + Number(task.intervalDays || 1) + " days";
  if (task.repeatType === "weekly") label = "Repeats: " + (task.weeklyDays || []).map(weekdayName).join(", ");

  label += " • starts " + formatShortDate(task.startDate || getTodayKey());

  if (task.endDate) {
    label += " • ends " + formatShortDate(task.endDate);
  }

  return label;
}

function getScoreForDate(dateKey) {
  ensureCheckedDateExists(dateKey);

  const tasks = getTasksForDate(dateKey);
  const total = tasks.length;

  if (total === 0) return { total: 0, completed: 0, percentage: 0 };

  let completed = 0;

  tasks.forEach(task => {
    const pushed = isTaskPushedOnDate(task.id, dateKey);
    if (!pushed && checkedTasks[dateKey].includes(task.id)) completed++;
  });

  return {
    total,
    completed,
    percentage: Math.round((completed / total) * 100)
  };
}

function isSuccessfulDay(dateKey) {
  const score = getScoreForDate(dateKey);
  return score.total > 0 && score.percentage >= successGoal;
}

function getWeekStart(dateKey) {
  const date = keyToDate(dateKey);
  date.setDate(date.getDate() - date.getDay());
  return dateToKey(date);
}

function renderDayScroll() {
  dayScroll.innerHTML = "";

  for (let i = -7; i <= 7; i++) {
    const dayKey = shiftDateKey(selectedDateKey, i);
    const pill = document.createElement("div");

    pill.className = "day-pill";
    pill.classList.toggle("active", dayKey === selectedDateKey);

    pill.innerHTML = `
      <div class="day-top">${formatDayTop(dayKey)}</div>
      <div class="day-bottom">${formatDayBottom(dayKey)}</div>
    `;

    pill.addEventListener("click", () => {
      selectedDateKey = dayKey;
      calendarMonthDate = keyToDate(selectedDateKey);
      renderApp();
    });

    dayScroll.appendChild(pill);
  }
}

function renderTasks() {
  const tasks = getTasksForDate(selectedDateKey);

  scheduledTaskList.innerHTML = "";
  ensureCheckedDateExists(selectedDateKey);
  ensurePushedDateExists(selectedDateKey);

  if (tasks.length === 0) {
    scheduledTaskList.innerHTML = '<p class="empty-text">No tasks for this day.</p>';
    return;
  }

  tasks.forEach(task => scheduledTaskList.appendChild(createTaskElement(task)));
}

function createTaskElement(task) {
  const taskItem = document.createElement("div");
  const pushed = isTaskPushedOnDate(task.id, selectedDateKey);
  const pushedInfo = getPushedInfo(task.id, selectedDateKey);
  const completed = checkedTasks[selectedDateKey].includes(task.id) && !pushed;

  taskItem.className = "task-item";
  taskItem.classList.toggle("completed", completed);
  taskItem.classList.toggle("pushed", pushed);

  const taskLeft = document.createElement("div");
  taskLeft.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.disabled = pushed;

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      if (!checkedTasks[selectedDateKey].includes(task.id)) {
        checkedTasks[selectedDateKey].push(task.id);
      }
    } else {
      checkedTasks[selectedDateKey] = checkedTasks[selectedDateKey].filter(id => id !== task.id);
    }

    saveData("checkedTasksV5", checkedTasks);
    renderApp();
  });

  const textBox = document.createElement("div");

  const taskText = document.createElement("div");
  taskText.className = "task-text";
  taskText.textContent = task.text;
  textBox.appendChild(taskText);

  if (task.description) {
    const description = document.createElement("div");
    description.className = "task-description";
    description.textContent = task.description;
    textBox.appendChild(description);
  }

  const meta = document.createElement("div");
  meta.className = "task-meta";
  meta.textContent = getRepeatLabel(task);
  textBox.appendChild(meta);

  if (pushed || task.sourceTaskId) {
    const badges = document.createElement("div");
    badges.className = "task-badges";

    if (pushed) {
      const pushedBadge = document.createElement("span");
      pushedBadge.className = "task-badge pushed";
      pushedBadge.textContent = "Pushed to " + formatDayBottom(pushedInfo.targetDate) + " • missed today";
      badges.appendChild(pushedBadge);
    }

    if (task.sourceTaskId) {
      const copiedBadge = document.createElement("span");
      copiedBadge.className = "task-badge";
      copiedBadge.textContent = "Moved from another day";
      badges.appendChild(copiedBadge);
    }

    textBox.appendChild(badges);
  }

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(textBox);

  const buttons = document.createElement("div");
  buttons.className = "task-buttons";

  const pushBtn = document.createElement("button");
  pushBtn.className = "push-btn";
  pushBtn.textContent = "↪";
  pushBtn.title = "Push to another day";
  pushBtn.addEventListener("click", () => pushTaskToDate(task.id));

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => startEditTask(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "×";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  if (!pushed && !completed) buttons.appendChild(pushBtn);
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  taskItem.appendChild(taskLeft);
  taskItem.appendChild(buttons);

  return taskItem;
}

function pushTaskToDate(taskId) {
  const task = scheduledTasks.find(item => item.id === taskId);
  if (!task) return;

  if (checkedTasks[selectedDateKey]?.includes(taskId)) {
    alert("This task is already completed for this day.");
    return;
  }

  const defaultDate = shiftDateKey(selectedDateKey, 1);
  const targetDate = prompt("Push this task to which date? Use YYYY-MM-DD.", defaultDate);

  if (targetDate === null) return;

  const cleanedDate = targetDate.trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanedDate)) {
    alert("Please use this format: YYYY-MM-DD");
    return;
  }

  ensurePushedDateExists(selectedDateKey);

  const copiedTask = {
    id: "task-" + Date.now(),
    text: task.text,
    description: task.description || "",
    repeatType: "once",
    startDate: cleanedDate,
    endDate: "",
    intervalDays: 2,
    weeklyDays: [],
    sourceTaskId: task.id,
    pushedFromDate: selectedDateKey
  };

  scheduledTasks.push(copiedTask);

  pushedTasks[selectedDateKey][task.id] = {
    targetDate: cleanedDate,
    copiedTaskId: copiedTask.id,
    pushedAt: new Date().toISOString()
  };

  saveData("scheduledTasksV2", scheduledTasks);
  saveData("pushedTasksV1", pushedTasks);
  renderApp();
}

function updateScore() {
  const score = getScoreForDate(selectedDateKey);

  scoreText.textContent = score.percentage + "%";
  completedCount.textContent = score.completed + "/" + score.total;

  if (score.total === 0) {
    messageText.textContent = "Add a task to start tracking your day.";
  } else if (score.percentage === 100) {
    messageText.textContent = "Perfect day!";
  } else if (score.percentage >= successGoal) {
    messageText.textContent = "Successful day!";
  } else if (score.percentage >= 50) {
    messageText.textContent = "Good progress. Keep going.";
  } else if (score.percentage > 0) {
    messageText.textContent = "You’re making progress.";
  } else {
    messageText.textContent = "Start checking things off.";
  }
}

function updateTaskRepeatFields() {
  const repeatType = taskRepeatSelect.value;

  everyXDaysField.classList.add("hidden");
  weeklyDaysField.classList.add("hidden");

  if (repeatType === "everyXDays") everyXDaysField.classList.remove("hidden");
  if (repeatType === "weekly") weeklyDaysField.classList.remove("hidden");
}

function saveTask() {
  const text = taskInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const repeatType = taskRepeatSelect.value;
  const startDate = taskStartDateInput.value;
  const endDate = taskEndDateInput.value;

  if (!text) {
    alert("Please enter a task name.");
    return;
  }

  if (!startDate) {
    alert("Please choose a start date.");
    return;
  }

  if (endDate && endDate < startDate) {
    alert("End date cannot be before start date.");
    return;
  }

  const taskData = {
    text,
    description,
    repeatType,
    startDate,
    endDate,
    intervalDays: 2,
    weeklyDays: []
  };

  if (repeatType === "everyOtherDay") {
    taskData.intervalDays = 2;
  }

  if (repeatType === "everyXDays") {
    taskData.intervalDays = Number(taskIntervalInput.value);

    if (!taskData.intervalDays || taskData.intervalDays < 1) {
      alert("Please enter a repeat interval of at least 1 day.");
      return;
    }
  }

  if (repeatType === "weekly") {
    taskData.weeklyDays = Array.from(weeklyDaysField.querySelectorAll("input:checked")).map(box => Number(box.value));

    if (taskData.weeklyDays.length === 0) {
      alert("Please choose at least one weekday.");
      return;
    }
  }

  if (editingTaskId) {
    const existingTask = scheduledTasks.find(task => task.id === editingTaskId);
    if (!existingTask) return;

    existingTask.text = taskData.text;
    existingTask.description = taskData.description;
    existingTask.repeatType = taskData.repeatType;
    existingTask.startDate = taskData.startDate;
    existingTask.endDate = taskData.endDate;
    existingTask.intervalDays = taskData.intervalDays;
    existingTask.weeklyDays = taskData.weeklyDays;
  } else {
    taskData.id = "task-" + Date.now();
    scheduledTasks.push(taskData);
  }

  saveData("scheduledTasksV2", scheduledTasks);
  clearTaskForm();
  taskForm.classList.add("hidden");
  renderApp();
}

function startEditTask(taskId) {
  const task = scheduledTasks.find(item => item.id === taskId);
  if (!task) return;

  editingTaskId = taskId;

  taskForm.classList.remove("hidden");
  taskInput.value = task.text;
  taskDescriptionInput.value = task.description || "";
  taskStartDateInput.value = task.startDate || getTodayKey();
  taskEndDateInput.value = task.endDate || "";
  taskRepeatSelect.value = task.repeatType || "once";
  taskIntervalInput.value = task.intervalDays || 2;

  weeklyDaysField.querySelectorAll("input[type='checkbox']").forEach(box => {
    box.checked = (task.weeklyDays || []).includes(Number(box.value));
  });

  saveTaskBtn.textContent = "Update Task";
  cancelTaskEditBtn.classList.remove("hidden");

  updateTaskRepeatFields();
}

function clearTaskForm() {
  editingTaskId = null;
  taskInput.value = "";
  taskDescriptionInput.value = "";
  taskStartDateInput.value = selectedDateKey;
  taskEndDateInput.value = "";
  taskRepeatSelect.value = "once";
  taskIntervalInput.value = 3;

  weeklyDaysField.querySelectorAll("input[type='checkbox']").forEach(box => {
    box.checked = false;
  });

  saveTaskBtn.textContent = "Save Task";
  cancelTaskEditBtn.classList.add("hidden");
  updateTaskRepeatFields();
}

function deleteTask(taskId) {
  if (!confirm("Delete this task?")) return;

  scheduledTasks = scheduledTasks.filter(task => task.id !== taskId);

  Object.keys(checkedTasks).forEach(dateKey => {
    checkedTasks[dateKey] = checkedTasks[dateKey].filter(id => id !== taskId);
  });

  Object.keys(pushedTasks).forEach(dateKey => {
    if (pushedTasks[dateKey][taskId]) delete pushedTasks[dateKey][taskId];
  });

  saveAllMainData();
  renderApp();
}

function resetSelectedDay() {
  if (!confirm("This will uncheck all tasks for this day only. Continue?")) return;

  checkedTasks[selectedDateKey] = [];
  saveData("checkedTasksV5", checkedTasks);
  renderApp();
}

/* -----------------------------
   CALENDAR / WEEKLY
----------------------------- */
function renderCalendar() {
  calendarGrid.innerHTML = "";

  const year = calendarMonthDate.getFullYear();
  const month = calendarMonthDate.getMonth();

  calendarMonthLabel.textContent = calendarMonthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const firstWeekday = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstWeekday; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= lastDay; day++) {
    const dateKey = dateToKey(new Date(year, month, day));
    const dayTasks = getTasksForDate(dateKey);
    const dayScore = getScoreForDate(dateKey);

    const dayBox = document.createElement("button");
    dayBox.type = "button";
    dayBox.className = "calendar-day";

    dayBox.classList.toggle("selected", dateKey === selectedDateKey);
    dayBox.classList.toggle("today", dateKey === getTodayKey());

    const topRow = document.createElement("div");
    topRow.className = "calendar-day-top";
    topRow.innerHTML = `<div class="calendar-date-number">${day}</div>`;

    if (dayScore.total > 0) {
      const scoreBadge = document.createElement("div");
      scoreBadge.className = "calendar-score-badge";
      scoreBadge.textContent = dayScore.percentage + "%";
      topRow.appendChild(scoreBadge);
    }

    dayBox.appendChild(topRow);

    dayTasks.slice(0, 3).forEach(task => {
      const preview = document.createElement("div");
      preview.className = "calendar-task-preview";
      preview.textContent = task.text;
      dayBox.appendChild(preview);
    });

    if (dayTasks.length > 3) {
      const more = document.createElement("div");
      more.className = "calendar-more";
      more.textContent = "+" + (dayTasks.length - 3) + " more";
      dayBox.appendChild(more);
    }

    dayBox.addEventListener("click", () => {
      selectedDateKey = dateKey;
      calendarMonthDate = keyToDate(selectedDateKey);
      showScreen("today");
      renderApp();
    });

    calendarGrid.appendChild(dayBox);
  }
}

function renderWeeklySummary() {
  weeklySummary.innerHTML = "";

  const startKey = getWeekStart(selectedDateKey);
  let totalPercent = 0;

  for (let i = 0; i < 7; i++) {
    const dayKey = shiftDateKey(startKey, i);
    const score = getScoreForDate(dayKey);

    totalPercent += score.percentage;

    const dayBox = document.createElement("div");
    dayBox.className = "week-day";
    dayBox.classList.toggle("active", dayKey === selectedDateKey);

    dayBox.innerHTML = `
      <div class="week-name">${formatDayTop(dayKey)}</div>
      <div class="week-bar"><div class="week-fill" style="height:${score.percentage}%"></div></div>
      <div class="week-percent">${score.percentage}%</div>
    `;

    dayBox.addEventListener("click", () => {
      selectedDateKey = dayKey;
      calendarMonthDate = keyToDate(selectedDateKey);
      renderApp();
    });

    weeklySummary.appendChild(dayBox);
  }

  weeklyAverage.textContent = "Avg: " + Math.round(totalPercent / 7) + "%";
}

function renderMonthlySummary() {
  const year = calendarMonthDate.getFullYear();
  const month = calendarMonthDate.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  let totalPercent = 0;
  let scoredDays = 0;
  let bestPercent = 0;
  let successfulDays = 0;

  for (let day = 1; day <= lastDay; day++) {
    const dateKey = dateToKey(new Date(year, month, day));
    const score = getScoreForDate(dateKey);

    if (score.total > 0) {
      scoredDays++;
      totalPercent += score.percentage;
      bestPercent = Math.max(bestPercent, score.percentage);
      if (score.percentage >= successGoal) successfulDays++;
    }
  }

  monthAverage.textContent = scoredDays === 0 ? "0%" : Math.round(totalPercent / scoredDays) + "%";
  monthBest.textContent = bestPercent + "%";
  monthSuccessfulDays.textContent = successfulDays;
}

/* -----------------------------
   LISTS
----------------------------- */
function renderLists() {
  listsContainer.innerHTML = "";

  if (customLists.length === 0) {
    listsContainer.innerHTML = '<p class="empty-text">No lists yet. Create a shopping list, packing list, project list, or anything else.</p>';
    return;
  }

  customLists.forEach(list => {
    const completedCount = list.items.filter(item => item.completed).length;

    const card = document.createElement("div");
    card.className = "list-card";

    card.innerHTML = `
      <p class="list-title">${escapeHtml(list.title)}</p>
      <p class="list-meta">${completedCount}/${list.items.length} completed</p>

      <div class="add-list-item-row">
        <input type="text" placeholder="Add item..." data-list-input="${list.id}" />
        <button data-add-item="${list.id}">Add</button>
      </div>

      <div class="list-items" id="items-${list.id}"></div>

      <div class="list-actions">
        <button class="list-clear-btn" data-clear-list="${list.id}">Clear completed</button>
        <button class="list-delete-btn" data-delete-list="${list.id}">Delete list</button>
      </div>
    `;

    listsContainer.appendChild(card);

    const itemsContainer = document.getElementById("items-" + list.id);

    if (list.items.length === 0) {
      itemsContainer.innerHTML = '<p class="empty-text">No items yet.</p>';
    } else {
      list.items.forEach(item => {
        const itemRow = document.createElement("div");
        itemRow.className = "list-item";
        itemRow.classList.toggle("completed", item.completed);

        itemRow.innerHTML = `
          <div class="list-item-left">
            <input type="checkbox" ${item.completed ? "checked" : ""} data-toggle-item="${list.id}|${item.id}" />
            <span class="list-item-text">${escapeHtml(item.text)}</span>
          </div>

          <button class="list-item-delete" data-delete-item="${list.id}|${item.id}">×</button>
        `;

        itemsContainer.appendChild(itemRow);
      });
    }
  });

  attachListEvents();
}

function attachListEvents() {
  document.querySelectorAll("[data-add-item]").forEach(button => {
    button.addEventListener("click", () => {
      const listId = button.dataset.addItem;
      const input = document.querySelector(`[data-list-input="${listId}"]`);
      addItemToList(listId, input.value);
      input.value = "";
    });
  });

  document.querySelectorAll("[data-list-input]").forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const listId = input.dataset.listInput;
        addItemToList(listId, input.value);
        input.value = "";
      }
    });
  });

  document.querySelectorAll("[data-toggle-item]").forEach(box => {
    box.addEventListener("change", () => {
      const [listId, itemId] = box.dataset.toggleItem.split("|");
      markListItemDoneAndRemove(listId, itemId, box);
    });
  });

  document.querySelectorAll("[data-delete-item]").forEach(button => {
    button.addEventListener("click", () => {
      const [listId, itemId] = button.dataset.deleteItem.split("|");
      deleteListItem(listId, itemId);
    });
  });

  document.querySelectorAll("[data-clear-list]").forEach(button => {
    button.addEventListener("click", () => clearCompletedListItems(button.dataset.clearList));
  });

  document.querySelectorAll("[data-delete-list]").forEach(button => {
    button.addEventListener("click", () => deleteList(button.dataset.deleteList));
  });
}

function createList() {
  const title = newListInput.value.trim();

  if (!title) {
    alert("Please enter a list name.");
    return;
  }

  customLists.push({
    id: "list-" + Date.now(),
    title,
    items: []
  });

  newListInput.value = "";
  saveData("customListsV1", customLists);
  renderLists();
}

function addItemToList(listId, text) {
  const cleaned = text.trim();
  if (!cleaned) return;

  const list = customLists.find(item => item.id === listId);
  if (!list) return;

  list.items.push({
    id: "item-" + Date.now() + "-" + Math.random(),
    text: cleaned,
    completed: false
  });

  saveData("customListsV1", customLists);
  renderLists();
}

function markListItemDoneAndRemove(listId, itemId, checkbox) {
  if (!checkbox.checked) return;

  const row = checkbox.closest(".list-item");
  if (row) {
    row.classList.add("completed");

    setTimeout(() => {
      row.classList.add("disappearing");
    }, 900);
  }

  setTimeout(() => {
    deleteListItem(listId, itemId);
  }, 1900);
}

function deleteListItem(listId, itemId) {
  const list = customLists.find(item => item.id === listId);
  if (!list) return;

  list.items = list.items.filter(item => item.id !== itemId);
  saveData("customListsV1", customLists);
  renderLists();
}

function clearCompletedListItems(listId) {
  const list = customLists.find(item => item.id === listId);
  if (!list) return;

  list.items = list.items.filter(item => !item.completed);
  saveData("customListsV1", customLists);
  renderLists();
}

function deleteList(listId) {
  if (!confirm("Delete this list?")) return;

  customLists = customLists.filter(list => list.id !== listId);
  saveData("customListsV1", customLists);
  renderLists();
}

/* -----------------------------
   WORKOUT TRACKER
----------------------------- */
function normalizeWorkoutLog(log) {
  if (log.setsList && Array.isArray(log.setsList)) {
    return {
      ...log,
      setsList: log.setsList.map(set => ({
        weight: Number(set.weight),
        reps: Number(set.reps)
      })),
      volume: calculateWorkoutVolume(log.setsList)
    };
  }

  // Converts old workout entries into the new set-by-set format.
  if (log.weight !== undefined && log.sets !== undefined && log.reps !== undefined) {
    const setsList = [];

    for (let i = 0; i < Number(log.sets); i++) {
      setsList.push({
        weight: Number(log.weight),
        reps: Number(log.reps)
      });
    }

    return {
      ...log,
      setsList,
      volume: calculateWorkoutVolume(setsList)
    };
  }

  return {
    ...log,
    setsList: [],
    volume: 0
  };
}

function normalizeAllWorkoutLogs() {
  workoutLogs = workoutLogs.map(normalizeWorkoutLog);
  saveData("workoutLogsV1", workoutLogs);
}

function calculateWorkoutVolume(setsList) {
  return setsList.reduce((total, set) => {
    return total + Number(set.weight) * Number(set.reps);
  }, 0);
}

function getBestSet(setsList) {
  if (!setsList || setsList.length === 0) return null;

  return setsList.reduce((best, current) => {
    const bestScore = Number(best.weight) * Number(best.reps);
    const currentScore = Number(current.weight) * Number(current.reps);

    if (Number(current.weight) > Number(best.weight)) return current;
    if (Number(current.weight) === Number(best.weight) && currentScore > bestScore) return current;

    return best;
  }, setsList[0]);
}

function estimateOneRepMax(weight, reps) {
  if (!weight || !reps) return 0;

  // Simple Epley estimate.
  return Math.round(Number(weight) * (1 + Number(reps) / 30));
}

function getSetSummary(setsList) {
  if (!setsList || setsList.length === 0) return "No sets";

  return setsList
    .map((set, index) => {
      return "Set " + (index + 1) + ": " + set.weight + " × " + set.reps;
    })
    .join(" • ");
}

function renderWorkoutPage() {
  renderExerciseSelect();
  renderWorkoutSetRows();
  renderWorkoutSummary();
  renderWorkoutHistory();
  drawWorkoutChart();
}

function renderExerciseSelect() {
  const selectedBeforeRender = exerciseSelect.value;

  exerciseSelect.innerHTML = "";

  if (workoutExercises.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No exercises yet";
    exerciseSelect.appendChild(option);
    return;
  }

  workoutExercises.forEach(exercise => {
    const option = document.createElement("option");
    option.value = exercise.id;
    option.textContent = exercise.name;
    exerciseSelect.appendChild(option);
  });

  if (selectedBeforeRender) {
    exerciseSelect.value = selectedBeforeRender;
  }
}

function addExercise() {
  const name = exerciseNameInput.value.trim();

  if (!name) {
    alert("Please enter an exercise name.");
    return;
  }

  const exercise = {
    id: "exercise-" + Date.now(),
    name,
    createdAt: new Date().toISOString()
  };

  workoutExercises.push(exercise);
  exerciseNameInput.value = "";

  saveData("workoutExercisesV1", workoutExercises);

  renderExerciseSelect();
  exerciseSelect.value = exercise.id;

  renderWorkoutPage();
}

function getSelectedExerciseId() {
  return exerciseSelect.value || (workoutExercises[0] ? workoutExercises[0].id : "");
}

function getSelectedExercise() {
  const id = getSelectedExerciseId();
  return workoutExercises.find(exercise => exercise.id === id) || null;
}

function getLogsForExercise(exerciseId) {
  return workoutLogs
    .map(normalizeWorkoutLog)
    .filter(log => log.exerciseId === exerciseId)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function renderWorkoutSetRows() {
  if (!workoutSetsBuilder) return;

  if (workoutSetsBuilder.children.length === 0) {
    addWorkoutSetRow();
  }

  updateWorkoutSetNumbers();
}

function addWorkoutSetRow(weight = "", reps = "") {
  const row = document.createElement("div");
  row.className = "workout-set-row";

  row.innerHTML = `
    <div class="set-number">Set</div>
    <input class="set-weight-input" type="number" min="0" step="0.5" placeholder="Weight" value="${weight}" />
    <input class="set-reps-input" type="number" min="1" step="1" placeholder="Reps" value="${reps}" />
    <button type="button" class="remove-set-btn">×</button>
  `;

  row.querySelector(".remove-set-btn").addEventListener("click", () => {
    if (workoutSetsBuilder.children.length <= 1) {
      alert("You need at least one set.");
      return;
    }

    row.remove();
    updateWorkoutSetNumbers();
  });

  workoutSetsBuilder.appendChild(row);
  updateWorkoutSetNumbers();
}

function updateWorkoutSetNumbers() {
  const rows = workoutSetsBuilder.querySelectorAll(".workout-set-row");

  rows.forEach((row, index) => {
    row.querySelector(".set-number").textContent = "Set " + (index + 1);
  });
}

function getWorkoutSetRowsData() {
  const rows = workoutSetsBuilder.querySelectorAll(".workout-set-row");
  const setsList = [];

  rows.forEach(row => {
    const weight = Number(row.querySelector(".set-weight-input").value);
    const reps = Number(row.querySelector(".set-reps-input").value);

    if (weight > 0 && reps > 0) {
      setsList.push({
        weight,
        reps
      });
    }
  });

  return setsList;
}

function clearWorkoutSetRows() {
  workoutSetsBuilder.innerHTML = "";
  addWorkoutSetRow();
}

function fillFromLastWorkout() {
  const exercise = getSelectedExercise();
  if (!exercise) return;

  const logs = getLogsForExercise(exercise.id);

  if (logs.length === 0) return;

  const last = logs[logs.length - 1];

  workoutSetsBuilder.innerHTML = "";

  last.setsList.forEach(set => {
    addWorkoutSetRow(set.weight, set.reps);
  });
}

function saveWorkoutLog() {
  const exercise = getSelectedExercise();

  if (!exercise) {
    alert("Please add an exercise first.");
    return;
  }

  const date = workoutDateInput.value;
  const setsList = getWorkoutSetRowsData();
  const notes = workoutNotesInput.value.trim();

  if (!date) {
    alert("Please choose a date.");
    return;
  }

  if (setsList.length === 0) {
    alert("Please enter at least one set with weight and reps.");
    return;
  }

  const bestSet = getBestSet(setsList);

  workoutLogs.push({
    id: "workout-" + Date.now(),
    exerciseId: exercise.id,
    date,
    setsList,
    notes,
    volume: calculateWorkoutVolume(setsList),
    bestSetWeight: bestSet ? bestSet.weight : 0,
    bestSetReps: bestSet ? bestSet.reps : 0,
    estimatedOneRepMax: bestSet ? estimateOneRepMax(bestSet.weight, bestSet.reps) : 0,
    createdAt: new Date().toISOString()
  });

  workoutNotesInput.value = "";
  clearWorkoutSetRows();

  saveData("workoutLogsV1", workoutLogs);
  renderWorkoutPage();
}

function renderWorkoutSummary() {
  const exercise = getSelectedExercise();

  if (!exercise) {
    exerciseLastLog.textContent = "No exercise selected yet.";
    exerciseBestLog.textContent = "Add an exercise to start.";
    exerciseChartTitle.textContent = "Progress chart";
    return;
  }

  exerciseChartTitle.textContent = exercise.name + " progress";

  const logs = getLogsForExercise(exercise.id);

  if (logs.length === 0) {
    exerciseLastLog.textContent = "No entries for " + exercise.name + " yet.";
    exerciseBestLog.textContent = "Log your first workout entry.";
    return;
  }

  const last = logs[logs.length - 1];
  const bestVolume = logs.reduce((best, log) => log.volume > best.volume ? log : best, logs[0]);
  const bestEstimatedMax = logs.reduce((best, log) => {
    return Number(log.estimatedOneRepMax || 0) > Number(best.estimatedOneRepMax || 0) ? log : best;
  }, logs[0]);

  exerciseLastLog.textContent =
    formatShortDate(last.date) + ": " + getSetSummary(last.setsList);

  exerciseBestLog.textContent =
    "Best volume: " + bestVolume.volume + " lb • Best estimated 1RM: " + (bestEstimatedMax.estimatedOneRepMax || 0) + " lb";
}

function renderWorkoutHistory() {
  workoutHistoryList.innerHTML = "";

  const exercise = getSelectedExercise();

  if (!exercise) {
    workoutHistoryList.innerHTML = '<p class="empty-text">Add an exercise to begin tracking.</p>';
    return;
  }

  const logs = getLogsForExercise(exercise.id).reverse();

  if (logs.length === 0) {
    workoutHistoryList.innerHTML = '<p class="empty-text">No entries for this exercise yet.</p>';
    return;
  }

  logs.slice(0, 12).forEach(log => {
    const bestSet = getBestSet(log.setsList);

    const card = document.createElement("div");
    card.className = "workout-entry-card";

    const setChips = log.setsList
      .map((set, index) => {
        return `<span class="set-chip">Set ${index + 1}: ${set.weight} × ${set.reps}</span>`;
      })
      .join("");

    card.innerHTML = `
      <div class="workout-entry-top">
        <div>
          <p class="workout-entry-title">${formatShortDate(log.date)} — ${log.setsList.length} sets</p>
          <p class="workout-entry-meta">Total volume: ${log.volume} lb</p>
        </div>

        <button class="workout-delete-btn" data-delete-workout="${log.id}">×</button>
      </div>

      <div class="set-breakdown">
        ${setChips}
      </div>

      <div class="workout-highlight-row">
        <div class="workout-highlight">
          <p>Top set</p>
          <strong>${bestSet ? bestSet.weight + " × " + bestSet.reps : "N/A"}</strong>
        </div>

        <div class="workout-highlight">
          <p>Estimated 1RM</p>
          <strong>${log.estimatedOneRepMax || 0} lb</strong>
        </div>
      </div>

      ${log.notes ? `<p class="workout-entry-notes">${escapeHtml(log.notes)}</p>` : ""}
    `;

    workoutHistoryList.appendChild(card);
  });

  document.querySelectorAll("[data-delete-workout]").forEach(button => {
    button.addEventListener("click", () => deleteWorkoutLog(button.dataset.deleteWorkout));
  });
}

function deleteWorkoutLog(logId) {
  if (!confirm("Delete this workout entry?")) return;

  workoutLogs = workoutLogs.filter(log => log.id !== logId);
  saveData("workoutLogsV1", workoutLogs);
  renderWorkoutPage();
}

/* -----------------------------
   GOALS
----------------------------- */
function updateGoalTypeFields() {
  const type = goalTypeSelect.value;

  numberGoalFields.classList.add("hidden");
  milestoneGoalFields.classList.add("hidden");
  progressGoalFields.classList.add("hidden");

  if (type === "number") numberGoalFields.classList.remove("hidden");
  if (type === "milestone") milestoneGoalFields.classList.remove("hidden");
  if (type === "progress") progressGoalFields.classList.remove("hidden");
}

function saveGoal() {
  const name = goalNameInput.value.trim();
  const type = goalTypeSelect.value;
  const deadline = goalDeadlineInput.value;

  if (!name) {
    alert("Please enter a goal name.");
    return;
  }

  const goalData = { name, type, deadline };

  if (type === "number") {
    const current = Number(goalCurrentInput.value);
    const target = Number(goalTargetInput.value);

    if (target <= 0) {
      alert("Please enter a target greater than 0.");
      return;
    }

    goalData.current = current;
    goalData.target = target;
    goalData.history = [
      {
        id: "goal-log-" + Date.now(),
        date: getTodayKey(),
        value: current
      }
    ];
  }

  if (type === "milestone") {
    const lines = goalMilestonesInput.value.split("\n").map(line => line.trim()).filter(Boolean);

    if (lines.length === 0) {
      alert("Please enter at least one milestone.");
      return;
    }

    goalData.milestones = lines.map(line => ({
      id: "milestone-" + Date.now() + "-" + Math.random(),
      text: line,
      completed: false
    }));
  }

  if (type === "progress") {
    const progress = Number(goalProgressInput.value || 0);
    const note = goalProgressNoteInput.value.trim();

    goalData.progress = Math.max(0, Math.min(100, progress));
    goalData.notes = note
      ? [{ id: "note-" + Date.now(), date: getTodayKey(), text: note }]
      : [];
  }

  if (editingGoalId) {
    const existingGoal = goals.find(goal => goal.id === editingGoalId);
    if (!existingGoal) return;

    const oldMilestones = existingGoal.milestones || [];
    const oldHistory = existingGoal.history || [];
    const oldNotes = existingGoal.notes || [];

    Object.keys(existingGoal).forEach(key => {
      if (key !== "id") delete existingGoal[key];
    });

    Object.assign(existingGoal, goalData);

    if (type === "number") {
      existingGoal.history = oldHistory.length > 0 ? oldHistory : goalData.history;
    }

    if (type === "milestone") {
      existingGoal.milestones = goalData.milestones.map(newMilestone => {
        const old = oldMilestones.find(item => item.text === newMilestone.text);
        if (old) newMilestone.completed = old.completed;
        return newMilestone;
      });
    }

    if (type === "progress") {
      existingGoal.notes = oldNotes.length > 0 ? oldNotes : goalData.notes;
    }
  } else {
    goalData.id = "goal-" + Date.now();
    goals.push(goalData);
  }

  saveData("goalsV2", goals);
  clearGoalForm();
  goalForm.classList.add("hidden");
  renderApp();
}

function clearGoalForm() {
  editingGoalId = null;

  goalNameInput.value = "";
  goalTypeSelect.value = "number";
  goalDeadlineInput.value = "";
  goalCurrentInput.value = "";
  goalTargetInput.value = "";
  goalMilestonesInput.value = "";
  goalProgressInput.value = "";
  goalProgressNoteInput.value = "";

  saveGoalBtn.textContent = "Save Goal";
  cancelGoalEditBtn.classList.add("hidden");
  updateGoalTypeFields();
}

function startEditGoal(goalId) {
  const goal = goals.find(item => item.id === goalId);
  if (!goal) return;

  editingGoalId = goalId;

  goalForm.classList.remove("hidden");
  goalNameInput.value = goal.name;
  goalTypeSelect.value = goal.type;
  goalDeadlineInput.value = goal.deadline || "";
  goalCurrentInput.value = goal.current || "";
  goalTargetInput.value = goal.target || "";
  goalMilestonesInput.value = goal.type === "milestone" ? goal.milestones.map(item => item.text).join("\n") : "";
  goalProgressInput.value = goal.progress || "";
  goalProgressNoteInput.value = "";

  saveGoalBtn.textContent = "Update Goal";
  cancelGoalEditBtn.classList.remove("hidden");
  updateGoalTypeFields();
}

function getGoalProgress(goal) {
  if (goal.type === "number") {
    return {
      percentage: Math.min(100, Math.round((goal.current / goal.target) * 100)),
      text: goal.current + " / " + goal.target
    };
  }

  if (goal.type === "milestone") {
    const total = goal.milestones.length;
    const completed = goal.milestones.filter(item => item.completed).length;

    return {
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
      text: completed + " / " + total + " milestones"
    };
  }

  if (goal.type === "progress") {
    return {
      percentage: Math.max(0, Math.min(100, Number(goal.progress || 0))),
      text: "Progress journal"
    };
  }

  return { percentage: 0, text: "" };
}

function renderGoals() {
  goalsList.innerHTML = "";

  if (goals.length === 0) {
    goalsList.innerHTML = '<p class="empty-text">No goals yet. Add a number goal, milestone goal, or progress journal goal.</p>';
    return;
  }

  goals.forEach(goal => {
    const progress = getGoalProgress(goal);

    const card = document.createElement("div");
    card.className = "goal-card";

    card.innerHTML = `
      <p class="goal-title">${escapeHtml(goal.name)}</p>
      <p class="goal-meta">${getGoalTypeLabel(goal.type)} • ${formatDeadline(goal.deadline)}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${progress.percentage}%"></div></div>
      <p class="goal-progress-text">${progress.percentage}% — ${escapeHtml(progress.text)}</p>
    `;

    if (goal.type === "number") {
      const chartBox = document.createElement("div");
      chartBox.className = "goal-mini-chart";
      chartBox.innerHTML = `<canvas id="goal-chart-${goal.id}" height="120"></canvas>`;
      card.appendChild(chartBox);
    }

    if (goal.type === "milestone") {
      const milestoneList = document.createElement("div");
      milestoneList.className = "milestone-list";

      goal.milestones.forEach(milestone => {
        const item = document.createElement("label");
        item.className = "milestone-item";

        item.innerHTML = `
          <input type="checkbox" ${milestone.completed ? "checked" : ""} />
          <span>${escapeHtml(milestone.text)}</span>
        `;

        item.querySelector("input").addEventListener("change", event => {
          milestone.completed = event.target.checked;
          saveData("goalsV2", goals);
          renderApp();
        });

        milestoneList.appendChild(item);
      });

      card.appendChild(milestoneList);
    }

    if (goal.type === "progress") {
      const notesList = document.createElement("div");
      notesList.className = "goal-notes-list";

      if (!goal.notes || goal.notes.length === 0) {
        notesList.innerHTML = '<p class="empty-text">No notes yet.</p>';
      } else {
        goal.notes.slice().reverse().slice(0, 5).forEach(note => {
          const noteItem = document.createElement("div");
          noteItem.className = "goal-note-item";

          noteItem.innerHTML = `
            <span class="goal-note-date">${formatShortDate(note.date)}</span>
            <span>${escapeHtml(note.text)}</span>
          `;

          notesList.appendChild(noteItem);
        });
      }

      card.appendChild(notesList);
    }

    const actions = document.createElement("div");
    actions.className = "goal-actions";

    if (goal.type === "number") {
      const updateBtn = document.createElement("button");
      updateBtn.className = "goal-update-btn";
      updateBtn.textContent = "Update";
      updateBtn.addEventListener("click", () => updateNumberGoal(goal.id));
      actions.appendChild(updateBtn);
    }

    if (goal.type === "progress") {
      const noteBtn = document.createElement("button");
      noteBtn.className = "goal-note-btn";
      noteBtn.textContent = "Add Note";
      noteBtn.addEventListener("click", () => addProgressGoalNote(goal.id));
      actions.appendChild(noteBtn);
    }

    const editBtn = document.createElement("button");
    editBtn.className = "goal-edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEditGoal(goal.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "goal-delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteGoal(goal.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(actions);

    goalsList.appendChild(card);
  });

  setTimeout(drawGoalMiniCharts, 50);
}

function getGoalTypeLabel(type) {
  if (type === "number") return "Number target";
  if (type === "milestone") return "Milestone goal";
  if (type === "progress") return "Progress journal";
  return "Goal";
}

function updateNumberGoal(goalId) {
  const goal = goals.find(item => item.id === goalId);
  if (!goal) return;

  const newValue = prompt("Enter new current amount:", goal.current);
  if (newValue === null) return;

  const numberValue = Number(newValue);

  if (Number.isNaN(numberValue)) {
    alert("Please enter a valid number.");
    return;
  }

  goal.current = numberValue;

  if (!goal.history) goal.history = [];

  goal.history.push({
    id: "goal-log-" + Date.now(),
    date: getTodayKey(),
    value: numberValue
  });

  saveData("goalsV2", goals);
  renderApp();
}

function addProgressGoalNote(goalId) {
  const goal = goals.find(item => item.id === goalId);
  if (!goal) return;

  const newProgress = prompt("Progress percent 0-100:", goal.progress || 0);
  if (newProgress === null) return;

  const progressNumber = Number(newProgress);

  if (Number.isNaN(progressNumber)) {
    alert("Please enter a valid number.");
    return;
  }

  const noteText = prompt("Add a progress note:");
  if (noteText === null) return;

  goal.progress = Math.max(0, Math.min(100, progressNumber));

  if (!goal.notes) goal.notes = [];

  if (noteText.trim()) {
    goal.notes.push({
      id: "note-" + Date.now(),
      date: getTodayKey(),
      text: noteText.trim()
    });
  }

  saveData("goalsV2", goals);
  renderApp();
}

function deleteGoal(goalId) {
  if (!confirm("Delete this goal?")) return;

  goals = goals.filter(goal => goal.id !== goalId);
  saveData("goalsV2", goals);
  renderApp();
}

/* -----------------------------
   STATS / MOMENTUM
----------------------------- */
function calculateCurrentStreak() {
  let streak = 0;
  let dateKey = getTodayKey();

  while (isSuccessfulDay(dateKey)) {
    streak++;
    dateKey = shiftDateKey(dateKey, -1);
  }

  return streak;
}

function calculateBestStreak(daysToCheck) {
  let best = 0;
  let current = 0;

  for (let i = daysToCheck - 1; i >= 0; i--) {
    const dateKey = shiftDateKey(getTodayKey(), -i);

    if (isSuccessfulDay(dateKey)) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }

  return best;
}

function averageScore(daysToCheck) {
  let total = 0;
  let count = 0;

  for (let i = 0; i < daysToCheck; i++) {
    const dateKey = shiftDateKey(getTodayKey(), -i);
    const score = getScoreForDate(dateKey);

    if (score.total > 0) {
      total += score.percentage;
      count++;
    }
  }

  return count === 0 ? 0 : Math.round(total / count);
}

function calculateMomentum() {
  let xp = 0;
  let successfulDays = 0;
  let perfectDays = 0;
  let completedTasks = 0;

  for (let i = 364; i >= 0; i--) {
    const dateKey = shiftDateKey(getTodayKey(), -i);
    const score = getScoreForDate(dateKey);

    if (score.total > 0) {
      completedTasks += score.completed;
      xp += score.completed * 2;

      if (score.percentage >= successGoal) {
        successfulDays++;
        xp += 50;
      }

      if (score.percentage === 100) {
        perfectDays++;
        xp += 50;
      }
    }
  }

  const currentStreak = calculateCurrentStreak();

  if (currentStreak >= 3) xp += 25;
  if (currentStreak >= 7) xp += 75;
  if (currentStreak >= 14) xp += 150;
  if (currentStreak >= 30) xp += 500;

  return { xp, successfulDays, perfectDays, completedTasks, currentStreak };
}

function getMomentumRank(xp) {
  const ranks = [
    { name: "Starter", xp: 0 },
    { name: "Building", xp: 250 },
    { name: "Consistent", xp: 750 },
    { name: "Disciplined", xp: 1500 },
    { name: "Locked In", xp: 3000 },
    { name: "Elite", xp: 5000 },
    { name: "Legend", xp: 8000 }
  ];

  let current = ranks[0];
  let next = ranks[1];

  for (let i = 0; i < ranks.length; i++) {
    if (xp >= ranks[i].xp) {
      current = ranks[i];
      next = ranks[i + 1] || null;
    }
  }

  return { current, next };
}

function renderStats() {
  const momentum = calculateMomentum();
  const rankInfo = getMomentumRank(momentum.xp);

  momentumScore.textContent = momentum.xp + " XP";
  momentumRank.textContent = rankInfo.current.name;

  if (rankInfo.next) {
    const progress = Math.round(((momentum.xp - rankInfo.current.xp) / (rankInfo.next.xp - rankInfo.current.xp)) * 100);
    momentumProgressFill.style.width = Math.max(0, Math.min(100, progress)) + "%";
    momentumNextRank.textContent = "Next rank: " + rankInfo.next.name + " at " + rankInfo.next.xp + " XP";
  } else {
    momentumProgressFill.style.width = "100%";
    momentumNextRank.textContent = "Highest rank reached.";
  }

  momentumMessage.textContent =
    momentum.successfulDays + " successful days • " +
    momentum.perfectDays + " perfect days • " +
    momentum.completedTasks + " tasks completed";

  currentStreakText.textContent = calculateCurrentStreak() + " days";
  bestStreakText.textContent = calculateBestStreak(365) + " days";
  successGoalLabel.textContent = "Goal: " + successGoal + "%";

  sevenDayAverage.textContent = averageScore(7) + "%";
  thirtyDayAverage.textContent = averageScore(30) + "%";

  totalSuccessfulDays.textContent = momentum.successfulDays;
  totalPerfectDays.textContent = momentum.perfectDays;
  totalCompletedTasks.textContent = momentum.completedTasks;
}

/* -----------------------------
   CHARTS
----------------------------- */
function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getThemeColors() {
  return {
    main: getComputedStyle(document.body).getPropertyValue("--main-color").trim() || "#2563eb",
    muted: getComputedStyle(document.body).getPropertyValue("--muted").trim() || "#64748b",
    text: getComputedStyle(document.body).getPropertyValue("--text").trim() || "#0f172a",
    border: getComputedStyle(document.body).getPropertyValue("--border").trim() || "#e2e8f0"
  };
}

function setupCanvas(canvas) {
  if (!canvas) return null;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return {
    ctx,
    width: rect.width,
    height: rect.height
  };
}

function drawLineChart(canvas, points, options = {}) {
  const setup = setupCanvas(canvas);
  if (!setup) return;

  const { ctx, width, height } = setup;
  const colors = getThemeColors();

  ctx.clearRect(0, 0, width, height);

  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = options.maxValue || Math.max(...points.map(point => point.value), 1);
  const minValue = options.minValue || 0;

  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;

  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  if (points.length === 0) {
    ctx.fillStyle = colors.muted;
    ctx.font = "13px Arial";
    ctx.fillText("No data yet", padding, height / 2);
    return;
  }

  const xStep = points.length === 1 ? chartWidth : chartWidth / (points.length - 1);

  ctx.strokeStyle = colors.main;
  ctx.lineWidth = 3;
  ctx.beginPath();

  points.forEach((point, index) => {
    const x = padding + xStep * index;
    const normalized = (point.value - minValue) / Math.max(1, maxValue - minValue);
    const y = padding + chartHeight - normalized * chartHeight;

    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  points.forEach((point, index) => {
    const x = padding + xStep * index;
    const normalized = (point.value - minValue) / Math.max(1, maxValue - minValue);
    const y = padding + chartHeight - normalized * chartHeight;

    ctx.fillStyle = colors.main;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = colors.muted;
  ctx.font = "11px Arial";

  if (points.length > 1) {
    ctx.fillText(points[0].label, padding, height - 8);
    const lastLabel = points[points.length - 1].label;
    ctx.fillText(lastLabel, width - padding - ctx.measureText(lastLabel).width, height - 8);
  }

  ctx.fillText(String(maxValue), padding, 16);
}

function drawBarChart(canvas, points, options = {}) {
  const setup = setupCanvas(canvas);
  if (!setup) return;

  const { ctx, width, height } = setup;
  const colors = getThemeColors();

  ctx.clearRect(0, 0, width, height);

  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = options.maxValue || Math.max(...points.map(point => point.value), 1);

  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;

  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  if (points.length === 0) {
    ctx.fillStyle = colors.muted;
    ctx.font = "13px Arial";
    ctx.fillText("No data yet", padding, height / 2);
    return;
  }

  const gap = 6;
  const barWidth = Math.max(6, (chartWidth - gap * (points.length - 1)) / points.length);

  points.forEach((point, index) => {
    const x = padding + index * (barWidth + gap);
    const barHeight = (point.value / Math.max(1, maxValue)) * chartHeight;
    const y = padding + chartHeight - barHeight;

    ctx.fillStyle = colors.main;
    roundRect(ctx, x, y, barWidth, barHeight, 6);
    ctx.fill();
  });

  ctx.fillStyle = colors.muted;
  ctx.font = "11px Arial";

  if (points.length > 1) {
    ctx.fillText(points[0].label, padding, height - 8);
    const lastLabel = points[points.length - 1].label;
    ctx.fillText(lastLabel, width - padding - ctx.measureText(lastLabel).width, height - 8);
  }

  ctx.fillText(String(maxValue), padding, 16);
}

function roundRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function drawStatsCharts() {
  const scorePoints = [];
  const taskPoints = [];

  for (let i = 13; i >= 0; i--) {
    const dateKey = shiftDateKey(getTodayKey(), -i);
    const score = getScoreForDate(dateKey);

    scorePoints.push({
      label: formatShortDate(dateKey),
      value: score.percentage
    });

    taskPoints.push({
      label: formatShortDate(dateKey),
      value: score.completed
    });
  }

  drawLineChart(scoreChart, scorePoints, { maxValue: 100 });
  drawBarChart(tasksChart, taskPoints);
}

function drawWorkoutChart() {
  const exercise = getSelectedExercise();

  if (!exercise) {
    drawLineChart(workoutChart, []);
    return;
  }

  const logs = getLogsForExercise(exercise.id).slice(-12);

  const points = logs.map(log => ({
    label: formatShortDate(log.date),
    value: log.volume
  }));

  drawLineChart(workoutChart, points);
}

function drawGoalMiniCharts() {
  goals.forEach(goal => {
    if (goal.type !== "number") return;

    const canvas = document.getElementById("goal-chart-" + goal.id);
    if (!canvas) return;

    const history = goal.history || [];

    const points = history.map(entry => ({
      label: formatShortDate(entry.date),
      value: Number(entry.value)
    }));

    drawLineChart(canvas, points);
  });
}

function drawAllCharts() {
  drawStatsCharts();
  drawWorkoutChart();
  drawGoalMiniCharts();
}

/* -----------------------------
   SETTINGS / BACKUP
----------------------------- */
function updateSuccessGoalSetting() {
  successGoal = Number(successGoalInput.value);
  successGoalValue.textContent = successGoal + "%";
  saveData("successGoalV1", successGoal);
  renderApp();
}

function renderSettings() {
  successGoalInput.value = successGoal;
  successGoalValue.textContent = successGoal + "%";
  applyAppearance(appAppearance);
}

function exportBackup() {
  const backup = {
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
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

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "daily-success-backup-" + APP_VERSION + ".json";
  link.click();

  URL.revokeObjectURL(url);
}

function importBackupFile(file) {
  const reader = new FileReader();

  reader.onload = event => {
    try {
      const backup = JSON.parse(event.target.result);

      if (!confirm("Import this backup? This will replace your current app data.")) return;

      scheduledTasks = normalizeTasks(backup.scheduledTasks || []);
      checkedTasks = backup.checkedTasks || {};
      pushedTasks = backup.pushedTasks || {};
      customLists = backup.customLists || [];
      goals = normalizeGoals(backup.goals || []);
      workoutExercises = backup.workoutExercises || [];
      workoutLogs = backup.workoutLogs || [];
      appTheme = backup.appTheme || "blue";
      successGoal = backup.successGoal || 75;
      appAppearance = backup.appAppearance || "light";

      saveAllMainData();
      applyTheme(appTheme);
      renderSettings();
      renderApp();

      alert("Backup imported successfully.");
    } catch {
      alert("Could not import backup. Make sure it is a valid Daily Success backup file.");
    }
  };

  reader.readAsText(file);
}

/* -----------------------------
   APP RENDER
----------------------------- */
function renderApp() {
  currentDateText.textContent = formatFullDate(selectedDateKey);
  miniDay.textContent = selectedDateKey === getTodayKey() ? "Today" : formatDayBottom(selectedDateKey);

  renderDayScroll();
  renderCalendar();
  renderWeeklySummary();
  renderTasks();
  updateScore();
  renderLists();
  renderWorkoutPage();
  renderGoals();
  renderStats();
  renderMonthlySummary();

  showScreen(currentScreen);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(error => {
      console.log("Service worker registration failed:", error);
    });
  }
}

/* -----------------------------
   EVENT LISTENERS
----------------------------- */
todayNavBtn.addEventListener("click", () => showScreen("today"));
calendarNavBtn.addEventListener("click", () => showScreen("calendar"));
listsNavBtn.addEventListener("click", () => showScreen("lists"));
workoutNavBtn.addEventListener("click", () => showScreen("workout"));
statsNavBtn.addEventListener("click", () => showScreen("stats"));
goalsNavBtn.addEventListener("click", () => showScreen("goals"));
settingsNavBtn.addEventListener("click", () => showScreen("settings"));

openCalendarBtn.addEventListener("click", () => showScreen("calendar"));

prevDayBtn.addEventListener("click", () => {
  selectedDateKey = shiftDateKey(selectedDateKey, -1);
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

nextDayBtn.addEventListener("click", () => {
  selectedDateKey = shiftDateKey(selectedDateKey, 1);
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

todayBtn.addEventListener("click", () => {
  selectedDateKey = getTodayKey();
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

calendarTodayBtn.addEventListener("click", () => {
  selectedDateKey = getTodayKey();
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

prevMonthBtn.addEventListener("click", () => {
  calendarMonthDate.setMonth(calendarMonthDate.getMonth() - 1);
  renderApp();
});

nextMonthBtn.addEventListener("click", () => {
  calendarMonthDate.setMonth(calendarMonthDate.getMonth() + 1);
  renderApp();
});

toggleTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
  taskStartDateInput.value = selectedDateKey;
});

taskRepeatSelect.addEventListener("change", updateTaskRepeatFields);
saveTaskBtn.addEventListener("click", saveTask);
cancelTaskEditBtn.addEventListener("click", clearTaskForm);
resetBtn.addEventListener("click", resetSelectedDay);

addListBtn.addEventListener("click", createList);
newListInput.addEventListener("keydown", event => {
  if (event.key === "Enter") createList();
});

addExerciseBtn.addEventListener("click", addExercise);

exerciseNameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addExercise();
});

exerciseSelect.addEventListener("change", () => {
  renderWorkoutPage();
  fillFromLastWorkout();
});

addWorkoutSetBtn.addEventListener("click", () => {
  addWorkoutSetRow();
});

saveWorkoutLogBtn.addEventListener("click", saveWorkoutLog);

toggleGoalFormBtn.addEventListener("click", () => {
  goalForm.classList.toggle("hidden");
});
goalTypeSelect.addEventListener("change", updateGoalTypeFields);
saveGoalBtn.addEventListener("click", saveGoal);
cancelGoalEditBtn.addEventListener("click", clearGoalForm);

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme);
    setTimeout(drawAllCharts, 50);
  });
});

successGoalInput.addEventListener("input", updateSuccessGoalSetting);

appearanceButtons.forEach(button => {
  button.addEventListener("click", () => applyAppearance(button.dataset.appearance));
});

exportDataBtn.addEventListener("click", exportBackup);

importDataBtn.addEventListener("click", () => {
  importDataInput.click();
});

importDataInput.addEventListener("change", event => {
  const file = event.target.files[0];
  if (file) importBackupFile(file);
  importDataInput.value = "";
});

window.addEventListener("resize", () => {
  setTimeout(drawAllCharts, 100);
});

/* -----------------------------
   STARTUP
----------------------------- */
saveAllMainData();
clearTaskForm();
clearGoalForm();
workoutDateInput.value = getTodayKey();
normalizeAllWorkoutLogs();
applyTheme(appTheme);
renderSettings();
registerServiceWorker();
renderApp();
window.cloudSync?.initialize();