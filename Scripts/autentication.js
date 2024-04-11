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
    // Get values from email and password fields
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;

    var credencialAdmin = {
        "admin@besmartbuyer.pt": "Admin"
        // other user credentials here...
    };

    // Check if fields are filled
    if (email.trim() === '' || senha.trim() === '') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Get stored user from localStorage
    var storedUser = JSON.parse(localStorage.getItem(email));

    // Check if user exists
    if (storedUser) {
        // Check if password matches stored password
        if (senha === storedUser.password) {
            alert("Login bem-sucedido!");

                window.location.href = 'Profile.html'; // Redirect to normal user profile
            
            return;
        }
    }

    // Check if admin email is present in credentials
    if (email in credencialAdmin) {
        // Check if password matches stored password                            
        if (senha === credencialAdmin[email]) 
        {
            alert("Login bem-sucedido! Entrou no modo Priveligiado");
            // Redirect user to the destination page after login
            window.location.href = 'ProfileAdmin.html'; // Redirect to admin profile
            return; 
        }
        // If control flow reached here, credentials are invalid
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

    // Store user data in localStorage
    var user = {
        email: email,
        nome: nome,
        contacto: contacto,
        password: senha,
        role: "user" // Define o papel do usuário como "user"
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