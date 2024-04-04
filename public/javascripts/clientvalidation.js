function validateForm() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email-user").value;
    var password = document.getElementById("password").value;
  
    if (firstName.trim() == "" || lastName.trim() == "" || email.trim() == "" || password.trim() == "") {
      alert("Please fill out all fields.");
      return false; // Prevent form submission
    }
  
    return true; // Allow form submission
  }
  