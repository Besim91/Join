let currentUserMail;

/**
 * Handles the login process.
 * Retrieves the email and password entered by the user, saves the email to session storage,
 * checks if the email and password are valid, and redirects the user to the summary page if the credentials are correct.
 */
async function loginForm() {
  let email = document.getElementById("email").value.toLowerCase();
  currentUserMail = Array.of(email);
  saveCurrentUserMailToSessionStorage(currentUserMail);
  let password = document.getElementById("password").value;
  const rememberCheckbox = document.getElementById("rememberCheckbox");
  if (!email || !password) {
    console.log("E-Mail und Passwort sind erforderlich.");
    return;
  }
  if (rememberCheckbox.checked) {
    await rememberMe();
  } else {
    clearCredentials();
  }
  let user = users.find((u) => u.email === email);
  proofUser(user, email, password);
}

/**
 * Saves the current user's email to session storage.
 * @param {string[]} currentUserMail - The current user's email.
 */
function saveCurrentUserMailToSessionStorage(currentUserMail) {
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("currentUserMail", JSON.stringify(currentUserMail));
    console.log("currentUserMail erfolgreich in sessionStorage gespeichert.");
  } else {
    console.log("SessionStorage wird in diesem Browser nicht unterstützt.");
  }
}

/**
 * Retrieves the current user's email from session storage.
 * @returns {string[]} The current user's email.
 */
function getCurrentUserMailFromSessionStorage() {
  if (typeof Storage !== "undefined") {
    const currentUserMailJSON = sessionStorage.getItem("currentUserMail");
    if (currentUserMailJSON !== null) {
      const currentUserMail = JSON.parse(currentUserMailJSON);
      return currentUserMail;
    } else {
      console.log(
        "Es wurde keine currentUserMail in der sessionStorage gefunden."
      );
      return null;
    }
  } else {
    console.log("SessionStorage wird in diesem Browser nicht unterstützt.");
    return null;
  }
}

/**
 * Validates the user's credentials (email and password) against a list of users.
 * If the credentials are correct, it saves the user's name, sets some items,
 * initializes the application, and redirects the user to the summary page.
 * Otherwise, it displays appropriate error messages.
 * @param {object} user - The user object.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 */
async function proofUser(user, email, password) {
  const emailErrorElement = document.getElementById("emailError");
  const phoneErrorElement = document.getElementById("phoneError");
  emailErrorElement.textContent = "";
  phoneErrorElement.textContent = "";
  if (user) {
    if (user.password === password) {
      console.log("Benutzer gefunden:", user);
      if (!currentUserKey.includes(email)) {
        currentUserKey.push(email);
        await setItem("currentUserKey", JSON.stringify(currentUserKey));
      }
      save(user.name);
      init();
      displayUserName(user.name);
      window.location.href = "summary.html";
    } else {
      phoneErrorElement.textContent = "Passwort ist falsch!";
      setTimeout(() => {
        phoneErrorElement.textContent = "";
      }, 3000);
    }
  } else {
    emailErrorElement.textContent = "E-Mail ist nicht registriert!";
    setTimeout(() => {
      emailErrorElement.textContent = "";
    }, 3000);
  }
  clearRememberCheckbox();
}

/**
 * Loads user data for the login process.
 */
async function loadUsersForLogin() {
  users = JSON.parse(await getItem("users"));
  onload();
}

/**
 * Clears the remember me checkbox and associated input fields.
 */
async function clearRememberCheckbox() {
  let rememberCheckbox = document.getElementById("rememberCheckbox");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  rememberCheckbox.checked = false;
  emailInput.value = "";
  passwordInput.value = "";
  await clearCredentials();
}

/**
 * Clears stored login credentials.
 */
async function clearCredentials() {
  try {
    await setItem("rememberedEmail", "");
    await setItem("rememberedPassword", "");
    console.log("Anmeldeinformationen erfolgreich gelöscht.");
  } catch (error) {
    console.error("Fehler beim Löschen der Anmeldeinformationen:", error);
  }
}

/**
 * Handles the remember me functionality.
 * It saves the email and password if the remember checkbox is checked.
 */
async function rememberMe() {
  console.log("rememberMe() wird aufgerufen!");
  const rememberCheckbox = document.getElementById("rememberCheckbox");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  if (rememberCheckbox.checked) {
    const rememberedEmail = await getItem("rememberedEmail");
    const rememberedPassword = await getItem("rememberedPassword");
    if (rememberedEmail === emailInput.value) {
      emailInput.value = rememberedEmail;
      if (rememberedPassword) {
        passwordInput.value = rememberedPassword;
      }
    }
    try {
      await setItem("rememberedEmail", emailInput.value);
      if (rememberCheckbox.checked) {
        await setItem("rememberedPassword", passwordInput.value);
      }
      await setItem("rememberCheckbox", true);
      console.log("Anmeldeinformationen erfolgreich gespeichert.");
    } catch (error) {
      console.error("Fehler beim Speichern der Anmeldeinformationen:", error);
    }
  } else {
    await clearCredentials();
  }
}

function clearPasswort() {
  document.getElementById("password").value = "";
}

/**
 * Loads stored login credentials if the remember checkbox was previously checked.
 */
async function loadRememberedCredentials() {
  const rememberCheckbox = document.getElementById("rememberCheckbox");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  try {
    const rememberedEmail = await getItem("rememberedEmail");
    const rememberedPassword = await getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      emailInput.value = rememberedEmail;
      passwordInput.value = rememberedPassword;
      rememberCheckbox.checked = true; // Checkbox markieren
      await rememberMe(); // gespeicherten Kontakt hinzufügen
    }
  } catch (error) {
    console.error(
      "Fehler beim Laden der gespeicherten Anmeldeinformationen:",
      error
    );
  }
}

/**
 * Redirects the user to the sign-up page.
 */
function signForm() {
  window.location.href = "signup.html";
}

/**
 * Toggles the visibility of the password field in the login form.
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
 * Toggles the visibility of the password confirmation field in the sign-up form.
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

/**
 * Logs in the user as a guest and redirects them to the summary page.
 */

async function guestToLogin() {
  const guestUser = { name: "Gast" };
  currentUserMail = [guestUser.name];
  saveCurrentUserMailToSessionStorage(currentUserMail);
  window.location.href = "summary.html";
}
