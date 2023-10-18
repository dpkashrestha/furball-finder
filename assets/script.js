$(document).ready(function () {
    // Get references to the dropdown trigger and menu
    var dropdownTrigger = $(".dropdown-trigger");
    var dropdown = $(".dropdown");

    // Toggle the dropdown menu when the trigger button is clicked
    dropdownTrigger.click(function () {
        dropdown.toggleClass("is-active");
    });

    // Close the dropdown when clicking outside of it
    $(document).on("click", function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            dropdown.removeClass("is-active");
        }
    });
});

var petAPI = "UmVWwKPzfv9io8hZanQhhe2T5CC3Ns1Bdf2F6JEevSuotzH35V";
var petURL = "https://api.petfinder.com/v2/animals/";
var petAccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVbVZXd0tQemZ2OWlvOGhaYW5RaGhlMlQ1Q0MzTnMxQmRmMkY2SkVldlN1b3R6SDM1ViIsImp0aSI6IjFiMGIwOTExOGQzOTBlYjNiZTkwNWU3MmMzOTg1ODliMzdkMTU4NzBiM2U0YjBhYWY5Y2Y4ODBkY2JmZjg2ZjFmYjA5NTEyNmU5MGI5ZWMwIiwiaWF0IjoxNjk3NTg2Mzk2LCJuYmYiOjE2OTc1ODYzOTYsImV4cCI6MTY5NzU4OTk5Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.CJnpOPTwAqeZiOKThfaLcDSQN_bTTw8nGJtA_uzvFq3DK5HUzk2r3JyafL7XANM6QJjRJdpUjUB5hCYDAyLOeMlOlsKqYL0lrGfG-zCHIyKpOYtMCykkknFge37k9Xr-I9qqGJlr-v8rPgdNZ7Y4ENXSgN5hxj9jJhyV7nDp2p2OVY-8d95Ovcn23mpXut4tZ6uPQQcamktEDptod1BsaR3fUgejialKQsxcwQac8VP-KvN1xJ3vDn9JuAMJgb1p3Qywo6CKU1jhfPJ4lUvEjg1uSPSWWkV9x3dmP27CZCF_wAk0rQ5leW9pQeCkGjx4_BRe4A5WOFkrJ4REP6oVEQ"
// Here are the docs : https://www.petfinder.com/developers/v2/docs/
getPets();
function getPets() {
    fetch(petURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${petAccessToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Request failed with status: ' + response.status);
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error.message);
    });
}

//picture slideshow functionality:
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(slideIndex) {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
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