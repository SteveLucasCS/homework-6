//  Instructions

// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.
var topics = ["dogs", "cats", "animals"];
// array of existing buttons on the page


var dataContainer = $("#data-container");
var buttonContainer = $("#button-container");
var currentDataSize = 0;

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.
function addButtons() {
  buttonContainer.html("");
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]);
    newButton.addClass("btn btn-primary topic-btn");
    newButton.data("topic", topics[i]);
    newButton.on("click", function() {
      event.preventDefault();
      getData($(this).data("topic"));
    });
    buttonContainer.prepend(newButton);
  }
}

function getData(topic) {
  var limit = 10 + currentDataSize;
  var apiKey = "MTkgQvYg3nqBx3Xe6FAxBMUZvVe9QInQ";
  var apiURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${apiKey}&limit=${limit}`;
  //javascript, jQuery
  var xhr = $.get(apiURL);
  xhr.done(function(response) {
    console.log("success got data");
    var dataArray = response.data;
    console.log(dataArray);
    currentDataSize += 10;
    displayData(dataArray);
    addListeners();
  });
}

function displayData(array) {
  dataContainer.text("");
  var row = $("<div>");
  row.addClass("row");

  for (var i = array.length-1; i >= 0; i--) {
    if (i % 3 === 0) {
      row = $("<div>");
      row.addClass("row");
    }
    var col = $("<div>");
    col.addClass("col-lg-4");
    var card = $("<div>");
    card.addClass("card");
    var cardBody = $("<div>");
    cardBody.addClass("card-body");
    var cardTitle = $("<h5>");
    cardTitle.text(` #${i+1} Rating: ${array[i].rating.toUpperCase()}`);
    var img = $("<img>");
    img.addClass("gif card-img-bot");
    img.attr("state", "still");
    img.attr("animated", array[i].images.original.url);
    img.attr("still", array[i].images.original_still.url);
    img.attr("src", array[i].images.original_still.url);

    card.append(cardTitle);
    cardBody.append(img);
    card.append(cardBody);
    col.append(card);
    row.append(col);
    dataContainer.append(row);
  }
}

function addListeners() {
  $(".gif").on("click", function() {
    event.preventDefault();
    if ($(this).attr("state") === "still") {
      $(this).attr("src", $(this).attr("animated"));
      $(this).attr("state", "animated");
    } else {
      $(this).attr("src", $(this).attr("still"));
      $(this).attr("state", $(this).attr("animated"));
    }
  });
}





// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
addButtons();


// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

$("#search").on("click", function() {
  event.preventDefault();
  var userInput = $("#topic-input").val();
  if (userInput != undefined && userInput != "" && topics.indexOf(userInput) == -1) {
    topics.push(userInput);
    console.log(topics);
    addButtons();
    $("#topic-input").val("");
  }
})

// 7. Deploy your assignment to Github Pages.

// 8. **Rejoice**! You just made something really cool.

// - - -

// ### Minimum Requirements

// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

// - - -

// ### Bonus Goals

// 1. Ensure your app is fully mobile responsive.

// 2. Allow users to request additional gifs to be added to the page.
//    * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

// 3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

// 4. Include a 1-click download button for each gif, this should work across device types.

// 5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

// 6. Allow users to add their favorite gifs to a `favorites` section.
//    * This should persist even when they select or add a new topic.
//    * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).