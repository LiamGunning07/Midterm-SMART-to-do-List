// Client facing scripts here

$(document).ready(function() {

  // event listener for submit button
  $('#submitForm').on("submit", function(event) {
    event.preventDefault();
    console.log("event is fired")
    const serializedItem = $("#form1").serialize();
    $.ajax({
      method: "POST",
      url: "/",
      data: serializedItem,
      success: function(result) {
        console.log("Item was posted successfully", result);
        // loadItems();
        $(`#misc-drop`).append(`<p>${result}</p>`)

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


  $("#to-watch-bttn").click(function() {
    $("#to-watch-drop").empty(); // Clear previous content
    $.get('/items/to-watch', function(data) {
      data.forEach(item => {
        $("#to-watch-drop").append(`<p>${item.title}</p>`); // Assuming 'title' is a field in your database table
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });


});
