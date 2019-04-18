function createTag(tagName, innerContent = "") {
  let tag = document.createElement(tagName);
  tag.innerHTML = innerContent;
  return tag;
}

function createInput(inpType) {
  let inputTag = document.createElement("input");
  inputTag.type = inpType;
  return inputTag;
}

function pushToHtml(parent, child) {
  parent.appendChild(child);
}

// =========================================== //

let app = document.querySelector("#app");

function loginObject() {
  let loginFormObj = {
    userEmail: createInput("email"),
    userPassword: createInput("password"),
    loginButton: createTag("button", "Log In")
  };
  return loginFormObj;
}

function addLoginForm() {
  pushToHtml(app, createTag("label", "Email"));
  pushToHtml(app, loginForm.userEmail);
  pushToHtml(app, createTag("label", "Password"));
  pushToHtml(app, loginForm.userPassword);
  pushToHtml(app, loginForm.loginButton);
}

let loginForm = loginObject();

function displayLoginPage() {
  addLoginForm();
}

// displayLoginPage()
//  ===================== //

function addtoLC(inputKey, inputValue) {
  if (inputValue == "") {
    alert("Empty " + inputKey);
  } else {
    localStorage.setItem(inputKey, inputValue);
  }
}

loginForm.loginButton.onclick = () => {
  addtoLC("email", loginForm.userEmail.value);
};

// ============================= //

let signupForm = {
  firstName: createInput(),
  secondName: createInput(),
  dateOfBirth: createInput("date"),
  userEmail: createInput("email"),
  tAndC: createInput("checkbox"),
  signupButton: createTag("button", "Sign Up")
};

function addSignUpForm() {
  pushToHtml(app, createTag("label", "First Name"));
  pushToHtml(app, signupForm.firstName);
  pushToHtml(app, createTag("label", "Second Name"));
  pushToHtml(app, signupForm.secondName);
  pushToHtml(app, createTag("label", "Date of Birth"));
  pushToHtml(app, signupForm.dateOfBirth);
  pushToHtml(app, createTag("label", "Email Address"));
  pushToHtml(app, signupForm.userEmail);
  pushToHtml(app, createTag("label", "I accpet T&C"));
  pushToHtml(app, signupForm.tAndC);
  pushToHtml(app, signupForm.signupButton);
}

addSignUpForm();
