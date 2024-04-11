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


/**
* Deletes a member from the array of added members.
* 
* @param {number} i - The index of the member to delete.
* @returns {void}
*/
function deleteMember(i) {
    addMembersValueArray.splice(i, 1);
}


/**
* Transforms the priority of a task into an image representation on the board.
* 
* @param {number} i - The index of the task to transform priority for.
* @returns {void}
*/
function transformPriorityToImg(i) {
    if (mainUserInfos[0]["tasks"][i]["priority"] === "low") {
        document.getElementById(`priorityOnBoard${i}`).innerHTML = `
          <img src="assets/img/Prio baja.png" alt="low priority">
          `;
    }
    if (mainUserInfos[0]["tasks"][i]["priority"] === "medium") {
        document.getElementById(`priorityOnBoard${i}`).innerHTML = `
          <img src="assets/img/Prio media (1).png" alt="medium priority">
          `;
    }
    if (mainUserInfos[0]["tasks"][i]["priority"] === "urgent") {
        document.getElementById(`priorityOnBoard${i}`).innerHTML = `
          <img src="assets/img/Prio alta.png" alt="urgent priority">
          `;
    }
}


/**
* Transform priority to image representation on the task board overlay based on task index.
* 
* @param {number} i - The index of the task to transform priority for.
* @returns {void}
*/
function transformPriorityToImgOverBoard(i) {
    if (mainUserInfos[0]["tasks"][i]["priority"] === "low") {
        renderPriorityOptionsOnBoardLow();
    }
    if (mainUserInfos[0]["tasks"][i]["priority"] === "medium") {
        renderPriorityOptionsOnBoardMedium();
    }
    if (mainUserInfos[0]["tasks"][i]["priority"] === "urgent") {
        renderPriorityOptionsOnBoardUrgent();
    }
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
* Handle form submission for tasks.
* 
* @param {Event} event - The form submission event.
* @returns {void}
*/
function handleTaskForm(event) {
    event.preventDefault();
    if (titleAddTaskFloating.value === '') {
        alertTitel();
    }
    if (dueDateAddTaskFloating.value === '') {
        alertDate();
    }
    if (currentPriority === undefined) {
        alertPrio();
    }
    if (selectedCategoryInput !== 'User Story' && selectedCategoryInput !== 'Technical Task') {
        alertCategory();
    }
    else {
        noAlertStartHandleTaskForm();
    }
}


/**
* Proceed with handling the task form submission when no alerts are triggered.
* 
* This function fills the array with task details, toggles priority, clears the add task floating form, and shows an alert.
* 
* @returns {void}
*/
function noAlertStartHandleTaskForm() {
    fillArray();
    togglePriority(activePriority);
    clearAddTaskFloating();
    showAlert();
}


/**
* Update the IDs of tasks to match their order on the board.
* 
* This function reassigns the IDs of tasks in the mainUserInfos array to match their order on the board.
* 
* @returns {Promise<void>} - A Promise that resolves when the IDs are updated and the mainUserInfos array is stored.
*/
async function newOrderIds() {
    for (let i = 0; i < mainUserInfos[0]["tasks"].length; i++) {
        mainUserInfos[0]["tasks"][i]["id"] = i;
    }
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
}


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
 * Closes a card by hiding the overlay background and the specified card container.
 * @param {number} i - The index of the card container to be closed.
 */
function closeCard(i) {
    document.getElementById("blurBoardBackground").classList.add("dNone");
    document
        .getElementById(`tasksOverBoardContainer${i}`)
        .classList.add("dNone");
    updateHTML();
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
* Retrieves values necessary for filling a task object from various functions.
* 
* @returns {Object} An object containing the retrieved values:
* - countIDs: The count of task IDs.
* - addTitleValue: The title value of the task.
* - addDescriptionValue: The description value of the task.
* - addDueDateInput: The due date value of the task.
* - addSubtaskStatus: The status of subtasks for the task.
*/
function getValuesToFillArray() {
    const countID = countIds();
    const titleValue = addTitleToBoard();
    const descriptionValue = addDescriptionToBoard();
    const dueDateInput = addDueDateToBoard();
    const subtaskStatus = addDoneToBoard();
    return {
        countIDs: countID,
        addTitleValue: titleValue,
        addDescriptionValue: descriptionValue,
        addDueDateInput: dueDateInput,
        addSubtaskStatus: subtaskStatus
    };
}


/**
* Counts the number of task IDs in the main user's task list and returns the next available ID.
* 
* @returns {number} The next available task ID.
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
* Asynchronously deletes a task from the main user's task list at the specified index.
* 
* @param {number} i - The index of the task to be deleted.
* @returns {Promise<void>} A promise that resolves when the task is successfully deleted and HTML is updated.
*/
async function deleteTask(i) {
    mainUserInfos[0]["tasks"].splice(i, 1);
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    updateHTML();
    document.getElementById("blurBoardBackground").classList.add("dNone");
}


/**
 * Sets the current dragged element when dragging starts.
 * 
 * @param {string} id - The ID of the element being dragged.
 * @returns {void}
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * Allows a drop event to occur by preventing the default action.
 * 
 * @param {Event} ev - The event object representing the drop event.
 * @returns {void}
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Moves the currently dragged task to the specified task box and updates the main user's task list.
 * 
 * @param {string} box - The target task box where the task will be moved.
 * @returns {Promise<void>} A promise that resolves when the task is successfully moved and HTML is updated.
 */
async function moveTo(box) {
    mainUserInfos[0]["tasks"][currentDraggedElement]["box"] = box;
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    updateHTML();
}


/**
 * Clears the input fields and task-related elements in the add task floating interface.
 * 
 * @returns {void}
 */
function clearAddTaskFloating() {
    document.getElementById("titleAddTaskFloating").value = "";
    document.getElementById("descriptionAddTaskFloating").value = "";
    document.getElementById("dueDateAddTaskFloating").value = "";
    document.getElementById("assignedInput").innerHTML = "";
    document.getElementById("categoryInput").value = "";
    document.getElementById("subTaskInput").value = "";
    document.getElementById("subtaskList").innerHTML = "";
}


/**
* Updates the 'To Do' task box by populating it with tasks from the main user's task list.
* 
* @returns {void}
*/
function swapToDo() {
    let addedToDo = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "toDoTasks"
    );
    document.getElementById("toDoTasks").innerHTML = "";
    for (let i = 0; i < addedToDo.length; i++) {
        const element = addedToDo[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("toDoTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo,
        );
    }
}


/**
 * Updates the 'In Progress' task box by populating it with tasks from the main user's task list.
 * 
 * @returns {void}
 */
function swapInProgress() {
    let addedInProgress = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "inProgressTasks"
    );
    document.getElementById("inProgressTasks").innerHTML = "";
    for (let i = 0; i < addedInProgress.length; i++) {
        const element = addedInProgress[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("inProgressTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo,
        );
    }
}


/**
 * Updates the 'Awaiting Feedback' task box by populating it with tasks from the main user's task list.
 * 
 * @returns {void}
 */
function swapAwaitFeedback() {
    let addedAwaitFeedback = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "awaitFeedbackTasks"
    );
    document.getElementById("awaitFeedbackTasks").innerHTML = "";
    for (let i = 0; i < addedAwaitFeedback.length; i++) {
        const element = addedAwaitFeedback[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("awaitFeedbackTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo,
        );
    }
}


/**
 * Updates the 'Done' task box by populating it with tasks from the main user's task list.
 * 
 * @returns {void}
 */
function swapDone() {
    let addedDone = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "doneTasks"
    );
    document.getElementById("doneTasks").innerHTML = "";
    for (let i = 0; i < addedDone.length; i++) {
        const element = addedDone[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("doneTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo,
        );
    }
}


/**
* Asynchronously adds a new task to the 'To Do' task list of the main user.
* 
* @param {Object} newToDo - The new task to be added.
* @returns {Promise<void>} A promise that resolves when the task is successfully added and HTML is updated.
*/
async function pushToDo(newToDo) {
    mainUserInfos[0]["tasks"].push(newToDo);
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    updateHTML();
    addSubtasks = [];
}


/**
* Constructs a new task object with data retrieved from various functions,
* adds it to the main user's task list, and clears the add task interface.
* 
* @returns {void}
*/
function fillArray() {
    const newToDo = {
        id: countIds(),
        box: currentBox,
        title: addTitleToBoard(),
        description: addDescriptionToBoard(),
        category: selectedCategoryInput,
        dueDate: addDueDateToBoard(),
        members: addMembers,
        status: statusMembers,
        subtasks: addSubtasks,
        done: addDoneToBoard(),
        priority: currentPriority,
    };
    pushToDo(newToDo);
    clearAddTaskFloating();
}


/**
 * Sets today's date in the due date input field.
 */
/**
 * Sets today's date in the due date input field.
 */function setTodayDate() {
    var today = new Date().toISOString().split('T')[0];
    var dueDateInput = document.getElementById('dueDateAddTaskFloating');
    if (dueDateInput) {
        dueDateInput.setAttribute('min', today);
    } else {
        console.error('Das Element mit der ID "dueDateAddTaskFloating" wurde nicht gefunden.');
    }
}

/**
 * Validates the selected date in the 'dueDateAddTaskFloating' input field.
 * If the selected date is in the past, it displays an alert and clears the input field.
 * 
 * @returns {void}
 */
function validateSelectedDate() {
    var inputDate = document.getElementById('dueDateAddTaskFloating').value;
    if (inputDate.length === 10) { 
        var selectedDate = new Date(inputDate);
        var today = new Date();
        today.setHours(0, 0, 0, 0); 
        if (selectedDate < today) {
            dateAlert();
            document.getElementById('dueDateAddTaskFloating').value = ''; 
        }
    }
  }


  
/**
 * Displays an alert message "Please pick a future date!" for three seconds in the 'alertDateBoard' element.
 * 
 * @returns {void}
 */
  function dateAlert() {
    var alertDateBoard = document.getElementById('alertDateBoard');
    if (alertDateBoard) {
      alertDateBoard.innerText = "Please pick a future date!";
      setTimeout(function() {
        alertDateBoard.innerText = "";
      }, 3000); 
    }
  }