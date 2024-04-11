/**
 * Renders the add task form to the boards container.
 */
function renderAddTaskFloating() {
  const boardsContainer = document.getElementById("boardsContainer");
  const addTaskFormHTML = createAddTaskFormHTML();
  boardsContainer.innerHTML += addTaskFormHTML;
}


/**
 * Creates the HTML content for the add task form.
 * @returns {string} The HTML content for the add task form.
 */
function createAddTaskFormHTML() {
  return `
  <div class="addTaskContainer" id="addTaskFloating">
    ${createCloseBtnContainerHTML()}
    <div id="addedTask" class="addedTask">Task added to board <img src="assets/img/vector.svg" id="vector"></div>
    <h1 class="h1AddTask">Add Task</h1>
    <form id="addTaskForm" onsubmit="handleTaskForm(event)" novalidate>
        ${createTitleInputHTML()}
        ${createDescriptionInputHTML()}
        ${createDueDateInputHTML()}
        ${createPriorityOptionsHTML()}
        ${createAssignedToInputHTML()}
        ${createCategoryInputHTML()}
        ${createSubtasksInputHTML()}
        ${createSubmitButtonHTML()}
    </form>
  </div>
  `;
}


/**
 * Creates the HTML content for the close button container.
 * @returns {string} The HTML content for the close button container.
 */
function createCloseBtnContainerHTML() {
  return `
  <div class="closeBtnContainer">
      <img src="assets/img/close.svg" alt="close img" onclick="toggleCard()" class="closeImg">
  </div>
  `;
}


/**
 * Creates the HTML content for the title input field and its alert message.
 * @returns {string} The HTML content for the title input field and its alert message.
 */
function createTitleInputHTML() {
  return `
  <input type="text" id="titleAddTaskFloating" class="titleAddTaskFloating" maxlength="50" name="title" placeholder="Enter a title" required>
  <div id="alertTitleBoard" class="alertMessage"></div>
  `;
}


/**
 * Creates the HTML content for the description input field.
 * @returns {string} The HTML content for the description input field.
 */
function createDescriptionInputHTML() {
  return `
  <label for="descriptionAddTaskFloating" class="styleDescription">
    <span id="descriptionTitleAddTask" class="descriptionTitleAddTask">Description
      <span id="optionalDescriptionTitleAddTask" class="optionalDescriptionTitleAddTask">(optional)</span>
    </span>
  </label>
  <textarea id="descriptionAddTaskFloating" class="descriptionAddTaskFloating" name="description" rows="4" cols="50" placeholder="Enter a Description"></textarea>
  `;
}


/**
 * Creates the HTML content for the due date input field.
 * @returns {string} The HTML content for the due date input field.
 */
function createDueDateInputHTML() {
  return `
  <label class="styleDueDate" for="dueDateAddTaskFloating">Due date</label>
  <input type="date" id="dueDateAddTaskFloating" class="dueDateAddTaskFloating" name="due_date" onload="setTodayDate()" onblur="validateSelectedDate()" required placeholder="dd/mm/yyyy">
  <div id="alertDateBoard" class="alertMessage"></div>
  `;
}


/**
 * Creates the HTML content for the priority options.
 * @returns {string} The HTML content for the priority options.
 */
function createPriorityOptionsHTML() {
  return `
  <div class="priority">
    <div class="priorityHeader">Priority</div>
    <div class="priorityBox">
        ${createPriorityOptionHTML("urgent", "alta", "alta (1)")}
        ${createPriorityOptionHTML("medium", "media (1)", "media")}
        ${createPriorityOptionHTML("low", "baja", "baja (1)")}
    </div>
  </div>
  <div id="alertPrioBoard" class="alertMessage"></div>
  `;
}


/**
 * Creates the HTML content for a priority option.
 * @param {string} priority - The priority level.
 * @param {string} colorImg - The filename of the colored icon.
 * @param {string} grayImg - The filename of the grayscale icon.
 * @returns {string} The HTML content for the priority option.
 */
