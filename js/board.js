let currentDraggedElement;
let letterArray = [];
let currentPriority;
let initialColorMap = {};
let randomColorCollection = {};
let statusMembers = [];
let addMembers = [];
let addSubtasks = [];
let categorySet = ["Technical Task", "User Story"];
var activePriority = null;
let selectedCategoryInput;
let currentBox;
let elementColors = {};

/**
 * Adds an event listener to the document that triggers when the DOM content is fully loaded.
 * Calls the 'updateHTML' function when the event is fired.
 *
 * @param {string} type - The event type to listen for ('DOMContentLoaded').
 * @param {function} listener - The callback function to execute when the event is triggered.
 * @param {boolean|object} [options] - Optional parameters specifying characteristics of the event listener.
 * @returns {undefined}
 */
document.addEventListener("DOMContentLoaded", function () {
  updateHTML();
});

/**
 * Renders various elements on the page, including the add task floating mask,
 * contacts on the task flotaing mask, and updates the HTML content.
 *
 * @returns {void}
 */
function render() {
  renderAddTaskFloating();
  renderContactsOnBoard();
  updateHTML();
}

/**
 * Renders a message indicating that there are no tasks in each task box if no tasks are found.
 *
 * @returns {void}
 */
function renderNoTasks() {
  var taskBoxes = [
    "toDoTasks",
    "inProgressTasks",
    "awaitFeedbackTasks",
    "doneTasks",
  ];
  var taskBoxLabels = ["To Do", "In Progress", "Awaiting Feedback", "Done"];
  for (var i = 0; i < taskBoxes.length; i++) {
    var foundTasks = false;
    for (var j = 0; j < mainUserInfos[0]["tasks"].length; j++) {
      if (mainUserInfos[0]["tasks"][j]["box"].includes(taskBoxes[i])) {
        foundTasks = true;
        break;
      }
    }
    if (!foundTasks) {
      document.getElementById(taskBoxes[i]).innerHTML = `
                <div class="noTasks">No tasks ${taskBoxLabels[i]}</div>`;
    }
  }
}

/**
 * Updates the HTML content of the page by performing various tasks, including:
 * - Resetting the addMembers and statusMembers arrays.
 * - Reordering task IDs.
 * - Swapping tasks between different task boxes.
 * - Rendering messages for task boxes with no tasks.
 * - Filling tasks on the board.
 * - Updating task progress.
 * - Transforming priority values into corresponding images.
 *
 * @returns {void}
 */
function updateHTML() {
  addMembers = [];
  statusMembers = [];
  addSubtasks = [];
  newOrderIds();
  swapToDo();
  swapInProgress();
  swapAwaitFeedback();
  swapDone();
  renderNoTasks();
  for (let i = 0; i < mainUserInfos[0]["tasks"].length; i++) {
    fillTasksOnBoard(i);
    progress(i);
    transformPriorityToImg(i);
  }
  assignRandomBackgroundColor();
}

/**
 * Displays an alert by adding a CSS class to show it, animates the alert,
 * and then removes the CSS class to hide it after a certain duration.
 *
 * @returns {void}
 */
function showAlert() {
  var customAlert = document.getElementById("addedTask");
  customAlert.classList.add("show"); // Fügt die CSS-Klasse hinzu, um den Alert anzuzeigen
  setTimeout(function () {
    customAlert.style.animation = "flyOutToLeft 1s forwards"; // Startet die Animation
    setTimeout(function () {
      customAlert.classList.remove("show"); // Entfernt die CSS-Klasse, um den Alert auszublenden
      customAlert.style.animation = ""; // Setzt die Animation zurück
    }, 1000); // Wartet 1 Sekunde, bevor der Alert ausgeblendet wird
  }, 3000); // Wartet 3 Sekunden, bevor die Animation beginnt
}

/**
 * Adds profile initials for members who are assigned to the task at index 'i'
 * to the corresponding task board element, if their status is true.
 *
 * @param {number} i - The index of the task to add members' profiles.
 * @returns {void}
 */
function addMembersValueFunction(i) {
  let members = mainUserInfos[0]["tasks"][i]["members"];
  let status = mainUserInfos[0]["tasks"][i]["status"];
  for (let j = 0; j < members.length; j++) {
    if (status[j] === true && typeof members[j] === "string") {
      let memberFirstLetter = members[j]
        .split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("");
      document.getElementById(`profilsOnBoard${i}`).innerHTML += `
          <div class="profileOnBoard" id="selectedProfilOnBoard${j}">${memberFirstLetter}</div>
      `;
    }
  }

}

