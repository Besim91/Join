let editIndex = [];
let categorySet = ["Technical Task", "User Story"];
let selectedCategories = [];
let subtaskArray = [];
let letterArray = [];
let randomColorCollection = {};
let initialColorMap = {};

/**
 * Initializes the contact application by setting up the main functions and rendering UI components.
 */
async function initContacts() {
  await init();
  await includeHTML();
  displayUserProfile();
  renderAlphabeticalCategories();
  contactsFocused();
}

/**
 * Adds the 'sideMenuInFocus' class to the contacts side menu, indicating that it is currently in focus.
 */
function contactsFocused() {
  document.getElementById("contactsSidemenu").classList.add("sideMenuInFocus");
}

/**
 * Renders categories alphabetically based on the first letter of each contact's name.
 */
function renderAlphabeticalCategories() {
  for (let j = 0; j < mainUserInfos[0].contactBook.length; j++) {
    let letter = mainUserInfos[0].contactBook[j].name.charAt(0).toUpperCase();
    if (!letterArray.includes(letter)) {
      letterArray.push(letter);
    }
  }
  let contacts = document.getElementById("listContactContainer");
  contacts.innerHTML = "";
  letterArray = letterArray.slice().sort();
  for (let n = 0; n < letterArray.length; n++) {
    contacts.innerHTML += `<div id="${letterArray[n]}"  class="category"><div class="letter">${letterArray[n]}</div><div class="line"></div></div>
    `;
  }
  renderContacts();
}

/**
 * Adds a button to the contact section, which varies based on the number of saved contacts.
 */
function renderBtn() {
  let contacts = document.getElementById("listContactContainer");
  let referenc = mainUserInfos[0].contactBook.length;
  if (referenc < 4) {
    contacts.innerHTML += `<div class="acBtnDiv"><div class="addContactButtonContainerResponsiv">
    <button onclick="addContact()" class="addToContactButtonResponiv">
      <img src="./assets/img/person_add.png">
    </button>
  </div></div>`;
  }
  if (referenc >= 4) {
    contacts.innerHTML += `<div class="addContactButtonContainerResponsivTwo">
    <button onclick="addContact()" class="addToContactButtonResponiv">
      <img src="./assets/img/person_add.png">
    </button>
  </div>`;
  }
}

/**
 * Renders contacts by iterating over the `contactBook` array within `mainUserInfos`.
 * For each contact, it creates an initial from the first letters of their name,
 * applies a random background color, and appends the styled initials to the corresponding
 * element in the DOM.
 */
function renderContacts() {
  for (let i = 0; i < mainUserInfos[0].contactBook.length; i++) {
    let letter = mainUserInfos[0].contactBook[i].name.charAt(0).toUpperCase();
    let contacts = document.getElementById(letter);
    let randomColor = getRandomColorForInitials(
      mainUserInfos[0].contactBook[i].name
    );
    randomColorCollection[i] = randomColor;
    let charStyle = `style="background-color: ${randomColor}"`;
    getFirstCharOfFirstAndLastName(charStyle, contacts, i);
  }
  renderBtn();
}

/**
 * Generates and appends the styled initials for a given contact to a specified DOM element.
 *
 * @param {string} charStyle - The style to be applied to the initials, including the background color.
 * @param {HTMLElement} contacts - The DOM element to which the initials will be appended.
 * @param {number} i - The index of the current contact in the `contactBook` array.
 */
function getFirstCharOfFirstAndLastName(charStyle, contacts, i) {
  let firstName = mainUserInfos[0].contactBook[i].name
    .split(" ")[0]
    .charAt(0)
    .toUpperCase();
  let lastName;
  if (mainUserInfos[0].contactBook[i].name.split(" ").length > 1) {
    lastName = mainUserInfos[0].contactBook[i].name
      .split(" ")[1]
      .charAt(0)
      .toUpperCase();
  } else {
    lastName = " ";
  }
  contacts.innerHTML += insertRenderContacts(i, charStyle, firstName, lastName);
}

