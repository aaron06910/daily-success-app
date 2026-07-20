const currentDateText = document.getElementById("currentDate");
const miniDay = document.getElementById("miniDay");

const todayScreen = document.getElementById("todayScreen");
const calendarScreen = document.getElementById("calendarScreen");
const listsScreen = document.getElementById("listsScreen");
const statsScreen = document.getElementById("statsScreen");
const goalsScreen = document.getElementById("goalsScreen");
const settingsScreen = document.getElementById("settingsScreen");

const todayNavBtn = document.getElementById("todayNavBtn");
const calendarNavBtn = document.getElementById("calendarNavBtn");
const listsNavBtn = document.getElementById("listsNavBtn");
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
const taskRepeatSelect = document.getElementById("taskRepeatSelect");
const taskDateField = document.getElementById("taskDateField");
const taskDateInput = document.getElementById("taskDateInput");
const weeklyField = document.getElementById("weeklyField");
const weeklyDaySelect = document.getElementById("weeklyDaySelect");
const customDaysField = document.getElementById("customDaysField");
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

const toggleGoalFormBtn = document.getElementById("toggleGoalFormBtn");
const goalForm = document.getElementById("goalForm");
const goalNameInput = document.getElementById("goalNameInput");
const goalTypeSelect = document.getElementById("goalTypeSelect");
const goalDeadlineInput = document.getElementById("goalDeadlineInput");
const numberGoalFields = document.getElementById("numberGoalFields");
const milestoneGoalFields = document.getElementById("milestoneGoalFields");
const habitGoalFields = document.getElementById("habitGoalFields");
const goalCurrentInput = document.getElementById("goalCurrentInput");
const goalTargetInput = document.getElementById("goalTargetInput");
const goalMilestonesInput = document.getElementById("goalMilestonesInput");
const habitTaskChoices = document.getElementById("habitTaskChoices");
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

const themeButtons = document.querySelectorAll(".theme-btn");
const successGoalInput = document.getElementById("successGoalInput");
const successGoalValue = document.getElementById("successGoalValue");
const appearanceButtons = document.querySelectorAll(".appearance-btn");

const exportDataBtn = document.getElementById("exportDataBtn");
const importDataBtn = document.getElementById("importDataBtn");
const importDataInput = document.getElementById("importDataInput");

let selectedDateKey = getTodayKey();
let calendarMonthDate = keyToDate(selectedDateKey);
let currentScreen = "today";

let scheduledTasks = safeLoad("scheduledTasksV1", []);
let checkedTasks = safeLoad("checkedTasksV5", {});
let pushedTasks = safeLoad("pushedTasksV1", {});
let goals = safeLoad("goalsV1", []);
let customLists = safeLoad("customListsV1", []);
let appTheme = safeLoad("appThemeV2", "blue");
let successGoal = safeLoad("successGoalV1", 75);
let appAppearance = safeLoad("appAppearanceV1", "light");

let editingTaskId = null;
let editingGoalId = null;

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
  localStorage.setItem(key, JSON.stringify(data));
}

