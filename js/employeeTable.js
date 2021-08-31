// onload
window.addEventListener('DOMContentLoaded', (event)=> {

    if(!localStorage.getItem('loginKey')){
        window.location.href = `./employeePayrollLogin.html?redirect=${encodeURI(window.location.href)}`
    }
    
    makeAJAXCall('GET', site_properties.data_url, true).then(data => {
        empPayReset = JSON.parse(data);
        document.querySelector('#emp-total').textContent = empPayReset.length;//display total no. of employees
    });

    display();
  });
  
// Table creation
async function display(){

    try{
    let EmployeePayrollList1 = await makeAJAXCall('GET', site_properties.data_url);
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

async function deleteID(nodeId){
    try {
        await makeAJAXCall('DELETE', `${site_properties.data_url}/${nodeId}`, true);
    } catch (error) {
        console.error(error);
    }
    finally{
        //refresh the page
        display();
    }
}

// Redirecting to particular employee form using id
function updateForm(nodeId) {
    window.location.replace(`/pages/employeePayroll.html?id=${nodeId}`);
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