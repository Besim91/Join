/**
 * Renders the contact list on the board and toggles its visibility.
 *
 * @function renderContactsOnBoardEdit
 * @returns {void}
 */
function renderContactsOnBoardEdit() {
  /**
   * The container element for the contact list on the board.
   * @type {HTMLElement}
   */
  const contactContainer = document.getElementById("listContactContainerBoard");

  contactContainer.innerHTML = "";
  toggleContactBoardVisibility(contactContainer);

  if (mainUserInfos[0]["contactBook"]) {
    renderContactList(contactContainer);
  }
}

/**
 * Toggles the visibility of the contact list container.
 *
 * @function toggleContactBoardVisibility
 * @param {HTMLElement} contactContainer - The container element for the contact list.
 * @returns {void}
 */
function toggleContactBoardVisibility(contactContainer) {
  if (contactContainer.classList.contains("dNone")) {
    contactContainer.classList.remove("dNone");
    contactContainer.classList.add("dFlex");
  } else {
    contactContainer.classList.add("dNone");
    contactContainer.classList.remove("dFlex");
  }
}

/**
 * Renders the contact list on the board.
 *
 * @function renderContactList
 * @param {HTMLElement} contactContainer - The container element for the contact list.
 * @returns {void}
 */
function renderContactList(contactContainer) {
  for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
    contactContainer.innerHTML += `
      <div class="contactsBoardContainer">
        <div class="contactsBoardContainerChild">   
          <div class="styleMembersAddTask" id="profilMember${i}"></div>
          <span class="nameMember" id="nameMember${i}"></span>
        </div>
        <input class="customCheckbox" id="checkboxMember${i}" type="checkbox" onchange="updateStatus(${i})">
      </div>
    `;
    fillContactsOnBoard(i);
  }
  assignRandomBackgroundColor();
  addCheckboxStatusEdit();
}

/**
 * Updates the checkbox status based on the stored status array.
 *
 * @returns {void}
 */
function addCheckboxStatusEdit() {
  for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
    let checkbox = document.getElementById(`checkboxMember${i}`);
    checkbox.checked = statusMembers[i];
  }
}

/**
 * Updates the status of a member based on the state of its checkbox in the editing area.
 *
 * @function updateStatusEdit
 * @param {number} i - The index of the member whose status should be updated.
 * @returns {void}
 */
function updateStatusEdit(i) {
  let checkbox = document.getElementById(`checkboxMember${i}`);
  if (checkbox.checked) {
    statusMembers[i] = true;
  } else {
    statusMembers[i] = false;
  }
}

/**
 * Adds members and their status information for a specific task to the editing area.
 *
 * @function addStatusToMembersEdit
 * @param {number} i - The index of the task for which members and status should be added.
 * @returns {void}
 */
function addStatusToMembersEdit(i) {
  addMembers = [];
  statusMembers = [];
  let contacts = mainUserInfos[0]["contactBook"];
  for (let j = 0; j < contacts.length; j++) {
    let getMembers = mainUserInfos[0]["tasks"][i]["members"][j];
    let getStatus = mainUserInfos[0]["tasks"][i]["status"][j];
    addMembers.push(getMembers);
    statusMembers.push(getStatus);
  }
}

/**
 * Fills the technical users area in the editing area with available categories.
 * Adds category selection options and assigns them the function "chosenTechnicalUserEdit()".
 *
 * @function technicalUserEdit
 * @returns {void}
 */
function technicalUserEdit() {
  let technical = document.getElementById("listTechnicalEdit");
  technical.classList.remove("dNone");
  technical.innerHTML = "";

  for (let k = 0; k < categorySet.length; k++) {
    technical.innerHTML += `<div class="select" onclick="chosenTechnicalUserEdit('${categorySet[k]}')">${categorySet[k]}</div>`;
  }
}

/**
 * Changes the icons for subtask management in the editing area.
 * Replaces the existing icons with close and add icons.
 * Assigns the close icons the function "changeIconsSubtaskBackEdit()" and the add icons the function "valueSubtaskEdit()" as well as "changeIconsSubtaskBackEdit()".
 *
 * @function changeIconsSubtaskEdit
 * @returns {void}
 */
