/*
Document about all autentication in this project
Here we have the following functions:
1. Redirect to login page
2. Redirect to register page
3. Close sidebar
4. Close sidebar on click outside
5. Open sidebar on clicK
6. Redirect to index page
7. Redirect to profile page
8. Redirect to logout page
*/

// Adds an event listener for the sidebar toggle button
document.getElementById('sidebarToggle').addEventListener('click', function() {
    // Toggle the 'active' class of the sidebar to show it
    document.getElementById('sidebar').classList.toggle('active');
}); 

// Function to close the sidebar
function closeSidebar() {
    // Check if the sidebar is active
    if (document.getElementById('sidebar').classList.contains('active')) {
        // If sidebar is active, remove the 'active' class to hide it
        document.getElementById('sidebar').classList.remove('active');
    }
}

// Event listener to handle clicks outside of the sidebar
document.body.addEventListener('click', function(event) {
    // Check if the clicked element is not inside the sidebar or the sidebar toggle button
    if (!event.target.closest('#sidebar') && !event.target.closest('#sidebarToggle')) {
        // If clicked outside of the sidebar, close the sidebar
        closeSidebar();
    }
});

// Reference to the modal and the close button
var modal = document.getElementById("myModal"); // Get the modal by its ID

// Add a click event to the profile button to open the modal
document.getElementById("profileButton").addEventListener("click", function() {
    modal.style.display = "block"; // Set the modal style to 'block' to show it
});

// Function to redirect to the Index.html
function redirectToIndex() {
    window.location.href = "Index.html"; 
}

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "Login.html"; 
}

// Function to redirect to the register page
function redirectToRegister() {
    window.location.href = "Register.html"; 
}

// Adds an event listener for the Log In button
document.querySelector('.LogIn').addEventListener('click', redirectToLogin);

// Add event listener for the Register button
document.querySelector('.Register').addEventListener('click', redirectToRegister);

var closeButton = document.querySelector('.btn-close');

// Function to close the modal
function closeModal() {
    modal.style.display = "none"; // Hide the modal
}

// Add event listener to the close button
closeButton.addEventListener("click", closeModal);

// autentication.js for Login.html
function loginUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Check if fields are filled
    if (email.trim() === '' || password.trim() === '') {
        alert("Please fill in all fields.");
        return;
    }

    // Retrieve user data from localStorage based on email
    var userData = JSON.parse(localStorage.getItem(email));

    // Check if user exists and password matches
    if (userData && password === userData.password) {
        alert("Login successful!");

        // Check the role of the user
        if (userData.role === 'admin') {
            alert("Login successful! You are logged in as an administrator.");
            localStorage.setItem('loggedInUser', email); // Set logged-in user
            window.location.href = 'ProfileAdmin.html'; // Redirect to admin profile page
        } else if (userData.role === 'user') {
            alert("Login successful! You are logged in as a user.");
            localStorage.setItem('loggedInUser', email); // Set logged-in user
            window.location.href = 'Index.html'; // Redirect to user main page
        } else {
            alert("Unknown role for this user.");
        }
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// autentication.js for Register.html
function registerUser() {
    // Get values from registration form fields
    var email = document.getElementById("email").value;
    var nome = document.getElementById("name").value;
    var contacto = document.getElementById("contact").value;
    var senha = document.getElementById("password").value;
    var retypePassword = document.getElementById("retypepassword").value;
    
    // Check if fields are filled
    if (email.trim() === '' || nome.trim() === '' || senha.trim() === '' || retypePassword.trim() === '') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Check if passwords match
    if (senha !== retypePassword) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return;
    }

    // List of admin emails
    var adminEmails = ["admin@besmartbuyer.pt" /* Add more admin emails here*/];

    // Check if the entered email is in the list of admin emails
    var isAdmin = adminEmails.includes(email);

    // Capture current date
    var currentDate = new Date();

    // Extract day, month, and year
    var day = currentDate.getDate(); // Get day (1-31)
    var month = currentDate.getMonth() + 1; // Get month (0-11); January is 0, so we add 1
    var year = currentDate.getFullYear(); // Get full year (e.g., 2024)

    // Create a formatted date string (e.g., "11/04/2024" for day/month/year)
    var formattedDate = `${day}/${month}/${year}`;

    // Define user role based on admin status
    var role = isAdmin ? "admin" : "user";

    // Store user data in localStorage
    var user = {
        email: email,
        nome: nome,
        primeiroNome: "",
        ultimoNome: "",
        contacto: contacto,
        password: senha,
        role: role, // Set the user role based on admin status
        img: "../Assets/Generic-Profile-Image.png",
        created_at: formattedDate
    };
    
    localStorage.setItem(email, JSON.stringify(user));
    alert("Registro bem-sucedido!");
    window.location.href = 'Login.html'; // Redirect to the login page
}

