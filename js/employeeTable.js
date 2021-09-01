// onload
window.addEventListener("DOMContentLoaded", (event) => {
  if (!localStorage.getItem("loginKey")) {
    window.location.href = `./employeePayrollLogin.html?redirect=${encodeURI(
      window.location.href
    )}`;
  }

  makeAJAXCall("GET", site_properties.data_url, true).then((data) => {
    empPayReset = JSON.parse(data);
    document.querySelector("#emp-total").textContent = empPayReset.length; //display total no. of employees
  });

  display();
 
});

// Table creation
async function display() {
  try {
    let EmployeePayrollList1 = await makeAJAXCall(
      "GET",
      site_properties.data_url
    );
    let EmployeePayrollList = JSON.parse(EmployeePayrollList1);
    populateTable(EmployeePayrollList);

    if(EmployeePayrollList1){
    setTimeout(function () {
      hidePreloader();
    },1000);
  }
    
  } catch (error) {
    console.log(error);
    setTimeout(function () {
      hidePreloader();
      window.alert('Server Fetch Error');
    },1000);
  }
}

function populateTable(dataList) {
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
                     </thead>`;

  let innerHTML = `${headerHTML}`;
  let employeeDataArr = dataList;

  for (const data of employeeDataArr) {
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
  document.querySelector("#myTable").innerHTML = innerHTML;
}

async function deleteID(nodeId) {
  try {
    await makeAJAXCall("DELETE", `${site_properties.data_url}/${nodeId}`, true);
  } catch (error) {
    console.error(error);
  } finally {
    //refresh the page
    display();
  }
}

// Redirecting to particular employee form using id
function updateForm(nodeId) {
  window.location.replace(`/pages/employeePayroll.html?id=${nodeId}`);
}

//Search Functionality
document
  .getElementById("search-bar")
  .addEventListener("keyup", async function (e) {
    try {
      e.preventDefault();
      const term = e.target.value.trim().toLowerCase();
      var emps = JSON.parse(
        await makeAJAXCall("GET", site_properties.data_url, true)
      );
      emp = emps.filter((empData) => empData.eName.toLowerCase().includes(term));
      if (!emp) return;
      localStorage.setItem("empSearch", JSON.stringify(emp));

      let searchList = JSON.parse(localStorage.getItem("empSearch"));
      if (term!=='') {
        populateTable(searchList);
        localStorage.removeItem("empSearch");
      } else {
        display();
      }
    } catch (error) {
      console.error(error);
    }
  });

  var preloader = document.getElementById('preloader-bg');

  function hidePreloader(){
    preloader.style.display = 'none';
  }