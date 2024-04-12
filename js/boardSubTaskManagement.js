/**
* Change the icons in the subtask section to indicate different actions.
* 
* This function changes the icons in the subtask section to allow users to close or add subtasks.
* 
* @returns {void} - This function doesn't return anything.
*/
function changeIconsSubtask() {
    let iconsContainer = document.getElementById("iconContainerSubtasks");
    iconsContainer.innerHTML = `
    <img src="assets/img/subtaskiconsclose.svg" alt="close img" onclick="changeIconsSubtaskBack()">
    <div class="seperaterSubtasks"></div>
    <img src="assets/img/subtaskiconsadd.svg" alt="add img" onclick="valueSubtask(), changeIconsSubtaskBack()">
    `;
}

/**
* Change the icons in the subtask section back to the default state.
* 
* This function changes the icons in the subtask section back to the default state after adding or closing subtasks.
* 
* @returns {void} - This function doesn't return anything.
*/
function changeIconsSubtaskBack() {
    let inputContainer = document.getElementById("subTaskInput");
    let iconsContainer = document.getElementById("iconContainerSubtasks");
    iconsContainer.innerHTML = `
    <img id="subTask" onclick="changeIconsSubtask()" src="assets/img/Subtask's icons.png" class="dropdownIcon">
    `;
    inputContainer.value = "";
}

/**
* Allow editing of a subtask.
* 
* This function enables the user to edit a subtask by replacing it with an input field.
* 
* @param {number} i - The index of the subtask to be edited.
* @returns {void} - This function doesn't return anything.
*/
function editSubtask(i) {
    document.getElementById(`valueSubtaskContainer${i}`).innerHTML = `
    <input value="${addSubtasks[i]}" id="inputEditSubtask${i}" class="inputEditSubtaskInProcess">
    <div class="editDeleteSubtaskIconContainerInProcess">
      <img src="assets/img/delete.svg" alt="edit icon" id="editSubtaskIcon" onclick="deleteChanges(${i})">
      <div class="seperaterSubtasks"></div>
      <img src="assets/img/check.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="acceptChanges(${i})">
    </div>
    `;
}

/**
* Delete a subtask.
* 
* This function removes a subtask from the list of subtasks.
* 
* @param {number} i - The index of the subtask to be deleted.
* @returns {void} - This function doesn't return anything.
*/
function deleteSubtask(i) {
    var elementToRemove = document.getElementById(`valueSubtaskContainer${i}`);
    elementToRemove.remove();
    addSubtasks.splice(i, 1);
    for (let i = 0; i < addSubtasks.length; i++) {
        document.getElementById("subtaskListMain").innerHTML += `
      <div id="valueSubtaskContainer${i}" class="valueSubtaskContainer">
        <li>${addSubtasks[i]}</li>
        <div class="editDeleteSubtaskIconContainer">
          <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
          <div class="seperaterSubtasks"></div>
          <img src="assets/img/delete.svg" alt="delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
        </div>
      </div>  
        `;
    }
    if(addSubtasks.length === 0) {
        addSubtaskStatus = []
    }
}

/**
 * Cancel editing a subtask.
 * 
 * This function cancels the editing of a subtask and restores its original display.
 * 
 * @param {number} i - The index of the subtask being edited.
 * @returns {void} - This function doesn't return anything.
 */
function deleteChanges(i) {
    document.getElementById(`valueSubtaskContainer${i}`).innerHTML = `
      <li>${addSubtasks[i]}</li>
        <div class="editDeleteSubtaskIconContainer">
          <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
          <div class="seperaterSubtasks"></div>
          <img src="assets/img/delete.svg" alt="delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
        </div>
      </div>`;
}


/**
 * Accept changes made to a subtask.
 * 
 * This function accepts changes made to a subtask during editing and updates its value.
 * 
 * @param {number} i - The index of the subtask being edited.
 * @returns {void} - This function doesn't return anything.
 */
function acceptChanges(i) {
    let newValue = document.getElementById(`inputEditSubtask${i}`).value
    addSubtasks[i] = newValue;
    document.getElementById(`valueSubtaskContainer${i}`).innerHTML = `
      <li>${addSubtasks[i]}</li>
        <div class="editDeleteSubtaskIconContainer">
          <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
          <div class="seperaterSubtasks"></div>
          <img src="assets/img/delete.svg" alt="delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
        </div>
      `
}


/**
 * Set the current box to 'toDoTasks'.
 * 
 * This function sets the current box to 'toDoTasks', indicating that tasks being manipulated
 * or displayed belong to the 'To Do' category.
 * 
 * @returns {void} - This function doesn't return anything.
 */
function setBoxToDo() {
    currentBox = 'toDoTasks';
}


/**
 * Set the current box to 'inProgressTasks'.
 * 
 * This function sets the current box to 'inProgressTasks', indicating that tasks being manipulated
 * or displayed belong to the 'In Progress' category.
 * 
 * @returns {void} - This function doesn't return anything.
 */
function setBoxInProgress() {
    currentBox = 'inProgressTasks';
}


/**
 * Set the current box to 'awaitFeedbackTasks'.
 * 
 * This function sets the current box to 'awaitFeedbackTasks', indicating that tasks being manipulated
 * or displayed belong to the 'Awaiting Feedback' category.
 * 
 * @returns {void} - This function doesn't return anything.
 */
function setBoxAwaitFeedback() {
    currentBox = 'awaitFeedbackTasks';
}

/**
 * Toggles the checkbox state when a member is clicked in the editing area.
 * If the checkbox is checked, it will be unchecked; if it's unchecked, it will be checked.
 *
 * @function checkCheckbox
 * @param {number} i - The index of the member whose checkbox state is to be toggled.
 * @returns {void}
 */
function checkCheckbox(i) {
    var checkbox = document.getElementById(`checkboxMember${i}`);
    checkbox.checked = !checkbox.checked;
}

/**
* Check subtask completion status and update it.
* 
* @param {number} i - The index of the task.
* @param {number} j - The index of the subtask.
* @returns {void}
*/
async function checkSubtasks(i, j) {
    let checkbox = document.getElementById(`checkbox${j}`);
    if (checkbox.checked) {
        mainUserInfos[0]["tasks"][i]["done"][j] = true;
    } else {
        mainUserInfos[0]["tasks"][i]["done"][j] = false;
    }
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    updateCheckBoxes(i, j);
}

/**
* Update checkboxes based on subtask completion status.
* 
* @param {number} i - The index of the task.
* @param {number} j - The index of the subtask.
* @returns {void}
*/
function updateCheckBoxes(i, j) {
    if (mainUserInfos[0]["tasks"][i]["done"][j] === true) {
        document.getElementById(`checkbox${j}`).checked = true;
    } else {
        document.getElementById(`checkbox${j}`).checked = false;
    }
}

/**
 * Updates the progress of a task based on the checkbox state of a contact.
 * 
 * @param {number} i - The index of the task to update progress for.
 * @returns {void}
 */
function updateProgress(i) {
    var checkbox = document.getElementById(`checkbox${i}`);
    if (!checkbox.checked) {
        let doneCount = 0;
        mainUserInfos[0]["tasks"][i]["done"].pop(doneCount);
    } else {
        let doneCount = 0;
        mainUserInfos[0]["tasks"][i]["done"].push(doneCount);
    }
}