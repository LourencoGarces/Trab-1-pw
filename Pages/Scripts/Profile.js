// Update the contact and name
async function updateUserData() {
    var nome = document.getElementById("inputUsername").value;
    var contacto = document.getElementById("inputPhone").value;
    var email = localStorage.getItem('loggedInUser');

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


/*// Function to save updated user data
function saveUpdatedData(username, firstName, lastName, phone) {
    // Checking if a user is logged in (email stored in localStorage)
    var loggedInUserEmail = localStorage.getItem('loggedInUser');

    if (loggedInUserEmail) {
        // Retrieving user data from localStorage
        var userData = JSON.parse(localStorage.getItem(loggedInUserEmail)) || {};

        // Update data only if the input fields are not empty
        if (username.trim() !== '') {
            userData.nome = username;
        }
        if (firstName.trim() !== '') {
            userData.primeiroNome = firstName;
        }
        if (lastName.trim() !== '') {
            userData.ultimoNome = lastName;
        }
        if (phone.trim() !== '') {
            userData.contacto = phone;
        }

        // Saving updated data back to localStorage
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));

        console.log('Data updated and saved in localStorage:', userData);
        alert('Dados atualizados!');
    } else {
        console.error('No user logged in.');
        alert('Error: Não há Utilizadores associados.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const imageUploadInput = document.getElementById('imageUploadInput');
    const profileImage = document.getElementById('profileImage');

    // Event listener para mudanças no input de arquivo (carregar nova imagem)
    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check if the file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const base64Image = e.target.result;

                    // Update the profile image on the page
                    profileImage.src = base64Image;

                    // Update the image stored in localStorage
                    updateProfileImageInLocalStorage(base64Image);
                };

                // Read a file as a data URL
                reader.readAsDataURL(file);
            } else {
                alert('Por favor, selecione um arquivo de imagem válido (JPG ou PNG).');
            }
        }
    });

    // Event listener para o botão de carregar imagem
    const uploadImageButton = document.getElementById('uploadImageButton');
    uploadImageButton.addEventListener('click', () => {
        imageUploadInput.click(); // Simula o clique no input de arquivo ao clicar no botão
    });

    // Função para atualizar a imagem de perfil no localStorage
    function updateProfileImageInLocalStorage(base64Image) {
        // Recupera os dados do usuário do localStorage
        const loggedInUserEmail = localStorage.getItem('loggedInUser');
        if (loggedInUserEmail) {
            const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
            if (userData) {
                // Atualiza a imagem no objeto userData
                userData.img = base64Image;

                // Salva o objeto userData atualizado de volta no localStorage
                localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));

                console.log('Imagem de perfil atualizada no localStorage.');
            }
        }
    }
});*/