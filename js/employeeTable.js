let employeeData = `
<thead>
<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Action</th>
</tr>
</thead>

<tbody>
    <tr>
    <td><img src="/assets/images/Ellipse -2.png" alt="Profile Pic"></td>
    <td>Darshan Khot</td>
    <td>Male</td>
    <td>HR</td>
    <td>10000</td>
    <td>2 August 2021</td>
    <td>Delete, Edit</td>
    </tr>

    <tr>
    <td><img src="/assets/images/Ellipse -4.png" alt="Profile Pic"></td>
    <td>Thejashree</td>
    <td>Female</td>
    <td>Admin, HR</td>
    <td>50000</td>
    <td>2 August 2021</td>
    <td>Delete, Edit</td>
    </tr>

    <tr>
    <td><img src="/assets/images/Ellipse -3.png" alt="Profile Pic"></td>
    <td>Aditya Uphade</td>
    <td>Male</td>
    <td>Finance</td>
    <td>15000</td>
    <td>2 August 2021</td>
    <td>Delete, Edit</td>
    </tr>
</tbody>
`;

// Only flaw of using querySelector is that old browsers don't support this, we can do the same by getElementByID
document.querySelector('#myTable').innerHTML = employeeData;