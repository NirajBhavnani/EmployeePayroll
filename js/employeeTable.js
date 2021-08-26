window.addEventListener('DOMContentLoaded', (event)=> {
    empPayReset = JSON.parse(localStorage.getItem('EmployeeDetails'));
    document.querySelector('#emp-total').textContent = empPayReset.length;//display total no. of employees
    localStorage.removeItem('empObject');
    display();
  });
  
function display(){

    let EmployeePayrollList = JSON.parse(localStorage.getItem('EmployeeDetails')); //Fetching the string type data from local storage
        
    let headerHTML = `<thead>
                     <tr>
                         <th></th>
                         <th>Name</th>
                         <th>Gender</th>
                         <th>Department</th>
                         <th>Salary</th>
                         <th>Start Date</th>
                         <th>Action</th>
                     </tr>
                     </thead>`
    
    let innerHTML = `${headerHTML}`;
    let employeeDataArr = EmployeePayrollList;
    
    
    for(const data of employeeDataArr){
        console.log(data);
        innerHTML = `${innerHTML}
                            <tbody>
                                <tr>
                                 <td><img src= "${data.eProfile}" alt="Profile Pic"></td>
                                 <td>${data.eName}</td>
                                 <td>${data.eGender}</td>
                                 <td>${data.eDepartment}</td>
                                 <td>${data.eSalary}</td>
                                 <td>${data.eStartDate}</td>
                                 <td>
                                 <button class="searchBtn" onclick ="deleteID(${data.id})" alt="Delete"><i class="fa fa-trash"></i></button>
                                 <button class="searchBtn" onclick ="updateForm(${data.id})"><i class="fa fa-edit"></i></button>
                                 </td>
                                </tr>
                            </tbody>`;
                            
    }
    document.querySelector('#myTable').innerHTML = innerHTML;
   
}

function deleteID(nodeId){
    let localPayrolllist = JSON.parse(localStorage.getItem(`EmployeeDetails`));
    let newLocalPayrolllist = [];
    localPayrolllist.forEach(emp => {
        if (emp.id != nodeId) {
            newLocalPayrolllist.push(emp)
        }
    localStorage.setItem(`EmployeeDetails`, JSON.stringify(newLocalPayrolllist))
    });

    //refresh the page
    display();
}

// Object creation and assigning the employee tuple in the localStorage (empObj)
function updateForm(nodeId) {
    let localPayrolllist = JSON.parse(localStorage.getItem(`EmployeeDetails`));
    let empPayrollData = localPayrolllist.find(empData => empData.id == nodeId)
    if(!empPayrollData) return;
    localStorage.setItem('empObject', JSON.stringify(empPayrollData));
    window.location.replace('/pages/employeePayroll.html');
}