const STORAGE_TOKEN = "UYC2KGRBQ7QS5SWVHQYXYARK3RHQJN240BPE82NE";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let mainUserInfos = [{ contactBook: [], tasks: [] }];
let currentUserKey = [];
let users = [];

/**
 * Initializes the application by loading user data and setting the active link.
 */
async function init() {
  await loadUsers();
}

/**
 * Loads user data including main user information and other users.
 */

async function loadUsers() {
  currentUserMail = getCurrentUserMailFromSessionStorage();
  try {
    currentUserKey = JSON.parse(await getItem("currentUserKey"));

    try {
      currentUserKey = JSON.parse(await getItem("currentUserKey"));
      mainUserInfos = JSON.parse(await getItem(`${currentUserMail[0]}`));
      users = JSON.parse(await getItem("users"));
    } catch (e) {
      console.error("Loading error:", e);
    }
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Sets an item in the remote storage.
 * @param {string} key - The key for the item.
 * @param {string} value - The value to be set.
 * @returns {Promise} A promise representing the result of the operation.
 */

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * Retrieves an item from the remote storage.
 * @param {string} key - The key for the item to retrieve.
 * @returns {Promise} A promise containing the retrieved item.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
