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
var closeButton = document.querySelector('.btn-close');

// Function to close the modal
function closeModal() {
    modal.style.display = "none"; // Hide the modal
}

// Add event listener to the close button
closeButton.addEventListener("click", closeModal);

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "Login.html"; // Replace "Login.html" with the URL of your login page
}

// Function to redirect to the register page
function redirectToRegister() {
    window.location.href = "Register.html"; // Replace "Register.html" with the URL of your register page
}

// Function to redirect to the profile page
function redirectToProfile() {
    window.location.href = "profile.html"; // Replace "profile.html" with the URL of your profile page
}

// Function to perform login
function Login() {
    // Get input values
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    // Get registered users from localStorage
    var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Find user with matching email and password
    var user = registeredUsers.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (user) {
        alert("Login successful!");
        // Redirect to profile page
        redirectToProfile();
    } else {
        alert("Invalid email or password!");
    }
}

// Function to perform registration
function Register() {
    // Get input values
    var email = document.getElementById("registerEmail").value;
    var name = document.getElementById("registerName").value;
    var contact = document.getElementById("registerContact").value;
    var password = document.getElementById("registerPassword").value;
    var retypePassword = document.getElementById("registerRetypePassword").value;

    // Verify if password matches retype password
    if (password !== retypePassword) {
        alert("Passwords do not match!");
        return;
    }

    // Get registered users from localStorage
    var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if email is already registered
    var existingUser = registeredUsers.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        alert("Email already registered!");
        return;
    }

    // Register new user
    var newUser = { email: email, name: name, contact: contact, password: password };
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    alert("Registration successful!");
}

// Function to handle forgot password
function ForgotPassword() {
   // Get email from the input field
    var email = document.getElementById("email").value;

    // Verificar se o campo de email está preenchido
    if (email.trim() === '') {
        alert("Por favor, insira seu email.");
        return;
    }
    alert("Um email de recuperação de senha foi enviado para " + email);
}
