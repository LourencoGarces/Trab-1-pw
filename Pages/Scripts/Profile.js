// Update the contact and name
async function updateUserData() {
    debugger
    var nome = document.getElementById("inputUsername").value;
    var contacto = document.getElementById("inputPhone").value;
    var email = document.getElementById("inputEmailAddress").textContent;

    // Fetch the existing user data
    try {
        const existingResponse = await fetch(`http://localhost:4242/api/pgs/Users/email/${email}`);
        const existingUserData = await existingResponse.json();

        // Prepare user data to send to the server
        var user = {
            id_utilizador: existingUserData.id_utilizador,
            nome: nome.trim() !== '' ? nome : existingUserData.nome,
            email: email, // Email is used to identify the user
            contacto: contacto.trim() !== '' ? contacto : existingUserData.contacto,
            password: existingUserData.password,
            isAdmin: existingUserData.isAdmin
        };

        const response = await fetch(`http://localhost:4242/api/pgs/Users/update/${existingUserData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json();

        if (response.ok) {
            alert("Update successful!");
            // Refresh the page
            window.location.reload();
        } else {
            alert(responseData.msg || "Error updating data. Please try again.");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while updating data. Please try again later.");
    }
}