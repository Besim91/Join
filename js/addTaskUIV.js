/**
 * Initializes the page.
 * @returns {Promise<void>} A Promise object.
 */

async function onload() {
    await init();
    await includeHTML();
    displayUserProfile();
    setTodayDate();
    addStatusToMembers();
    addTaskFocused();
    handlePriorityClick('medium')
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
 * Validates the selected date in the input field 'dueDateMainAddTask'.
 * If the selected date is in the past, it displays an alert and clears the input field.
 * This function is triggered when the input field loses focus.
 *
 * @returns {void}
 */
function validateSelectedDate() {
    var inputDate = document.getElementById("dueDateMainAddTask").value;
    if (inputDate.length === 10) {
      var selectedDate = new Date(inputDate);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        dateAlert();
        document.getElementById("dueDateMainAddTask").value = "";
      }
    }
  }

  /**
 * Displays an alert message "Please pick a future date!" for three seconds in the 'alertDate' element.
 *
 * @returns {void}
 */
function dateAlert() {
    var alertDate = document.getElementById("alertDate");
    if (alertDate) {
      alertDate.innerText = "Please pick a future date!";
      setTimeout(function () {
        alertDate.innerText = "";
      }, 3000);
    }
  }

  /**
 * Handles the form submission event for adding a task.
 * Displays alert messages if required fields are empty or if a valid category is not selected.
 *
 * @param {Event} event - The form submission event.
 * @returns {void}
 */
function handleTaskForm(event) {
    event.preventDefault();
    if (titleMainAddTask.value === "") {
      alertTitel();
      return;
    }
    if (dueDateMainAddTask.value === "") {
      alertDate();
      return;
    }
    if (currentPriority === undefined) {
      alertPrio();
      return;
    }
    if (
      selectedCategoryInput !== "User Story" &&
      selectedCategoryInput !== "Technical Task"
    ) {
      alertCategory();
      return;
    }
    continueTaskFormHandling();
  }

  /**
 * Handles the remaining task form handling process after all validations are passed.
 *
 * @returns {void}
 */
function continueTaskFormHandling() {
    if (
      selectedCategoryInput !== "User Story" &&
      selectedCategoryInput !== "Technical Task"
    ) {
      var alertMessage = document.getElementById("alertCategory");
      alertMessage.innerHTML = "Please select a valid category!";
      return;
    } else {
      fillArray();
      togglePriority(activePriority);
      clearAddTaskFloating();
      showAlert();
    }
  }

  /**
 * Redirects the user to the "board.html" page after a delay of three seconds.
 * @function
 * @name redirectToBoardPage
 * @returns {void}
 */
function redirectToBoardPage() {
    setTimeout(function() {
        window.location.href = 'board.html';
    }, 1500); 
  }

  /**
 * Displays an alert if no title is entered.
 */

function alertTitel() {
    // Define the alert message
    var alertMessageTitle = "Please select a Titel!";
    // Display the alert message in the HTML element with the ID 'alertTitle'
    document.getElementById("alertTitle").innerHTML = alertMessageTitle;
    // Clear the alert message after 3 seconds
    setTimeout(function () {
      document.getElementById("alertTitle").innerHTML = "";
    }, 3000); // Delay of 3 seconds (3000 milliseconds)
  }

  /**
 * Displays an alert if no due date is selected.
 */

function alertDate() {
    // Define the alert message
    var alertMessageDate = "Please select a Due Date!";
    // Display the alert message in the HTML element with the ID 'alertDate'
    document.getElementById("alertDate").innerHTML = alertMessageDate;
    // Clear the alert message after 3 seconds
    setTimeout(function () {
      document.getElementById("alertDate").innerHTML = "";
    }, 3000); // Delay of 3 seconds (3000 milliseconds)
  }
  
  /**
   * Displays an alert if no priority is selected.
   */
  
  function alertPrio() {
    // Define the alert message
    var alertMessagePriority = "Please select a priority!";
    // Display the alert message in the HTML element with the ID 'alertPrio'
    document.getElementById("alertPrio").innerHTML = alertMessagePriority;
    // Clear the alert message after 3 seconds
    setTimeout(function () {
      document.getElementById("alertPrio").innerHTML = "";
    }, 3000); // Delay of 3 seconds (3000 milliseconds)
  }
  
  /**
   * Displays an alert if no category is selected.
   */
  
  function alertCategory() {
    // Define the alert message
    var alertMessageCategory = "Please select a category!";
    // Display the alert message in the HTML element with the ID 'alertCategory'
    document.getElementById("alertCategory").innerHTML = alertMessageCategory;
    // Clear the alert message after 3 seconds
    setTimeout(function () {
      document.getElementById("alertCategory").innerHTML = "";
    }, 3000); // Delay of 3 seconds (3000 milliseconds)
  }
  
  /**
   * Fills the array with the entered task information.
   */
  
  function fillArray() {
    let countIDs = countIds();
    let addTitleValue = addTitleToBoard();
    let addDescriptionValue = addDescriptionToBoard();
    let addDueDateInput = addDueDateToBoard();
    let addSubtaskStatus = addDoneToBoard();
    let newToDo = {
      id: `${countIDs}`,
      box: "toDoTasks",
      title: `${addTitleValue}`,
      description: `${addDescriptionValue}`,
      category: selectedCategoryInput,
      dueDate: `${addDueDateInput}`,
      members: addMembers,
      status: statusMembers,
      subtasks: addSubtasks,
      done: addSubtaskStatus,
      priority: currentPriority,
    };
    pushToDo(newToDo);
    clearAddTaskFloating();
    addStatusToMembers();
  }
  
  /**
   * Adds a new task to the tasks array.
   * @param {object} newToDo - The object of the new task.
   * @returns {Promise<void>} A Promise object.
   */
  
  async function pushToDo(newToDo) {
    mainUserInfos[0]["tasks"].push(newToDo);
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    addMembersValueArray = [];
    addSubtasks = [];
    addMembersValue = [];
  }


  /**
 * Displays an alert notification.
 */

