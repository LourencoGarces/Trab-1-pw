/*
Document about all  in Index.js for this  project
-->Here we have the following functions:
0.  pesquisarProdutos()
1.  .getElementById()
2.  closeSidebar()
3.  addEventListener
4.  redirectToLogin()
5.  redirectToRegister()
6.  querySelectorLogin
7.  querySelectorRegister
8.  closeModal()
9.  addEventListener()
*/
const produtos = [
    {
        nome: "iPhone 15 Pro",
        link: "https://www.apple.com/pt/iphone-15-pro/",
        imagem: "Assets/iphone.jpeg",
        descricao: "iPhone 15 Processador A17  Em titânio iOS 17",
    },
    {
        nome: "Macbook Pro M3",
        link: "https://www.apple.com/pt/macbook-pro/",
        imagem: "Assets/transferir.jpeg",
        descricao: "Macbook M3 Processador M3 Pro Em aluminio macOs 17.4.1",
    },
    {
        nome: "Apple Watch Series 9",
        link: "https://www.apple.com/pt/apple-watch-series-9/",
        imagem: "Assets/transferir (1).jpeg",
        descricao: "Apple Watch Processador S9 SiP Em aluminio iOS 17",
    },
    {
        nome: "iPad Pro",
        link: "https://www.apple.com/pt/ipad-pro/",
        imagem: "Assets/transferir (3).jpeg",
        descricao: "iPad Pro Processador M3 Pro Em aluminio iOS 17",
    },
];

// Adds an event listener for the sidebar toggle button
document.getElementById("sidebarToggle").addEventListener("click", function () {
    // Toggle the 'active' class of the sidebar to show it
    document.getElementById("sidebar").classList.toggle("active");
});

// Function to close the sidebar
function closeSidebar() {
    // Check if the sidebar is active
    if (document.getElementById("sidebar").classList.contains("active")) {
        // If sidebar is active, remove the 'active' class to hide it
        document.getElementById("sidebar").classList.remove("active");
    }
}

// Event listener to handle clicks outside of the sidebar
document.body.addEventListener("click", function (event) {
    // Check if the clicked element is not inside the sidebar or the sidebar toggle button
    if (
        !event.target.closest("#sidebar") &&
        !event.target.closest("#sidebarToggle")
    ) {
        // If clicked outside of the sidebar, close the sidebar
        closeSidebar();
    }
});

// Reference to the modal and the close button
var modal = document.getElementById("myModal"); // Get the modal by its ID

// Add a click event to the profile button to open the modal
document.getElementById("profileButton").addEventListener("click", function () {
    modal.style.display = "block"; // Set the modal style to 'block' to show it
});

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "Login.html";
}

// Function to redirect to the register page
function redirectToRegister() {
    window.location.href = "Register.html";
}

// Adds an event listener for the Log In button
document.querySelector(".LogIn").addEventListener("click", redirectToLogin);

// Add event listener for the Register button
document.querySelector(".Register").addEventListener("click", redirectToRegister);

var closeButton = document.querySelector(".btn-close");

// Function to close the modal
function closeModal() {
    modal.style.display = "none"; // Hide the modal
}

// Add event listener to the close button
closeButton.addEventListener("click", closeModal);

// Function to update button visibility based on login status
function updateButtonVisibility() {
    const isLoggedIn = localStorage.getItem("token") !== null;
    const logoutButton = document.getElementById("logoutButton");
    const profileButton = document.getElementById("ProfileButton");

    if (isLoggedIn) {
        logoutButton.style.display = "block";
        profileButton.style.display = "block";
    } else {
        logoutButton.style.display = "none";
        profileButton.style.display = "none";
    }
}

// Event listener to handle changes in local storage
window.addEventListener("storage", function (event) {
    if (event.key === "token") {
        updateButtonVisibility();
    }
});

// Event listener for the Log Out button
document.getElementById("logoutButton").addEventListener("click", function () {
    // Remove the loggedInUser from localStorage
    localStorage.removeItem("token");

    // Optionally perform any other cleanup or redirection
    alert("A sair da conta.");
    window.location.href = "Login.html"; // Redirect to login page after logout
});

// Initial call to update button visibility on page load
document.addEventListener("DOMContentLoaded", function () {
    updateButtonVisibility();
});

// Helper function to check if the current page is the login page
function isLoginPage() {
    return window.location.pathname.indexOf("/Login.html") !== -1;
}

// Helper function to check if the current page is the registration page
function isRegisterPage() {
    return window.location.pathname.indexOf("/Register.html") !== -1;
}
