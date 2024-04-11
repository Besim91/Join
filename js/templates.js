async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Handles the redirection to the original page after clicking on certain links.
 * @param {string} [page] - The page to redirect to.
 */

function returnToOriginalPage(page) {
  if (page) {
    window.location.href = page;
  } else {
    window.history.back();
  }
  document.getElementById("policyLink").addEventListener("click", function () {
    returnToOriginalPage("privacy.html");
  });
  document.getElementById("legalLink").addEventListener("click", function () {
    returnToOriginalPage("legal.html");
  });
  document.getElementById("helpLink").addEventListener("click", function () {
    returnToOriginalPage("help.html");
  });
  function returnToOriginalPage() {
    history.back();
  }
}