function saveAllMainData() {
  saveData("scheduledTasksV1", scheduledTasks);
  saveData("checkedTasksV5", checkedTasks);
  saveData("pushedTasksV1", pushedTasks);
  saveData("goalsV1", goals);
  saveData("customListsV1", customLists);
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

function formatDeadline(deadline) {
  if (!deadline) return "No deadline";

  return keyToDate(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
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

function showScreen(screenName) {
  currentScreen = screenName;

  const screens = [todayScreen, calendarScreen, listsScreen, statsScreen, goalsScreen, settingsScreen];
  const buttons = [todayNavBtn, calendarNavBtn, listsNavBtn, statsNavBtn, goalsNavBtn, settingsNavBtn];

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

  if (screenName === "stats") {
    statsScreen.classList.remove("hidden");
    statsNavBtn.classList.add("active");
  }

  if (screenName === "goals") {
    goalsScreen.classList.remove("hidden");
    goalsNavBtn.classList.add("active");
  }

  if (screenName === "settings") {
    settingsScreen.classList.remove("hidden");
    settingsNavBtn.classList.add("active");
  }
}

function applyTheme(themeName) {
  const themes = {
    blue: { main: "#2563eb", light: "#eff6ff", border: "#bfdbfe", dark: "#1d4ed8" },
    green: { main: "#16a34a", light: "#f0fdf4", border: "#bbf7d0", dark: "#15803d" },
    purple: { main: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe", dark: "#6d28d9" },
    orange: { main: "#f97316", light: "#fff7ed", border: "#fed7aa", dark: "#ea580c" },
    red: { main: "#dc2626", light: "#fef2f2", border: "#fecaca", dark: "#b91c1c" },
    pink: { main: "#ec4899", light: "#fdf2f8", border: "#fbcfe8", dark: "#be185d" }
  };

  const selectedTheme = themes[themeName] || themes.blue;

  document.documentElement.style.setProperty("--main-color", selectedTheme.main);
  document.documentElement.style.setProperty("--main-light", selectedTheme.light);
  document.documentElement.style.setProperty("--main-border", selectedTheme.border);
  document.documentElement.style.setProperty("--main-dark", selectedTheme.dark);

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
}

function shouldTaskShowOnDate(task, dateKey) {
  const weekday = keyToDate(dateKey).getDay();

  if (task.repeatType === "daily") return true;
  if (task.repeatType === "once") return task.date === dateKey;
  if (task.repeatType === "weekly") return Number(task.weekday) === weekday;
  if (task.repeatType === "custom") return task.customDays.includes(weekday);

  return false;
}

function getTasksForDate(dateKey) {
  return scheduledTasks.filter(task => shouldTaskShowOnDate(task, dateKey));
}

function weekdayName(dayNumber) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][Number(dayNumber)];
}

function getRepeatLabel(task) {
  if (task.repeatType === "daily") return "Repeats every day";
  if (task.repeatType === "once") return "One-time task: " + formatDayBottom(task.date);
  if (task.repeatType === "weekly") return "Repeats every " + weekdayName(task.weekday);
  if (task.repeatType === "custom") return "Repeats: " + task.customDays.map(weekdayName).join(", ");
  return "";
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
  editBtn.textContent = "✏️";
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
    date: cleanedDate,
    weekday: null,
    customDays: [],
    sourceTaskId: task.id,
    pushedFromDate: selectedDateKey
  };

  scheduledTasks.push(copiedTask);

  pushedTasks[selectedDateKey][task.id] = {
    targetDate: cleanedDate,
    copiedTaskId: copiedTask.id,
    pushedAt: new Date().toISOString()
  };

  saveData("scheduledTasksV1", scheduledTasks);
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

  taskDateField.classList.add("hidden");
  weeklyField.classList.add("hidden");
  customDaysField.classList.add("hidden");

  if (repeatType === "once") taskDateField.classList.remove("hidden");
  if (repeatType === "weekly") weeklyField.classList.remove("hidden");
  if (repeatType === "custom") customDaysField.classList.remove("hidden");
}

function saveTask() {
  const text = taskInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const repeatType = taskRepeatSelect.value;

  if (!text) {
    alert("Please enter a task name.");
    return;
  }

  const taskData = {
    text,
    description,
    repeatType,
    date: "",
    weekday: null,
    customDays: []
  };

  if (repeatType === "once") {
    taskData.date = taskDateInput.value;
    if (!taskData.date) {
      alert("Please choose a date.");
      return;
    }
  }

  if (repeatType === "weekly") {
    taskData.weekday = Number(weeklyDaySelect.value);
  }

  if (repeatType === "custom") {
    taskData.customDays = Array.from(customDaysField.querySelectorAll("input:checked")).map(box => Number(box.value));

    if (taskData.customDays.length === 0) {
      alert("Please choose at least one day.");
      return;
    }
  }

  if (editingTaskId) {
    const existingTask = scheduledTasks.find(task => task.id === editingTaskId);
    if (!existingTask) return;

    existingTask.text = taskData.text;
    existingTask.description = taskData.description;
    existingTask.repeatType = taskData.repeatType;
    existingTask.date = taskData.date;
    existingTask.weekday = taskData.weekday;
    existingTask.customDays = taskData.customDays;
  } else {
    taskData.id = "task-" + Date.now();
    scheduledTasks.push(taskData);
  }

  saveData("scheduledTasksV1", scheduledTasks);
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
  taskRepeatSelect.value = task.repeatType;
  taskDateInput.value = task.date || "";
  weeklyDaySelect.value = task.weekday === null ? "0" : String(task.weekday);

  customDaysField.querySelectorAll("input[type='checkbox']").forEach(box => {
    box.checked = task.customDays.includes(Number(box.value));
  });

  saveTaskBtn.textContent = "Update Task";
  cancelTaskEditBtn.classList.remove("hidden");

  updateTaskRepeatFields();
}

function clearTaskForm() {
  editingTaskId = null;
  taskInput.value = "";
  taskDescriptionInput.value = "";
  taskRepeatSelect.value = "once";
  taskDateInput.value = selectedDateKey;
  weeklyDaySelect.value = "0";

  customDaysField.querySelectorAll("input[type='checkbox']").forEach(box => {
    box.checked = false;
  });

  saveTaskBtn.textContent = "Save Task";
  cancelTaskEditBtn.classList.add("hidden");
  updateTaskRepeatFields();
}

function deleteTask(taskId) {
  if (!confirm("Delete this task?")) return;

  scheduledTasks = scheduledTasks.filter(task => task.id !== taskId);

  goals.forEach(goal => {
    if (goal.type === "habit") {
      goal.linkedTaskIds = goal.linkedTaskIds.filter(id => id !== taskId);
    }
  });

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

/* LISTS */
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
      toggleListItem(listId, itemId);
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

function toggleListItem(listId, itemId) {
  const list = customLists.find(item => item.id === listId);
  if (!list) return;

  const item = list.items.find(entry => entry.id === itemId);
  if (!item) return;

  item.completed = !item.completed;
  saveData("customListsV1", customLists);
  renderLists();
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

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* GOALS */
function updateGoalTypeFields() {
  const type = goalTypeSelect.value;

  numberGoalFields.classList.add("hidden");
  milestoneGoalFields.classList.add("hidden");
  habitGoalFields.classList.add("hidden");

  if (type === "number") numberGoalFields.classList.remove("hidden");
  if (type === "milestone") milestoneGoalFields.classList.remove("hidden");

  if (type === "habit") {
    habitGoalFields.classList.remove("hidden");
    renderHabitTaskChoices();
  }
}

function renderHabitTaskChoices(selectedIds = []) {
  habitTaskChoices.innerHTML = "";

  const repeatingTasks = scheduledTasks.filter(task => task.repeatType !== "once");

  if (repeatingTasks.length === 0) {
    habitTaskChoices.innerHTML = '<p class="empty-text">Add repeating tasks first, then link them to a goal.</p>';
    return;
  }

  repeatingTasks.forEach(task => {
    const label = document.createElement("label");
    label.className = "habit-choice";

    label.innerHTML = `
      <input type="checkbox" value="${task.id}" ${selectedIds.includes(task.id) ? "checked" : ""} />
      <span>${escapeHtml(task.text)} — ${getRepeatLabel(task)}</span>
    `;

    habitTaskChoices.appendChild(label);
  });
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

  if (type === "habit") {
    const linkedTaskIds = Array.from(habitTaskChoices.querySelectorAll("input:checked")).map(box => box.value);

    if (linkedTaskIds.length === 0) {
      alert("Please choose at least one repeating task.");
      return;
    }

    goalData.linkedTaskIds = linkedTaskIds;
    goalData.windowDays = 30;
  }

  if (editingGoalId) {
    const existingGoal = goals.find(goal => goal.id === editingGoalId);
    if (!existingGoal) return;

    const oldMilestones = existingGoal.milestones || [];

    Object.keys(existingGoal).forEach(key => {
      if (key !== "id") delete existingGoal[key];
    });

    Object.assign(existingGoal, goalData);

    if (type === "milestone") {
      existingGoal.milestones = goalData.milestones.map(newMilestone => {
        const old = oldMilestones.find(item => item.text === newMilestone.text);
        if (old) newMilestone.completed = old.completed;
        return newMilestone;
      });
    }
  } else {
    goalData.id = "goal-" + Date.now();
    goals.push(goalData);
  }

  saveData("goalsV1", goals);
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

  saveGoalBtn.textContent = "Update Goal";
  cancelGoalEditBtn.classList.remove("hidden");

  updateGoalTypeFields();

  if (goal.type === "habit") renderHabitTaskChoices(goal.linkedTaskIds || []);
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

  if (goal.type === "habit") {
    const days = goal.windowDays || 30;
    const linkedTaskIds = goal.linkedTaskIds || [];
    let possible = 0;
    let completed = 0;

    linkedTaskIds.forEach(taskId => {
      for (let i = 0; i < days; i++) {
        const dayKey = shiftDateKey(getTodayKey(), -i);
        const task = scheduledTasks.find(item => item.id === taskId);

        if (task && shouldTaskShowOnDate(task, dayKey)) {
          possible++;
          ensureCheckedDateExists(dayKey);
          if (checkedTasks[dayKey].includes(taskId)) completed++;
        }
      }
    });

    return {
      percentage: possible === 0 ? 0 : Math.round((completed / possible) * 100),
      text: completed + " / " + possible + " linked habits"
    };
  }

  return { percentage: 0, text: "" };
}

function renderGoals() {
  goalsList.innerHTML = "";

  if (goals.length === 0) {
    goalsList.innerHTML = '<p class="empty-text">No long-term goals yet.</p>';
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
          saveData("goalsV1", goals);
          renderApp();
        });

        milestoneList.appendChild(item);
      });

      card.appendChild(milestoneList);
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

    const editBtn = document.createElement("button");
    editBtn.className = "goal-edit-btn";
    editBtn.textContent = "✏️ Edit";
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
}