function createPriorityOptionHTML(priorityType, colorImgSrc, grayImgSrc) {
  return `
    <div class="${priorityType}" onclick="handlePriorityClick('${priorityType}')">${priorityType.charAt(0).toUpperCase() + priorityType.slice(1)}
      <img class="colorImg" src="assets/img/Prio ${colorImgSrc}.png" id="${priorityType}IconColor">
      <img class="grayImg" src="assets/img/Prio ${grayImgSrc}.png" id="${priorityType}IconGray">
    </div>
  `;
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
 * Creates the HTML content for the category input field and dropdown.
 * @returns {string} The HTML content for the category input field and dropdown.
 */
function createCategoryInputHTML() {
  return `
  <div class="categoryHeader">
    <div class="styleCategory"><b>Category</b></div>
    <div class="inputWithIcon" onclick="technicalUser(), toggleCategory()">
        <input type="text" id="categoryInput" class="categoryInput" placeholder="Select task category..." readonly required>
        <img id="categoryDropdown" src="assets/img/arrow_drop_down.png" class="dropdownIcon">
    </div>
    <div id="listTechnical" class="techUser"></div>
  </div>
  <div id="alertCategoryBoard" class="alertMessage"></div>
  `;
}


/**
 * Generates HTML for adding subtasks.
 * 
 * Includes an input field for adding new subtasks, an icon container for selecting icons,
 * and an alert message container for validation messages.
 * 
 * @returns {string} HTML content for adding subtasks.
 */
function createSubtasksInputHTML() {
  return `
  <div class="subtasks">
    <div class="styleSubtasks"><b>Subtasks</b> (optional)</div>
    <div class="inputWithIcon">
        <input type="text" placeholder="Add new subtask..." id="subTaskInput" class="subTaskInput">
        <div id="iconContainerSubtasks" class="iconContainerSubtasks">
          <img id="subTaskMain" class="subTaskMain" onclick="changeIconsSubtask()" src="assets/img/Subtask's icons.png" class="dropdownIcon">
        </div>
      </div>
      <div id="alertSubtaskBoard" class="alertMessage"></div>
    <div id="subtaskList" class="subtaskList"></div>
  </div>
  `;
}


/**
 * Generates HTML for the submit button.
 * 
 * Includes a button for submitting the task creation form.
 * 
 * @returns {string} HTML content for the submit button.
 */
function createSubmitButtonHTML() {
  return `
  <div class="button-container">
      <div class="button-box">
          <div class="create-button">
              <button class="create" type="submit">Create Task<img src="assets/img/check.png"></button>
          </div>
      </div>
  </div>
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
  if (mainUserInfos[0] && mainUserInfos[0]["tasks"] && mainUserInfos[0]["tasks"][i]) {
    const task = mainUserInfos[0]["tasks"][i];
    updateTaskDataFromMainUserInfos(task);
    renderTaskBoardHTML(i);
    renderAssignedMembers(i, task);
    renderSubtasks(i, task);
    transformPriorityToImgOverBoard(i);
  }
}


/**
 * Updates task data from the main user infos.
 * 
 * @param {Object} task - The task object to update data from.
 */
function updateTaskDataFromMainUserInfos(task) {
  if (task["category"] !== undefined) addCategoryInput = task["category"];
  if (task["title"] !== undefined) addTitleInput = task["title"];
  if (task["description"] !== undefined) addDescriptionInput = task["description"];
  if (task["dueDate"] !== undefined) {
    let dueDate = new Date(task["dueDate"]);
    let day = dueDate.getDate();
    let month = dueDate.getMonth() + 1;
    let year = dueDate.getFullYear();
    addDateInput = `${day}/${month}/${year}`;
  }
  if (task["priority"] !== undefined) addPriorityInput = task["priority"];
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
      <div class="deleteOverBoard"><img src="assets/img/delete.svg" alt="deleteBtn" onclick="deleteTask(${i}), closeCard(${i})"> Delete</div>
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
      if (status[j] === true && typeof members[j] === 'string') {
        const memberFirstLetter = members[j].split(" ").slice(0, 2).map((word) => word.charAt(0)).join("");
        document.getElementById(`contactsOverBoardContainer`).innerHTML += `
          <div class="membersOverBoardContainer">
              <div class="profileOnBoard" id="selectedProfilOnBoard${i}">${memberFirstLetter}</div>
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
    let isChecked = mainUserInfos[0]["tasks"][i]["done"][j] === true ? "checked" : ""; // Überprüfung, ob die Checkbox gecheckt werden soll
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
  const progress = Array.isArray(element.done) ? element.done.filter(item => item === true).length : 0;
  const goal = element.subtasks && Array.isArray(element.subtasks) ? element.subtasks.length : 0;
  const result = `${progress}/${goal}`;
  const progressHTML = goal > 0 ? generateProgressHTML(element.id, result) : '';
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
 * Retrieves the value of the title input field from the floating task board.
 * 
 * @returns {string} The value of the title input field, or an empty string if the input field is not found.
 */
function addTitleToBoard() {
  let addTitleInput = document.getElementById("titleAddTaskFloating");
  if (addTitleInput) {
    return addTitleInput.value;
  } else {
    return "";
  }
}


/**
 * Retrieves the value of the description input field from the floating task board.
 * 
 * @returns {string} The value of the description input field, or an empty string if the input field is not found.
 */
function addDescriptionToBoard() {
  let addDescriptionInput = document.getElementById(
    "descriptionAddTaskFloating"
  );
  if (addDescriptionInput) {
    return addDescriptionInput.value;
  } else {
    return "";
  }
}


/**
 * Retrieves the value of the due date input field from the floating task board.
 * 
 * @returns {string} The value of the due date input field, or an empty string if the input field is empty.
 */
function addDueDateToBoard() {
  let addDueDateInput = document.getElementById("dueDateAddTaskFloating").value;
  if (addDueDateInput) {
    return addDueDateInput;
  } else {
    return "";
  }
}


/**
 * Retrieves the value of the category input field from the floating task board.
 * 
 * @returns {string} The value of the category input field, or an empty string if the input field is empty.
 */
function addCategoryToBoard() {
  let addCategoryInput = document.getElementById("categoryInput");
  if (addCategoryInput) {
    return addCategoryInput.value;
  } else {
    return "";
  }
}


/**
 * Creates an array representing the status of subtasks on the floating task board.
 * 
 * @returns {string[]} An array containing the status of subtasks, initialized to "false".
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
 * Updates task information based on user input and renders the updated task on the board.
 * 
 * @param {Event} event - The event object triggered by the form submission.
 * @param {number} taskId - The ID of the task to be updated.
 * @returns {Promise<void>} A Promise that resolves after the task information is updated and the task is rendered.
 */
async function updateTaskInfos(event, taskId) {
  event.preventDefault();
  const { priority, category } = mainUserInfos[0].tasks[taskId];
  const updatedTitle = document.getElementById(`titleEdit${taskId}`).value;
  const updatedDescription = document.getElementById(`descriptionAddTaskFloating${taskId}`).value;
  const updatedDueDate = document.getElementById(`dueDateAddTaskFloating${taskId}`).value;
  updateTaskFields(taskId, updatedTitle, updatedDescription, updatedDueDate, priority, category);
  await updateStorage();
  renderTaskFloating(taskId);
  closeCard(taskId);
}



/**
 * Aktualisiert die Felder einer Aufgabe mit den übergebenen Werten.
 * @param {number} taskId - Die ID der Aufgabe.
 * @param {string} title - Der aktualisierte Titel der Aufgabe.
 * @param {string} description - Die aktualisierte Beschreibung der Aufgabe.
 * @param {string} dueDate - Das aktualisierte Fälligkeitsdatum der Aufgabe.
 * @param {string} priority - Die aktualisierte Priorität der Aufgabe.
 * @param {string} category - Die aktualisierte Kategorie der Aufgabe.
 */
function updateTaskFields(taskId, title, description, dueDate, priority, category) {
  const task = mainUserInfos[0].tasks[taskId];
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.priority = priority;
  task.category = category;
  task.subtasks = addSubtasks;
  task.status = statusMembers;
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
 * Fügt Mitglieder zur Aufgabe hinzu.
 * @returns {Array} Ein Array mit den hinzugefügten Mitgliedern.
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