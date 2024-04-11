/**
 * Loads the page and invokes the functions `getRemoteUsers()` and `displayMessage()`.
 */

async function onload() {
  await getRemoteUsers();
  displayMessage();
  await loadRememberedCredentials();
}

/**
 * Fetches user data from the remote storage.
 */

async function getRemoteUsers() {
  users = JSON.parse(await getItem("users"));
}

/**
 * Registers a new user.
 * Checks if the entered passwords match and if the email address is already in use.
 * Adds the new user if everything is correct.
 */

async function register() {
  const passwordErrorOne = document.getElementById("passwordErrorOne");
  const emailErrorSigneUp = document.getElementById("emailErrorSigneUp");
  passwordErrorOne.textContent = "";
  emailErrorSigneUp.textContent = "";

  const registerBtn = document.getElementById("registerBtn");
  registerBtn.disabled = true;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (password !== confirmPassword) {
    passwordErrorOne.textContent = "Passwörter stimmen nicht überein!";
    setTimeout(() => {
      passwordErrorOne.textContent = "";
    }, 3000);
    registerBtn.disabled = false;
    return;
  }
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    emailErrorSigneUp.textContent =
      "Diese Email-Adresse wird bereits verwendet!";
    setTimeout(() => {
      emailErrorSigneUp.textContent = "";
    }, 3000);
    registerBtn.disabled = false;
    return;
  }
  try {
    users.push({
      name: name,
      email: email,
      password: password,
    });
    await setItem("users", JSON.stringify(users));
    await createBasicJason(email);
    window.location.href =
      "index.html?msg=Glückwunsch,du hast dich erfolgreich registriert!";
  } catch (error) {
    console.error("Registration error:", error);
  }
}

/**
 * Creates a basic JSON document for the user in the local storage.
 * @param {string} email - The user's email address.
 */

async function createBasicJason(email) {
  await setItem(`${email}`, JSON.stringify(mainUserInfos));
  console.log(email);
}

/**
 * Resets the registration form.
 */

function resetForm() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";
  document.getElementById("name").value = "";
  document.getElementById("registerBtn").disabled = false;
}

/**
 * Displays a message on the page if a message is found in the URL parameters.
 */

function displayMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  const msgBox = document.getElementById("msgBox");

  if (msg) {
    msgBox.innerHTML = msg;
  }
}

/**
 * Toggles the visibility of the password field in the registration form.
 */

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const togglePasswordIcon = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordIcon.src = "assets/img/eye-regular.svg";
  } else {
    passwordInput.type = "password";
    togglePasswordIcon.src = "assets/img/eyecloseregular.svg";
  }
}

/**
 * Toggles the visibility of the password confirmation field in the registration form.
 */

function togglePasswordConfirmVisibility() {
  const passwordConfirmInput = document.getElementById("confirm-password");
  const togglePasswordConfirmIcon = document.getElementById(
    "togglePasswordConfirm"
  );

  if (passwordConfirmInput.type === "password") {
    passwordConfirmInput.type = "text";
    togglePasswordConfirmIcon.src = "assets/img/eye-regular.svg";
  } else {
    passwordConfirmInput.type = "password";
    togglePasswordConfirmIcon.src = "assets/img/eyecloseregular.svg";
  }
}
