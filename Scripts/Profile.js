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
});