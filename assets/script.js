$(document).ready(function () {
  // Get references to the dropdown trigger and menu
  var dropdown = $(".dropdown");
  var searchButton = $("#searchButton");
  //   var nextPageBtn = $("#nextButton");

  var typeTrigger = $("#typeDropTrigger");
  var genderTrigger = $("#genderDropTrigger");
  var sizeTrigger = $("#sizeDropTrigger");
  var ageTrigger = $("#ageDropTrigger");

  var typeDropdown = $("#typeDrop");
  var genderDropdown = $("#genderDrop");
  var sizeDropdown = $("#sizeDrop");
  var ageDropdown = $("#ageDrop");

  // Toggle the dropdown menu when the trigger button is clicked
  typeTrigger.click(function () {
    typeDropdown.toggleClass("is-active");
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

  //   nextPageBtn.click(function () {
  //     removeDisplayPets();
  //     //displayPets();
  //   });

  // Options clickable functions

  typeDropdown.find(".dropdown-item").click(function (event) {
    event.preventDefault();
    var selectedItemText = $(this).text();

    // Update the button text with the selected item
    $("#selected-animal-type").text(selectedItemText);

    // Remove the 'is-active' class from the dropdown to close it
    typeDropdown.removeClass("is-active");
  });

  genderDropdown.find(".dropdown-item").click(function (event) {
    event.preventDefault();
    var selectedItemText = $(this).text();
    $("#selected-gender").text(selectedItemText);
    genderDropdown.removeClass("is-active");
  });

  sizeDropdown.find(".dropdown-item").click(function (event) {
    event.preventDefault();
    var selectedItemText = $(this).text();
    $("#selected-size").text(selectedItemText);
    sizeDropdown.removeClass("is-active");
  });

  ageDropdown.find(".dropdown-item").click(function (event) {
    event.preventDefault();
    var selectedItemText = $(this).text();
    $("#selected-age").text(selectedItemText);
    ageDropdown.removeClass("is-active");
  });

  // Close the dropdown when clicking outside of it
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".dropdown").length) {
      dropdown.removeClass("is-active");
    }
  });

  searchButton.click(getPets);

  var cardContainer = $("#card-container");
  // Here are the docs : https://www.petfinder.com/developers/v2/docs/
  var petAPI = "UmVWwKPzfv9io8hZanQhhe2T5CC3Ns1Bdf2F6JEevSuotzH35V";

  function getPets() {
    removeDisplayPets();
    var petURL = "https://api.petfinder.com/v2/animals/";

    var selectedZip = $("#zip-code").val();
    var selectedType = $("#selected-animal-type").text();
    var selectedGender = $("#selected-gender").text();
    var selectedSize = $("#selected-size").text();
    var selectedAge = $("#selected-age").text();

    console.log("selectedGender:", selectedGender);

    // Add the search parameters to the URL
    var searchParams = new URLSearchParams();
    if (selectedType) {
      searchParams.append("type", selectedType.toLowerCase());
    }
    if (selectedGender) {
      searchParams.append("gender", selectedGender.toLowerCase());
    }
    if (selectedSize) {
      searchParams.append("size", selectedSize.toLowerCase());
    }
    if (selectedAge) {
      searchParams.append("age", selectedAge.toLowerCase());
    }

    // Add the search parameters to the URL
    petURL += "?" + searchParams.toString();

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
        displayPets(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function displayPets(data) {
    var animals = data.animals;
    for (var i = 0; i < animals.length; i++) {
      var animal = animals[i];

      var card = $("<div>").addClass("card");
      var cardContent = $("<div>").addClass("card-content");
      var name = $("<p>")
        .addClass("name")
        .text("Name: " + animal.name);
      var breed = $("<p>")
        .addClass("breed")
        .text("Breed: " + animal.breeds.primary);

      var content;
      if (animal.description) {
        content = $("<p>").text("Description: " + animal.description);
      } else {
        content = $("<p>").text("Description: <empty>");
      }

      var cardImg = $("<div>").addClass("card-image");
      var figure = $("<figure>").addClass("image is-4by3");

      var img;
      if (animal.photos.length > 0) {
        img = $("<img>")
          .addClass("photo")
          .attr("src", animal.photos[0].medium)
          .attr("alt", "Pet Image");
      } else {
        img = $("<img>")
          .addClass("photo")
          .attr("src", "./assets/images/animal-placeholder.png")
          .attr("alt", "Pet Image");
      }

      figure.append(img);
      cardImg.append(figure);

      cardContent.append(name, cardImg, breed, content);
      card.append(cardContent);
      cardContainer.append(card);
    }
  }

  function removeDisplayPets() {
    cardContainer.empty();
  }
});

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
// getPets();
