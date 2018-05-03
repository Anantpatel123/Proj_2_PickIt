$(document).ready(function () {
  $.get("/api/entry").then(function (data) {
    // console.log(data)
    if (data.length !== 0) {

      // $("#stats").empty();
      // $("#stats").show();

      for (var i = 0; i < data.length; i++) {

        var div = $("<div>");
        div.attr("id", data[i].id);
        var btnDiv = $("<div>")
        var button = $("<button>");
        var button2 = $("<button>");
        var button3 = $("<button>");
        // var p = $("<p>")
        // button.attr('data-name', data[i].destination)
        // button2.attr('data-attr', data[i].attractions)
        // button3.attr('data-rest', data[i].restaurants)
        // p.text("Restaurants: ");
        // p.append(data[i].restaurants)
        // button.addClass("btn btn-default btn-xs dest");
        // button2.addClass("btn btn-default btn-xs attract");
        // button3.addClass("btn btn-default btn-xs activities");
        // div.append(p)
        // button.attr("data", "rest1")
        // button.append("Restaurant");
        // button2.append("Fun");
        // button3.append("Features");
        div.append("<h2>" + data[i].destination + "</h2>");
        div.append("<p>Activities: " + data[i].activities + "</p>");
        div.append("<p>Restuarants: " + data[i].restaurants + "</p>");
        div.append("<p>Attractions: " + data[i].attractions + "</p>");
        div.append("<p>-------------------------------------------------------------------------------------------</p>");
        // div.append("<button class='delete' data-id='" + data[i].id + "'>delete</button><br>");
        // btnDiv.append(button);
        // btnDiv.append(button2);
        // btnDiv.append(button3);
        div.append(btnDiv)
        $("#stats").append(div);

      };
    };
  });
});