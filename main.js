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

class showLoginPage {
  constructor() {
    this.loginForm = this.loginObject();
    this.addLoginForm();
    this.submitFuncion();
    // console.log(this.loginForm.loginButton);
  }

  loginObject() {
    let loginFormObj = {
      userEmail: createInput("email"),
      userPassword: createInput("password"),
      loginButton: createTag("button", "Log In")
    };
    return loginFormObj;
  }

  addLoginForm() {
    pushToHtml(app, createTag("label", "Email"));
    pushToHtml(app, this.loginForm.userEmail);
    pushToHtml(app, createTag("label", "Password"));
    pushToHtml(app, this.loginForm.userPassword);
    pushToHtml(app, this.loginForm.loginButton);
  }

  submitFuncion() {
    this.loginForm.userEmail.onkeyup = this.clickLoginButton.bind(this);
    this.loginForm.userPassword.onkeyup = this.clickLoginButton.bind(this);
    this.loginForm.loginButton.onclick = this.loginButtonAction.bind(this);
  }

  clickLoginButton(e) {
    if (e.key == "Enter") {
      this.loginForm.loginButton.click();
    }
  }

  //   loginButtonAction() {}

  loginButtonAction() {
    if (
      this.loginForm.userEmail.value == "" ||
      this.loginForm.userPassword.value == ""
    ) {
      alert("Error");
    } else {
      localStorage.setItem("email", this.loginForm.userEmail.value);
      localStorage.setItem("password", this.loginForm.userPassword.value);
      this.routerToLandingPageAfterLogin();
    }
  }

  routerToLandingPageAfterLogin() {
    location.pathname = "/landing";
  }
}

// ========================= SIGNUP ================================== //
// ============================= //
class makeSignupForm {
  constructor() {
    this.signupForm = this.signupObject();
    this.addSignUpForm();
    this.submitButton();
  }

  signupObject() {
    signupObj = {
      firstName: createInput(),
      secondName: createInput(),
      dateOfBirth: createInput("date"),
      userEmail: createInput("email"),
      tAndC: createInput("checkbox"),
      signupButton: createTag("button", "Sign Up")
    };
    return signupObj;
  }

  addSignUpForm() {
    pushToHtml(app, createTag("label", "First Name"));
    pushToHtml(app, this.signupForm.firstName);
    pushToHtml(app, createTag("label", "Second Name"));
    pushToHtml(app, this.signupForm.secondName);
    pushToHtml(app, createTag("label", "Date of Birth"));
    pushToHtml(app, this.signupForm.dateOfBirth);
    pushToHtml(app, createTag("label", "Email Address"));
    pushToHtml(app, this.signupForm.userEmail);
    pushToHtml(app, createTag("label", "I accpet T&C"));
    pushToHtml(app, this.signupForm.tAndC);
    pushToHtml(app, this.signupForm.signupButton);
  }

  submitButton() {
    this.signupForm.firstName.onkeyup = this.clickSignupButton.bind(this);
    this.signupForm.secondName.onkeyup = this.clickSignupButton.bind(this);
    this.signupForm.userEmail.onkeyup = this.clickSignupButton.bind(this);
    this.signupForm.dateOfBirth.onkeyup = this.clickSignupButton.bind(this);
    this.signupForm.tAndC.onkeyup = this.clickSignupButton.bind(this);
    this.signupForm.signupButton.onclick = this.signupButtonAction.bind(this);
  }

  loadAfterSignUp() {
    if (localStorage.email != null) {
      location.pathname = "/asld";
    }
  }

  clickSignupButton(e) {
    if (e.key == "Enter") {
      this.signupForm.signupButton.click();
    }
  }

  signupButtonAction() {
    if (this.signupForm.tAndC.checked == false) {
      alert("T&C error");
    } else if (
      this.signupForm.userEmail.value == "" ||
      this.signupForm.firstName.value == "" ||
      this.signupForm.dateOfBirth.value == ""
    ) {
      alert("Please complete the form");
    } else {
      this.saveEmailToLS();
      this.loadAfterSignUp();
      this.routeToLoginAfterSignup();
    }
  }

  saveEmailToLS() {
    localStorage.setItem("email", this.signupForm.userEmail.value);
  }

  routeToLoginAfterSignup() {
    if (location.pathname != null || location.pathname != "") {
      location.pathname = "/login";
    }
  }
}

// ===================== //

class makeLandingpage {
  constructor() {
    this.landingBody = this.landingObject();
    this.addLandingForm();
    this.buttonAction();
  }
  landingObject() {
    let landingFormObj = {
      message: createTag("p", "landingPage"),
      logoutButton: createTag("button", "log out"),
      clearLSButton: createTag("button", "Clear Local Storage")
    };
    return landingFormObj;
  }

  addLandingForm() {
    pushToHtml(app, this.landingBody.message);
    pushToHtml(app, this.landingBody.logoutButton);
    pushToHtml(app, this.landingBody.clearLSButton);
  }

  buttonAction() {
    this.landingBody.logoutButton.onclick = this.logout.bind(this);
    this.landingBody.clearLSButton.onclick = this.clearLS.bind(this);
  }

  logout() {
    localStorage.removeItem("password");
    mainRouting();
  }

  clearLS(){
      localStorage.clear();
      mainRouting();
  }
}

// ============================== //
// ============================== //
// ============================== //

function showLogin() {
  new showLoginPage();
  if (location.pathname != "/login") {
    location.pathname = "/login";
  }
}

function mainRouting() {
  if (localStorage.getItem("email") == null) {
    new makeSignupForm();
    location.pathname = "/signup";
  } else {
    showLogin();
    location.pathname = "/login";
  }
}
// ===================== //

function onloadCheck() {
  if (location.pathname == "/login") {
    showLogin();
  } else if (location.pathname == "/signup") {
    new makeSignupForm();
  } else if (
    location.pathname == "/landing" &&
    localStorage.getItem("password") != null
  ) {
    new makeLandingpage();
  } else {
    mainRouting();
  }
}
// =================== //

window.onload = onloadCheck;
