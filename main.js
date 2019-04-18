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

class loginPage {
  constructor() {
    this.loginForm = this.loginObject();
    this.addLoginForm();
    this.loginButtonFunction();
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

  addtoLC(inputKey, inputValue) {
    if (inputValue == "") {
      alert("Empty " + inputKey);
    } else {
      localStorage.setItem(inputKey, inputValue);
    }
  }

  loginButtonFunction() {
    this.loginForm.loginButton.onclick = () => {
      this.addtoLC("email", this.loginForm.userEmail.value);
    };
  }
}

//  ===================== //

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
      localStorage.setItem("email", this.signupForm.userEmail.value);
      this.loadAfterSignUp();
      routeToLoginAfterSignup();
    }
  }
}

// =========================== //

// let login = new loginPage();
// let signuppage = new makeSignupForm();

// =============== //

function routeToLoginAfterSignup() {
  if (location.pathname != null || location.pathname != "") {
    location.pathname = "/login";
  }
}

// ============= //
function showLogin() {
  new loginPage();
  if (location.pathname != "/login") {
    location.pathname = "/login";
  }
}

function showSignup() {
  new loginPage();
  if (location.pathname != "/signup") {
    location.pathname = "/signup";
  }
}

// ===================== //

function onloadCheck() {
  if (location.pathname == "/login") {
    showLogin();
  } else if (location.pathname == "/signup") {
    new makeSignupForm();
  }
  else if(location.pathname == '/'){
    if(localStorage.getItem('email')==null){
        new makeSignupForm();
    }
    else {
        // if(localStorage.getItem('email')!= null){
        //     showLogin();
        // }
        
        // console.log('asds');
        
            showLogin();
        
    }
  }
}

// =================== //

window.onload = onloadCheck;