/**
 * Inserts HTML code for individual contacts in the contact list.
 *
 * @param {number} i - Index of the contact in the contact book array.
 * @param {string} charStyle - Style attribute for the contact's initial's background color.
 * @param {string} firstName - The first initial of the contact's name.
 * @param {string} lastName - The first initial of the contact's last name or a blank space if not applicable.
 * @returns {string} - HTML string for rendering the contact.
 */
function insertRenderContacts(i, charStyle, firstName, lastName) {
  return `
    <button id="contact_${i}" onclick="pullContact(${i})" class="listContact">
      <div class="chartAt" ${charStyle}>${firstName}${lastName}</div>
      <div class="renderNameEmail" >
        <div id="lN${i}" class="listName">${mainUserInfos[0].contactBook[i].name} </div>
        <div id="lE${i}" class="listEmail">${mainUserInfos[0].contactBook[i].email}</div>
      </div>
      <input class="box" type="checkbox" id="remember" name="remember">
    </button>`;
}

let currentHoverColorId;
let currentOpenContactIndex = null;

/**
 * Handles the interaction when a contact is selected, toggling the detail view and highlighting the selected contact.
 *
 * @param {number} i - The index of the selected contact in the contact book.
 */
function pullContact(i) {
  if (currentOpenContactIndex === i) {
    document.getElementById("pullContactToWindow").classList.toggle("pull");
    changeHoverColor(null);
    currentOpenContactIndex = null;
  } else {
    if (currentOpenContactIndex !== null) {
      document.getElementById("pullContactToWindow").classList.remove("pull");
      changeHoverColor(null);
    }
    document.getElementById("pullContactToWindow").classList.add("pull");
    addHeadlineToPulledWindow(i);
    changeHoverColor(i);
    currentOpenContactIndex = i;
  }
}

/**
 * Changes the hover color of the currently selected contact.
 *
 * @param {number|null} i - The index of the selected contact or null to reset the hover color.
 */
function changeHoverColor(i) {
  if (currentHoverColorId) {
    let previousHoverColor = document.getElementById(currentHoverColorId);
    if (previousHoverColor) {
      previousHoverColor.style.backgroundColor = "";
      let prevIndex = currentHoverColorId.split("_")[1];
      document.getElementById(`lN${prevIndex}`).style.color = "";
      document.getElementById(`lE${prevIndex}`).style.color = "";
    }
  }
  if (i !== null) {
    let hoverColor = document.getElementById(`contact_${i}`);
    if (hoverColor) {
      hoverColor.style.backgroundColor = "rgb(0,92,255)";
      document.getElementById(`lN${i}`).style.color = "white";
      document.getElementById(`lE${i}`).style.color = "white";
      currentHoverColorId = `contact_${i}`;
    }
  } else {
    currentHoverColorId = null;
  }
}

/**
 * Adds the headline of the selected contact in the detail view, including the contact's initials and name.
 *
 * @param {number} i - The index of the selected contact in the contact book.
 */
function addHeadlineToPulledWindow(i) {
  let contactContainer = document.getElementById("pullContactToWindow");
  let char = getCharAfterEmptySpace(i);
  contactContainer.innerHTML = insertAddHeadlineToPulledWindow(i, char);
  addInformationToPulledWindow(i);
}

/**
 * Inserts HTML for the headline in the detail view of a contact, including the contact's initials and action buttons.
 *
 * @param {number} i - The index of the contact in the contact book.
 * @param {string} char - HTML string representing the contact's initials.
 * @returns {string} - HTML string for the headline section of the detail view.
 */
