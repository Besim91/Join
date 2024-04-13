
/**
 * Creates the HTML content for the add task form.
 * @returns {string} The HTML content for the add task form.
 */
function createAddTaskFormHTML() {
  return `
  <div class="addTaskContainer" id="addTaskFloating" >
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
  