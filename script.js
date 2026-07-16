const currentDateText = document.getElementById("currentDate");
const miniDay = document.getElementById("miniDay");

const todayScreen = document.getElementById("todayScreen");
const calendarScreen = document.getElementById("calendarScreen");
const goalsScreen = document.getElementById("goalsScreen");
const settingsScreen = document.getElementById("settingsScreen");

const todayNavBtn = document.getElementById("todayNavBtn");
const calendarNavBtn = document.getElementById("calendarNavBtn");
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

const themeButtons = document.querySelectorAll(".theme-btn");

const currentStreakText = document.getElementById("currentStreak");
const bestStreakText = document.getElementById("bestStreak");
const successGoalLabel = document.getElementById("successGoalLabel");

const monthAverage = document.getElementById("monthAverage");
const monthBest = document.getElementById("monthBest");
const monthSuccessfulDays = document.getElementById("monthSuccessfulDays");

const successGoalInput = document.getElementById("successGoalInput");
const successGoalValue = document.getElementById("successGoalValue");

const appearanceButtons = document.querySelectorAll(".appearance-btn");

let selectedDateKey = getTodayKey();
let calendarMonthDate = keyToDate(selectedDateKey);
let currentScreen = "today";

let scheduledTasks = safeLoad("scheduledTasksV1", []);
let checkedTasks = safeLoad("checkedTasksV5", {});
let goals = safeLoad("goalsV1", []);
let appTheme = safeLoad("appThemeV2", "blue");
let successGoal = safeLoad("successGoalV1", 75);
let appAppearance = safeLoad("appAppearanceV1", "light");

let editingGoalId = null;
let editingTaskId = null;

function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
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
  const date = keyToDate(dateKey);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatDayTop(dateKey) {
  const date = keyToDate(dateKey);
  return date.toLocaleDateString("en-US", {
    weekday: "short"
  });
}