function insertAddHeadlineToPulledWindow(i, char) {
  return `
    <div class="responsivHeader">
      <span class="responsivContactInformation">Contact Information</span>
      <img onclick="pullContact(${i})" src="assets/img/arrow-left-line (1).png" alt="Arrow Image">
    </div>
    <div class="pulledHeadline">
      ${char}
      <div>
        <h1 class="h1Name">${mainUserInfos[0].contactBook[i].name}</h1>
        <div id="editAndDeletetContainer">
          <button onclick="editContact(${i})" class="editAndDeletetBtn">
            <img class="pencilAndTrashImg" src="./assets/img/pencil.png">
            Edit
          </button>
          <button onclick="deleteContact(${i})" class="editAndDeletetBtn">
            <img class="pencilAndTrashImg" src="./assets/img/mulleimer.png">
            Delete
          </button>
        </div>
      </div>
    </div>`;
}

/**
 * Adds additional contact information to the detail view, including email and phone number.
 *
 * @param {number} i - The index of the selected contact in the contact book.
 */
function addInformationToPulledWindow(i) {
  let contactContainer = document.getElementById("pullContactToWindow");
  contactContainer.innerHTML += `<div class="pulledInformation">
  <h2>Contact Information</h2>
     <h4>Email</h4>
     <span style="color:rgb(27, 110, 255)">${mainUserInfos[0].contactBook[i].email}</span>
     <h4>Phone</h4>
     <span>${mainUserInfos[0].contactBook[i].number}</span></div>
     <div><div onclick="openResponsivDeleteEdit()" class="responsivDots"><img src="./assets/img/more_vert.png"></div></div>`;
}

/**
 * Shows the edit and delete button container in a responsive layout.
 */
function openResponsivDeleteEdit() {
  document.getElementById("editAndDeletetContainer").style.transform =
    "translateX(0%)";
}

/**
 * Hides the responsive edit and delete buttons by transforming their container.
 */
function hiddeResponsivDeleteAndEditBtn() {
  let editAndDeleteContainer = document.getElementById(
    "editAndDeletetContainer"
  );
  let currentTransform = window
    .getComputedStyle(editAndDeleteContainer)
    .getPropertyValue("transform");
  if (currentTransform === "matrix(1, 0, 0, 1, 0, 0)") {
    editAndDeleteContainer.style.transform = "translateX(135%)";
  }
}

/**
 * Opens the add contact modal, preparing the UI for a new contact entry.
 */
function addContact() {
  document.getElementById("blurContainer").classList.remove("d-none");
  document.getElementById("upperBody").classList.add("radiusLeft");
  document.getElementById("xBtn").classList.add("closeX");
  document.getElementById("addContactSlideCard").classList.add("slideOpen");
}

/**
 * Closes the add contact modal and clears any entered data.
 */
function closeAddContact() {
  clearInput();
  document.getElementById("blurContainer").classList.add("d-none");
  document.getElementById("addContactSlideCard").classList.remove("slideOpen");
  document
    .getElementById("editDeleteSlideCard")
    .classList.remove("slideOpenEdit");
  editIndex = [];
}

/**
 * Opens the edit contact modal for a selected contact, allowing the user to update contact information.
 *
 * @param {number} i - The index of the contact to be edited in the contact book.
 */
function editContact(i) {
  let userImgLowerBody = document.getElementById("userImgLowerBody");
  let char = getCharAfterEmptySpace(i);
  userImgLowerBody.innerHTML = char;
  document.getElementById("xCloseBtn").classList.add("closeXEdit");
  document.getElementById("blurContainer").classList.remove("d-none");
  document.getElementById("upperBodyEditDelete").classList.add("radiusRight");
  document.getElementById("editDeleteSlideCard").classList.add("slideOpenEdit");
  document.getElementById(
    "inputEditName"
  ).value = `${mainUserInfos[0].contactBook[i].name}`;
  document.getElementById(
    "inputEditEmail"
  ).value = `${mainUserInfos[0].contactBook[i].email}`;
  document.getElementById(
    "inputEditPhone"
  ).value = `${mainUserInfos[0].contactBook[i].number}`;
  renderButtonToEditLowerBody(i);
  editIndex.push(i);
  transformEditSlideCard();
}

