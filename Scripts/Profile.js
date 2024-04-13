// Using event delegation to capture clicks on the "Save" button
document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'inputSave') {
        // Get values from input fields
        var username = document.getElementById('inputUsername').value;
        var firstName = document.getElementById('inputFirstName').value;
        var lastName = document.getElementById('inputLastName').value;
        var phone = document.getElementById('inputPhone').value;

        // Call function to save updated data
        saveUpdatedData(username, firstName, lastName, phone);
    }
});

// Function to save updated user data
function saveUpdatedData(username, firstName, lastName, phone) {
    // Checking if a user is logged in (email stored in localStorage)
    var loggedInUserEmail = localStorage.getItem('loggedInUser');

    if (loggedInUserEmail) {
        // Retrieving user data from localStorage
        var userData = JSON.parse(localStorage.getItem(loggedInUserEmail)) || {};

        // Updating data with new values
        userData.nome = username;
        userData.primeiroNome = firstName;
        userData.ultimoNome = lastName;
        userData.contacto = phone;

        // Saving updated data back to localStorage
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));

        console.log('Data updated and saved in localStorage:', userData);
        alert('Data updated successfully!');
    } else {
        console.error('No user logged in.');
        alert('Error: No user logged in.');
    }
}
