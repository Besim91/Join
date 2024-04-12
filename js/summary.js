/**
 * Initiates the application by calling various asynchronous functions to load data and HTML content,
 * then displays greeting, user name, and user profile information. Finally, updates various summary count values
 * on the interface.
 */
async function loading() {
  await init();
  await includeHTML();
  displayUserName();
  displayUserProfile();
  if (!window.location.href.includes("help.html")) {
    displayGreeting();
    updateSummaryCountValues();
  }
  summaryFocused();
}

/**
 * Adds the 'sideMenuInFocus' class to the summary side menu, indicating that it is currently in focus.
 */
function summaryFocused() {
  document.getElementById("summarySidemenu").classList.add("sideMenuInFocus");
}

/**
 * Updates summary count values related to tasks by calling various functions that add specific values
 * like urgent tasks, upcoming dates, tasks in board, etc., to the UI.
 */
function updateSummaryCountValues() {
  addUrgendValue();
  addUpcomingDateValue();
  addTaskInBoardValue();
  addTasksToDoValue();
  addTasksInProgressValue();
  addAwaitingFeedbackValue();
  addDoneCounterValue();
}

/**
 * Displays the current user's name by retrieving it and setting it as the text content of the specified
 * HTML element.
 */
function displayUserName() {
  let userNameElement = document.getElementById("user-name");
  if (userNameElement) {
    userNameElement.textContent = `${getName()}`;
  }
}

/**
 * Retrieves the current user's name based on their email. If the user is identified as a guest, an empty
 * string is returned instead of a name.
 *
 * @returns {string} The name of the current user or an empty string if the user is a guest.
 */
function getName() {
  if (currentUserMail && currentUserMail[0] === "Gast") {
    return "";
  } else {
    let index = users.findIndex((user) => user.email === currentUserMail[0]);
    let name = users[index].name;
    return name;
  }
}

/**
 * Displays the user's profile initials in the UI. If the user's name is empty, defaults to "G".
 */
function displayUserProfile() {
  let userInitialElement = document.getElementById("userInitial");
  userInitialElement.innerHTML = "";
  let name = getName();
  let initials = "";
  if (name === "") {
    initials = "G";
  } else {
    let nameParts = name.split(" ");
    nameParts.forEach((part) => {
      if (part.length > 0) {
        initials += part[0];
      }
    });
  }
  userInitialElement.innerHTML = `${initials.toUpperCase()}`;
}

/**
 * Generates a greeting based on the current time and user status (guest or not).
 *
 * @returns {string} A greeting message that varies based on the time of day and whether the user is a guest.
 */
function getGreeting() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  if (currentUserMail && currentUserMail[0] === "Gast") {
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else if (currentHour >= 18 && currentHour < 24) {
      return "Good evening";
    } else {
      return "Good night";
    }
  } else {
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning,";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon,";
    } else if (currentHour >= 18 && currentHour < 24) {
      return "Good evening,";
    } else {
      return "Good night,";
    }
  }
}

/**
 * Attempts to save a given username in remote storage and logs the result to the console.
 *
 * @param {string} userName - The username to be saved in remote storage.
 */
async function save(userName) {
  try {
    await setItem("name", userName);
    console.log("Benutzername erfolgreich im Remote-Speicher gespeichert.");
  } catch (error) {
    console.error(
      "Fehler beim Speichern des Benutzernamens im Remote-Speicher:",
      error
    );
  }
}

/**
 * Displays a greeting to the user in the UI, with styling differences based on whether the user is a guest.
 */
function displayGreeting() {
  const greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    const greeting = getGreeting();
    if (currentUserMail && currentUserMail[0] === "Gast") {
      greetingElement.style.fontSize = "64px";
      greetingElement.style.fontWeight = "700";
    } else {
      greetingElement.style.fontSize = "48px";
      greetingElement.style.fontWeight = "400";
    }
    greetingElement.textContent = greeting;
  } else {
    console.error("Das Begrüßungselement wurde nicht gefunden.");
  }
}

/**
 * Logs out the current user by clearing their user key and reinitializing the application.
 */
async function logOut() {
  currentUserKey = [];
  await setItem("currentUserKey", JSON.stringify(currentUserKey));
  init();
}

/**
 * Toggles the visibility of the menu bar in the UI by adding or removing a 'show' class.
 */
function toggleMenuBar() {
  let menuBar = document.getElementById("menuBar");
  menuBar.classList.toggle("show");
}

// The following functions update various task-related counters in the UI by fetching data
// from a presumed global `mainUserInfos` array and displaying it in designated elements:

function addTaskInBoardValue() {
  let wholeTaksValue = document.getElementById("taskInBoardCounter");
  wholeTaksValue.innerHTML = `${mainUserInfos[0].tasks.length}`;
}

function addTasksToDoValue() {
  let addedToDo = mainUserInfos[0]["tasks"].filter(
    (t) => t["box"] == "toDoTasks"
  );
  let wholeToDos = document.getElementById("tasksToDoCounter");
  wholeToDos.innerHTML = `${addedToDo.length}`;
}

function addTasksInProgressValue() {
  let addedInProgress = mainUserInfos[0]["tasks"].filter(
    (t) => t["box"] == "inProgressTasks"
  );
  let wholeToDos = document.getElementById("taskInProgressCounter");
  wholeToDos.innerHTML = `${addedInProgress.length}`;
}

function addAwaitingFeedbackValue() {
  let addedAwaitFeedback = mainUserInfos[0]["tasks"].filter(
    (t) => t["box"] == "awaitFeedbackTasks"
  );
  let wholeToDos = document.getElementById("awaitingFeedbackCounter");
  wholeToDos.innerHTML = `${addedAwaitFeedback.length}`;
}
function addDoneCounterValue() {
  let addedDone = mainUserInfos[0]["tasks"].filter(
    (t) => t["box"] == "doneTasks"
  );
  let wholeToDos = document.getElementById("doneCounter");
  wholeToDos.innerHTML = `${addedDone.length}`;
}

function addUrgendValue() {
  let addedPrio = mainUserInfos[0]["tasks"].filter(
    (t) => t["priority"] == "urgent"
  );
  let wholeToDos = document.getElementById("urgendCounter");
  wholeToDos.innerHTML = `${addedPrio.length}`;
}

function addUpcomingDateValue() {
  let urgentTasks = mainUserInfos[0]["tasks"].filter(
    (task) => task["priority"] === "urgent"
  );
  if (urgentTasks.length === 0) {
    document.getElementById("upcomingDateCounter").textContent =
      "No urgent date";
    return;
  }
  let dueDates = urgentTasks.map((task) => new Date(task["dueDate"]));
  let minDate = new Date(Math.min(...dueDates));
  let upcomingDateCounter = document.getElementById("upcomingDateCounter");
  upcomingDateCounter.innerHTML = minDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