/**
 * Searches for tasks on the board based on the value entered in the search input field.
 * Updates the display of tasks to show or hide them based on the search criteria.
 *
 * @returns {void}
 */
function searchTask() {
  let searchInput = document
    .getElementById("searchTasksInput")
    .value.toLowerCase();
  let tasks = document.querySelectorAll(".tasksOnBoard");
  tasks.forEach((task) => {
    let title = task.querySelector(".titleOnBoard").textContent.toLowerCase();
    let description = task
      .querySelector(".descriptionOnBoard")
      .textContent.toLowerCase();
    if (title.includes(searchInput) || description.includes(searchInput)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

/**
 * Fills task details on the board for the task at index 'i' by calling
 * various functions to add title, description, category, and members' profiles.
 *
 * @param {number} i - The index of the task to fill details on the board.
 * @returns {void}
 */
function fillTasksOnBoard(i) {
  addTitleValue(i);
  addDescriptionValue(i);
  addCategoryValue(i);
  addMembersValueFunction(i);
}

/**
 * Adds the title value of the task at index 'i' to the corresponding task board element.
 *
 * @param {number} i - The index of the task to add the title value.
 * @returns {void}
 */
function addTitleValue(i) {
  document.getElementById(`titleOnBoard${i}`).innerHTML = ``;
  let addTitleValue = mainUserInfos[0]["tasks"][i]["title"];
  document.getElementById(`titleOnBoard${i}`).innerHTML = `${addTitleValue}`;
}

/**
 * Adds the description value of the task at index 'i' to the corresponding task board element.
 *
 * @param {number} i - The index of the task to add the description value.
 * @returns {void}
 */
function addDescriptionValue(i) {
  document.getElementById(`descriptionOnBoard${i}`).innerHTML = "";
  let addDescriptionValue = mainUserInfos[0]["tasks"][i]["description"];
  document.getElementById(
    `descriptionOnBoard${i}`
  ).innerHTML = `${addDescriptionValue}`;
}

/**
 * Adds the category value of the task at index 'i' to the corresponding task board element.
 *
 * @param {number} i - The index of the task to add the category value.
 * @returns {void}
 */
function addCategoryValue(i) {
  document.getElementById(`categoryOnBoard${i}`).innerHTML = ``;
  let addCategoryValue = mainUserInfos[0]["tasks"][i]["category"];
  document.getElementById(`categoryOnBoard${i}`).innerHTML = `
        <button id="technicalAndUserBtn${i}">${addCategoryValue}</button>
    `;
  if (addCategoryValue == "User Story") {
    document
      .getElementById(`technicalAndUserBtn${i}`)
      .classList.add("userStoryBtn");
  } else {
    document
      .getElementById(`technicalAndUserBtn${i}`)
      .classList.add("technicalTaskBtn");
  }
}

/**
 * Adds the subtask values of the task at index 'i' to the corresponding task board element.
 *
 * @param {number} i - The index of the task to add the subtask values.
 * @returns {void}
 */
function addSubTaskValue(i) {
  for (let j = 0; j < mainUserInfos[0]["tasks"][i]["subtasks"].length; j++) {
    let addSubTaskValue = mainUserInfos[0]["tasks"][i]["subtasks"][j];
    document.getElementById(`checkBoxContainer`).innerHTML += `
        <li>${addSubTaskValue}</li>
    `;
  }
}

/**
 * Sets the current priority value and displays corresponding icons based on the selected priority.
 *
 * @param {string} priority - The priority value to be set.
 * @returns {void}
 */
function addPriorityValue(priority) {
  currentPriority = priority;
  console.log("Selected priority:", currentPriority);
  showIconsPrio(priority);
}

/**
 * Shows icons for different priorities based on the provided priority value.
 *
 * @param {string} priority - The priority value for which icons should be displayed.
 * @returns {void}
 */
function showIconsPrio(priority) {
  ["low", "medium", "urgent"].forEach((prio) => {
    if (prio === priority) {
      document.getElementById(`${prio}IconGray`).classList.remove("dNone");
      document.getElementById(`${prio}IconColor`).classList.add("dNone");
    } else {
      document.getElementById(`${prio}IconGray`).classList.add("dNone");
      document.getElementById(`${prio}IconColor`).classList.remove("dNone");
    }
  });
}

/**
 * Resets the background colors of all priority buttons.
 *
 * @returns {void}
 */
function resetBackgroundColors() {
  const buttons = document.querySelectorAll(".priorityBox > div");
  buttons.forEach((button) => {
    button.classList.remove("activePrioLow");
    button.classList.remove("activePrioMedium");
    button.classList.remove("activePrioUrgent");
  });
}

/**
 * Renders contacts on the board by updating the HTML content to display the contact container.
 *
 * @returns {void}
 */
function renderContactsOnBoard() {
  document.getElementById("listContactContainerBoard").innerHTML = ``;
  let contactBoard = document.getElementById("listContactContainerBoard");
  if (contactBoard.classList.contains("dNone")) {
    contactBoard.classList.remove("dNone");
    contactBoard.classList.add("dFlex");
  } else {
    contactBoard.classList.add("dNone");
    contactBoard.classList.remove("dFlex");
  }
  addContactToBoardAndFill();
}

/**
 * Adds contacts to the list of members and initializes their status as false.
 *
 * @returns {void}
 */
function addStatusToMembers() {
  addMembers = [];
  statusMembers = [];
  let contacts = mainUserInfos[0]["contactBook"];
  for (let i = 0; i < contacts.length; i++) {
    let addContact = contacts[i]["name"];
    addMembers.push(addContact);
    statusMembers.push(false);
  }
}

/**
 * Assigns a random dark background color to elements with specific IDs representing profiles.
 *
 * @returns {void}
 */
function assignRandomBackgroundColor() {
  const elementsWithProfilMember = document.querySelectorAll('[id^="profilMember"]');

  elementsWithProfilMember.forEach((element) => {
    if (!elementColors[element.id]) {
      let randomColor = generateUniqueRandomColor();
      element.style.backgroundColor = randomColor;
      elementColors[element.id] = randomColor;
    } else {
      element.style.backgroundColor = elementColors[element.id];
    }
  });
  continueAssignRandomBackgroundColor();
}

/**
 * Setzt die Hintergrundfarben für Elemente mit ausgewähltem Profil auf dem Board fort.
 * Wenn für ein Element noch keine Farbe zugewiesen wurde, wird eine eindeutige zufällige dunkle Farbe generiert
 * und zugewiesen. Andernfalls wird die zuvor zugewiesene Farbe beibehalten.
 */
  function continueAssignRandomBackgroundColor() {
  const elementsWithSelectedProfilOnBoard = document.querySelectorAll('[id*="selectedProfilOnBoard"]');
  elementsWithSelectedProfilOnBoard.forEach((element) => {
    if (!elementColors[element.id]) {
      let randomColor = generateUniqueRandomColor();
      element.style.backgroundColor = randomColor;
      elementColors[element.id] = randomColor;
    } else {
      element.style.backgroundColor = elementColors[element.id];
    }
  });
}

/**
 * Generiert eine eindeutige zufällige dunkle Farbe, die nicht bereits in der Liste der
 * Elementfarben vorhanden ist.
 * @returns {string} Eine eindeutige zufällige dunkle Farbe.
 */
function generateUniqueRandomColor() {
  let randomColor;
  do {
    randomColor = generateDarkColor();
  } while (Object.values(elementColors).includes(randomColor)); 
  return randomColor;
}

/**
 * Generates a random dark color.
 * @returns {string} A random dark color in HSL format.
 */
function generateDarkColor() {
  return `hsl(${Math.random() * 360}, 100%, ${Math.random() * 30 + 20}%)`;
}

/**
 * Updates the progress bar for the specified task index based on completed subtasks.
 * @param {number} i - The index of the task to update progress for.
 * @returns {void}
 */
// Funktion, um den Fortschritt anzuzeigen
function progress(i) {
  if (
    Array.isArray(mainUserInfos[0].tasks[i].done) &&
    mainUserInfos[0].tasks[i].done.length > 0
  ) {
    let progress = mainUserInfos[0].tasks[i].done.filter(
      (item) => item === true
    ).length;
    let goal = mainUserInfos[0].tasks[i].subtasks.length;
    let progressElement = document.getElementById(`progress${i}`);
    if (progressElement) {
      progressElement.style.width = (progress / goal) * 100 + "%";
    }
  }
}