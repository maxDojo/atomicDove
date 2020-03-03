// Functions for register forms
var currentTab = 0; // Current tab is set to be the first tab (0)
showRegTab(currentTab); // Display the current tab

function showRegTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("register-tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which register-tab to display
  var x = document.getElementsByClassName("register-tab");
  // Exit the function if any field in the current register-tab is invalid:
  if (n == 1 && !validateRegForm()) return false;
  // Hide the current register-tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showRegTab(currentTab);
}

function validateRegForm() {
  // This function deals with validation of the form fields
  var tab, input, i, valid = true;
  tab = document.getElementsByClassName("register-tab");
  input = tab[currentTab].getElementsByClassName("reqInput");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < input.length; i++) {
    // If a field is empty...
    if (input[i].value == "") {
      // add an "invalid" class to the field:
      input[i].className += " invalid"
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// End Register Form Functions