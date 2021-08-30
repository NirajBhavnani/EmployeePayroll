let isUpdate = false; //Boolean to check whether it is edit mode or not
let employeePayrollObj = {}; //storing the employee object value for retrieving the data from JSON server and displaying on the form

window.addEventListener('DOMContentLoaded', (event)=> {
  checkForUpdate();
});

class EmployeePayroll{
    // getters
  get name() {
    return this.eName;
  }
  get profile() {
    return this.eProfile;
  }
  get gender() {
    return this.eGender;
  }
  get department() {
    return this.eDepartment;
  }
  get salary() {
    return this.eSalary;
  }
  get startDate() {
    return this.eStartDate;
  }
  get notes() {
    return this.eNotes;
  }

    //setters
    set name(ob){
        if (/^[A-Z][a-zA-Z]{2,}$/.test(ob)) {
            this.eName = ob;
            document.getElementById("name").classList.remove("error-class");
        }
        else throw new Error("name");
    }
    set profile(ob) {
        this.eProfile = ob;
    }
    set gender(ob) {
        this.eGender = ob;
    }
    set department(ob) {
        this.eDepartment = ob;
    }
    set salary(ob) {
        this.eSalary = ob;
    }
    set startDate(ob) {
      let input = new Date(ob);
      console.log(input);
    
      let inputTime = input.getTime();
    
      const timeElapsed = Date.now();
      let daysDifference = (timeElapsed - inputTime) / (1000 * 60 * 60 * 24);
    
      if (daysDifference <= 30) {
        throw new Error("Start-Date");
      } else {
        return this.eStartDate = ob;
      }
    }
    set notes(ob) {
        if(ob.length !==0){
            this.eNotes = ob;
            document.getElementById("notes").classList.remove("error-class");
        }
        else throw new Error("notes");
    }
}

const employee = new EmployeePayroll();

//Form submit
document.getElementById("register-form").onsubmit = function(e) {
    e.preventDefault(); // Prevents refreshing
    e.stopPropagation(); //if it failed, to show the populated data on the same page

    // Creating employee object with required parameters
    const {
      name: {
        value: name // const name = e.target.Name.value;
      },
      profile : {
        value: pic
      },
      gender: {
        value: gender
      },
      department: eDepartment,
      salary: {
        value: salary
      },
      day: {
        value: date
      },
      month: {
        value: month
      },
      year: {
        value: year
      },
      notes: {
        value: notes
      }
    } = e.target;

    const department = [];
    eDepartment.forEach(d => {
      if(d.checked) department.push(d.value);
    });
  
    try {
      // initialising employee object
      employee.name = name;
      employee.profile = pic;
      employee.gender = gender;
      employee.department = department;
      employee.salary = salary;
      employee.startDate = `${date} ${month} ${year}`;
      employee.notes = notes;

      console.log(employee);

      // Calling the function to add/edit
      createAndUpdateJSONServer(employee);

    }
    catch (err) {
      document.getElementById(err.message).classList.add("error-class");
    }
    finally {
      console.log(employees);
    }
  }

  
//   Key Press Check
  document.getElementById("name").onkeyup = function(e) {
    try {
      employee.name = e.target.value;
    }
    catch (err) {
      document.getElementById(err.message).classList.add("error-class");
    }
  };
  document.getElementById("notes").onkeyup = function(e) {
    try {
      employee.notes = e.target.value;
    }
    catch (err) {
      document.getElementById(err.message).classList.add("error-class");
    }
  };



  // Add/Edit Employee Details in JSON
  async function createAndUpdateJSONServer(empObject) {
    let searchObj = new URLSearchParams(window.location.search);
    let localPayroll = Object.fromEntries(searchObj.entries());
    try {
      if(localPayroll.id){
        await makeAJAXCall('PUT', `${site_properties.data_url}/${localPayroll.id}`, true, empObject);
      }
      else{
        await makeAJAXCall('POST', site_properties.data_url, true, empObject);
      }
      window.location.replace('./'); //redirect to home page
    } catch (error) {
      console.error(error);
    }
  }


// check whether we are creating a new employee or editing
function checkForUpdate(){
  
  let searchObj = new URLSearchParams(window.location.search);
  let localPayroll = Object.fromEntries(searchObj.entries());
  
  isUpdate = localPayroll ? true : false;//if it is undefined set false, if it is defined i.e already present then set true
  if(!isUpdate) return;//if false
  
  set_Form();
}

// Retrieving information of the employee in the form
const set_Form= async () =>{
  let searchObj = new URLSearchParams(window.location.search);
  let localPayroll = Object.fromEntries(searchObj.entries());
  try {
    let employeePayrollObj = JSON.parse(await makeAJAXCall('GET', `${site_properties.data_url}/${localPayroll.id}`));
    console.log(employeePayrollObj);

    setValue('#name', employeePayrollObj.eName);
    setSelectedValues('[name=profile]', employeePayrollObj.eProfile);
    setSelectedValues('[name=gender]', employeePayrollObj.eGender);
    setSelectedValues('[name=department]', employeePayrollObj.eDepartment);
    setValue('#salary', employeePayrollObj.eSalary);
    setTextValue('#salary-text', employeePayrollObj.eSalary);
    setValue('#notes', employeePayrollObj.eNotes);
    let date = stringifyDate(employeePayrollObj.eStartDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    
  } catch (error) {
    console.error(error)
  }
}


// Functions for setting the form values

const setValue = (id, value) =>{
  const element = document.querySelector(id);
  element.value = value;
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if(Array.isArray(value)){//this is done for department checkboxes
      if(value.includes(item.value)){
        item.checked = true;
      }
    }
    else if(item.value === value){
      item.checked = true;
    }
  });
}


const setTextValue = (id, value) =>{
  const element = document.querySelector(id);
  element.textContent = value;
}

const stringifyDate = (date) => {
  const options = {day: 'numeric', month: 'short', year: 'numeric'};
  const newDate = !date ? "undefined":
  new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
  return newDate;
}

const resetForm = () =>{
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setTextValue('#salary-text', '10000');
  setValue('#notes', '');
  setSelectedIndex('#day', 0);
  setSelectedIndex('#month', 0);
  setSelectedIndex('#year', 0);
}

const unsetSelectedValues = (propertyValue) =>{
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

const cancelBtn = () =>{
  resetForm();
  window.location.replace('/pages/index.html');
}

const setSelectedIndex = (id, index) =>{
  const element = document.querySelector(id);
  element.selectedIndex = index;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const getSelectedValues = (propertyValue) =>{
  let allItems = document.querySelectorAll(propertyValue);
  let setItems = [];
  allItems.forEach(item => {
    if(item.checked) setItems.push(item.value);
  });
  return setItems;
}