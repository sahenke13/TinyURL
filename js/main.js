auth.onAuthStateChanged(user => {
  if (user) {
    $.ajax("/m/user/" + user.email, {
      type: "GET"
    }).then(data => {
      console.log("data is: ", data);
      for (let i in data) {
        let tableRow = $("<tr>");
        let tableData1 = $("<td>");
        tableData1.attr("class", "td-1");
        let tableData2 = $("<td>");
        let tableData3 = $("<td>");
        let tinyURL = $("<a>");
        tinyURL.attr("href", data[i].shortURL);
        tinyURL.text(data[i].shortURL);
        let orgURL = data[i].longURL;
        let count = data[i].count;
        let orgURLData = tableData1.append(orgURL);
        let tinyURLData = tableData2.append(tinyURL);
        let countData = tableData3.append(count);
        tableRow.append(orgURLData);
        tableRow.append(tinyURLData);
        tableRow.append(countData);
        $("#dynamicTable").append(tableRow);
      }
    });
  }

  // click handler for longURL submit
  $(document).on("click", "#submit", () => {
    if (
      $("#longURL")
        .get(0)
        .checkValidity()
    ) {
      let longURL = $("#longURL").val();
      let userID = user.email;
      console.log("userID: ", userID);
      console.log("longURL is: ", longURL);

      $.ajax("/m", {
        type: "POST",
        url: "/m",
        data: { longURL: longURL, count: 0, user: userID }
      }).then(data => {
        console.log(data);
      });

      $("#longURL").val(" ");
    } else {
      alert("Invalid URL, please try again.");
      $("#longURL").val(" ");
      location.reload(true);
    }

    $("#longURL").val(" ");
    location.reload(true);
  });
});

//On Click function for Signing Up a new User
$(document).on("click", "#signup", e => {
  e.preventDefault();
  let email = $("#userName").val();
  let password = $("#password").val();
  let confPassword = $("#confirmPassword").val();
  if (
    password === confPassword &&
    $("#userName")
      .get(0)
      .checkValidity()
  ) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log("cred.user is: ", cred.user);
        auth.signOut();
        window.location = "/login";
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    alert(
      "Please check that your email is valid and that your passwords match"
    );
  }
});
// need to get signin information
$(document).on("click", "#logIn", e => {
  e.preventDefault();
  let email = $("#logInUser").val();
  let password = $("#logInPassword").val();

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred.user);
      window.location = "/shortUrl";
    })
    .catch(() => {
      alert("Validation Failed, please try again");
      $("#logInUser").val("");
      $("#logInPassword").val("");
    });
});

$(document).on("click", "#logout", () => {
  console.log("logout has been clicked");
  auth.signOut().then(() => {
    window.location = "/login";
  });
});
