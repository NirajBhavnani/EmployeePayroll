const employees = new Array();

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
    e.preventDefault();
    const {
      name: {
        value: name /* const name = e.target.Name.value; */
      },
      'profile' : {
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
      employee.name = name;
      employee.profile = pic;
      employee.gender = gender;
      employee.department = department;
      employee.salary = salary;
      employee.startDate = `${date} ${month} ${year}`;
      employee.notes = notes;

      console.log(employee);

      employees.push({id: employees.length, employee: employee});
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