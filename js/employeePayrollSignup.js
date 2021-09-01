var phoneReg = document.getElementById("Phone-Reg");
var emailReg = document.getElementById("Email-Reg");
var passReg = document.getElementById("Password-Reg");
var cPassReg = document.getElementById("cPassword-Reg");

var valPwdRegBool = false;
var valNumberRegBool = false;
var valEmailRegBool = false;

document.getElementById("Signup").onsubmit = function (event) {
  event.preventDefault();
  registerUser();
};

async function registerUser() {
  try {
    validateNumReg(phoneReg);
    validateEmailReg(emailReg);
    validatePassReg(passReg);

    _credentials = JSON.parse(
      await makeAJAXCall("GET", site_properties.cred_url)
    );
    var _credential = _credentials.filter(
      (i) => i.phone === phoneReg.value.trim()
    );

    let myData = createCredObj(phoneReg.value, emailReg.value, passReg.value);

    if (_credential.length === 0) {
        if(passReg.value.trim() === cPassReg.value.trim()){
            await makeAJAXCall(
              "POST",
              site_properties.cred_url,
              true,
              myData
            );
            window.location.replace(site_properties.login_url);
        }else{
            console.log("Password mismatch");
        }
    } else {
      console.log(
        `User already exists with this number:${phoneReg.value.trim()}`
      );
    }
  } catch (error) {
    console.error(error);
  }
}

function createCredObj(phone, email, pass) {
  let credObject = {};
  credObject["phone"] = phone;
  credObject["password"] = pass;
  credObject["email"] = email;
  if (
    credObject["email"] != undefined &&
    credObject["phone"] != undefined &&
    credObject["password"] != undefined
  ) {
    return credObject;
  }
}

function validateNumReg(number) {
  if (number.value.trim() !== "") {
    const regNumber = /^([6-9][0-9]{9})$/;
    if (regNumber.test(number.value)) {
      valNumberRegBool = true;
    } else {
      valNumberRegBool = false;
    }
  }
}

function validateEmailReg(email) {
    if(email.value.trim() !== ""){
        const regEmail = /^[A-Za-z_0-9]+[.]?[A-Za-z_0-9]+[@][A-Za-z0-9]+[.](\w){2,3}[.]?(\w?){2,3}$/;
        if(regEmail.test(email.value)){
            valEmailRegBool = true;
        } else{
            valEmailRegBool = false;
        }
    }
}

function validatePassReg(pwd) {
  if (pwd.value.trim() !== "") {
    const regpwd = /^(?=.*?[!@#$%^_+&*]{1})(?=.*?[A-Z]+)(?=.*?\d+).{8,}$/;
    if (regpwd.test(pwd.value)) {
      valPwdRegBool = true;
    } else {
      valPwdRegBool = false;
    }
  }
}

window.onload = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  params = Object.fromEntries(urlSearchParams.entries());
  var redirectUrl = params.redirect || "./";
  if (localStorage.getItem("loginKey")) {
    window.location.href = redirectUrl;
  }
};
