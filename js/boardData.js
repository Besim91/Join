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