document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('idResistant').value;
        const password = document.getElementById('login-password').value;
        sendLoginRequest(username, password);
    });

    function sendLoginRequest(username, password) {
        console.log("Tentative de connexion pour:", username);
        fetch('http://10.60.12.114:3000/auth/login', {  // URL de ton backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            console.log("Réponse reçue:", response);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => { throw new Error(err.message) });
            }
        })
        .then(data => {
            console.log("Connexion réussie ! Redirection...");
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role); 
            localStorage.setItem('idUser', data.idUser)

            if (!localStorage.getItem('privKey')) {
                const crypt = new JSEncrypt({ default_key_size: 2048 });
                const pubKey = crypt.getPublicKey();
                const privKey = crypt.getPrivateKey();

                localStorage.setItem('privKey', privKey);

                // On envoie la clé publique au serveur
                fetch('http://10.60.12.114:3000/auth/save-public-key', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.token}` // si tu utilises JWT
                    },
                    body: JSON.stringify({ public_key: pubKey })
                })
                .then(res => res.json())
                .then(resData => console.log('Clé publique enregistrée', resData))
                .catch(err => console.error('Erreur en enregistrant la clé publique', err));
            }
            // Redirection vers la messagerie
            window.location.href = '../index.html'; 
        })
        .catch(error => {
            console.log("Erreur lors de la connexion");
            console.error("Erreur:", error);
            Toastify({
                text: error.message || "Nom d'utilisateur ou mot de passe incorrect.",
                duration: 4000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                stopOnFocus: true
            }).showToast();
        });
    }
});