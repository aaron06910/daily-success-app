const currentDateText = document.getElementById("currentDate");
const miniDay = document.getElementById("miniDay");

const prevDayBtn = document.getElementById("prevDayBtn");
const todayBtn = document.getElementById("todayBtn");
const nextDayBtn = document.getElementById("nextDayBtn");
const dayScroll = document.getElementById("dayScroll");

const taskInput = document.getElementById("taskInput");
const addDailyTaskBtn = document.getElementById("addDailyTaskBtn");
const addOneDayTaskBtn = document.getElementById("addOneDayTaskBtn");

const dailyTaskList = document.getElementById("dailyTaskList");
const oneDayTaskList = document.getElementById("oneDayTaskList");

const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");
const completedCount = document.getElementById("completedCount");

const weeklySummary = document.getElementById("weeklySummary");
const weeklyAverage = document.getElementById("weeklyAverage");

const resetBtn = document.getElementById("resetBtn");

let selectedDateKey = getTodayKey();

let dailyTasks = safeLoad("dailyTasksV3", [
  { id: "d1", text: "Work out" },
  { id: "d2", text: "Drink enough water" },
  { id: "d3", text: "Eat enough protein" }
]);

let oneDayTasks = safeLoad("oneDayTasksV3", {});
let checkedTasks = safeLoad("checkedTasksV3", {});

function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.log("Storage load error:", key, error);
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

function ensureCheckedDateExists(dateKey) {
  if (!checkedTasks[dateKey]) {
    checkedTasks[dateKey] = [];
  }
}

function getTasksForDate(dateKey) {
  const oneDay = oneDayTasks[dateKey] || [];
  return {
    daily: dailyTasks,
    oneDay: oneDay,
    all: dailyTasks.concat(oneDay)
  };
}

function getScoreForDate(dateKey) {
  ensureCheckedDateExists(dateKey);

  const tasks = getTasksForDate(dateKey).all;
  const total = tasks.length;

  if (total === 0) {
    return {
      total: 0,
      completed: 0,
      percentage: 0
    };
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
      renderApp();
    });

    dayScroll.appendChild(pill);
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
      renderApp();
    });

    weeklySummary.appendChild(dayBox);
  }

  const average = Math.round(totalPercent / 7);
  weeklyAverage.textContent = "Avg: " + average + "%";
}

function createTaskElement(task, type) {
  ensureCheckedDateExists(selectedDateKey);

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

    saveData("checkedTasksV3", checkedTasks);
    renderApp();
  });

  const taskText = document.createElement("div");
  taskText.className = "task-text";
  taskText.textContent = task.text;

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(taskText);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "×";

  deleteBtn.addEventListener("click", function () {
    deleteTask(task.id, type);
  });

  taskItem.appendChild(taskLeft);
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

function renderTasks() {
  const tasks = getTasksForDate(selectedDateKey);

  dailyTaskList.innerHTML = "";
  oneDayTaskList.innerHTML = "";

  if (tasks.daily.length === 0) {
    dailyTaskList.innerHTML = '<p class="empty-text">No daily tasks yet.</p>';
  } else {
    tasks.daily.forEach(function (task) {
      dailyTaskList.appendChild(createTaskElement(task, "daily"));
    });
  }

  if (tasks.oneDay.length === 0) {
    oneDayTaskList.innerHTML = '<p class="empty-text">No one-day tasks for this day.</p>';
  } else {
    tasks.oneDay.forEach(function (task) {
      oneDayTaskList.appendChild(createTaskElement(task, "oneDay"));
    });
  }
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
  } else if (score.percentage >= 75) {
    messageText.textContent = "Great day!";
  } else if (score.percentage >= 50) {
    messageText.textContent = "Good progress. Keep going.";
  } else if (score.percentage > 0) {
    messageText.textContent = "You’re making progress.";
  } else {
    messageText.textContent = "Start checking things off.";
  }
}

function addDailyTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  dailyTasks.push({
    id: "daily-" + Date.now(),
    text: text
  });

  saveData("dailyTasksV3", dailyTasks);

  taskInput.value = "";
  renderApp();
}

function addOneDayTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  if (!oneDayTasks[selectedDateKey]) {
    oneDayTasks[selectedDateKey] = [];
  }

  oneDayTasks[selectedDateKey].push({
    id: "oneday-" + Date.now(),
    text: text
  });

  saveData("oneDayTasksV3", oneDayTasks);

  taskInput.value = "";
  renderApp();
}

function deleteTask(taskId, type) {
  if (type === "daily") {
    dailyTasks = dailyTasks.filter(function (task) {
      return task.id !== taskId;
    });

    saveData("dailyTasksV3", dailyTasks);
  }

  if (type === "oneDay") {
    const list = oneDayTasks[selectedDateKey] || [];

    oneDayTasks[selectedDateKey] = list.filter(function (task) {
      return task.id !== taskId;
    });

    saveData("oneDayTasksV3", oneDayTasks);
  }

  ensureCheckedDateExists(selectedDateKey);

  checkedTasks[selectedDateKey] = checkedTasks[selectedDateKey].filter(function (id) {
    return id !== taskId;
  });

  saveData("checkedTasksV3", checkedTasks);

  renderApp();
}

function resetSelectedDay() {
  checkedTasks[selectedDateKey] = [];
  saveData("checkedTasksV3", checkedTasks);
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
  renderWeeklySummary();
  renderTasks();
  updateScore();
}

prevDayBtn.addEventListener("click", function () {
  selectedDateKey = shiftDateKey(selectedDateKey, -1);
  renderApp();
});

nextDayBtn.addEventListener("click", function () {
  selectedDateKey = shiftDateKey(selectedDateKey, 1);
  renderApp();
});

todayBtn.addEventListener("click", function () {
  selectedDateKey = getTodayKey();
  renderApp();
});

addDailyTaskBtn.addEventListener("click", addDailyTask);
addOneDayTaskBtn.addEventListener("click", addOneDayTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addOneDayTask();
  }
});

resetBtn.addEventListener("click", resetSelectedDay);

registerServiceWorker();
renderApp();