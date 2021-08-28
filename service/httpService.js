function makeAJAXCall(methodType, url, async=true, data=null){
    return new Promise((resolve, reject) =>{
        
        const xhttp  = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            // console.log(xhttp.readyState)
            if(xhttp.readyState == 4){
                if(xhttp.status >= 200 && xhttp.status < 300){
                    resolve(xhttp.responseText)
                }
                else{
                    reject(new Error('Failure response'));
                }
            }
        }


        xhttp.open(methodType, url, async);

        // for adding
        if(data){
            xhttp.setRequestHeader("Content-Type","application/json");
            xhttp.send(JSON.stringify(data));
        } else {
            xhttp.send(); //normal
        }
    });
}

var baseUrl = 'http://localhost:3000/employees';
var baseUrl2 = 'http://localhost:3000/employees/5';
var baseUrl3 = 'http://localhost:3000/employees/5';
        
function fetchUser(data){
    console.log('Displaying successful', data);
}

function deleteUser(data){
    console.log(data)
}

function addData(data){
    console.log(data);
}

var userData = {
    "id": 5,
    "eProfile": "/assets/images/Ellipse -2.png",
    "eName": "Aditya",
    "eGender": "Male",
    "eDepartment": ["Finance"],
    "eSalary": "81870",
    "eStartDate": "1 Jan 2008"
}

var newUserData = {
    "eProfile": "/assets/images/Ellipse -3.png",
    "eName": "Smit",
    "eGender": "Male",
    "eDepartment": ["Finance"],
    "eSalary": "81870",
    "eStartDate": "1 Jan 2008"
}
