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

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "Login.html"; // Replace "Login.html" with the URL of your login page
}

// Function to redirect to the register page
function redirectToRegister() {
    window.location.href = "Register.html"; // Replace "Register.html" with the URL of your register page
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

// autenticacao.js for Login.html

function fazerLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;

    var credencialAdmin = {
        "admin@besmartbuyer.pt": "Admin"
        // Add other admin credentials here...
    };

    // Check if fields are filled
    if (email.trim() === '' || senha.trim() === '') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Retrieve user data from localStorage based on email
    var storedUser = JSON.parse(localStorage.getItem(email));

    // Check if user exists and password matches
    if (storedUser && senha === storedUser.password) {
        alert("Login bem-sucedido!");
        if (email in credencialAdmin) {
            alert("Login bem-sucedido! Entrou no modo Privilegiado");
            localStorage.setItem('loggedInUser', email); // Set logged-in user
            window.location.href = 'ProfileAdmin.html'; // Redirect to admin profile
        } else {
            localStorage.setItem('loggedInUser', email); // Set logged-in user
            window.location.href = 'Profile.html'; // Redirect to user profile
        }
    } else {
        alert("Credenciais inválidas. Por favor, tente novamente.");
    }
}

// autenticacao.js for Register.html

function fazerRegistro() {
    // Get values from registration form fields
    var email = document.getElementById("email").value;
    var nome = document.getElementById("name").value;
    var contacto = document.getElementById("contact").value;
    var senha = document.getElementById("password").value;
    var retypePassword = document.getElementById("retypepassword").value;

    // Only hardcoded users can currently login - replace this with a real database check when implementing authentication
    // Make a request to the server using
    
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

    // Capture current date
    var currentDate = new Date();

    // Extract day, month, and year
    var day = currentDate.getDate(); // Get day (1-31)
    var month = currentDate.getMonth() + 1; // Get month (0-11); January is 0, so we add 1
    var year = currentDate.getFullYear(); // Get full year (e.g., 2024)

    // Create a formatted date string (e.g., "11/04/2024" for day/month/year)
    var formattedDate = `${day}/${month}/${year}`;

    // Store user data in localStorage
    var user = {
        email: email,
        nome: nome,
        contacto: contacto,
        password: senha,
        role: "user", // Define o papel do usuário como "user"
        img: "../Assets/Generic-Profile-Image.png",
        created_at: formattedDate
    };
    
    localStorage.setItem(email, JSON.stringify(user));
    alert("Registro bem-sucedido!");
    window.location.href = 'Login.html'; // Redirecionar para a página de login
}

// autenticacao.js for Forgot.html

function fazerForgotPassword() {
    // Get email from the input field
    var email = document.getElementById("email").value;

    // Verificar se o campo de email está preenchido
    if (email.trim() === '') {
        alert("Por favor, insira seu email.");
        return;
    }
    alert("Um email de recuperação de senha foi enviado para " + email);
}

// Function to redirect to the Register.html
function redirectToRegister() {
    window.location.href = "Register.html"; // Replace "Register.html" with the URL of your register page
}
// Function to redirect to the Index.html
function redirectToIndex() {
    window.location.href = "Index.html"; // Replace "Index.html" with the URL of your index page
}

// Function to redirect to the Login.html
function redirectToLogin() {
    window.location.href = "Login.html"; // Replace "Login.html" with the URL of your login page
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve logged-in user's email from localStorage (assuming user is already authenticated)
    var loggedInUserEmail = localStorage.getItem('loggedInUser');

    if (loggedInUserEmail) {

        if(window.location.pathname.indexOf('/Login.html') > -1 || window.location.pathname.indexOf('/Register.html') > -1) {
            // Redirect to login page if no user is logged in
            window.location.href = 'Index.html';
        }

        // Retrieve user data from localStorage based on email
        var userData = JSON.parse(localStorage.getItem(loggedInUserEmail));

        if (userData) {
            // Display user information on the profile page
            var profileContainer = document.getElementById('profileContainer');
            profileContainer.innerHTML = `
                <div class="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
                    <div class="card p-4"> 
                        <div class=" image d-flex flex-column justify-content-center align-items-center"> 
                            <button class="btn btn-secondary"> <img src=${userData.img} height="100" width="100" /></button> 
                            <span class="name mt-3">${userData.nome}</span> 
                            <div class=" d-flex mt-2"> 
                                <button class="btn1 btn-dark">Edit Profile</button> 
                            </div> <div class="text mt-3"> 
                                <span>Description</span> 
                            </div> 
                            <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> 
                                <span>
                                    <i class="fa fa-twitter"></i>
                                </span> 
                                <span>
                                    <i class="fa fa-facebook-f"></i>
                                </span> 
                                <span>
                                    <i class="fa fa-instagram"></i>
                                </span> 
                                <span>
                                    <i class="fa fa-linkedin"></i>
                                </span> 
                            </div> 
                            <div class=" px-2 rounded mt-4 date "> 
                                <span class="join">Criado a ${userData.created_at}</span> 
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            console.error('User data not found.');
        }
    } else {
        console.error('No user logged in.');

        if(window.location.pathname.indexOf('/Login.html') === -1 && window.location.pathname.indexOf('/Register.html') === -1) {
            // Redirect to login page if no user is logged in
            window.location.href = 'Login.html';
        }
    }
});