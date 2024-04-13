/**
 * Renders the add task form to the boards container.
 */
function renderAddTaskFloating() {
  const boardsContainer = document.getElementById("boardsContainer");
  const addTaskFormHTML = createAddTaskFormHTML();
  boardsContainer.innerHTML += addTaskFormHTML;
}

/**
 * Handles the click event for priority types.
 * Resets background colors, toggles the background color for the selected priority type,
 * and adds the priority value.
 *
 * @param {string} priorityType - The type of priority clicked.
 * @returns {void}
 */
function handlePriorityClick(priorityType) {
  resetBackgroundColors();
  toggleBackgroundColor(priorityType);
  addPriorityValue(priorityType);
}

/**
 * Creates the HTML content for the assigned-to input field.
 * @returns {string} The HTML content for the assigned-to input field.
 */
function createAssignedToInputHTML() {
  return `
  <div class="assigned">
    <div class="assignedBox"><b>Assigned to</b> (optional)</div>
    <div class="inputWithIcon" onclick="renderContactsOnBoard()">
        <input type="text" id="assignedInput" class="assignedInput" placeholder="Select contacts to assign..." readonly>
        <img id="icon" src="assets/img/arrow_drop_down.png" class="dropdownIcon">
    </div>
  </div>
  <div id="listContactContainerBoard" class="listContactContainerBoard dNone"></div>
  `;
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} string - The input string.
 * @returns {string} The input string with the first letter capitalized.
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Renders a floating task on the board.
 *
 * @param {number} i - The index of the task to render.
 */
function renderTaskFloating(i) {
  if (
    mainUserInfos[0] &&
    mainUserInfos[0]["tasks"] &&
    mainUserInfos[0]["tasks"][i]
  ) {
    const task = mainUserInfos[0]["tasks"][i];
    updateTaskDataFromMainUserInfos(task);
    renderTaskBoardHTML(i);
    renderAssignedMembers(i, task);
    renderSubtasks(i, task);
    transformPriorityToImgOverBoard(i);
    generateBlurBackground(i);
    document.getElementById("blurBoardBackground").classList.remove("dNone");
  }
}

/**
 * Generiert ein unscharfes Hintergrundelement und fügt es in ein bestimmtes Element ein.
 * Das Hintergrundelement wird angezeigt und bei einem Klick auf das Element wird eine Funktion aufgerufen, um eine Karte zu schließen.
 * @param {number} i - Die Indexnummer des Elements, das geschlossen werden soll.
 */
function generateBlurBackground(i) {
  document.getElementById("insertBlurBackground").innerHTML = `
  <div id="blurBoardBackground" class="dNone" onclick="closeCard(${i})"></div>`;
}

/**
 * Renders the task board HTML based on the task data.
 *
 * @param {number} i - The index of the task.
 */
function renderTaskBoardHTML(i) {
  const taskBoard = document.getElementById("taskBoard");
  taskBoard.innerHTML = `
    <div class="tasksOverBoardContainer" id="tasksOverBoardContainer${i}">
      ${renderCategoryContainer(i)}
      <h1 class="titelOverBoard">${addTitleInput}</h1>
      <span class="descriptionOverBoard">${addDescriptionInput}</span>
      <table>
        ${renderDueDateRow(i)}
        ${renderPriorityRow()}
      </table>
      ${renderAssignedToSection()}
      ${renderSubtasksContainer()}
      ${renderDeleteChangeContainer(i)}
    </div>
  `;
}

/**
 * Renders the category container HTML for the task board.
 *
 * @param {number} i - The index of the task.
 * @returns {string} - The HTML string for the category container.
 */
function renderCategoryContainer(i) {
  return `
    <div class="categoryContainerOverBoard">
      <button class="technicalTaskBtn" id="technicalTaskBtnOverBoard${i}">${addCategoryInput}</button>
      <img onclick="closeCard(${i}), updateHTML()" src="assets/img/close.svg" alt="close img" class="closeImg">
    </div>
  `;
}

/**
 * Renders the due date row HTML for the task board.
 *
 * @param {number} i - The index of the task.
 * @returns {string} - The HTML string for the due date row.
 */
