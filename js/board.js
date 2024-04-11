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
 * Asynchronous function called when the document is fully loaded.
 * Initializes the application, includes HTML files, displays user profile,
 * renders content, sets today's date, and sets the current box to 'toDoTasks'.
 * 
 * @returns {Promise<void>} A promise that resolves when all tasks are completed.
 */
async function onload() {
  await init();
  //   await delteCurrentArray(); //Nur zum löschen des taskservers nutzen
  //   await init(); //Nur zum löschen des taskservers nutzen
  await includeHTML();
  displayUserProfile();
  render();
  setTodayDate();
  currentBox = 'toDoTasks';
  boardFocused();
}

/**
 * Adds the 'sideMenuInFocus' class to the board side menu element.
 * 
 * @returns {void}
 */
function boardFocused() {
  document.getElementById('boardSidemenu').classList.add('sideMenuInFocus');
}

// async function delteCurrentArray() {
//   mainUserInfos[0]["tasks"] = [];
//   await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
// }


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
 * Toggles the visibility of a card by adding or removing a CSS class.
 * Additionally, it adds standard status to members and controls the display of the contact board.
 * 
 * @returns {void}
 */
function toggleCard() {
  addStatusToMembers();
  let card = document.getElementById("addTaskFloating");
  if (card) {
    card.classList.toggle("activeAddTask");
  }
  let contactBoard = document.getElementById("listContactContainerBoard");
  if (contactBoard.classList.contains("dFlex")) {
    contactBoard.classList.remove("dFlex");
    contactBoard.classList.add("dNone");
  }
}


/**
 * Toggles the visibility of the card back to its original state if it's currently active.
 * Removes the "activeAddTask" class from the card, reverting it to its inactive state.
 * 
 * @function toggleCardBack
 * @returns {void}
 */
function toggleCardBack() {
  addStatusToMembers();
  let card = document.getElementById("addTaskFloating");
  if (card && card.classList.contains("activeAddTask")) {
    card.classList.toggle("activeAddTask");
  }
}


/**
 * Toggles the visibility of a card on the board by adding or removing a CSS class.
 * 
 * @param {number} i - The index of the card to toggle.
 * @returns {void}
 */
function toggleCardFromBoard() {
  let card = document.getElementById(`tasksOverBoardContainer${i}`);
  card.classList.toggle("active");
}


/**
 * Renders a message indicating that there are no tasks in each task box if no tasks are found.
 * 
 * @returns {void}
 */
