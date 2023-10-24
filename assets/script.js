$(document).ready(function () {
  // Get references to the dropdown trigger and menu
  var dropdown = $(".dropdown");
  var searchButton = $("#searchButton");
  var nextPageBtn = $("#nextButton");
  var cardContainer = $("#card-container");

  var typeTrigger = $("#typeDropTrigger");
  var breedTrigger = $("#breedDropTrigger");
  var genderTrigger = $("#genderDropTrigger");
  var sizeTrigger = $("#sizeDropTrigger");
  var ageTrigger = $("#ageDropTrigger");

  var typeDropdown = $("#typeDrop");
  var breedDropdown = $("#breedDrop");
  var genderDropdown = $("#genderDrop");
  var sizeDropdown = $("#sizeDrop");
  var ageDropdown = $("#ageDrop");

  // Toggle the dropdown menu when the trigger button is clicked
  typeTrigger.click(function () {
    typeDropdown.toggleClass("is-active");
  });

  breedTrigger.click(function () {
    breedDropdown.toggleClass("is-active");
  });

  genderTrigger.click(function () {
    genderDropdown.toggleClass("is-active");
  });

  sizeTrigger.click(function () {
    sizeDropdown.toggleClass("is-active");
  });

  ageTrigger.click(function () {
    ageDropdown.toggleClass("is-active");
  });

  nextPageBtn.click(function () {
    removeDisplayPets();
    //displayPets();
  });

  // Options clickable functions

  typeDropdown.find(".dropdown-item").click(function () {
    var selectedItemText = $(this).text();

    // Update the button text with the selected item
    $("#selectedTypeText").text(selectedItemText);

    // Remove the 'is-active' class from the dropdown to close it
    typeDropdown.removeClass("is-active");
  });

  breedDropdown.find(".dropdown-item").click(function () {
    var selectedItemText = $(this).text();
    $("#selectedBreedText").text(selectedItemText);
    breedDropdown.removeClass("is-active");
  });

  genderDropdown.find(".dropdown-item").click(function () {
    var selectedItemText = $(this).text();
    $("#selectedGenderText").text(selectedItemText);
    genderDropdown.removeClass("is-active");
  });

  sizeDropdown.find(".dropdown-item").click(function () {
    var selectedItemText = $(this).text();
    $("#selectedSizeText").text(selectedItemText);
    sizeDropdown.removeClass("is-active");
  });

  ageDropdown.find(".dropdown-item").click(function () {
    var selectedItemText = $(this).text();
    $("#selectedAgeText").text(selectedItemText);
    ageDropdown.removeClass("is-active");
  });

  // Close the dropdown when clicking outside of it
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".dropdown").length) {
      dropdown.removeClass("is-active");
    }
  });

  searchButton.click(function () {
    var data = [
      {
        title: "Item 1",
        subtitle: "Subtitle 1",
        content: "This is the content for Item 1.",
      },
      {
        title: "Item 2",
        subtitle: "Subtitle 2",
        content: "This is the content for Item 2.",
      },
      {
        title: "Item 3",
        subtitle: "Subtitle 3",
        content: "This is the content for Item 3.",
      },
      {
        title: "Item 4",
        subtitle: "Subtitle 4",
        content: "This is the content for Item 4.",
      },
      {
        title: "Item 5",
        subtitle: "Subtitle 5",
        content: "This is the content for Item 5.",
      },
    ];
    //show filter items
    // call api and pass data to this function
    displayPets(data);
  });

  function displayPets(data) {
    var card = $("<div>").addClass("card");
    var cardContent = $("<div>").addClass("card-content");
    var type = $("<p>")
      .addClass("type")
      .text("Type: " + data[0].title);
    console.log(data[0].title);
    var location = $("<p>")
      .addClass("location")
      .text("Location: " + data.location);
    var breed = $("<p>")
      .addClass("breed")
      .text("Breed: " + data.breed);
    var content = $("<p>").text("Description: " + data.description);

    var cardImg = $("<div>").addClass("card-image");
    var figure = $("<figure>").addClass("image is-4by3");

    var img = $("<img>")
      //.attr("src", data[0].photos.url)
      .attr("alt", "Pet Image");

    var cardFooter = $("<footer>").addClass("card-footer");
    cardContent.append(type, location, breed, content, cardImg);
    card.append(cardContent, cardFooter);
    figure.append(img);
    cardImg.append(figure);
    cardContainer.append(card);
  }

  function removeDisplayPets() {
    cardContainer.empty();
  }
});

var petAPI = "UmVWwKPzfv9io8hZanQhhe2T5CC3Ns1Bdf2F6JEevSuotzH35V";
var petURL = "https://api.petfinder.com/v2/animals/";
// Here are the docs : https://www.petfinder.com/developers/v2/docs/

function getPets() {
  fetch(petURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

//picture slideshow functionality:
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(slideIndex) {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);

// Show the initial slide
showSlide(currentSlide);

//This is the map API

function initMap() {
  let mapOptions = {
    center: new google.maps.LatLng("41.881832", "-87.623177"),
    zoom: 12,
  };

  let map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
initMap();
//here is the access token storage
// Assuming you have obtained the access token and have it in a variable
var accessToken = localStorage.getItem("access_token");

// Store the access token in local storage
localStorage.setItem("access_token", accessToken);

//This grabs the access token from the local storage.

document.addEventListener("DOMContentLoaded", function () {
  const clientId = "UmVWwKPzfv9io8hZanQhhe2T5CC3Ns1Bdf2F6JEevSuotzH35V";
  const clientSecret = "BBqThKtQ3eJuDRQDR1EOCrnGZ2CurI1Vy6PIAG35";
  const tokenUrl = "https://api.petfinder.com/v2/oauth2/token";

  const data = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  };

  fetch(tokenUrl, {
    method: "POST",
    body: new URLSearchParams(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const accessToken = data.access_token;
      // You have obtained the access token, you can store it in local storage or use it as needed.
      console.log("Access Token: " + accessToken);
      localStorage.setItem("access_token", accessToken);
    })
    .catch((error) => {
      console.error("Error fetching access token: ", error);
    });
});
console.log(accessToken);
getPets();
