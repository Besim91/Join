/**
 * Renders the contact list on the board and toggles its visibility.
 *
 * @function renderContactsOnBoardEdit
 * @returns {void}
 */
function renderContactsOnBoardEdit() {
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
 * Validiert das ausgewählte Datum für die Bearbeitungsaufgabe.
 * Wenn das ausgewählte Datum in der Vergangenheit liegt, wird eine Warnmeldung angezeigt
 * und das Eingabefeld wird geleert.
 * @param {number} i Der Index des Elements, das das Datum enthält.
 */
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
  
  function toggleCheckbox(i) {
    const checkbox = document.getElementById(`checkboxMember${i}`);
    checkbox.checked = !checkbox.checked;
    updateStatus(i);
}


  document.querySelectorAll('.customCheckbox').forEach(function(checkbox) {
    checkbox.addEventListener('click', function(event) {
        // Stoppe die Ereignis-Propagation, damit das Klicken auf die Checkbox nicht das Klicken auf das contactsBoardContainer auslöst
        event.stopPropagation();
        // Rufe die updateStatus-Funktion auf
        updateStatus(checkbox.id.replace('checkboxMember', ''));
    });
});
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
  



  
  