function changeIconsSubtaskEdit() {
  let iconsContainer = document.getElementById("iconContainerSubtasksEdit");
  iconsContainer.innerHTML = `
    <img src="assets/img/subtaskiconsclose.svg" alt="close img" onclick="changeIconsSubtaskBackEdit()">
    <div class="seperaterSubtasks"></div>
    <img src="assets/img/subtaskiconsadd.svg" alt="add img" onclick="valueSubtaskEdit(), changeIconsSubtaskBackEdit()">
    `;
}

/**
 * Changes the icons back for subtask management in the editing area.
 * Reverts the icons to the original state, and clears the input container for subtasks.
 *
 * @function changeIconsSubtaskBackEdit
 * @returns {void}
 */
function changeIconsSubtaskBackEdit() {
  let inputContainer = document.getElementById("subTaskInputEdit");
  let iconsContainer = document.getElementById("iconContainerSubtasksEdit");
  iconsContainer.innerHTML = `
    <img id="subTask" onclick="changeIconsSubtaskEdit()" src="assets/img/Subtask's icons.png" class="dropdownIcon">
    `;
  inputContainer.value = "";
}

/**
 * Prepares the subtask for editing in the editing area.
 * Replaces the subtask value with an input field for editing, along with edit and delete icons.
 *
 * @function editSubtaskEdit
 * @param {number} j - The index of the subtask to be edited.
 * @returns {void}
 */
function editSubtaskEdit(j) {
  document.getElementById(`valueSubtaskContainer${j}`).innerHTML = `
    <input value="${addSubtasks[j]}" id="inputEditSubtask${j}" class="inputEditSubtaskInProcess">
    <div class="editDeleteSubtaskIconContainerInProcess">
      <img src="assets/img/delete.svg" alt="edit icon" id="editSubtaskIcon" onclick="deleteChanges(${j})">
      <div class="seperaterSubtasks"></div>
      <img src="assets/img/check.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="acceptChanges(${j})">
    </div>
    `;
}

/**
 * Deletes the specified subtask and updates the subtask list.
 *
 * @param {number} i - The index of the subtask to delete.
 * @returns {void}
 */
function deleteSubtaskEdit(i) {
  const elementToRemove = document.getElementById(`valueSubtaskContainer${i}`);
  elementToRemove.remove();
  addSubtasks.splice(i, 1);
  renderSubtaskList();
}

/**
 * Renders the updated subtask list.
 *
 * @returns {void}
 */
function renderSubtaskList() {
  const subtaskListEdit = document.getElementById("subtaskListEdit");
  subtaskListEdit.innerHTML = "";

  for (let i = 0; i < addSubtasks.length; i++) {
    subtaskListEdit.innerHTML += `
      <div id="valueSubtaskContainer${i}" class="valueSubtaskContainer" ondblclick="editSubtask(${i})">
        <li>${addSubtasks[i]}</li>
        <div class="editDeleteSubtaskIconContainer">
          <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
          <div class="seperaterSubtasks"></div>
          <img src="assets/img/delete.svg" alt="delete icon" id="deleteSubtaskIcon" onclick="deleteSubtaskEdit(${i})">
        </div>
      </div>  
    `;
  }
}

/**
 * Funktion, um eine Task-Bearbeitungsform für die angegebene Aufgabe anzuzeigen.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {void}
 */
function editTask(i) {
  const container = document.getElementById(`tasksOverBoardContainer${i}`);
  container.innerHTML = getTaskFormHTML(i);
  addValueEdit(i);
  addStatusToMembersEdit(i);
}
document.addEventListener("DOMContentLoaded", function () {
  // Hier kommt dein Code hin, der sicher ausgeführt wird, wenn das DOM vollständig geladen ist
  addValueEdit(0); // Beispielaufruf für deine Funktion mit einem Beispielindex
});

/**
 * Generiert den HTML-Code für das Formular zur Bearbeitung der Aufgabe.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {string} Der HTML-Code für das Bearbeitungsformular.
 */
function getTaskFormHTML(i) {
  return `
    <div class="closeBtnContainer">
        <img src="assets/img/close.svg" alt="close img" onclick="closeCard(${i})" class="closeImg" >
    </div>
    <form id="addTaskForm${i}" onsubmit="updateTaskInfos(event, ${i})">
        ${getTitleInputHTML(i)}
        ${getDescriptionInputHTML(i)}
        ${getDueDateInputHTML(i)}
        ${createPriorityOptionsHTML()}
        ${getAssignedSectionHTML(i)}
        ${getCategorySectionHTML()}
        ${getSubtasksSectionHTML()}
        ${getButtonContainerHTML()}
    </form>`;
}