function renderDueDateRow(i) {
  return `
    <tr>
      <th class="styleDueDate">Due Date:</th>
      <td id="insertDueDateOverBoard${i}">${addDateInput}</td>
    </tr>
  `;
}

/**
 * Renders the priority row HTML for the task board.
 *
 * @returns {string} - The HTML string for the priority row.
 */
function renderPriorityRow() {
  return `
    <tr>
      <th class="stylePriority">Priority:</th>
      <td id="insertPriorityOverBoard">${addPriorityInput}</td>
    </tr>
  `;
}

/**
 * Renders the "Assigned to" section HTML for the task board.
 *
 * @returns {string} - The HTML string for the "Assigned to" section.
 */
function renderAssignedToSection() {
  return `
    <div>
      <span class="styleAssigned">Assigned to:</span>
      <div id="contactsOverBoardContainer"></div>
    </div>
  `;
}

/**
 * Renders the container for subtasks on the task board.
 *
 * @returns {string} - The HTML string for the subtasks container.
 */
function renderSubtasksContainer() {
  return `
    <div class="styleSubtasksContainer">
      <span class="styleSubtasks">Subtasks</span>
      <div id="checkBoxContainer" class="checkBoxContainer"></div>
    </div>
  `;
}

/**
 * Renders the container for subtasks on the task board.
 *
 * @returns {string} - The HTML string for the subtasks container.
 */
function renderDeleteChangeContainer(i) {
  return `
    <div class="deleteChangeContainer">
      <div class="deleteOverBoard" onclick="deleteTask(${i}), closeCard(${i})"><img src="assets/img/delete.svg" alt="deleteBtn"> Delete</div>
      <div class="seperaterDeleteChange"></div>
      <div class="editOverBoard" onclick="editTask(${i})"><img src="assets/img/edit.svg" alt="editBtn"> Edit</div>
    </div>
  `;
}

/**
 * Renders the assigned members for a task on the task board.
 *
 * @param {number} i - The index of the task.
 * @param {Object} task - The task object containing member information.
 */
function renderAssignedMembers(i, task) {
  const members = task["members"];
  const status = task["status"];
  if (members !== undefined) {
    for (let j = 0; j < members.length; j++) {
      if (status[j] === true && typeof members[j] === "string") {
        const memberFirstLetter = members[j]
          .split(" ")
          .slice(0, 2)
          .map((word) => word.charAt(0))
          .join("");
        document.getElementById(`contactsOverBoardContainer`).innerHTML += `
          <div class="membersOverBoardContainer">
              <div class="profileOnBoard" id="selectedProfilOnBoard${j}">${memberFirstLetter}</div>
              <span>${members[j]}</span>
          </div>
        `;
      }
    }
    assignRandomBackgroundColor();
  }
}

/**
 * Renders subtasks for a task if they exist.
 *
 * @param {number} i - The index of the task.
 * @param {Object} task - The task object containing subtask information.
 */
function renderSubtasks(i, task) {
  if (task["subtasks"] !== undefined) insertSubtasks(i);
}

/**
 * Inserts subtasks into the task board if they exist.
 *
 * @param {number} i - The index of the task.
 */
function insertSubtasks(i) {
  for (let j = 0; j < mainUserInfos[0]["tasks"][i]["subtasks"].length; j++) {
    let addSubtasksInput = mainUserInfos[0]["tasks"][i]["subtasks"][j];
    let isChecked =
      mainUserInfos[0]["tasks"][i]["done"][j] === true ? "checked" : ""; // Überprüfung, ob die Checkbox gecheckt werden soll
    document.getElementById(`checkBoxContainer`).innerHTML += `
        <div class="subtaskCheckboxContainer">
            <input type="checkbox" id="checkbox${j}" name="checkbox${j}" onchange="checkSubtasks(${i}, ${j})" ${isChecked}>
            <label for="checkbox${j}">${addSubtasksInput}</label>
        </div>
    `;
  }
}

/**
 * Generates HTML for a task element on the board.
 *
 * @param {object} element - The task element.
 * @param {object} currentUserInfo - Information about the current user.
 * @returns {string} The HTML for the task element.
 */
