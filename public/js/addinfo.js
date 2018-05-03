$(document).ready(function () {
  $("#loggedemail").html(localStorage.getItem("email"));  

  $("#secondpage").hide();
  $("#thirdpage").hide();


  $("#submit-btn").on("click", function (event) {
    event.preventDefault();

    $("#helpBox").hide();
    $("#secondpage").show();

    var newDestination = {
      email: localStorage.getItem("email"),
      // email: $("#emailadd").val().trim(),
      destination: $("#destInput").val().trim(),
      attractions: $("#attrInput").val().trim(),
      activities: $("#actiInput").val().trim(),
      restaurants: $("#restInput").val().trim()
    };

    $.post("/api/new", newDestination)
      .then(function (results) {
        // console.log("First submit RESULTS: ", results);
        $.ajax({
          method: "GET",
          url: "/api/entry"
        }).then(function (data) {
          // console.log("*********************");
          // console.log("First ajax request: ", data);
          showtravelinfo(data);
        });

        function showtravelinfo(dbtravelinfo) {
          $("#entry").empty();
          var argv;
          for (let i = 0; i < dbtravelinfo.length; i++) {
            arvg = dbtravelinfo[dbtravelinfo.length - 1];
          }
          // console.log("showtraveelinfo() dbtravelinfo.length: ", arvg);              

          addOneEntry(arvg);
        } //showtravelinfo() ends here.              

        function addOneEntry(data) {
          var newEntryElement = $("<div>");
          newEntryElement.addClass("entryclass");
          newEntryElement.append(`<p><b>Email: ${data.email}</p>`);
          newEntryElement.append(`<p>Destination: ${data.destination}</p>`);
          newEntryElement.append(`<p>Attractions: ${data.attractions}</p>`);
          newEntryElement.append(`<p>Activities: ${data.activities}</p>`);
          newEntryElement.append(`<p>Restaurants: ${data.restaurants}</p>`);
          newEntryElement.append(`<button type="submit" data-id='${data.id}' class="btn btn-primary deleteEntry">Delete</button>`);
          newEntryElement.append(`<button type="submit" data-id='${data.id}' class="btn btn-primary updateEntry">Update</button>`);
          $("#entry").append(newEntryElement);
          // console.log("add one entry: ",newEntryElement)
        }

      }); //$.post ends here.   

    $("#emailadd").val("");
    $("#destInput").val("");
    $("#attrInput").val("");
    $("#actiInput").val("");
    $("#restInput").val("");

  }); //submit button ends here.

  
// delete an entry.
$("#entry").on("click", ".deleteEntry", function (event) {
  event.preventDefault();

  $("#secondpage").hide();

  var id = $(this).data("id");
  // console.log("delete entry id: ", id);

  $.ajax({
    method: "DELETE",
    url: "/api/delete/" + id
  }).then(function (data) {
    // console.log("delete data: ", data);
  });
  $("#entry").empty();
}); //deleteEntry button ends here


//update an entry.
$("#entry").on("click", ".updateEntry", function (event) {
  event.preventDefault();

  $("#firstpage").hide();
  $("#secondpage").hide();
  $("#thirdpage").show();

  var id = $(this).data("id");
  console.log("update entry id: ", id);

  $.get("/api/entry/" + id).then(function (data) {
    $("#email-update").val(localStorage.getItem("email"), );
    $("#dest-update").val(data.destination);
    $("#act-update").val(data.attractions);
    $("#rest-update").val(data.activities);
    $("#attr-update").val(data.restaurants);
    $("#update-changes").data("id", data.id);
  })
}); //deleteEntry button ends here


// update changes button function.
$("#update-changes").on("click", function (event) {

  // event.preventDefault();

  $("#firstpage").hide();
  $("#secondpage").hide();

  var id = $(this).data("id");
  console.log("update-changes id: ", id);

  var updatedinfo = {
    // email: $("#email-update").val().trim(),
    email: localStorage.getItem("email"),
    destination: $("#dest-update").val().trim(),
    attractions: $("#act-update").val().trim(),
    activities: $("#rest-update").val().trim(),
    restaurants: $("#attr-update").val().trim(),
    id: id
  };//var updatedinfo ends here

  $.ajax({
    method: "PUT",
    url: "/api/update",
    data: updatedinfo
  }).then(function (data) {
    // console.log("--------------------------------------");
    // console.log("AFTER UPDAING : ", data);        
  });

  //Empty each input box by replacing the value with an empty string
  $("#email-update").val("");
  $("#dest-update").val("");
  $("#act-update").val("");
  $("#rest-update").val("");
  $("#attr-update").val("");

  window.alert("Changes Successfully Updated!!!");

  setTimeout(function () {
    window.location.href = "./view.html";
  }, 3000);

}); //submit button ends here.
  
});//document ready function ends here.




