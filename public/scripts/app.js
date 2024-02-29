// Client facing scripts here
$(document).ready(function() {

  // event listener for submit button
  $('#submitButton').on("sumbit", function(event) {
    event.preventDefault();
    const serializedItem = $("#form1").serialize();
    $.ajax({
      method: "POST",
      url: "/",
      data: serializedItem,
      success: function(result) {
        console.log("Item was posted successfully");
        loadItems();
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



});