/**
 * Adjusts the edit contact modal's UI for smaller screens.
 */
function transformEditSlideCard() {
  let backgroundColor = document.querySelector(
    "#userImgLowerBody #chartAtPulledContact"
  ).style.backgroundColor;
  if (window.innerWidth <= 768) {
    document
      .querySelector("#userImgLowerBody #chartAtPulledContact")
      .classList.remove("chartAtPulledContact");
    document
      .querySelector("#userImgLowerBody #chartAtPulledContact")
      .classList.add("chartAtPulledContactTransformSlideCard");
  }
  document.querySelector(
    "#userImgLowerBody #chartAtPulledContact"
  ).style.backgroundColor = backgroundColor;
}

/**
 * Generates the initials for a given name.
 *
 * @param {string} name - The full name from which initials are extracted.
 * @returns {string} - The initials of the given name.
 */
function getCharAfterEmptySpace(i) {
  let fullName = mainUserInfos[0].contactBook[i].name;
  let firstName = fullName.split(" ")[0];
  let firstNameCapitalized =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  let lastNameCapitalized;
  if (mainUserInfos[0].contactBook[i].name.split(" ").length > 1) {
    lastNameCapitalized =
      mainUserInfos[0].contactBook[i].name
        .split(" ")[1]
        .charAt(0)
        .toUpperCase() +
      mainUserInfos[0].contactBook[i].name.split(" ")[1].slice(1);
  } else {
    lastNameCapitalized = " ";
  }
  return `<div id="chartAtPulledContact" class="chartAtPulledContact" style="background-color: ${
    randomColorCollection[i]
  }">
    ${firstNameCapitalized.charAt(0)}${lastNameCapitalized.charAt(0)}
  </div>`;
}

/**
 * Renders the buttons in the lower body of the edit contact modal.
 *
 * @param {number} i - The index of the contact being edited.
 */
function renderButtonToEditLowerBody(i) {
  document.getElementById("editLowerBody").innerHTML = `
  <button id="deleteContactFromEditCard" class="closeAddContactBtn"
  onclick="closeAddContact(); deleteContact(${i})">Delete</button>
  <button id="saveChangesBtn" class="createUserBtn" type="submit">Save ✔</button>`;
}

/**
 * Saves the changes made to a contact's information and updates the contact book.
 *
 * @param {Event} event - The event object associated with the save action.
 */
async function saveChanges(event) {
  event.preventDefault();
  let index = editIndex[0];
  mainUserInfos[0].contactBook[index].name =
    document.getElementById("inputEditName").value;
  let firstChar = mainUserInfos[0].contactBook[index].name.charAt(0);
  let letterIndex = letterArray.indexOf(firstChar.toUpperCase());
  if (letterIndex === -1) {
    letterArray.push(firstChar.toUpperCase());
  }
  mainUserInfos[0].contactBook[index].email = document
    .getElementById("inputEditEmail")
    .value.toLowerCase();
  mainUserInfos[0].contactBook[index].number =
    document.getElementById("inputEditPhone").value;
  await setItem(`${currentUserMail[0]}`, JSON.stringify(mainUserInfos));
  await refreshAfterSaveChanges(index);
}

/**
 * Refresh information after saved changes
 */
async function refreshAfterSaveChanges(index) {
  await loadUsers();
  renderAlphabeticalCategories();
  pullContact(index);
  closeAddContact();
}

/**
 * Deletes a contact from the contact book and updates the UI accordingly.
 *
 * @param {number} i - The index of the contact to be deleted in the contact book.
 */
async function deleteContact(i) {
  document.getElementById("pullContactToWindow").classList.toggle("pull");
  firstChar = mainUserInfos[0].contactBook[i].name.charAt(0);
  let letterIndex = letterArray.indexOf(firstChar);
  mainUserInfos[0].contactBook.splice(i, 1);
  letterArray.splice(letterIndex, 1);
  await setItem(`${currentUserMail[0]}`, JSON.stringify(mainUserInfos));
  closeAddContact();
  await loadUsers();
  renderAlphabeticalCategories();
}

