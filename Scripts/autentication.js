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

// autenticacao.js for Login.html

function fazerLogin() {
    // Obter valores dos campos de e-mail e senha
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;

    // Verificar se os campos estão preenchidos
    if (email.trim() === '' || senha.trim() === '') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Unicos feitos que podem entrar para já
    var credenciaisUsuarios = {
        "eduardo@gmail.com": "123",
        "lourenco@gmail.com": "123"
        // ....
    };

    // Verificar se o e-mail do usuário está presente nas credenciais
    if (email in credenciaisUsuarios) {
        // Verificar se a senha corresponde à senha armazenada
        if (senha === credenciaisUsuarios[email]) {
            alert("Login bem-sucedido!");
            // Redirecionar o usuário para a página de destino após o login
            window.location.href = 'Index.html'; 
            return; 
        }
    }

    // Se o fluxo de controle chegou aqui, as credenciais são inválidas
    alert("Credenciais inválidas. Por favor, tente novamente.");
}


// autenticacao.js for Register.html

function fazerRegistro() {
    // Obter valores dos campos do formulário de registro
    var email = document.getElementById("email").value;
    var nome = document.getElementById("name").value;
    var contacto = document.getElementById("contact").value;
    var senha = document.getElementById("password").value;
    var retypePassword = document.getElementById("retypepassword").value;

    // Verificar se os campos estão preenchidos
    if (email.trim() === '' || nome.trim() === '' || contacto.trim() === '' || senha.trim() === '' || retypePassword.trim() === '') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Verificar se as senhas coincidem
    if (senha !== retypePassword) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return;
    }

    alert("Registro bem-sucedido!");
    window.location.href = 'Login.html'; // Redirecionar para a página de login
}