function generateTodoHTML(element, currentUserInfo) {
  const { category, title, description, priority } = currentUserInfo;
  const progress = Array.isArray(element.done)
    ? element.done.filter((item) => item === true).length
    : 0;
  const goal =
    element.subtasks && Array.isArray(element.subtasks)
      ? element.subtasks.length
      : 0;
  const result = `${progress}/${goal}`;
  const progressHTML = goal > 0 ? generateProgressHTML(element.id, result) : "";
  return `
    <div class="tasksOnBoard" onclick="toggleCardBack(), renderTaskFloating(${element.id})" draggable="true" ondragstart="startDragging(${element.id})">
      <div id="categoryOnBoard${element.id}" class="categoryOnBoard">${category}</div>
      <div class="column">
        <span id="titleOnBoard${element.id}" class="titleOnBoard">${title}</span>
        <span id="descriptionOnBoard${element.id}" class="descriptionOnBoard">${description}</span>
      </div>
      ${progressHTML}
      <div class="spaceBetween">
        <div class="profilsOnBoard" id="profilsOnBoard${element.id}"></div>
        <div id="priorityOnBoard${element.id}">${priority}</div>
      </div>
    </div>
  `;
}

/**
 * Generates HTML for the progress bar of a task.
 *
 * @param {number} id - The ID of the task.
 * @param {string} result - The progress information.
 * @returns {string} The HTML for the progress bar.
 */
function generateProgressHTML(id, result) {
  return `
    <div class="progressContainer" id="progressContainer${id}">
      <div class="progressBar" id="progressBar${id}">
        <div class="progress" id="progress${id}"></div>
      </div>
      <span id="progressInText${id}" class="progressInText">${result} Subtasks</span>
    </div>
  `;
}

/**
 * Aktualisiert die lokale Speicherung der Benutzerinformationen.
 * @async
 */
async function updateStorage() {
  await setItem(currentUserMail, JSON.stringify(mainUserInfos));
  addSubtasks = [];
}

/**
 * Render priority options on the task board overlay for low priority.
 *
 * @returns {void}
 */
function renderPriorityOptionsOnBoardLow() {
  document.getElementById(`insertPriorityOverBoard`).innerHTML = `
  <div>
    <span>Low</span>
    <img src="assets/img/Prio baja.png" alt="low priority" id="lowPrioOver">
  </div>
      `;
}

/**
 * Render priority options on the task board overlay for medium priority.
 *
 * @returns {void}
 */
function renderPriorityOptionsOnBoardMedium() {
  document.getElementById(`insertPriorityOverBoard`).innerHTML = `
<div>
  <span>Medium</span>
  <img src="assets/img/Prio media (1).png" alt="medium priority" id="midPrioOver">
</div>
    `;
}

/**
 * Render priority options on the task board overlay for urgent priority.
 *
 * @returns {void}
 */

function renderPriorityOptionsOnBoardUrgent() {
  document.getElementById(`insertPriorityOverBoard`).innerHTML = `
<div>
  <span>Urgent</span>
  <img src="assets/img/Prio alta.png" alt="urgent priority" id="urgentPrioOver">
</div>
  `;
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

/**
 * Set the description value for a searched task on the board.
 *
 * This function sets the description value of the task found in the search results to the corresponding board element.
 *
 * @param {Array} foundTasks - The array of tasks found in the search results.
 * @param {number} i - The index of the task in the foundTasks array.
 * @returns {void}
 */
function addDescriptionValueSearched(foundTasks, i) {
  document.getElementById(`descriptionOnBoard${i}`).innerHTML = "";
  let addDescriptionValue = foundTasks[i]["description"];
  document.getElementById(
    `descriptionOnBoard${i}`
  ).innerHTML = `${addDescriptionValue}`;
}

/**
 * Set the category value for a searched task on the board.
 *
 * This function sets the category value of the task found in the search results to the corresponding board element.
 *
 * @param {Array} foundTasks - The array of tasks found in the search results.
 * @param {number} i - The index of the task in the foundTasks array.
 * @returns {void}
 */

function addCategoryValueSearched(foundTasks, i) {
  document.getElementById(`categoryOnBoard${i}`).innerHTML = ``;
  let addCategoryValue = foundTasks[i]["category"];
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
