//On Click function for Signing Up a new User
$(document).on("click", "#signup", e => {
  e.preventDefault();
  let userName = $("#userName").val();
  let password = $("#password").val();
  let confPassword = $("#confirmPassword").val();
  if (
    password === confPassword &&
    $("#userName")
      .get(0)
      .checkValidity()
  ) {
    //make ajax post to create new User in DB.

    $.ajax("/m/user", {
      type: "POST",
      url: "/m/user",
      data: { email: userName, password: password }
    });
    window.location = "/login";
  } else {
    alert(
      "Please check that your email is valid and that your passwords match"
    );
  }
});

// need to get signin information
$(document).on("click", "#logIn", e => {
  e.preventDefault();
  let userName = $("#logInUser").val();
  let password = $("#logInPassword").val();
  console.log("userName: ", userName);

  $.ajax("/m/user/", {
    type: "GET"
  }).then(data => {
    //this is working, now need to check if password and email match if so, make currentUser, and reroute to shortURLs, if not send up alert and clear from.
    let curUser = data.find(el => {
      console.log("userName: ", el.email);
      console.log("id is :", el._id);
      return el.email === userName;
    });

    console.log("curUser id is: ", curUser._id);

    if (curUser && password === curUser.password) {
      console.log("It's time to rock and roll baby");
      // hit route to set CurUser
      $.ajax("/m/curUser", {
        type: "POST",
        data: { curUser: curUser._id }
      });
      window.location = "/shortUrl";
    } else {
      alert("Authenication Failed!! Your Email and/or Password is incorrect");

      //add a page reload.
    }
  });
});

$(document).on("click", "#logout", () => {
  console.log("logout has been clicked");
  $.ajax("/m/curUser", {
    type: "DELETE"
  });
  window.location = "/login";
});
