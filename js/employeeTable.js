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
                                 <button class="searchBtn"><i class="fa fa-trash"></i></button>
                                 <button class="searchBtn"><i class="fa fa-edit"></i></button>
                                 </td>
                                </tr>
                            </tbody>`;
                            
    }
    document.querySelector('#myTable').innerHTML = innerHTML;
    document.querySelector('#emp-total').innerHTML = EmployeePayrollList.length; //display total no. of employees
}

window.onload = function() {
    display();
  };