function renderNoTasks() {
  var taskBoxes = ['toDoTasks', 'inProgressTasks', 'awaitFeedbackTasks', 'doneTasks'];
  var taskBoxLabels = ['To Do', 'In Progress', 'Awaiting Feedback', 'Done'];
  for (var i = 0; i < taskBoxes.length; i++) {
    var foundTasks = false;
    for (var j = 0; j < mainUserInfos[0]['tasks'].length; j++) {
      if (mainUserInfos[0]['tasks'][j]['box'].includes(taskBoxes[i])) {
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
}





/**
 * Displays an alert by adding a CSS class to show it, animates the alert,
 * and then removes the CSS class to hide it after a certain duration.
 * 
 * @returns {void}
 */
function showAlert() {
  var customAlert = document.getElementById('addedTask');
  customAlert.classList.add('show'); // Fügt die CSS-Klasse hinzu, um den Alert anzuzeigen
  setTimeout(function () {
    customAlert.style.animation = 'flyOutToLeft 1s forwards'; // Startet die Animation
    setTimeout(function () {
      customAlert.classList.remove('show'); // Entfernt die CSS-Klasse, um den Alert auszublenden
      customAlert.style.animation = ''; // Setzt die Animation zurück
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
    if (status[j] === true && typeof members[j] === 'string') {
      let memberFirstLetter = members[j]
        .split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("");
      document.getElementById(`profilsOnBoard${i}`).innerHTML += `
          <div class="profileOnBoard" id="selectedProfilOnBoard${i}">${memberFirstLetter}</div>
      `;
    }
  }
  assignRandomBackgroundColor();
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
*
* Displays icons for different priorities based on the provided priority value.
* @param {string} priority - The priority value for which icons should be displayed.
* @returns {void}
*/
function showIconsPrio(priority) {
  ['low', 'medium', 'urgent'].forEach(prio => {
    if (prio === priority) {
      document.getElementById(`${prio}IconGray`).classList.remove('dNone');
      document.getElementById(`${prio}IconColor`).classList.add('dNone');
    } else {
      document.getElementById(`${prio}IconGray`).classList.add('dNone');
      document.getElementById(`${prio}IconColor`).classList.remove('dNone');
    }
  });
}


/**
 * Shows icons for different priorities based on the provided priority value.
 * 
 * @param {string} priority - The priority value for which icons should be displayed.
 * @returns {void}
 */
function showIconsPrio(priority) {
  ['low', 'medium', 'urgent'].forEach(prio => {
    if (prio === priority) {
      document.getElementById(`${prio}IconGray`).classList.remove('dNone');
      document.getElementById(`${prio}IconColor`).classList.add('dNone');
    } else {
      document.getElementById(`${prio}IconGray`).classList.add('dNone');
      document.getElementById(`${prio}IconColor`).classList.remove('dNone');
    }
  });
}


/**
 * Adds a click event listener to each element with the class 'priorityBox div'.
 * When clicked, it resets background colors, toggles the background color of the clicked element, 
 * retrieves the priority value, and calls the 'addPriorityValue' function.
 * 
 * @returns {void}
 */
document.querySelectorAll(".priorityBox div").forEach((button) => {
  button.addEventListener("click", function () {
    resetBackgroundColors();
    toggleBackgroundColor(this, prio);
    const priority = this.textContent.trim().toLowerCase();
    addPriorityValue(priority);
  });
});


/**
 * Toggles the active state of a priority button.
 * 
 * @param {number} priority - The priority value to toggle.
 * @returns {void}
 */
function togglePriority(priority) {
  if (activePriority === priority) {
    activePriority = null;
  } else {
    if (activePriority !== null) {
      document
        .getElementsByTagName("button")
      [activePriority - 1].classList.remove("active");
    }
    activePriority = priority;
  }
}


/**
 * Toggles the visibility of the category dropdown menu and updates the dropdown arrow icon accordingly.
 * 
 * @returns {void}
 */
function toggleCategory() {
  var listTechnical = document.getElementById("listTechnical");

  var categoryDropdown = document.getElementById("categoryDropdown");
  if (
    listTechnical.style.display === "none" ||
    listTechnical.style.display === ""
  ) {
    listTechnical.style.display = "block";
    categoryDropdown.src = "assets/img/arrow_drop_up.png";
  } else {
    listTechnical.style.display = "none";
    categoryDropdown.src = "assets/img/arrow_drop_down.png";
  }
}


/**
 * Toggles the visibility of the technical category list and updates the dropdown icon.
 * 
 * @returns {void}
 */
function toggleCategoryEdit() {
  var listTechnicalEdit = document.getElementById("listTechnicalEdit");
  var categoryDropdown = document.getElementById("categoryDropdown");
  if (
    listTechnicalEdit.style.display === "none" ||
    listTechnicalEdit.style.display === ""
  ) {
    listTechnicalEdit.style.display = "block";
    categoryDropdown.src = "assets/img/arrow_drop_up.png";
  } else {
    listTechnicalEdit.style.display = "none";
    categoryDropdown.src = "assets/img/arrow_drop_down.png";
  }
}


/**
 * Resets the background colors of all priority buttons.
 * 
 * @returns {void}
 */
function resetBackgroundColors() {
  const buttons = document.querySelectorAll('.priorityBox > div');
  buttons.forEach(button => {
    button.classList.remove('activePrioLow');
    button.classList.remove('activePrioMedium');
    button.classList.remove('activePrioUrgent');
  });
}


/**
 * Toggles the background color of buttons based on the priority type.
 * If the button has the specified priority type, it adds an active class for that priority type.
 * Otherwise, it removes active classes for all priority types.
 * 
 * @param {string} priorityType - The priority type ('low', 'medium', or 'urgent').
 * @returns {void}
 */
function toggleBackgroundColor(priorityType) {
  const buttons = document.querySelectorAll('.priorityBox > div');
  buttons.forEach(button => {
    if (button.classList.contains(priorityType)) {
      button.classList.add('activePrio' + priorityType.charAt(0).toUpperCase() + priorityType.slice(1));
    } else {
      button.classList.remove('activePrioLow');
      button.classList.remove('activePrioMedium');
      button.classList.remove('activePrioUrgent');
    }
  });
}


/**
 * Populates the technical category dropdown menu with options based on available categories.
 * 
 * @returns {void}
 */
function technicalUser() {
  let technical = document.getElementById("listTechnical");
  technical.innerHTML = "";
  for (let k = 0; k < categorySet.length; k++) {
    technical.innerHTML += `<div class="select" onclick="chosenTechnicalUser('${categorySet[k]}')">${categorySet[k]}</div>`;
  }
}



/**
 * Sets the value of the category input field to the specified category.
 * 
 * @param {string} category - The selected category.
 * @returns {void}
 */
function chosenTechnicalUser(category) {
  document.getElementById("categoryInput").value = `${category}`;
}


/**
 * Retrieves the value of the subtask input field. If the input value is not empty,
 * adds the subtask to the list and updates the display. Otherwise, displays an alert message.
 * 
 * @returns {void}
 */
function valueSubtask() {
  var input = document.getElementById("subTaskInput").value;
  if (input.length > 0) {
    addSubtaskToListAndDisplay();
  }
  else {
    var alertMessageTitle = 'Please enter a Letter';
    document.getElementById('alertSubtaskBoard').innerHTML = alertMessageTitle;
    setTimeout(function () {
      document.getElementById('alertSubtaskBoard').innerHTML = '';
    }, 3000); // Verzögerung von 3 Sekunden (3000 Millisekunden)
  }
}


/**
 * Adds the value of the subtask input field to the list of subtasks and updates the HTML content
 * to display the added subtask along with edit and delete icons.
 * 
 * @returns {void}
 */
function addSubtaskToListAndDisplay() {
  let valueSubtask = document.getElementById("subTaskInput").value;
  addSubtasks.push(valueSubtask);
  valueSubtask.innerHTML = "";
  let clearSubtask = document.getElementById('subtaskList');
  clearSubtask.innerHTML = '';
  for (let i = 0; i < addSubtasks.length; i++) {
    document.getElementById("subtaskList").innerHTML += `
  <div id="valueSubtaskContainer${i}" class="valueSubtaskContainer" ondblclick="editSubtask(${i})">
    <li>${valueSubtask}</li>
    <div class="editDeleteSubtaskIconContainer">
      <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
      <div class="seperaterSubtasks"></div>
      <img src="assets/img/delete.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
    </div>
  </div>
  `;
  }
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
 * Adds contacts to the board and fills them with data from the user's contact book.
 * 
 * @returns {void}
 */
function addContactToBoardAndFill() {
  if (mainUserInfos[0]["contactBook"]) {
    let contactBoard = document.getElementById("listContactContainerBoard");
    for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
      contactBoard.innerHTML += `
    <div class="contactsBoardContainer" onclick="checkCheckbox(${i})">
        <div class="contactsBoardContainerChild">   
            <div class="styleMembersAddTask" id="profilMember${i}"></div>
            <span class="nameMember" id="nameMember${i}"></span>
        </div>
        <input class="customCheckbox" id="checkboxMember${i}" type="checkbox" onclick="checkCheckbox(${i})" onchange="updateStatus(${i})">
    </div>
    `;
      fillContactsOnBoard(i);
    }
    assignRandomBackgroundColor();
    addCheckboxStatus();
  }
}


/**
 * Adds checkbox status to each contact based on the status array.
 * 
 * @returns {void}
 */
function addCheckboxStatus() {
  for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {

    let checkbox = document.getElementById(`checkboxMember${i}`);
    checkbox.checked = statusMembers[i];
  }
}


/**
 * Updates the status of a contact based on the checkbox state.
 * 
 * @param {number} i - The index of the contact to update.
 * @returns {void}
 */
function updateStatus(i) {
  let checkbox = document.getElementById(`checkboxMember${i}`);
  if (checkbox.checked) {
    statusMembers[i] = true;
  } else {
    statusMembers[i] = false;
  }
}


/**
 * Adds contacts to the list of members and initializes their status as false.
 * 
 * @returns {void}
 */
function addStatusToMembers() {
  addMembers = [];
  statusMembers = [];
  let contacts = mainUserInfos[0]['contactBook'];
  for (let i = 0; i < contacts.length; i++) {
    let addContact = contacts[i]['name'];
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
  const elementsWithProfilMember = document.querySelectorAll(
    '[id^="profilMember"]'
  );
  const elementsWithSelectedProfilOnBoard = document.querySelectorAll(
    '[id*="selectedProfilOnBoard"]'
  );
  elementsWithProfilMember.forEach((element) => {
    let randomColor = generateDarkColor();
    element.style.backgroundColor = randomColor;
  });
  elementsWithSelectedProfilOnBoard.forEach((element) => {
    let randomColor = generateDarkColor();
    element.style.backgroundColor = randomColor;
  });
}


/**
 * Generates a random dark color.
 * 
 * @returns {string} A random dark color in HSL format.
 */
function generateDarkColor() {
  // Generieren Sie eine zufällige Farbe mit geringem Helligkeitswert
  return `hsl(${Math.random() * 360}, 100%, ${Math.random() * 30 + 20}%)`;
}


/**
 * Fills contact information on the board for the specified index.
 * 
 * @param {number} i - The index of the contact to fill information for.
 * @returns {void}
 */
function fillContactsOnBoard(i) {
  const fullName = mainUserInfos[0]["contactBook"][i]["name"];
  const initials = fullName
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
  document.getElementById(`profilMember${i}`).innerHTML = initials;
  document.getElementById(`nameMember${i}`).innerHTML = fullName;
}


/**
 * Fills contact information on the task board for the specified task index.
 * 
 * @param {number} i - The index of the task to fill contact information for.
 * @returns {void}
 */
function fillContactsOverBoard(i) {
  for (let j = 0; j < mainUserInfos[0]["tasks"][i]["members"].length; j++) {
    const fullName = mainUserInfos[0]["tasks"][i]["members"][j];
    const initials = fullName
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
    document.getElementById(`profilMemberOverBoardInitials${j}`).innerHTML =
      initials;
    document.getElementById(`memberOverBoard${j}`).innerHTML = fullName;
  }
}


/**
 * Updates the progress bar for the specified task index based on completed subtasks.
 * 
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


/**
 * Clear the addMembersValueArray.
 * 
 * @returns {void}
 */
function ClearAddMembersValueArray() {
  addMembersValueArray = [];
}


/**
 * Display an alert message when the title field is not filled.
 * 
 * This function sets an alert message in the designated HTML element to remind the user to select a title.
 * The alert message disappears after a delay of 3 seconds.
 * 
 * @returns {void}
 */
function alertTitel() {
  var alertMessageTitle = 'Please select a Titel';
  document.getElementById('alertTitleBoard').innerHTML = alertMessageTitle;
  setTimeout(function () {
    document.getElementById('alertTitleBoard').innerHTML = '';
  }, 3000);
}


/**
 * Display an alert message when the due date field is not filled.
 * 
 * This function sets an alert message in the designated HTML element to remind the user to select a due date.
 * The alert message disappears after a delay of 3 seconds.
 * 
 * @returns {void}
 */
function alertDate() {
  var alertMessageDate = 'Please select a Due Date';
  document.getElementById('alertDateBoard').innerHTML = alertMessageDate;
  setTimeout(function () {
    document.getElementById('alertDateBoard').innerHTML = '';
  }, 3000);
}


/**
 * Display an alert message when the priority is not selected.
 * 
 * This function sets an alert message in the designated HTML element to remind the user to select a priority.
 * The alert message disappears after a delay of 3 seconds.
 * 
 * @returns {void}
 */
function alertPrio() {
  var alertMessagePriority = 'Please select a priority!';
  document.getElementById('alertPrioBoard').innerHTML = alertMessagePriority;
  setTimeout(function () {
    document.getElementById('alertPrioBoard').innerHTML = '';
  }, 3000);
}


/**
 * Display an alert message when the category is not selected.
 * 
 * This function sets an alert message in the designated HTML element to remind the user to select a category.
 * The alert message disappears after a delay of 3 seconds.
 * 
 * @returns {void}
 */
function alertCategory() {
  var alertMessageCategory = 'Please select a category!';
  document.getElementById('alertCategoryBoard').innerHTML = alertMessageCategory;
  setTimeout(function () {
    document.getElementById('alertCategoryBoard').innerHTML = '';
  }, 3000);
}


/**
 * Set the selected category input value and update the selected category.
 * 
 * This function sets the value of the category input field to the provided category.
 * It also updates the global variable `selectedCategoryInput` with the selected category.
 * 
 * @param {string} category - The selected category.
 * @returns {void}
 */
function chosenTechnicalUser(category) {
  document.getElementById("categoryInput").value = `${category}`;
  selectedCategoryInput = category;
}


/**
 * Set the title value for a searched task on the board.
 * 
 * This function sets the title value of the task found in the search results to the corresponding board element.
 * 
 * @param {Array} foundTasks - The array of tasks found in the search results.
 * @param {number} i - The index of the task in the foundTasks array.
 * @returns {void}
 */
function addTitleValueSearched(foundTasks, i) {
  document.getElementById(`titleOnBoard${i}`).innerHTML = ``;
  let addTitleValue = foundTasks[i]["title"];
  document.getElementById(`titleOnBoard${i}`).innerHTML = `${addTitleValue}`;
}