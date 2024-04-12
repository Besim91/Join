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
