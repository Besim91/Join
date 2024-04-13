let addSubtasks = [];
let currentPriority;
let categorySet = ["Technical Task", "User Story"];
var activePriority = null;
let addMembersValueArray = [];
let addMembersStatusArray = [];
let selectedCategoryInput;
let statusMembers = [];
let addMembers = [];
let memberBackgroundColors = {};

/**
 * Fügt dem Element mit der ID "addTaskSidemenu" die CSS-Klasse "sideMenuInFocus" hinzu,
 * um es hervorzuheben.
 */
function addTaskFocused() {
  document.getElementById("addTaskSidemenu").classList.add("sideMenuInFocus");
}

/**
 * Sets today's date in the due date input field.
 */
function setTodayDate() {
  var today = new Date().toISOString().split("T")[0];
  var dueDateInput = document.getElementById("dueDateMainAddTask");
  dueDateInput.setAttribute("min", today);
}

/**
 * Adds an event listener to the document that triggers when the DOM content is fully loaded.
 * Calls the 'setTodayDate' function to set the minimum date for the due date input field.
 * Additionally, adds an event listener to the 'dueDateMainAddTask' input field.
 * When the input field loses focus, it triggers the 'validateSelectedDate' function to ensure
 * that the selected date is today or in the future.
 * @param {string} type - The event type to listen for ('DOMContentLoaded').
 * @param {function} listener - The callback function to execute when the event is triggered.
 * @returns {undefined}
 */
document.addEventListener("DOMContentLoaded", function () {
  setTodayDate();
  document.getElementById("dueDateMainAddTask").onblur = validateSelectedDate;
});

/**
 * Shows the priority icons based on the selected priority.
 * @param {string} priority - The selected priority.
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
 * Renders contacts on the board.
 */
function renderContactsOnBoard() {
  document.getElementById("listContactContainerMain").innerHTML = ``;
  let contactBoard = document.getElementById("listContactContainerMain");
  if (contactBoard.classList.contains("dNone")) {
    contactBoard.classList.remove("dNone");
    contactBoard.classList.add("dFlex");
  } else {
    contactBoard.classList.add("dNone");
    contactBoard.classList.remove("dFlex");
  }
  if (mainUserInfos[0]["contactBook"]) {
    for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
      contactBoard.innerHTML += `
    <div class="contactsBoardContainer" onclick="toggleCheckbox(${i})"> <!-- Add onclick event to toggle checkbox -->
        <div class="contactsBoardContainerChild">   
            <div class="styleMembersAddTask" id="profilMemberMain${i}"></div>
            <span class="nameMember" id="nameMemberMain${i}"></span>
        </div>
        <input class="customCheckbox" id="checkboxMember${i}" type="checkbox" onclick="toggleCheckbox(${i})">
    </div>
    `;
      fillContactsOnBoard(i);
    }
    assignRandomBackgroundColor();
    addCheckboxStatus();
  }
}

document.querySelectorAll('.customCheckbox').forEach(function(checkbox) {
  checkbox.addEventListener('click', function(event) {
      // Stoppe die Ereignis-Propagation, damit das Klicken auf die Checkbox nicht das Klicken auf das contactsBoardContainer auslöst
      event.stopPropagation();
      // Rufe die updateStatus-Funktion auf
      updateStatus(checkbox.id.replace('checkboxMember', ''));
  });
});

/**
 * Toggles the checkbox when clicking on the contact.
 * @param {number} i - The index of the contact.
 */
function toggleCheckbox(i) {
  let checkbox = document.getElementById(`checkboxMember${i}`);
  checkbox.checked = !checkbox.checked; // Toggle checkbox
  updateStatus(i); // Update status accordingly
}

/**
 * Adds checkbox status.
 */
function addCheckboxStatus() {
  for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
    let checkbox = document.getElementById(`checkboxMember${i}`);
    checkbox.checked = statusMembers[i];
  }
}

