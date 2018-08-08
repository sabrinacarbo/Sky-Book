$(document).ready(function() {
  //This displays the popup modal for creating an account
  // Get the modal
  var modal = document.getElementById("sign-up-modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  //User signs up on click event
  $("#sign-up-link").on("click", function() {
    modal.style.display = "block";
  });

  //User created on click event
  $("#create-account-submit").on("click", function(event) {
    event.preventDefault();

    //Grab the data from the inputs
    var username = $("#usernameInput")
      .val()
      .trim();
    console.log("Username is " + username);
    var password = $("#passwordInput")
      .val()
      .trim();
    console.log("Password is " + password);
    var passwordCheck = $("#passwordInputCheck")
      .val()
      .trim();
    console.log("Password Check is " + passwordCheck);

    //Initially all fields are assumed to be complete. Then set this variable to false later if a field is found incomplete.
    var allFieldsComplete = true;
    var passwordsMatch = password === passwordCheck;
    console.log("Do the passwords match?");
    console.log(passwordsMatch);

    if (username === "" || password === "" || passwordCheck === "") {
      allFieldsComplete = false;
    }

    if (allFieldsComplete && passwordsMatch) {
      //Create a new object for the user's responses
      var newUser = {
        userName: username,
        password: password,
        id: id
      };

      console.log(newUser);

      $.post("/api/users", newUser, function(data) {
        console.log(data);
      });
    } else if (allFieldsComplete === false) {
      alert("Please complete all fields before submitting!");
    } else if (passwordsMatch === false) {
      alert("The two password inputs do not match!");
      $("#passwordInput").val("");
      $("#passwordInputCheck").val("");
    }
  });

  //User on click login function
  $("#login").on("click", function(event) {
    event.preventDefault();
    login.userInput.username = $("#username")
      .val()
      .trim();
    login.userInput.password = $("#password")
      .val()
      .trim();
    login.checkLoginPassword();
  });

  var login = {
    userInput: {
      username: "",
      password: ""
    },

    checkLoginPassword: function() {
      var ifMatch = false;
      $.get("/api/users", function(data) {
        //console.log(login.userInput);
        for (var i = 0; i < data.length; i++) {
          if (data[i].userName === login.userInput.username) {
            if (data[i].password === login.userInput.password) {
              ifMatch = true;
              userId = data[i].id;
            }
          }
        }
        if (ifMatch) {
          goToUserProfile(userId);
        }
      });
    }
  };

  var goToUserProfile = function(userId) {
    window.location.href = "/profile/" + userId;
  };
});