function formatDayBottom(dateKey) {
  const date = keyToDate(dateKey);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

function formatDeadline(deadline) {
  if (!deadline) return "No deadline";

  const date = keyToDate(deadline);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function ensureCheckedDateExists(dateKey) {
  if (!checkedTasks[dateKey]) {
    checkedTasks[dateKey] = [];
  }
}

function showScreen(screenName) {
  currentScreen = screenName;

  todayScreen.classList.add("hidden");
  calendarScreen.classList.add("hidden");
  goalsScreen.classList.add("hidden");
  settingsScreen.classList.add("hidden");

  todayNavBtn.classList.remove("active");
  calendarNavBtn.classList.remove("active");
  goalsNavBtn.classList.remove("active");
  settingsNavBtn.classList.remove("active");

  if (screenName === "today") {
    todayScreen.classList.remove("hidden");
    todayNavBtn.classList.add("active");
  }

  if (screenName === "calendar") {
    calendarScreen.classList.remove("hidden");
    calendarNavBtn.classList.add("active");
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
    blue: {
      main: "#2563eb",
      light: "#eff6ff",
      border: "#bfdbfe",
      dark: "#1d4ed8"
    },
    green: {
      main: "#16a34a",
      light: "#f0fdf4",
      border: "#bbf7d0",
      dark: "#15803d"
    },
    purple: {
      main: "#7c3aed",
      light: "#f5f3ff",
      border: "#ddd6fe",
      dark: "#6d28d9"
    },
    orange: {
      main: "#f97316",
      light: "#fff7ed",
      border: "#fed7aa",
      dark: "#ea580c"
    },
    red: {
      main: "#dc2626",
      light: "#fef2f2",
      border: "#fecaca",
      dark: "#b91c1c"
    }
  };

  const selectedTheme = themes[themeName] || themes.blue;

  document.documentElement.style.setProperty("--main-color", selectedTheme.main);
  document.documentElement.style.setProperty("--main-light", selectedTheme.light);
  document.documentElement.style.setProperty("--main-border", selectedTheme.border);
  document.documentElement.style.setProperty("--main-dark", selectedTheme.dark);

  themeButtons.forEach(function (button) {
    button.classList.remove("active");

    if (button.dataset.theme === themeName) {
      button.classList.add("active");
    }
  });

  appTheme = themeName;
  saveData("appThemeV2", appTheme);
}

function applyAppearance(appearance) {
  appAppearance = appearance;
  saveData("appAppearanceV1", appAppearance);

  if (appearance === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  appearanceButtons.forEach(function (button) {
    button.classList.remove("active");

    if (button.dataset.appearance === appearance) {
      button.classList.add("active");
    }
  });
}

function getTasksForDate(dateKey) {
  return scheduledTasks.filter(function (task) {
    return shouldTaskShowOnDate(task, dateKey);
  });
}

function shouldTaskShowOnDate(task, dateKey) {
  const date = keyToDate(dateKey);
  const weekday = date.getDay();

  if (task.repeatType === "daily") return true;
  if (task.repeatType === "once") return task.date === dateKey;
  if (task.repeatType === "weekly") return Number(task.weekday) === weekday;
  if (task.repeatType === "custom") return task.customDays.includes(weekday);

  return false;
}

function getRepeatLabel(task) {
  if (task.repeatType === "daily") return "Repeats every day";
  if (task.repeatType === "once") return "One-time task: " + formatDayBottom(task.date);
  if (task.repeatType === "weekly") return "Repeats every " + weekdayName(task.weekday);
  if (task.repeatType === "custom") return "Repeats: " + task.customDays.map(weekdayName).join(", ");
  return "";
}

function weekdayName(dayNumber) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[Number(dayNumber)];
}

function getScoreForDate(dateKey) {
  ensureCheckedDateExists(dateKey);

  const tasks = getTasksForDate(dateKey);
  const total = tasks.length;

  if (total === 0) {
    return { total: 0, completed: 0, percentage: 0 };
  }

  let completed = 0;

  tasks.forEach(function (task) {
    if (checkedTasks[dateKey].includes(task.id)) {
      completed++;
    }
  });

  return {
    total: total,
    completed: completed,
    percentage: Math.round((completed / total) * 100)
  };
}

function getWeekStart(dateKey) {
  const date = keyToDate(dateKey);
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  return dateToKey(date);
}

function isSuccessfulDay(dateKey) {
  const score = getScoreForDate(dateKey);
  return score.total > 0 && score.percentage >= successGoal;
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

      if (current > best) {
        best = current;
      }
    } else {
      current = 0;
    }
  }

  return best;
}

function renderStreaks() {
  if (!currentStreakText || !bestStreakText || !successGoalLabel) return;

  const current = calculateCurrentStreak();
  const best = calculateBestStreak(365);

  currentStreakText.textContent = current + (current === 1 ? " day" : " days");
  bestStreakText.textContent = best + (best === 1 ? " day" : " days");
  successGoalLabel.textContent = "Goal: " + successGoal + "%";
}

function renderMonthlySummary() {
  if (!monthAverage || !monthBest || !monthSuccessfulDays) return;

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

      if (score.percentage > bestPercent) {
        bestPercent = score.percentage;
      }

      if (score.percentage >= successGoal) {
        successfulDays++;
      }
    }
  }

  const average = scoredDays === 0 ? 0 : Math.round(totalPercent / scoredDays);

  monthAverage.textContent = average + "%";
  monthBest.textContent = bestPercent + "%";
  monthSuccessfulDays.textContent = successfulDays;
}

function updateSuccessGoalSetting() {
  successGoal = Number(successGoalInput.value);
  successGoalValue.textContent = successGoal + "%";
  saveData("successGoalV1", successGoal);
  renderApp();
}

function renderSettings() {
  if (successGoalInput && successGoalValue) {
    successGoalInput.value = successGoal;
    successGoalValue.textContent = successGoal + "%";
  }

  applyAppearance(appAppearance);
}