/**
 * Updates  the status of the contact
 * @param {number} i - The index of the contact.
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
 * Adds status to members.
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
 * Fills the contact list on the board.
 * @param {number} i - The index of the contact.
 */
function fillContactsOnBoard(i) {
  // Extract the full name of the contact from mainUserInfos using the provided index i
  const fullName = mainUserInfos[0]["contactBook"][i]["name"];
  // Extract the initials from the full name
  const initials = fullName
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
  // Set the HTML content of elements with specific IDs to display the initials and full name of the contact
  document.getElementById(`profilMemberMain${i}`).innerHTML = initials; // Display initials
  document.getElementById(`nameMemberMain${i}`).innerHTML = fullName; // Display full name
}

/**
 * Assigns random background colors to profile images.
 */
function assignRandomBackgroundColor() {
  const elementsWithProfilMember = document.querySelectorAll('[id^="profilMember"]');
  elementsWithProfilMember.forEach((element) => {
    if (!memberBackgroundColors[element.id]) {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      element.style.backgroundColor = randomColor;
      memberBackgroundColors[element.id] = randomColor;
    } else {
      element.style.backgroundColor = memberBackgroundColors[element.id];
    }
  });
}

/**
 * Handles the value of the subtask input and updates the UI accordingly.
 */
function valueSubtask() {
  var input = document.getElementById("subTaskInputMain").value;
  if (input.length > 0) {
    let valueSubtask = document.getElementById("subTaskInputMain").value;
    addSubtasks.push(valueSubtask);
    valueSubtask.innerHTML = "";
    document.getElementById("subtaskListMain").innerHTML = "";
    for (let i = 0; i < addSubtasks.length; i++) {
      document.getElementById("subtaskListMain").innerHTML += `
  <div id="valueSubtaskContainer${i}" class="valueSubtaskContainer"  ondblclick="editSubtask(${i})">
    <li>${addSubtasks[i]}</li>
    <div class="editDeleteSubtaskIconContainer">
      <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
      <div class="seperaterSubtasks"></div>
      <img src="assets/img/delete.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
    </div>
  </div>  
    `;
    }
  } else {
    alertMessageTitel();
  }
}

/**
 * Displays an alert message for subtask title input.
 *
 * @returns {void}
 */
function alertMessageTitel() {
  var alertMessageTitle = "Please enter a Letter";
  document.getElementById("alertSubtask").innerHTML = alertMessageTitle;
  setTimeout(function () {
    document.getElementById("alertSubtask").innerHTML = "";
  }, 3000);
}

/**
 * Counts the unique ids for tasks.
 * @returns {number} The unique id.
 */
function countIds() {
  if (mainUserInfos[0]["tasks"].length === 0) {
    return 0;
  } else {
    let ids = new Set(
      mainUserInfos[0]["tasks"].map((task) => parseInt(task["id"]))
    );
    for (let i = 0; i < 100; i++) {
      if (!ids.has(i)) {
        return i;
      }
    }
  }
}

/**
 * Retrieves the title to be added to the board.
 * @returns {string} The title input value.
 */
function addTitleToBoard() {
  let addTitleInput = document.getElementById("titleMainAddTask");
  if (addTitleInput) {
    return addTitleInput.value;
  } else {
    return "";
  }
}

/**
 * Retrieves the description to be added to the board.
 * @returns {string} The description input value.
 */
function addDescriptionToBoard() {
  let addDescriptionInput = document.getElementById("descriptionMainAddTask");
  if (addDescriptionInput) {
    return addDescriptionInput.value;
  } else {
    return "";
  }
}

/**
 * Retrieves the due date to be added to the board.
 * @returns {string} The due date input value.
 */
function addDueDateToBoard() {
  let addDueDateInput = document.getElementById("dueDateMainAddTask").value;
  if (addDueDateInput) {
    return addDueDateInput;
  } else {
    return "";
  }
}