/**
 * Inserts a new contact into the contact book and updates the UI to reflect the addition.
 *
 * @param {Event} event - The event object associated with the contact insertion.
 */
async function insertContact(event) {
  event.preventDefault();
  let inputEmail = document.getElementById("inputEmail").value.toLowerCase();
  let inputPhone = document.getElementById("inputPhone").value;
  let inputName = document.getElementById("inputName").value;
  let words = inputName.split(" ");
  let capitalizedInputName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const emailErrorElement = document.getElementById("emailError");
  const phoneErrorElement = document.getElementById("phoneError");
  await addOrUpdateContact(
    capitalizedInputName,
    inputEmail,
    inputPhone,
    emailErrorElement,
    phoneErrorElement
  );
  document.getElementById("pullContactToWindow").classList.remove("pull");
}

/**
 * Adds a new contact to the main user's contact book if the email or phone number doesn't already exist.
 * If the contact already exists, it displays error messages for the email and phone fields.
 * After adding a new contact or showing an error, it will either refresh the contact list or clear error messages after a timeout.
 *
 * @async
 * @function addOrUpdateContact
 * @param {string} capitalizedInputName - The name of the contact with each word capitalized.
 * @param {string} inputEmail - The email address of the contact, converted to lower case.
 * @param {string} inputPhone - The phone number of the contact.
 * @param {HTMLElement} emailErrorElement - The HTML element where email error messages are displayed.
 * @param {HTMLElement} phoneErrorElement - The HTML element where phone error messages are displayed.
 */
async function addOrUpdateContact(
  capitalizedInputName,
  inputEmail,
  inputPhone,
  emailErrorElement,
  phoneErrorElement
) {
  if (
    !mainUserInfos[0].contactBook.some(
      (contact) => contact.email === inputEmail || contact.number === inputPhone
    )
  ) {
    mainUserInfos[0]["contactBook"].push({
      name: capitalizedInputName,
      email: inputEmail,
      number: inputPhone,
    });
    await setItem(`${currentUserMail[0]}`, JSON.stringify(mainUserInfos));
    initContacts();
    renderAlphabeticalCategories();
    clearInput();
    closeAddContact();
  } else {
    emailErrorElement.textContent = "E-Mail ist bereits vorhanden";
    phoneErrorElement.textContent = "Telefonnummer ist bereits vorhanden";
    setTimeout(() => {
      emailErrorElement.textContent = "";
      phoneErrorElement.textContent = "";
    }, 3000);
  }
}

/**
 * Clears the input fields in the add contact form.
 */
function clearInput() {
  inputName.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
}

/**
 * Generates a random color for the initials of a contact's name, ensuring the color is neither white nor gray.
 *
 * @param {string} name - The name of the contact for which a color is being generated.
 * @returns {string} - The hex code of the generated color.
 */
function getRandomColorForInitials(name) {
  let initials = getInitials(name);
  if (initialColorMap.hasOwnProperty(initials)) {
    return initialColorMap[initials];
  } else {
    let color;
    do {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      color =
        "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0");
    } while (isWhiteOrGray(color));
    initialColorMap[initials] = color;
    return color;
  }
}

/**
 * Extracts and returns the initials from a given name.
 *
 * @param {string} name - The full name from which initials are to be extracted.
 * @returns {string} - The extracted initials.
 */
function getInitials(name) {
  let words = name.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0).toUpperCase();
  }
  return initials;
}

/**
 * Determines whether a given color is white or gray based on its brightness.
 *
 * @param {string} color - The hex code of the color to be evaluated.
 * @returns {boolean} - True if the color is white or gray, false otherwise.
 */