function renderDayScroll() {
  dayScroll.innerHTML = "";

  for (let i = -7; i <= 7; i++) {
    const dayKey = shiftDateKey(selectedDateKey, i);

    const pill = document.createElement("div");
    pill.className = "day-pill";

    if (dayKey === selectedDateKey) {
      pill.classList.add("active");
    }

    const top = document.createElement("div");
    top.className = "day-top";
    top.textContent = formatDayTop(dayKey);

    const bottom = document.createElement("div");
    bottom.className = "day-bottom";
    bottom.textContent = formatDayBottom(dayKey);

    pill.appendChild(top);
    pill.appendChild(bottom);

    pill.addEventListener("click", function () {
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

  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
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

    if (dateKey === selectedDateKey) {
      dayBox.classList.add("selected");
    }

    if (dateKey === getTodayKey()) {
      dayBox.classList.add("today");
    }

    if (dayScore.total > 0 && dayScore.percentage >= successGoal) {
      dayBox.classList.add("success-day");
    }

    const topRow = document.createElement("div");
    topRow.className = "calendar-day-top";

    const number = document.createElement("div");
    number.className = "calendar-date-number";
    number.textContent = day;

    topRow.appendChild(number);

    if (dayScore.total > 0) {
      const scoreBadge = document.createElement("div");
      scoreBadge.className = "calendar-score-badge";
      scoreBadge.textContent = dayScore.percentage + "%";
      topRow.appendChild(scoreBadge);
    }

    dayBox.appendChild(topRow);

    const previewTasks = dayTasks.slice(0, 3);

    previewTasks.forEach(function (task) {
      const taskPreview = document.createElement("div");
      taskPreview.className = "calendar-task-preview";
      taskPreview.textContent = task.text;
      dayBox.appendChild(taskPreview);
    });

    if (dayTasks.length > 3) {
      const more = document.createElement("div");
      more.className = "calendar-more";
      more.textContent = "+" + (dayTasks.length - 3) + " more";
      dayBox.appendChild(more);
    }

    dayBox.addEventListener("click", function () {
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

    if (dayKey === selectedDateKey) {
      dayBox.classList.add("active");
    }

    const name = document.createElement("div");
    name.className = "week-name";
    name.textContent = formatDayTop(dayKey);

    const bar = document.createElement("div");
    bar.className = "week-bar";

    const fill = document.createElement("div");
    fill.className = "week-fill";
    fill.style.height = score.percentage + "%";

    const percent = document.createElement("div");
    percent.className = "week-percent";
    percent.textContent = score.percentage + "%";

    bar.appendChild(fill);

    dayBox.appendChild(name);
    dayBox.appendChild(bar);
    dayBox.appendChild(percent);

    dayBox.addEventListener("click", function () {
      selectedDateKey = dayKey;
      calendarMonthDate = keyToDate(selectedDateKey);
      renderApp();
    });

    weeklySummary.appendChild(dayBox);
  }

  const average = Math.round(totalPercent / 7);
  weeklyAverage.textContent = "Avg: " + average + "%";
}

function renderTasks() {
  const tasks = getTasksForDate(selectedDateKey);
  scheduledTaskList.innerHTML = "";

  ensureCheckedDateExists(selectedDateKey);

  if (tasks.length === 0) {
    scheduledTaskList.innerHTML = '<p class="empty-text">No tasks for this day.</p>';
    return;
  }

  tasks.forEach(function (task) {
    scheduledTaskList.appendChild(createTaskElement(task));
  });
}

function createTaskElement(task) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  if (checkedTasks[selectedDateKey].includes(task.id)) {
    taskItem.classList.add("completed");
  }

  const taskLeft = document.createElement("div");
  taskLeft.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checkedTasks[selectedDateKey].includes(task.id);

  checkbox.addEventListener("change", function () {
    ensureCheckedDateExists(selectedDateKey);

    if (checkbox.checked) {
      if (!checkedTasks[selectedDateKey].includes(task.id)) {
        checkedTasks[selectedDateKey].push(task.id);
      }
    } else {
      checkedTasks[selectedDateKey] = checkedTasks[selectedDateKey].filter(function (id) {
        return id !== task.id;
      });
    }

    saveData("checkedTasksV5", checkedTasks);
    renderApp();
  });

  const textBox = document.createElement("div");

  const taskText = document.createElement("div");
  taskText.className = "task-text";
  taskText.textContent = task.text;

  const taskMeta = document.createElement("div");
  taskMeta.className = "task-meta";
  taskMeta.textContent = getRepeatLabel(task);

  textBox.appendChild(taskText);
  textBox.appendChild(taskMeta);

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(textBox);

  const buttons = document.createElement("div");
  buttons.className = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "✏️";

  editBtn.addEventListener("click", function () {
    startEditTask(task.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "×";

  deleteBtn.addEventListener("click", function () {
    deleteTask(task.id);
  });

  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  taskItem.appendChild(taskLeft);
  taskItem.appendChild(buttons);

  return taskItem;
}

function updateScore() {
  const score = getScoreForDate(selectedDateKey);

  scoreText.textContent = score.percentage + "%";
  completedCount.textContent = score.completed + "/" + score.total;

  if (score.total === 0) {
    messageText.textContent = "Add a task to start tracking your day.";
    return;
  }

  if (score.percentage === 100) {
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

  if (repeatType === "once") {
    taskDateField.classList.remove("hidden");
  }

  if (repeatType === "weekly") {
    weeklyField.classList.remove("hidden");
  }

  if (repeatType === "custom") {
    customDaysField.classList.remove("hidden");
  }
}

function saveTask() {
  const text = taskInput.value.trim();
  const repeatType = taskRepeatSelect.value;

  if (text === "") {
    alert("Please enter a task name.");
    return;
  }

  let taskData = {
    text: text,
    repeatType: repeatType,
    date: "",
    weekday: null,
    customDays: []
  };

  if (repeatType === "once") {
    taskData.date = taskDateInput.value;

    if (!taskData.date) {
      alert("Please choose a date for this one-time task.");
      return;
    }
  }

  if (repeatType === "weekly") {
    taskData.weekday = Number(weeklyDaySelect.value);
  }

  if (repeatType === "custom") {
    const checkedBoxes = customDaysField.querySelectorAll("input[type='checkbox']:checked");

    taskData.customDays = Array.from(checkedBoxes).map(function (box) {
      return Number(box.value);
    });

    if (taskData.customDays.length === 0) {
      alert("Please choose at least one day.");
      return;
    }
  }

  if (editingTaskId) {
    const existingTask = scheduledTasks.find(function (task) {
      return task.id === editingTaskId;
    });

    if (!existingTask) return;

    existingTask.text = taskData.text;
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
  const task = scheduledTasks.find(function (item) {
    return item.id === taskId;
  });

  if (!task) return;

  editingTaskId = taskId;

  taskForm.classList.remove("hidden");
  taskInput.value = task.text;
  taskRepeatSelect.value = task.repeatType;
  taskDateInput.value = task.date || "";
  weeklyDaySelect.value = task.weekday === null ? "0" : String(task.weekday);

  customDaysField.querySelectorAll("input[type='checkbox']").forEach(function (box) {
    box.checked = task.customDays.includes(Number(box.value));
  });

  saveTaskBtn.textContent = "Update Task";
  cancelTaskEditBtn.classList.remove("hidden");

  updateTaskRepeatFields();
}

function clearTaskForm() {
  editingTaskId = null;
  taskInput.value = "";
  taskRepeatSelect.value = "once";
  taskDateInput.value = selectedDateKey;
  weeklyDaySelect.value = "0";

  customDaysField.querySelectorAll("input[type='checkbox']").forEach(function (box) {
    box.checked = false;
  });

  saveTaskBtn.textContent = "Save Task";
  cancelTaskEditBtn.classList.add("hidden");
  updateTaskRepeatFields();
}

function deleteTask(taskId) {
  const confirmDelete = confirm("Delete this task?");
  if (!confirmDelete) return;

  scheduledTasks = scheduledTasks.filter(function (task) {
    return task.id !== taskId;
  });

  goals.forEach(function (goal) {
    if (goal.type === "habit") {
      goal.linkedTaskIds = goal.linkedTaskIds.filter(function (id) {
        return id !== taskId;
      });
    }
  });

  Object.keys(checkedTasks).forEach(function (dateKey) {
    checkedTasks[dateKey] = checkedTasks[dateKey].filter(function (id) {
      return id !== taskId;
    });
  });

  saveData("scheduledTasksV1", scheduledTasks);
  saveData("checkedTasksV5", checkedTasks);
  saveData("goalsV1", goals);

  renderApp();
}

function resetSelectedDay() {
  checkedTasks[selectedDateKey] = [];
  saveData("checkedTasksV5", checkedTasks);
  renderApp();
}

function updateGoalTypeFields() {
  const type = goalTypeSelect.value;

  numberGoalFields.classList.add("hidden");
  milestoneGoalFields.classList.add("hidden");
  habitGoalFields.classList.add("hidden");

  if (type === "number") {
    numberGoalFields.classList.remove("hidden");
  }

  if (type === "milestone") {
    milestoneGoalFields.classList.remove("hidden");
  }

  if (type === "habit") {
    habitGoalFields.classList.remove("hidden");
    renderHabitTaskChoices();
  }
}

function renderHabitTaskChoices(selectedIds) {
  habitTaskChoices.innerHTML = "";

  const repeatingTasks = scheduledTasks.filter(function (task) {
    return task.repeatType !== "once";
  });

  if (repeatingTasks.length === 0) {
    habitTaskChoices.innerHTML = '<p class="empty-text">Add repeating tasks first, then link them to a goal.</p>';
    return;
  }

  repeatingTasks.forEach(function (task) {
    const label = document.createElement("label");
    label.className = "habit-choice";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = task.id;

    if (selectedIds && selectedIds.includes(task.id)) {
      checkbox.checked = true;
    }

    const span = document.createElement("span");
    span.textContent = task.text + " — " + getRepeatLabel(task);

    label.appendChild(checkbox);
    label.appendChild(span);

    habitTaskChoices.appendChild(label);
  });
}

function saveGoal() {
  const name = goalNameInput.value.trim();
  const type = goalTypeSelect.value;
  const deadline = goalDeadlineInput.value;

  if (name === "") {
    alert("Please enter a goal name.");
    return;
  }

  let goalData = {
    name: name,
    type: type,
    deadline: deadline
  };

  if (type === "number") {
    const current = Number(goalCurrentInput.value);
    const target = Number(goalTargetInput.value);

    if (target <= 0) {
      alert("Please enter a target amount greater than 0.");
      return;
    }

    goalData.current = current;
    goalData.target = target;
  }

  if (type === "milestone") {
    const lines = goalMilestonesInput.value
      .split("\n")
      .map(function (line) {
        return line.trim();
      })
      .filter(function (line) {
        return line !== "";
      });

    if (lines.length === 0) {
      alert("Please enter at least one milestone.");
      return;
    }

    goalData.milestones = lines.map(function (line) {
      return {
        id: "milestone-" + Date.now() + "-" + Math.random(),
        text: line,
        completed: false
      };
    });
  }

  if (type === "habit") {
    const checkedBoxes = habitTaskChoices.querySelectorAll("input[type='checkbox']:checked");
    const linkedTaskIds = Array.from(checkedBoxes).map(function (box) {
      return box.value;
    });

    if (linkedTaskIds.length === 0) {
      alert("Please choose at least one repeating task to link.");
      return;
    }

    goalData.linkedTaskIds = linkedTaskIds;
    goalData.windowDays = 30;
  }

  if (editingGoalId) {
    const existingGoal = goals.find(function (goal) {
      return goal.id === editingGoalId;
    });

    if (!existingGoal) return;

    const oldMilestones = existingGoal.milestones || [];

    existingGoal.name = goalData.name;
    existingGoal.type = goalData.type;
    existingGoal.deadline = goalData.deadline;

    if (type === "number") {
      existingGoal.current = goalData.current;
      existingGoal.target = goalData.target;
      delete existingGoal.milestones;
      delete existingGoal.linkedTaskIds;
      delete existingGoal.windowDays;
    }

    if (type === "milestone") {
      existingGoal.milestones = goalData.milestones.map(function (newMilestone) {
        const matchingOld = oldMilestones.find(function (old) {
          return old.text === newMilestone.text;
        });

        if (matchingOld) {
          newMilestone.completed = matchingOld.completed;
        }

        return newMilestone;
      });

      delete existingGoal.current;
      delete existingGoal.target;
      delete existingGoal.linkedTaskIds;
      delete existingGoal.windowDays;
    }

    if (type === "habit") {
      existingGoal.linkedTaskIds = goalData.linkedTaskIds;
      existingGoal.windowDays = 30;
      delete existingGoal.current;
      delete existingGoal.target;
      delete existingGoal.milestones;
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
  const goal = goals.find(function (item) {
    return item.id === goalId;
  });

  if (!goal) return;

  editingGoalId = goalId;

  goalForm.classList.remove("hidden");

  goalNameInput.value = goal.name;
  goalTypeSelect.value = goal.type;
  goalDeadlineInput.value = goal.deadline || "";

  goalCurrentInput.value = goal.current || "";
  goalTargetInput.value = goal.target || "";

  if (goal.type === "milestone") {
    goalMilestonesInput.value = goal.milestones.map(function (milestone) {
      return milestone.text;
    }).join("\n");
  } else {
    goalMilestonesInput.value = "";
  }

  saveGoalBtn.textContent = "Update Goal";
  cancelGoalEditBtn.classList.remove("hidden");

  updateGoalTypeFields();

  if (goal.type === "habit") {
    renderHabitTaskChoices(goal.linkedTaskIds || []);
  }
}

function getGoalProgress(goal) {
  if (goal.type === "number") {
    const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));

    return {
      percentage: percentage,
      text: goal.current + " / " + goal.target
    };
  }

  if (goal.type === "milestone") {
    const total = goal.milestones.length;
    const completed = goal.milestones.filter(function (milestone) {
      return milestone.completed;
    }).length;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      percentage: percentage,
      text: completed + " / " + total + " milestones"
    };
  }

  if (goal.type === "habit") {
    const days = goal.windowDays || 30;
    const linkedTaskIds = goal.linkedTaskIds || [];

    if (linkedTaskIds.length === 0) {
      return {
        percentage: 0,
        text: "No linked tasks"
      };
    }

    let possible = 0;
    let completed = 0;

    for (let i = 0; i < days; i++) {
      const dayKey = shiftDateKey(getTodayKey(), -i);
      ensureCheckedDateExists(dayKey);

      linkedTaskIds.forEach(function (taskId) {
        const linkedTask = scheduledTasks.find(function (task) {
          return task.id === taskId;
        });

        if (linkedTask && shouldTaskShowOnDate(linkedTask, dayKey)) {
          possible++;

          if (checkedTasks[dayKey].includes(taskId)) {
            completed++;
          }
        }
      });
    }

    const percentage = possible === 0 ? 0 : Math.round((completed / possible) * 100);

    return {
      percentage: percentage,
      text: completed + " / " + possible + " linked habits in last " + days + " days"
    };
  }

  return {
    percentage: 0,
    text: ""
  };
}

function renderGoals() {
  goalsList.innerHTML = "";

  if (goals.length === 0) {
    goalsList.innerHTML = '<p class="empty-text">No long-term goals yet. Add one to start tracking bigger progress.</p>';
    return;
  }

  goals.forEach(function (goal) {
    const progress = getGoalProgress(goal);

    const card = document.createElement("div");
    card.className = "goal-card";

    const top = document.createElement("div");
    top.className = "goal-top";

    const titleBox = document.createElement("div");

    const title = document.createElement("p");
    title.className = "goal-title";
    title.textContent = goal.name;

    const meta = document.createElement("p");
    meta.className = "goal-meta";
    meta.textContent = getGoalTypeLabel(goal.type) + " • " + formatDeadline(goal.deadline);

    titleBox.appendChild(title);
    titleBox.appendChild(meta);

    top.appendChild(titleBox);

    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = progress.percentage + "%";

    bar.appendChild(fill);

    const progressText = document.createElement("p");
    progressText.className = "goal-progress-text";
    progressText.textContent = progress.percentage + "% — " + progress.text;

    card.appendChild(top);
    card.appendChild(bar);
    card.appendChild(progressText);

    if (goal.type === "milestone") {
      const milestoneList = document.createElement("div");
      milestoneList.className = "milestone-list";

      goal.milestones.forEach(function (milestone) {
        const item = document.createElement("label");
        item.className = "milestone-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = milestone.completed;

        checkbox.addEventListener("change", function () {
          milestone.completed = checkbox.checked;
          saveData("goalsV1", goals);
          renderApp();
        });

        const span = document.createElement("span");
        span.textContent = milestone.text;

        item.appendChild(checkbox);
        item.appendChild(span);

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

      updateBtn.addEventListener("click", function () {
        updateNumberGoal(goal.id);
      });

      actions.appendChild(updateBtn);
    }

    const editBtn = document.createElement("button");
    editBtn.className = "goal-edit-btn";
    editBtn.textContent = "✏️ Edit";

    editBtn.addEventListener("click", function () {
      startEditGoal(goal.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "goal-delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      deleteGoal(goal.id);
    });

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
  const goal = goals.find(function (item) {
    return item.id === goalId;
  });

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
  const confirmDelete = confirm("Delete this goal?");

  if (!confirmDelete) return;

  goals = goals.filter(function (goal) {
    return goal.id !== goalId;
  });

  saveData("goalsV1", goals);
  renderApp();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(function (error) {
      console.log("Service worker registration failed:", error);
    });
  }
}

function renderApp() {
  currentDateText.textContent = formatFullDate(selectedDateKey);
  miniDay.textContent = selectedDateKey === getTodayKey() ? "Today" : formatDayBottom(selectedDateKey);

  renderDayScroll();
  renderCalendar();
  renderWeeklySummary();
  renderTasks();
  updateScore();
  renderGoals();
  renderStreaks();
  renderMonthlySummary();
  showScreen(currentScreen);
}

todayNavBtn.addEventListener("click", function () {
  showScreen("today");
});

calendarNavBtn.addEventListener("click", function () {
  showScreen("calendar");
});

goalsNavBtn.addEventListener("click", function () {
  showScreen("goals");
});

settingsNavBtn.addEventListener("click", function () {
  showScreen("settings");
});

openCalendarBtn.addEventListener("click", function () {
  showScreen("calendar");
});

calendarTodayBtn.addEventListener("click", function () {
  selectedDateKey = getTodayKey();
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

themeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    applyTheme(button.dataset.theme);
  });
});

if (successGoalInput) {
  successGoalInput.addEventListener("input", updateSuccessGoalSetting);
}

appearanceButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    applyAppearance(button.dataset.appearance);
  });
});

prevDayBtn.addEventListener("click", function () {
  selectedDateKey = shiftDateKey(selectedDateKey, -1);
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

nextDayBtn.addEventListener("click", function () {
  selectedDateKey = shiftDateKey(selectedDateKey, 1);
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

todayBtn.addEventListener("click", function () {
  selectedDateKey = getTodayKey();
  calendarMonthDate = keyToDate(selectedDateKey);
  renderApp();
});

prevMonthBtn.addEventListener("click", function () {
  calendarMonthDate.setMonth(calendarMonthDate.getMonth() - 1);
  renderApp();
});

nextMonthBtn.addEventListener("click", function () {
  calendarMonthDate.setMonth(calendarMonthDate.getMonth() + 1);
  renderApp();
});

toggleTaskFormBtn.addEventListener("click", function () {
  taskForm.classList.toggle("hidden");
  taskDateInput.value = selectedDateKey;
});

taskRepeatSelect.addEventListener("change", updateTaskRepeatFields);
saveTaskBtn.addEventListener("click", saveTask);

cancelTaskEditBtn.addEventListener("click", function () {
  clearTaskForm();
});

resetBtn.addEventListener("click", resetSelectedDay);

toggleGoalFormBtn.addEventListener("click", function () {
  goalForm.classList.toggle("hidden");
  renderHabitTaskChoices();
});

goalTypeSelect.addEventListener("change", updateGoalTypeFields);
saveGoalBtn.addEventListener("click", saveGoal);

cancelGoalEditBtn.addEventListener("click", function () {
  clearGoalForm();
});

clearTaskForm();
updateGoalTypeFields();
applyTheme(appTheme);
renderSettings();
registerServiceWorker();
renderApp();