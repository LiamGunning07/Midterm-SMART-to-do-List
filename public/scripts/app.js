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
      url: "/items/add",
      processData: false,
      data: serializedItem,
      success: function(result) {
        console.log("Item was posted successfully", result);
        $('#submitForm')[0].reset();
        let category = result.category;
        if (category !== 'to_watch' && category !== 'to_eat' && category !== 'to_read' && category !== 'to_buy') {
          console.log("category changed to misc")
          category = 'misc';
        }
        $(`#${category}-drop`).slideDown();
      },
      error: function(err) {
        console.log("There was an error ",err);
      }
    });
  })

  // event listeners for dropdowns
  $("#to_watch-bttn").click(function() {
    $("#to_watch-drop").slideToggle();
  });

  $("#to_buy-bttn").click(function() {
    $("#to_buy-drop").slideToggle();
  });

  $("#to_read-bttn").click(function() {
    $("#to_read-drop").slideToggle();
  });

  $("#to_eat-bttn").click(function() {
    $("#to_eat-drop").slideToggle();
  });

  $("#misc-bttn").click(function() {
    $("#misc-drop").slideToggle();
  });

  createItemElement = function(item) { // Helper Function for Each Item Element
    return `
    <article>
      <p> ${item.title} </p>
      <div>
      <button type ="submit" class="delete-btn">Delete</button>
      <button type ="submit" class="edit-btn">Edit</button>
        <div class="checkbox-container">
          <input type="checkbox" id="myCheckbox" class="custom-checkbox">
          <label for="myCheckbox" class="checkbox-label">Completed</label>
        </div>
      </div>
    </article>`;
  };

  // Load tables on button click for dropdown tables
  $("#to_watch-bttn").click(function() {
    $("#to_watch-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_watch', function(data) {
      data.forEach(item => {
        $("#to_watch-drop").append(createItemElement(item));
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });

  $("#to_read-bttn").click(function() {
    $("#to_read-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_read', function(data) {
      data.forEach(item => {
        $("#to_read-drop").append(createItemElement(item));
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });

  $("#to_eat-bttn").click(function() {
    $("#to_eat-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_eat', function(data) {
      data.forEach(item => {
        $("#to_eat-drop").append(createItemElement(item));
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });

  $("#to_buy-bttn").click(function() {
    $("#to_buy-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $.get('/items/to_buy', function(data) {
      data.forEach(item => {
        $("#to_buy-drop").append(createItemElement(item));
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
        $("#misc-drop").append(createItemElement(item));
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });



});
