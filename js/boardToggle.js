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
      card.classList.remove("activeAddTask");
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
 * Display an alert message when the title field is not filled.
 *
 * This function sets an alert message in the designated HTML element to remind the user to select a title.
 * The alert message disappears after a delay of 3 seconds.
 *
 * @returns {void}
 */
function alertTitel() {
    var alertMessageTitle = "Please select a Titel";
    document.getElementById("alertTitleBoard").innerHTML = alertMessageTitle;
    setTimeout(function () {
      document.getElementById("alertTitleBoard").innerHTML = "";
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
    var alertMessageDate = "Please select a Due Date";
    document.getElementById("alertDateBoard").innerHTML = alertMessageDate;
    setTimeout(function () {
      document.getElementById("alertDateBoard").innerHTML = "";
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
    var alertMessagePriority = "Please select a priority!";
    document.getElementById("alertPrioBoard").innerHTML = alertMessagePriority;
    setTimeout(function () {
      document.getElementById("alertPrioBoard").innerHTML = "";
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
    var alertMessageCategory = "Please select a category!";
    document.getElementById("alertCategoryBoard").innerHTML =
      alertMessageCategory;
    setTimeout(function () {
      document.getElementById("alertCategoryBoard").innerHTML = "";
    }, 3000);
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
 * Retrieves the value of the subtask input field. If the input value is not empty,
 * adds the subtask to the list and updates the display. Otherwise, displays an alert message.
 *
 * @returns {void}
 */
    function valueSubtask() {
        var input = document.getElementById("subTaskInput").value;
        if (input.length > 0) {
          addSubtaskToListAndDisplay();
        } else {
          var alertMessageTitle = "Please enter a Letter";
          document.getElementById("alertSubtaskBoard").innerHTML = alertMessageTitle;
          setTimeout(function () {
            document.getElementById("alertSubtaskBoard").innerHTML = "";
          }, 3000); // Verzögerung von 3 Sekunden (3000 Millisekunden)
        }
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
  

  /**
 * Fügt einen Event-Listener hinzu, um zu überprüfen, ob ein Klick außerhalb bestimmter Elemente erfolgt ist.
 * Wenn ja, wird eine Funktion aufgerufen, um eine Kartenrückkehr zu aktivieren.
 * @param {Event} event - Das Klickereignis, das ausgelöst wurde.
 */
  document.addEventListener("click", function(event) {
    let card = document.getElementById("addTaskFloating");
    let addButton = document.getElementById("addTaskBtn"); 
    let addForm = document.querySelector(".inputWithIcon"); 
    let clickedElement = event.target;
    if (
      (clickedElement.tagName === 'IMG' && (clickedElement.alt === 'close img' || clickedElement.alt === 'add img')) || 
      (clickedElement.id === 'subTaskMain')
    ) {
      return;
    }
      if (card && card.classList.contains("activeAddTask") && event.target !== card && event.target !== addButton && event.target !== addForm && !card.contains(event.target) && !addButton.contains(event.target) && !addForm.contains(event.target)) {
      toggleCardBack(); 
    }
  });
  