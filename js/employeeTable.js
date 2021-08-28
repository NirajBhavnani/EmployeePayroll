window.addEventListener('DOMContentLoaded', (event)=> {
    empPayReset = JSON.parse(localStorage.getItem('EmployeeDetails'));
    document.querySelector('#emp-total').textContent = empPayReset.length;//display total no. of employees
    localStorage.removeItem('empObject');
    display();
    // makeAJAXCall('GET', 'http://localhost:3000/employees');
  });
  
async function display(){

    // let EmployeePayrollList = JSON.parse(localStorage.getItem('EmployeeDetails')); //Fetching the string type data from local storage

    try{
    let EmployeePayrollList1 = await makeAJAXCall('GET', 'http://localhost:3000/employees');
    let EmployeePayrollList = JSON.parse(EmployeePayrollList1);
        
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
catch(error){
    console.log(error);
}
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

// function search(){
//     var searchQuery = document.querySelector('#search-bar').value;

//     var localStorageItem = localStorage.getItem(searchQuery);

//     var elementValue = $('#myTable')
//     .find('tr#key_' + localStorageItem)
//     .children('td.two')
//     .text();

//   console.log(elementValue);
// }

// const searchBar = document.getElementById('search-bar').value;
// searchBar.addEventListener('keyup', function(e){
//     const term = e.target.value.toLowerCase();
//     const emps = JSON.parse(localStorage.getItem(`EmployeeDetails`));
//     emps = emps.filter(empData => empData.eName == term);
//     console.log(emps);
//     if(!emps) return;
//     localStorage.setItem('empSearch', JSON.stringify(emps));
// });