/**
 * Generiert den HTML-Code für den Eingabebereich des Titels der Aufgabe.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {string} Der HTML-Code für den Eingabebereich des Titels der Aufgabe.
 */
function getTitleInputHTML(i) {
  return `
    <input type="text" class="titleAddTaskFloatingEdit" maxlength="50" id="titleEdit${i}" name="title" placeholder="Enter a title" required><br>
    <label for="descriptionAddTaskFloating" class="styleDescription">
        <span id="descriptionTitleAddTask">Description <span id="optionalDescriptionTitleAddTask">(optional)</span></span>
    </label><br>`;
}

/**
 * Generiert den HTML-Code für den Eingabebereich der Beschreibung der Aufgabe.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {string} Der HTML-Code für den Eingabebereich der Beschreibung der Aufgabe.
 */
function getDescriptionInputHTML(i) {
  return `
    <textarea id="descriptionAddTaskFloating${i}" class="descriptionAddTaskFloating" name="description" rows="4" cols="50" placeholder="Enter a Description"></textarea><br>`;
}

/**
 * Generiert den HTML-Code für den Eingabebereich des Fälligkeitsdatums der Aufgabe.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {string} Der HTML-Code für den Eingabebereich des Fälligkeitsdatums der Aufgabe.
 */
function getDueDateInputHTML(i) {
  return `
    <label class="styleDueDate" for="dueDateAddTaskFloating">Due date</label><br>
    <input type="date" id="dueDateAddTaskFloating${i}" class="dueDateAddTaskFloating" name="due_date" required placeholder="dd/mm/yyyy" onblur="validateSelectedDateEdit(${i})" onclick="setTodayDateEdit(${i})">
    <div id="alertDateEdit" class="alertMessage"></div>
    `;
}

/**
 * Generiert den HTML-Code für den Abschnitt zur Zuweisung von Aufgaben.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {string} Der HTML-Code für den Abschnitt zur Zuweisung von Aufgaben.
 */
function getAssignedSectionHTML(i) {
  return `
    <div class="assigned">
        <div class="assignedBox"><b>Assigned to</b> (optional)</div>
        <div class="inputWithIcon" onclick="renderContactsOnBoardEdit()">
            <input type="text" id="assignedInput${i}" class="assignedInput" placeholder="Select contacts to assign..." readonly>
            <img id="icon"  src="assets/img/arrow_drop_down.png" class="dropdownIcon">
        </div>
        <div id="listContactContainerEdit" class="dNone"></div>
    </div>
    `;
}

/**
 * Generiert den HTML-Code für den Kategorien-Abschnitt.
 *
 * @returns {string} Der HTML-Code für den Kategorien-Abschnitt.
 */
function getCategorySectionHTML() {
  return `
    <div class="categoryHeader">
        <div class="styleCategory"><b>Category</b></div>
        <div class="inputWithIcon" onclick="technicalUserEdit(),  toggleCategoryEdit()">
            <input type="text" id="categoryInput" class="categoryInput" placeholder="Select task category..." readonly required>
            <img id="categoryDropdown" class="categoryDropdown" src="assets/img/arrow_drop_down.png" class="dropdownIcon">
        </div>
        <div id="listTechnicalEdit" class="techUser dNone"></div>
    </div>`;
}

/**
 * Generiert den HTML-Code für den Abschnitt mit den Teilaufgaben.
 *
 * @returns {string} Der HTML-Code für den Abschnitt mit den Teilaufgaben.
 */
function getSubtasksSectionHTML() {
  return `
    <div class="subtasks">
        <div class="styleSubtasks"><b>Subtasks</b> (optional)</div>
        <div class="inputWithIcon">
            <input type="text" placeholder="Add new subtask..." id="subTaskInputEdit" class="subTaskInput">
            <div id="iconContainerSubtasksEdit" class="iconContainerSubtasks">
            <img id="subTask" class="subTask"  src="assets/img/Subtask's icons.png" class="dropdownIcon" onclick="changeIconsSubtaskEdit()">
        </div>
    </div>
    <div id="subtaskListEdit"></div>`;
}