// autentication.js for Forgot.html
function forgotPassword() {
    // Get email from the input field
    var email = document.getElementById("email").value;

    // Check if the email field is empty
    if (email.trim() === '') {
        alert("Por favor, insira seu email.");
        return;
    }
    alert("Um email de recuperação de senha foi enviado para " + email);
}

// Event listener triggered when the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the email of the logged-in user from localStorage (assuming user is authenticated)
    var loggedInUserEmail = localStorage.getItem('loggedInUser');

    // Check if a logged-in user email exists
    if (loggedInUserEmail) {
        // Redirect to the index page if the current page is the login or registration page
        if (window.location.pathname.indexOf('/Login.html') > -1 || window.location.pathname.indexOf('/Register.html') > -1 || window.location.pathname.indexOf('/Forgot.html') > -1) {
            window.location.href = 'Index.html';
        }

        // Retrieve user data from localStorage based on the logged-in user's email
        var userData = JSON.parse(localStorage.getItem(loggedInUserEmail));

        // Check if user data exists
        if (userData) {
            // Display user information on the profile page
            var Management_container = document.getElementById('Management_container');
            Management_container.innerHTML = `
            <div class="container">
            <hr>
            <div class="row">
                <div class="col-md-4">
                    <!-- Profile picture card-->
                    <div class="card ">
                        <div class="card-header">Foto de Perfil</div>
                        <div class="card-body text-center">
                            <!-- Profile picture image-->
                            <img class="img-account-profile rounded-circle" id="profileImage" src="${userData.img}" alt="Foto de Perfil">
                            <!-- Profile picture help block-->
                            <div class="small font-italic text-muted mb-4">JPG ou PNG menor que 5 MB</div>
                            <!-- Profile picture upload button-->
                            <input type="file" id="imageUploadInput" style="display: none;" accept="image/png, image/jpeg">
                            <button id="uploadImageButton" class="btn border" type="button">Carregar Imagem</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <!-- Account details card-->
                    <div class="card md-4">
                        <div class="card-header">Detalhes da conta</div>
                        <div class="card-body">
                            <form>
                                <!-- Form Group (username)-->
                                <div>
                                    <label class="small" for="inputUsername">Nome de Utilizador</label>
                                    <input class="form-control" id="inputUsername" type="text" placeholder="${userData.nome}">
                                </div>
                                <!-- Form Row-->
                                <div class="row">
                                    <!-- Form Group (first name)-->
                                    <div class="col-md-6">
                                        <label class="small" for="inputFirstName">Primeiro nome</label>
                                        <input class="form-control" id="inputFirstName" type="text" placeholder="${userData.primeiroNome}">
                                    </div>
                                    <!-- Form Group (last name)-->
                                    <div class="col-md-6">
                                        <label class="small" for="inputLastName">Sobrenome</label>
                                        <input class="form-control" id="inputLastName" type="text" placeholder="${userData.ultimoNome}">
                                    </div>
                                </div>
                                <!-- Form Group (email address)-->
                                <div>
                                    <label class="small" for="inputEmailAddress">Email</label>
                                    <label class="form-control" for="inputEmailAddress">${userData.email}</label>
                                </div>
                                <!-- Form Row-->
                                <div class="row">
                                    <!-- Form Group (phone number)-->
                                    <div class="col-md-6">
                                        <label class="small" for="inputPhone">Número de Telefone</label>
                                        <input class="form-control mb-3" id="inputPhone" type="tel" placeholder="${userData.contacto}" >
                                    </div>
                                </div>
                                <!-- Save changes button-->
                                <button class="btn border" id="inputSave" type="button" onclick="redirectToManagement_Profile()">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
        } else {
            console.error('User data not found.'); // Log an error if user data is not found
        }
    } else {
        console.error('No user logged in.'); // Log an error if no user is logged in
        // Redirect to the login page if the current page is not the login or registration page or the forgot password page
        if (window.location.pathname.indexOf('/Login.html') === -1 && window.location.pathname.indexOf('/Register.html') === -1 && window.location.pathname.indexOf('/Forgot') === -1) {
            window.location.href = 'Login.html';
        }
    }
});

// Function to redirect to the Management_Profile.html
function redirectToManagement_Profile() {
    window.location.href = "Management_Profile.html";
}