/**
 * Retrieves the status of subtasks to be added to the board.
 * @returns {Array<string>} The array of subtask status.
 */
function addDoneToBoard() {
  let addSubtaskStatus = [];
  for (let j = 0; j < addSubtasks.length; j++) {
    let firstStatus = "false";
    addSubtaskStatus.push(firstStatus);
  }
  return addSubtaskStatus;
}

/**
 * Retrieves the members to be added to the task.
 * @returns {Array<string>} The array of members.
 */
function addMembersToTask() {
  let addMembersValue = [];
  for (let i = 0; i < addMembersStatusArray.length; i++) {
    let element = addMembersStatusArray[i];
    if (element === true) {
      addMembersValue.push(addMembersValueArray[i]);
    }
  }
  return addMembersValue;
}

/**
 * Clears the input fields related to adding a task.
 */
function clearAddTaskFloating() {
  document.getElementById("titleMainAddTask").value = "";
  document.getElementById("descriptionMainAddTask").value = "";
  document.getElementById("dueDateMainAddTask").value = "";
  document.getElementById("assignedInputMain").innerHTML = "";
  document.getElementById("categoryInput").value = "";
  document.getElementById("subTaskInputMain").value = "";
  document.getElementById("subtaskListMain").innerHTML = "";
}

/**
 * Toggles the priority of a task.
 * @param {number} priority - The priority value.
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
 * Pushes members to the task.
 */
function pushMembers() {
  for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
    let addMembersValue = mainUserInfos[0]["contactBook"][i]["name"];
    addMembersValueArray.push(addMembersValue);
    addMembersStatusArray.push("false");
  }
}

/**
 * Changes the icons for subtasks and handles their functionalities.
 */
function changeIconsSubtask() {
  // Get the container for icons
  let iconsContainer = document.getElementById("iconContainerSubtasks");
  // Update the HTML content with new icons and their functionalities
  iconsContainer.innerHTML = `
  <img src="assets/img/subtaskiconsclose.svg" alt="close img" onclick="changeIconsSubtaskBack()">
  <div class="seperaterSubtasks"></div>
  <img src="assets/img/subtaskiconsadd.svg" alt="add img" onclick="valueSubtask(), changeIconsSubtaskBack()">
  `;
}

/**
 * Changes the icons for subtasks back to the original state and clears the subtask input.
 */
function changeIconsSubtaskBack() {
  let inputContainer = document.getElementById("subTaskInputMain");
  let iconsContainer = document.getElementById("iconContainerSubtasks");
  // Restore the original icon and clear the input field
  iconsContainer.innerHTML = `
  <img id="subTaskMain" onclick="changeIconsSubtask()" src="assets/img/Subtask's icons.png" class="dropdown-icon">
  `;
  inputContainer.value = "";
}

/**
 * Displays technical categories for selection.
 */
function technicalUserMain() {
  let technical = document.getElementById("listTechnicalMain");
  technical.classList.remove("dNone");
  technical.innerHTML = "";
  // Populate technical categories for selection
  for (let k = 0; k < categorySet.length; k++) {
    technical.innerHTML += `<div class="select" onclick="chosenTechnicalUserMain('${categorySet[k]}')">${categorySet[k]}</div>`;
  }
}

/**
 * Toggles the display of technical categories dropdown.
 */
function toggleCategory() {
  var listTechnical = document.getElementById("listTechnicalMain");
  var categoryDropdown = document.getElementById("categoryDropdownMain");
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
 * Sets the chosen technical category as the input value and closes the dropdown menu.
 * @param {string} category - The selected category.
 */
function chosenTechnicalUserMain(category) {
  document.getElementById("categoryInput").value = category;
  selectedCategoryInput = category;  
  var listTechnical = document.getElementById("listTechnicalMain");
  listTechnical.style.display = "none";
  var categoryDropdown = document.getElementById("categoryDropdownMain");
  categoryDropdown.src = "assets/img/arrow_drop_down.png";
}

