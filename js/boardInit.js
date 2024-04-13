const addTaskFloating = document.querySelector('.addTaskFloating');
const openButton = document.querySelector('.open-button');

/**
 * Asynchronous function called when the document is fully loaded.
 * Initializes the application, includes HTML files, displays user profile,
 * renders content, sets today's date, and sets the current box to 'toDoTasks'.
 *
 * @returns {Promise<void>} A promise that resolves when all tasks are completed.
 */
async function onload() {
    await init();
    await includeHTML();
    displayUserProfile();
    render();
    setTodayDate();
    currentBox = "toDoTasks";
    boardFocused();
    handlePriorityClick('medium');
    assignRandomBackgroundColor();
  }

  /**
 * Adds the 'sideMenuInFocus' class to the board side menu element.
 *
 * @returns {void}
 */
function boardFocused() {
    document.getElementById("boardSidemenu").classList.add("sideMenuInFocus");
  }

  /**
 * Populates the technical category dropdown menu with options based on available categories.
 *
 * @returns {void}
 */
function technicalUser() {
    let technical = document.getElementById("listTechnical");
    technical.innerHTML = "";
    for (let k = 0; k < categorySet.length; k++) {
      technical.innerHTML += `<div class="select" onclick="chosenTechnicalUser('${categorySet[k]}')">${categorySet[k]}</div>`;
    }
  }


/**
 * Adds the value of the subtask input field to the list of subtasks and updates the HTML content
 * to display the added subtask along with edit and delete icons.
 *
 * @returns {void}
 */
function addSubtaskToListAndDisplay() {
    let valueSubtask = document.getElementById("subTaskInput").value;
    addSubtasks.push(valueSubtask);
    valueSubtask.innerHTML = "";
    let clearSubtask = document.getElementById("subtaskList");
    clearSubtask.innerHTML = "";
    for (let i = 0; i < addSubtasks.length; i++) {
      let iterateSubtasks = addSubtasks[i];
      document.getElementById("subtaskList").innerHTML += `
    <div id="valueSubtaskContainer${i}" class="valueSubtaskContainer" ondblclick="editSubtask(${i})">
      <li>${iterateSubtasks}</li>
      <div class="editDeleteSubtaskIconContainer">
        <img src="assets/img/edit.svg" alt="edit icon" id="editSubtaskIcon" onclick="editSubtask(${i})">
        <div class="seperaterSubtasks"></div>
        <img src="assets/img/delete.svg" alt"delete icon" id="deleteSubtaskIcon" onclick="deleteSubtask(${i})">
      </div>
    </div>
    `;
    }
  }


  /**
 * Adds contacts to the board and fills them with data from the user's contact book.
 *
 * @returns {void}
 */
function addContactToBoardAndFill() {
    if (mainUserInfos[0]["contactBook"]) {
      let contactBoard = document.getElementById("listContactContainerBoard");
      for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
        contactBoard.innerHTML += `
      <div class="contactsBoardContainer" onclick="toggleCheckbox(${i})">
          <div class="contactsBoardContainerChild">   
              <div class="styleMembersAddTask" id="profilMember${i}"></div>
              <span class="nameMember" id="nameMember${i}"></span>
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


  /**
 * Adds checkbox status to each contact based on the status array.
 *
 * @returns {void}
 */
function addCheckboxStatus() {
    for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
      let checkbox = document.getElementById(`checkboxMember${i}`);
      checkbox.checked = statusMembers[i];
    }
  }


  /**
 * Updates the status of a contact based on the checkbox state.
 *
 * @param {number} i - The index of the contact to update.
 * @returns {void}
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
 * Fills contact information on the board for the specified index.
 *
 * @param {number} i - The index of the contact to fill information for.
 * @returns {void}
 */
function fillContactsOnBoard(i) {
    const fullName = mainUserInfos[0]["contactBook"][i]["name"];
    const initials = fullName
      .split(" ")
      .map((word) => word.slice(0, 1).toUpperCase())
      .join("");
    document.getElementById(`profilMember${i}`).innerHTML = initials;
    document.getElementById(`nameMember${i}`).innerHTML = fullName;
  }
  
  /**
   * Fills contact information on the task board for the specified task index.
   *
   * @param {number} i - The index of the task to fill contact information for.
   * @returns {void}
   */
  function fillContactsOverBoard(i) {
    for (let j = 0; j < mainUserInfos[0]["tasks"][i]["members"].length; j++) {
      const fullName = mainUserInfos[0]["tasks"][i]["members"][j];
      const initials = fullName
        .split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("");
      document.getElementById(`profilMemberOverBoardInitials${j}`).innerHTML =
        initials;
      document.getElementById(`memberOverBoard${j}`).innerHTML = fullName;
    }
  }