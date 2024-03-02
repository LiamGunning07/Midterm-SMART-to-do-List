// Client facing scripts here

$(document).ready(function() {

  // event listener for submit button
  $('#submitForm').on("submit", function(event) {
    event.preventDefault();
    console.log("event is fired")
    const serializedItem = $("#form1").serialize();
    console.log("serializedItem =", serializedItem)
    $.ajax({
      method: "POST",
      url: "/items",
      processData: false,
      data: serializedItem,
      success: function(result) {
        console.log("Item was posted successfully", result);
        // loadItems();
        $(`#misc-drop`).append(`<p>${result}</p>`) // delete this once we get INSERT working

      },
      error: function(err) {
        console.log("There was an error ",err);
      }
    });
  })

  // event listeners for dropdowns
  $("#to-watch-bttn").click(function() {
    $("#to-watch-drop").slideToggle();
  });

  $("#to-buy-bttn").click(function() {
    $("#to-buy-drop").slideToggle();
  });

  $("#to-read-bttn").click(function() {
    $("#to-read-drop").slideToggle();
  });

  $("#to-eat-bttn").click(function() {
    $("#to-eat-drop").slideToggle();
  });

  $("#misc-bttn").click(function() {
    $("#misc-drop").slideToggle();
  });

  // Load tables on button click for dropdown tables
  $("#to-watch-bttn").click(function() {
    $("#to-watch-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_watch', function(data) {
      data.forEach(item => {
        $("#to-watch-drop").append(`<p>${item.title}</p>`);
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });

  $("#to-read-bttn").click(function() {
    $("#to-read-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_read', function(data) {
      data.forEach(item => {
        $("#to-read-drop").append(`<p>${item.title}</p>`);
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });

  $("#to-eat-bttn").click(function() {
    $("#to-eat-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_eat', function(data) {
      data.forEach(item => {
        $("#to-eat-drop").append(`<p>${item.title}</p>`);
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });

  $("#to-buy-bttn").click(function() {
    $("#to-buy-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_buy', function(data) {
      data.forEach(item => {
        $("#to-buy-drop").append(`<p>${item.title}</p>`);
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });


  $("#misc-bttn").click(function() {
    $("#misc-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/misc', function(data) {
      data.forEach(item => {
        $("#misc-drop").append(`<p>${item.title}</p>`);
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });

});