function showAlert() {
    var customAlert = document.getElementById("addedTask");
    customAlert.classList.add("show"); // Add CSS class to show the alert
    setTimeout(function () {
      customAlert.style.animation = "flyOutToLeft 1s forwards"; // Start the animation
      setTimeout(function () {
        customAlert.classList.remove("show"); // Remove CSS class to hide the alert
        customAlert.style.animation = ""; // Setzt die Animation zurück
      }, 1000); // Wait for 1 second before hiding the alert
    }, 3000); // Wait for 3 seconds before starting the animation
    redirectToBoardPage();
  }
  
  /**
   * Enables editing of a subtask.
   * @param {number} i - The index of the subtask to edit.
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
   * Deletes a subtask.
   * @param {number} i - The index of the subtask to delete.
   */
  
  function deleteSubtask(i) {
    var elementToRemove = document.getElementById(`valueSubtaskContainer${i}`);
    elementToRemove.remove();
    addSubtasks.splice(i, 1);
    let clear = document.getElementById("subtaskListMain");
    clear.innerHTML = "";
    for (let j = 0; j < addSubtasks.length; j++) {
      document.getElementById("subtaskListMain").innerHTML += `
    <div id="valueSubtaskContainer${j}" class="valueSubtaskContainer">
      <li>${addSubtasks[j]}</li>
      <div class="editDeleteSubtaskIconContainer">
        <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${j})">
        <div class="seperaterSubtasks"></div>
        <img src="assets/img/delete.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${j})">
      </div>
    </div>  
      `;
    }
  }
  
  /**
   * Reverts changes made to a subtask.
   * @param {number} i - The index of the subtask to revert changes.
   */
  
  function deleteChanges(i) {
    document.getElementById(`valueSubtaskContainer${i}`).innerHTML = `
  
    <li>${addSubtasks[i]}</li>
      <div class="editDeleteSubtaskIconContainer">
        <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
        <div class="seperaterSubtasks"></div>
        <img src="assets/img/delete.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
      </div>
    </div>`;
  }
  
  /**
   * Accepts changes made to a subtask.
   * @param {number} i - The index of the subtask to accept changes.
   */
  
  function acceptChanges(i) {
    let newValue = document.getElementById(`inputEditSubtask${i}`).value;
    addSubtasks[i] = newValue;
    document.getElementById(`valueSubtaskContainer${i}`).innerHTML = `
    <li>${addSubtasks[i]}</li>
      <div class="editDeleteSubtaskIconContainer">
        <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
        <div class="seperaterSubtasks"></div>
        <img src="assets/img/delete.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
      </div>
    `;
  }
  
  /**
   * Clears all fields related to adding a task.
   */
  
  function clearCurrentall() {
    statusMembers = [];
    addMembers = [];
    document.getElementById("titleMainAddTask").value = "";
    document.getElementById("descriptionMainAddTask").value = "";
    document.getElementById("dueDateMainAddTask").value = "";
    document.getElementById("assignedInputMain").innerHTML = "";
    document.getElementById("categoryInput").value = "";
    document.getElementById("subTaskInputMain").value = "";
    document.getElementById("subtaskListMain").innerHTML = "";
  }
  
  /**
   * Handles the click event for priority selection.
   * Resets background colors, toggles background color for the selected priority, and adds the priority value.
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
   * Toggles the background color of buttons based on the priority type.
   * If the button has the specified priority type, it adds an active class for that priority type.
   * Otherwise, it removes active classes for all priority types.
   *
   * @param {string} priorityType - The priority type ('low', 'medium', or 'urgent').
   * @returns {void}
   */
  function toggleBackgroundColor(priorityType) {
    const buttons = document.querySelectorAll(".priorityBox > div");
    buttons.forEach((button) => {
      if (button.classList.contains(priorityType)) {
        button.classList.add(
          "activePrio" +
            priorityType.charAt(0).toUpperCase() +
            priorityType.slice(1)
        );
      } else {
        button.classList.remove("activePrioLow");
        button.classList.remove("activePrioMedium");
        button.classList.remove("activePrioUrgent");
      }
    });
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