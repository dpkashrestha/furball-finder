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
var petAccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVbVZXd0tQemZ2OWlvOGhaYW5RaGhlMlQ1Q0MzTnMxQmRmMkY2SkVldlN1b3R6SDM1ViIsImp0aSI6IjdhOGE5ZjkzNzg2NjMzNTk2MjVjYTI4ZjExZmUxOThiOWFhNmQzMzI4ZTA5OWRhZTUyYTlkNWZmZWRlNDE4MDJlODNlZTk3MTdkYmM1MTk5IiwiaWF0IjoxNjk3NTAzNTQ5LCJuYmYiOjE2OTc1MDM1NDksImV4cCI6MTY5NzUwNzE0OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.hQX2kC9lqtRXV3MYbMJkJdS7cBNJCgkLFkfpIfB-iQnKXMDY7wMahfxLBsoCzGQmGuAjHRYriNSSVhLMQ77NJW2LdS6W1HQdUaRsP2T5ccefWg9eevd5_WTDrDXaRU-B6Sv55ToLedc84mASBl9ywhsrdD7l9CU-ICHhwfIov0Uuyw3arvEAcB5v2b4M-CcBPo59YjxSwZ8hbDfv0wxymNFcojVNA4PO5XIsRLCQGERepsuJv3DsXi6BEpuMOFKjHeaK-CCfH7OntqNFPxkC7BSnbm3tC7K0iTmQOvet9HndTtALl9czGzBdsEzOR02NNYF1GNOJsT0qbXdq_B8oEA"
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
