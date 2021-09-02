// slider bar
const sliderID = document.getElementById("salary");

sliderID.onchange = function () {
  document.getElementById("salary-text").innerHTML = sliderID.value;
};

// popup
function popUp() {
  var popup = document.querySelector(".popuptext");
  popup.classList.toggle("show");
}

myInfo = JSON.parse(localStorage.getItem("loginKey"));
document.querySelector(
  ".popuptext"
).innerHTML = `Hello, ${myInfo.email} &nbsp; No: ${myInfo.phone}`;