//NOT USING BELOW FUNCTIONS. They were for need help modal for restaurants and attraction buttons.

$("#help").on("click", function (event) {
  event.preventDefault()
  var destination = $("#destInput").val().trim();
  var zomURL = "https://api.foursquare.com/v2/venues/search?client_id=NELSJRC1FWDIY1SJAC1QIRBMZKREWGTEC3CJFAKDM1OPTNPV&client_secret=Y51IZLSLUJIWDSIBGOAMGK2ON3KIUPSQNHMKAQPCI3M11CHR&v=20180501&near=";

  $.ajax({
    url: zomURL + destination,
    method: "GET"
  }).then(function (results) {

    var results = results.response.venues
    var h1 = $("<h1>");
    $("#modalTitle").append(h1);
    h1.text("Restaurants");
    for (var i = 0; i < 10; i++) {
      // var div = $("<div>");
      var div1 = $("<div>")
      var hr = $("<hr>")
      var h2 = $("<h2>");
      var p1 = $("<h4>");
      var p2 = $("<h4>");
      var p3 = $("<h4>");
      var p4 = $("<h4>");
      var p5 = $("<h4>");
      var a = $("<a>");
      var name = results[i].name;
      var address = results[i].location.address;
      var crossStreet = results[i].location.crossStreet;
      var city = results[i].location.city;
      var state = results[i].location.state;
      var postal = results[i].location.postalCode;
      var url = results[i].url;
      a.attr("href", url);
      a.appendTo(h2)
      div1.attr("id", "modText");
      h2.text(name);
      p1.text(address);
      p2.text(crossStreet);
      p3.text(city);
      p4.text(state);
      p5.text(postal);
      p3.appendTo(p4);
      p4.appendTo(p5);
      div1.append(h2, p1, p2, p3);
      div1.append(hr)
      h2.addClass("name")
      // div.append(div1)
      // console.log("this is one" + results[i].location.formattedAddress[i])
      // p.text(address)
      // div.append(p)
      console.log("destination ", destination)
      $(".modal-body").append(div1);
    };
    $("#myModal").modal("show");

  }
  )
})
// $(document).on("click", ".dest", function () {
$("#attrHelp").on("click", function (event) {

  event.preventDefault();
  var destination = $("#destInput").val().trim();
  var tomURL = "https://api.foursquare.com/v2/venues/explore?client_id=NELSJRC1FWDIY1SJAC1QIRBMZKREWGTEC3CJFAKDM1OPTNPV&client_secret=Y51IZLSLUJIWDSIBGOAMGK2ON3KIUPSQNHMKAQPCI3M11CHR&v=20180501&near=";

  $.ajax({
    url: tomURL + destination,
    method: "GET"
  }).then(function (results) {

    var results = results.response
    var h1 = $("<h1>");
    $("#modalTitle").append(h1);
    h1.text("Attractions");

    for (var i = 0; i < 10; i++) {
      // var div = $("<div>");
      var div1 = $("<div>")
      var hr = $("<hr>")
      var h2 = $("<h2>");
      var p1 = $("<h4>");
      var p2 = $("<h4>");
      var p3 = $("<h4>");
      var p4 = $("<h4>");
      var p5 = $("<h4>");

      var name = results.groups[0].items[i].venue.name;
      var address = results.groups[0].items[i].venue.location.address;
      var crossStreet = results.groups[0].items[i].venue.location.crossStreet;
      var city = results.groups[0].items[i].venue.location.city;
      var state = results.groups[0].items[i].venue.location.state;
      var postal = results.groups[0].items[i].venue.location.postalCode;
      // var url = results.groups[0].items[i].


      div1.attr("id", "modText");
      h2.text(name);
      p1.text(address);
      p2.text(crossStreet);
      p3.text(city);
      p4.text(state);
      p5.text(postal);
      p3.appendTo(p4);
      p4.appendTo(p5);
      div1.append(h2, p1, p2, p3);
      div1.append(hr)
      h2.addClass("name")
      // div.append(div1)
      // console.log("this is one" + results[i].location.formattedAddress[i])
      // p.text(address)
      // div.append(p)
      // console.log(results.groups[].items[i].venue)
      // console.log("destination ", destination)
      $(".modal-body").append(div1);
    };
    $("#myModal").modal("show");
  }
  )

})