/**
 * Generiert den HTML-Code für den Container mit den Schaltflächen.
 *
 * @returns {string} Der HTML-Code für den Container mit den Schaltflächen.
 */
function getButtonContainerHTML() {
  return `
    <div class="buttoContainer">
        <div class="buttoBox">
            <div class="oKbutton">
                <button class="ok" type="submit">OK<img src="assets/img/check.png"></button>
            </div>
        </div>
    </div>`;
}

/**
 * Fügt die Werte der Aufgabe in das Bearbeitungsformular ein.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {void}
 */
function addValueEdit(i) {
  const task = mainUserInfos[0].tasks[i];
  if (task) {
    populateTaskFields(task, i);
    populateSubtasks(task);
    addSubmitEventListener(i);
  }
}

/**
 * Füllt die Hauptfelder des Aufgabenformulars.
 *
 * @param {object} task - Die Aufgabe.
 * @param {number} i - Der Index der Aufgabe.
 * @returns {void}
 */
function populateTaskFields(task, i) {
  document.getElementById(`titleEdit${i}`).value = task.title;
  document.getElementById(`descriptionAddTaskFloating${i}`).value =
    task.description;
  document.getElementById(`dueDateAddTaskFloating${i}`).value = task.dueDate;
  document.getElementById(`categoryInput`).value = task.category;
}

/**
 * Fügt die Subaufgaben der Aufgabe hinzu.
 *
 * @param {object} task - Die Aufgabe.
 * @returns {void}
 */
function populateSubtasks(task) {
  const subtasks = task.subtasks || [];
  subtasks.forEach((subtask, j) => {
    addSubtasks.push(subtask);
    createSubtaskElement(subtask, j);
  });
}

/**
 * Erstellt ein HTML-Element für eine Subaufgabe.
 *
 * @param {string} subtask - Die Subaufgabe.
 * @param {number} j - Der Index der Subaufgabe.
 * @returns {void}
 */
function createSubtaskElement(subtask, j) {
  const subtaskContainer = document.createElement("div");
  subtaskContainer.id = `valueSubtaskContainer${j}`;
  subtaskContainer.className = "valueSubtaskContainer";
  subtaskContainer.innerHTML = `
    <li id="editSubtask${j}">${subtask}</li>
    <div class="editDeleteSubtaskIconContainer">
      <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtaskEdit(${j})">
      <div class="seperaterSubtasks"></div>
      <img src="assets/img/delete.svg" alt="delete icon" id="deleteSubtaskIcon" onclick="deleteSubtaskEdit(${j})">
    </div>
  `;
  subtaskContainer.addEventListener("dblclick", () => editSubtaskEdit(j));
  const subtaskListEdit = document.getElementById("subtaskListEdit");
  if (subtaskListEdit) {
    subtaskListEdit.appendChild(subtaskContainer);
  } else {
    console.error('Element "subtaskListEdit" not found.');
  }
}

/**
 * Fügt dem Submit-Ereignis des Aufgabenformulars einen Eventlistener hinzu.
 *
 * @param {number} i - Der Index der Aufgabe.
 * @returns {void}
 */
function addSubmitEventListener(i) {
  document
    .getElementById(`addTaskForm${i}`)
    .addEventListener("submit", function (event) {
      updateTaskInfos(event, i);
    });
}

/**
 * Hinzufügen einer neuen Teilaufgabe zum Bearbeitungsbereich.
 * Überwacht das Eingabefeld "subTaskInputEdit" und fügt die eingegebene Teilaufgabe der Liste der Teilaufgaben hinzu.
 *
 * @function valueSubtaskEdit
 * @returns {void}
 */
