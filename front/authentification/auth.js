document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', async () => {
        const username = document.getElementById('idResistant').value;
        const password = document.getElementById('login-password').value;

        try {
            console.log("Tentative de connexion pour:", username);
            const response = await fetch('https://10.60.12.114:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }

            const data = await response.json();
            console.log("Connexion réussie !");

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);
            localStorage.setItem('idUser', data.id);

            // Redirection
            window.location.href = '../index.html';

        } catch (error) {
            console.error("Erreur:", error);
            Toastify({
                text: error.message || "Nom d'utilisateur ou mot de passe incorrect.",
                duration: 4000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                stopOnFocus: true
            }).showToast();
        }
    });
});
