document.addEventListener("DOMContentLoaded", function () {
    // Call the function to fetch and display data
    fetchArtisansData();
});

function fetchArtisansData() {
    fetch('http://127.0.0.1:8000/api/artisans')
        .then(response => response.json())
        .then(data => {
            // Call the function to display data in the table
            displayArtisansData(data.artisans);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayArtisansData(artisansData) {
    var tableBody = document.querySelector('#artisansTable tbody');

    // Clear existing rows in the table body
    tableBody.innerHTML = '';

    // Loop through the data and append rows to the table
    artisansData.forEach(artisan => {
        var row = document.createElement('tr');

        // Create and append cells for each column
        var nameCell = document.createElement('td');
        nameCell.textContent = artisan.user && artisan.user.name ? artisan.user.name : 'N/A';
        row.appendChild(nameCell);

        var emailCell = document.createElement('td');
        emailCell.textContent = artisan.user && artisan.user.email ? artisan.user.email : 'N/A';
        row.appendChild(emailCell);

        var specialtyCell = document.createElement('td');
        specialtyCell.textContent = artisan.specialty && artisan.specialty.name ? artisan.specialty.name : 'N/A';
        row.appendChild(specialtyCell);

        // Create a cell for the delete button
        var deleteCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            // Call a function to handle the delete action
            deleteArtisan(artisan.user.id);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

function afterSearch(artisansData) {
    // This function can remain unchanged based on the modifications in displayArtisansData
    displayArtisansData(artisansData);
}

function deleteArtisan(artisanId) {
    // Implement the logic to delete the artisan with the given ID
    // You may use a fetch request to your server's delete endpoint
    // For example:
    fetch('http://127.0.0.1:8000/api/users/' + artisanId, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response after deletion if needed
            console.log('Artisan deleted successfully', data);
            // Refresh the table data after deletion
            fetchArtisansData();
        })
        .catch(error => console.error('Error deleting artisan:', error));
}

function searchArtisans() {
    var searchTerm = document.getElementById('searchInput').value;
    // Create a JSON payload with the search term
    var payload = {
        SEARCHINPUT: searchTerm,
        city_id: "",
        specialty_id: ""
    };
    fetch('http://127.0.0.1:8000/api/filterAndsearch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json, text-plain, */*",
            'X-Requested-With': "XMLHttpRequest"
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            // Call the function to display filtered data in the table
            afterSearch(data.artisans);
        })
        .catch(error => console.error('Error fetching filtered data:', error));
}