function isWhiteOrGray(color) {
  let r = parseInt(color.substr(1, 2), 16);
  let g = parseInt(color.substr(3, 2), 16);
  let b = parseInt(color.substr(5, 2), 16);
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 200;
}

/**
 * Selects a category and adds it to the selected categories array, updating the UI accordingly.
 *
 * @param {string} category - The category to be selected.
 */
function selectCategory(category) {
  var categoryInput = document.querySelector(".categoryHeader input");
  categoryInput.value = category;
  toggleCategory();
  selectedCategories.push(category);
  categoryInput.value = selectedCategories.join(", ");
}

/**
 * Renders the selectable categories in the UI.
 */
function technicalUser() {
  let technical = document.getElementById("listTechnical");
  technical.innerHTML = "";
  for (let k = 0; k < categorySet.length; k++) {
    technical.innerHTML += `<div class="select" onclick="selectCategory('${categorySet[k]}')">${categorySet[k]}</div>`;
  }
}

/**
 * Renders the list of subtasks associated with a contact in the UI.
 */
function addContactToSubtask() {
  let contactList = document.getElementById("contactList");
  contactList.innerHTML = "";
  for (let m = 0; m < subtaskArray.length; m++) {
    contactList.innerHTML += `
      <ul class="contactUser">
          <li>
                <span id="contactText_${m}" contenteditable="true"
                  onclick="enableEditing(${m})"
                  onblur="updateSubtask(${m}, this.innerText)"
                  onkeydown="handleKeyPress(event, ${m})">
                  ${subtaskArray[m]}
                </span>
                </li>  
                <div class="subPics">
                  <img src="assets/img/delete.png" onclick="deleteToSubtask(${m})">
                  <img src="assets/img/edit.svg" onclick="enableEditing(${m})">
                  <img id="checkImage_${m}" src="assets/img/bestätigung.png" style="display:none;">
                </div>
      </ul>`;
  }
}

/**
 * Enables editing for the specified subtask by focusing on its editable span element.
 *
 * @param {number} position - The index of the subtask in the subtask array.
 */
function enableEditing(position) {
  let spanElement = document.getElementById(`contactText_${position}`);
  spanElement.focus();
}

/**
 * Updates the text of a subtask at a specified position in the subtask array.
 *
 * @param {number} position - The index of the subtask to update.
 * @param {string} newText - The new text for the subtask.
 */
function updateSubtask(position, newText) {
  subtaskArray[position] = newText;
}

/**
 * Handles key press events within editable subtask elements, specifically looking for the "Enter" key to display a confirmation checkmark.
 *
 * @param {Event} event - The key press event.
 * @param {number} position - The index of the subtask being edited.
 */
function handleKeyPress(event, position) {
  if (event.key === "Enter") {
    let checkImage = document.getElementById(`checkImage_${position}`);
    checkImage.style.display = "inline";
  }
}

/**
 * Adds a new subtask to the subtask array and updates the UI to reflect this addition.
 */
function subCurrentContact() {
  let taska = document.getElementById("subTaskInput").value;
  if (taska.trim() === "") {
    alert("Bitte ausfüllen.");
    return;
  }
  subtaskArray.push(taska);
  document.getElementById("subTaskInput").value = "";
  addContactToSubtask();
}

/**
 * Deletes a subtask from the subtask array at a specified position and updates the UI accordingly.
 *
 * @param {number} position - The index of the subtask to be deleted.
 */
function deleteToSubtask(position) {
  subtaskArray.splice(position, 1);
  addContactToSubtask();
}

/**
 * Clears all fields and selections in the current task or contact form, resetting the UI for new input.
 */
function clearCurrentall(position) {
  document.getElementById("titleEnter").value = "";
  document.getElementById("descriptionInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("listContactContainer").innerHTML = "";
  document.getElementById("categoryInput").value = "";
  document.getElementById("contactList").innerHTML = "";
  subtaskArray.splice(position);
  addContactToSubtask();
}
