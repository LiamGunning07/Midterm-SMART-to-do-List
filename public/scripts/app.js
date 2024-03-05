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
        // clear form
        $('#submitForm')[0].reset();
        // find correct dropdown, open it, and load table
        let category = result.category;
        if (category !== 'to_watch' && category !== 'to_eat' && category !== 'to_read' && category !== 'to_buy') {
          category = 'misc';
        }
        $(`#${category}-drop`).empty();
        $(`#${category}-drop`).slideDown();
        $.get(`/items/${category}`, function(data) {
          data.forEach(item => {
            $(`#${category}-drop`).append(createItemElement(item));
          });
        }).fail(function(xhr, status, error) {
          console.log("Error fetching data:", error);
        });

      },
      error: function(err) {
        console.log("There was an error ",err);
      }
    });
  })

  createItemElement = function(item) { // Helper Function for Each Item Element
    return `
    <article>
      <p id="item${item.id}"> ${item.title} </p>
      <div>
      <button type ="button" class="delete-btn">Delete</button>
      <button type ="button" class="edit-btn">Edit</button>
        <div class="checkbox-container">
          <input type="checkbox" id="myCheckbox" class="custom-checkbox">
          <label for="myCheckbox" class="checkbox-label">Completed</label>
        </div>
      </div>
    </article>`;
  };

  // Delete button listener
  $(document).on('click', '.delete-btn', function() {
    // extracy current itemId
    const itemId = $(this).closest('article').find('p').attr('id').replace('item', '');
    console.log("clicked delete");
    $.ajax({
      url: 'items/delete',
      type: 'POST',
      data: { id: itemId },
      success: function(res) {
        const category = res.category;
        console.log("category: ", category);
        $(`#${category}-drop`).empty();
        $.get(`/items/${category}`, function(data) {
          data.forEach(item => {
            $(`#${category}-drop`).append(createItemElement(item));
          });
        }).fail(function(xhr, status, error) {
          console.log("Error fetching data:", error);
        });
      },
      error: function(xhr, status, error) {
        console.log("Error message: ", error)
      }
    })
  })

  // Load tables on button click for dropdown tables
  $("#to_watch-bttn").click(function() {
    $("#to_watch-drop").empty(); // Clear previous content
    console.log("Clicked!");
    $("#to_watch-drop").slideToggle();
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
    $("#to_read-drop").slideToggle();
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
    $("#to_eat-drop").slideToggle();
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
    $("#to_buy-drop").slideToggle();
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
    $("#misc-drop").slideToggle();
    $.get('/items/misc', function(data) {
      data.forEach(item => {
        $("#misc-drop").append(createItemElement(item));
      });
    }).fail(function(xhr, status, error) {
      console.log("Error fetching data:", error);
    });
  });



});