function valueSubtaskEdit() {
  var input = document.getElementById("subTaskInputEdit").value;
  if (input.length > 0) {
    let valueSubtask = document.getElementById("subTaskInputEdit").value;
    let clearSubtasksContainer = document.getElementById("subtaskListEdit");
    clearSubtasksContainer.innerHTML = "";
    addSubtasks.push(valueSubtask);
    valueSubtask.innerHTML = "";
    for (let i = 0; i < addSubtasks.length; i++) {
      let newSubtask = addSubtasks[i];
      document.getElementById("subtaskListEdit").innerHTML += `
      <div id="valueSubtaskContainer${i}" class="valueSubtaskContainer">
        <li>${newSubtask}</li>
        <div class="editDeleteSubtaskIconContainer">
          <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtaskEdit(${i})">
          <div class="seperaterSubtasks"></div>
          <img src="assets/img/delete.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="deleteSubtaskEdit(${i})">
        </div>
      </div>`;
    }
  }
}

/**
 * Wählt einen technischen Benutzer aus und setzt den Wert im Eingabefeld "categoryInput".
 *
 * @function chosenTechnicalUserEdit
 * @param {string} category - Die ausgewählte Kategorie, die im Eingabefeld "categoryInput" angezeigt werden soll.
 * @returns {void}
 */
function chosenTechnicalUserEdit(category) {
  document.getElementById("categoryInput").value = `${category}`;
}

/**
 * Setzt das minimale Datum für das Eingabefeld "dueDateAddTaskFloating" auf das heutige Datum.
 *
 * @function setTodayDateEdit
 * @param {number} i - Der Index, der verwendet wird, um das entsprechende Eingabefeld zu identifizieren.
 * @returns {void}
 */
function setTodayDateEdit(i) {
  var currentDate = new Date().toISOString().split("T")[0]; // Heutiges Datum im ISO-Format (YYYY-MM-DD)
  var dueDateInputEdit = document.getElementById(`dueDateAddTaskFloating${i}`);
  dueDateInputEdit.setAttribute("min", currentDate);
}

function validateSelectedDateEdit(i) {
  var inputDate = document.getElementById(`dueDateAddTaskFloating${i}`).value;
  if (inputDate.length === 10) {
    var selectedDate = new Date(inputDate);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      dateAlertEdit();
      document.getElementById(`dueDateAddTaskFloating${i}`).value = "";
    }
  }
}

/**
 * Displays an alert message "Please pick a future date!" for three seconds in the 'alertDateEdit' element.
 *
 * @returns {void}
 */
function dateAlertEdit() {
  var alertDateEdit = document.getElementById("alertDateEdit");
  if (alertDateEdit) {
    alertDateEdit.innerText = "Please pick a future date!";
    setTimeout(function () {
      alertDateEdit.innerText = "";
    }, 3000);
  }
}

/**
 * Fügt Kontakte dem Bearbeitungsbereich hinzu und füllt diese mit den entsprechenden Informationen.
 * Überwacht das Klicken auf Kontaktelemente zur Aktualisierung der Checkboxen.
 *
 * @function addContactToBoardAndFillEdit
 * @returns {void}
 */
function addContactToBoardAndFillEdit() {
  if (mainUserInfos[0]["contactBook"]) {
    let contactBoard = document.getElementById("listContactContainerEdit");
    for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
      contactBoard.innerHTML += `
    <div class="contactsBoardContainer">
        <div class="contactsBoardContainerChild">   
            <div class="styleMembersAddTask" id="profilMember${i}"></div>
            <span class="nameMember" id="nameMember${i}"></span>
        </div>
        <input class="customCheckbox" id="checkboxMember${i}" type="checkbox" onchange="updateStatus(${i})">
    </div>
    `;
      fillContactsOnBoard(i);
    }
    assignRandomBackgroundColor();
    addCheckboxStatus();
  }
}

/**
 * Rendert die Kontakte im Bearbeitungsbereich neu.
 * Leert zuerst den Kontaktcontainer und fügt dann die Kontakte hinzu.
 * Aktualisiert die Sichtbarkeit des Kontaktcontainers zwischen sichtbar und unsichtbar.
 *
 * @function renderContactsOnBoardEdit
 * @returns {void}
 */
function renderContactsOnBoardEdit() {
  document.getElementById("listContactContainerEdit").innerHTML = ``;
  let contactBoard = document.getElementById("listContactContainerEdit");
  if (contactBoard.classList.contains("dNone")) {
    contactBoard.classList.remove("dNone");
    contactBoard.classList.add("dFlex");
  } else {
    contactBoard.classList.add("dNone");
    contactBoard.classList.remove("dFlex");
  }
  addContactToBoardAndFillEdit();
}
