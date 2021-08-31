var phone = document.getElementById("Phone");
var password = document.getElementById("Password");

var valPwdBool = false;
var valNumberBool = false;

document.getElementById("Login").onsubmit= function(event) {
    event.preventDefault();
    validateCredentials();
};

async function validateCredentials(){
    validateNum(phone);
    validatePass(password);

    let varBool = valNumberBool && valPwdBool;
    console.log(varBool);

    if(varBool){
        _credentials = JSON.parse(await makeAJAXCall('GET', site_properties.cred_url));
        var _credential = _credentials.filter(i => i.phone === phone.value.trim());
        
        if(_credential.length !== 0){
            if(_credential[0].password === password.value.trim()){
                localStorage.setItem('loginKey', 'true')
                window.location.replace(site_properties.home_url);
            }
            else{
                console.log('Password mismatch');
            }
        }
        else{
            console.log('User not found');
        }
    }
}

function validateNum(number){
    if (number.value.trim() !== ""){
        const regNumber = /^([6-9][0-9]{9})$/;
        if(regNumber.test(number.value)){
            valNumberBool = true;
        }
        else{
            valNumberBool = false;
        }   
    }

}

function validatePass(pwd){
    if (pwd.value.trim() !== ""){
        const regpwd = /^(?=.*?[!@#$%^_+&*]{1})(?=.*?[A-Z]+)(?=.*?\d+).{8,}$/;
        if(regpwd.test(pwd.value)){
            valPwdBool = true;
        }
        else{
            valPwdBool = false;
        }
    }
}

window.onload = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
    redirectUrl = (params.redirect || './');
    console.log(redirectURL);
    if(localStorage.getItem('loginKey')){
        window.location.href = redirectURL;
    }
}