function getGoalTypeLabel(type) {
  if (type === "number") return "Number target";
  if (type === "milestone") return "Milestone goal";
  if (type === "habit") return "Habit-linked goal";
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
  saveData("goalsV1", goals);
  renderApp();
}

function deleteGoal(goalId) {
  if (!confirm("Delete this goal?")) return;

  goals = goals.filter(goal => goal.id !== goalId);
  saveData("goalsV1", goals);
  renderApp();
}

/* STATS */
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

/* SETTINGS / BACKUP */
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
    version: "v15",
    exportedAt: new Date().toISOString(),
    scheduledTasks,
    checkedTasks,
    pushedTasks,
    goals,
    customLists,
    appTheme,
    successGoal,
    appAppearance
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "daily-success-backup.json";
  link.click();

  URL.revokeObjectURL(url);
}

function importBackupFile(file) {
  const reader = new FileReader();

  reader.onload = event => {
    try {
      const backup = JSON.parse(event.target.result);

      if (!confirm("Import this backup? This will replace your current app data.")) return;

      scheduledTasks = backup.scheduledTasks || [];
      checkedTasks = backup.checkedTasks || {};
      pushedTasks = backup.pushedTasks || {};
      goals = backup.goals || [];
      customLists = backup.customLists || [];
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

/* APP RENDER */
function renderApp() {
  currentDateText.textContent = formatFullDate(selectedDateKey);
  miniDay.textContent = selectedDateKey === getTodayKey() ? "Today" : formatDayBottom(selectedDateKey);

  renderDayScroll();
  renderCalendar();
  renderWeeklySummary();
  renderTasks();
  updateScore();
  renderLists();
  renderGoals();
  renderStats();
  renderMonthlySummary();
  showScreen(currentScreen);
}

/* EVENT LISTENERS */
todayNavBtn.addEventListener("click", () => showScreen("today"));
calendarNavBtn.addEventListener("click", () => showScreen("calendar"));
listsNavBtn.addEventListener("click", () => showScreen("lists"));
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
  taskDateInput.value = selectedDateKey;
});

taskRepeatSelect.addEventListener("change", updateTaskRepeatFields);
saveTaskBtn.addEventListener("click", saveTask);
cancelTaskEditBtn.addEventListener("click", clearTaskForm);
resetBtn.addEventListener("click", resetSelectedDay);

addListBtn.addEventListener("click", createList);
newListInput.addEventListener("keydown", event => {
  if (event.key === "Enter") createList();
});

toggleGoalFormBtn.addEventListener("click", () => {
  goalForm.classList.toggle("hidden");
  renderHabitTaskChoices();
});

goalTypeSelect.addEventListener("change", updateGoalTypeFields);
saveGoalBtn.addEventListener("click", saveGoal);
cancelGoalEditBtn.addEventListener("click", clearGoalForm);

themeButtons.forEach(button => {
  button.addEventListener("click", () => applyTheme(button.dataset.theme));
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

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(error => {
      console.log("Service worker registration failed:", error);
    });
  }
}

/* STARTUP */
clearTaskForm();
updateGoalTypeFields();
applyTheme(appTheme);
renderSettings();
registerServiceWorker();
renderApp();