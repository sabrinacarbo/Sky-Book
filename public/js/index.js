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
    var name = $("#nameInput")
      .val()
      .trim();
    var license = $("#licenseInput")
      .val()
      .trim();
    var numberOfJump = $("#jumpsInput")
      .val()
      .trim();
    var homeDropZone = $("#dropzoneInput")
      .val()
      .trim();
    var bio = $("#bioInput")
      .val()
      .trim();
    console.log("Password Check is " + passwordCheck);

    //Initially all fields are assumed to be complete. Then set this variable to false later if a field is found incomplete.
    var allFieldsComplete = true;
    var passwordsMatch = password === passwordCheck;
    console.log("Do the passwords match?");
    console.log(passwordsMatch);
    console.log(homeDropZone);

    if (username === "" || password === "" || passwordCheck === "") {
      allFieldsComplete = false;
    }

    if (allFieldsComplete && passwordsMatch) {
      //Create a new object for the user's responses
      var newUser = {
        userName: username,
        password: password,
        name: name,
        license: license,
        numberOfJump: numberOfJump,
        homeDropZone: homeDropZone,
        bio: bio
      };

      console.log(newUser);

      $.post("/api/users", newUser, function(data) {
        console.log(data);
      }).then(function(data) {
        goToUserProfile(data.id);
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
    var userInput = {
      userName: $("#username")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };
    $.post("/api/login", userInput, function(data) {
      if (data !== -1) {
        goToUserProfile(data);
      } else {
        alert("Please type in the correct username and password");
      }
    });
  });

  var goToUserProfile = function(userId) {
    window.location.href = "/profile/" + userId;
  };

  $("#img-input").on("change", function() {
    //Try to use "multer" to store img file on server and database....
    
    //var form = $("#img_form");
    //var options = {
    //  url: "/upload/img",
    //  type: "post",
    //  success: function(data) {
    //   data = JSON.parse(data);
    //   if (data.code === 0) {
    //      imgUrl = data.data.url;
    //   } else {
    //      alert("Failed to load the image");
    //    }
    //  }
    //};
    // form.ajaxSubmit(options);


    //New technology: Playing with Filelist Object
    var file = document.getElementById("img-input").files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var imgFile = e.target.result;
      $(".photo-img").attr("src", imgFile);
      $(".photo-img").attr("style", "display:block");
    };
    reader.readAsDataURL(file);
  });
});
