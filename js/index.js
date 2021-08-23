const sliderID = document.getElementById("salary");

sliderID.onchange = function() {
    document.getElementById("salary-text").innerHTML = sliderID.value;
  }