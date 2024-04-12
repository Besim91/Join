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

