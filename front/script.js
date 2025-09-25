document.addEventListener('DOMContentLoaded', async () => {  // <-- async ajouté ici
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesDisplay = document.getElementById('messages-display');
    const newChatBtn = document.getElementById('new-chat-btn');
    const newChatModal = document.getElementById('new-chat-modal');
    const closeBtn = document.querySelector('.close-btn');
    const inviteUserInput = document.getElementById('invite-user-input');
    const createChatBtn = document.getElementById('create-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const usernameDisplay = document.getElementById('usernameDisplay');

    
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    const idUser = localStorage.getItem('idUser');
    
    if (!authToken) {
        window.location.href = 'authentification/auth.html';
        return;
    }

    try {
        const response = await fetch('http://10.60.12.114:3000/auth/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) throw new Error('Token invalide');

        const data = await response.json();  
        usernameDisplay.textContent = data.username; // récupéré depuis le serveur
    } catch (err) {
        console.error(err);
        localStorage.removeItem('authToken');
        window.location.href = 'authentification/auth.html';
    }

    // Gestion du bouton de déconnexion
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Suppression des données de connexion du localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        // Redirection vers la page de connexion
        window.location.href = 'authentification/auth.html';
    });

     const createUserBtn = document.getElementById("createUserBtn");

    // Montrer le bouton uniquement si admin
    if (role === "admin") {
        createUserBtn.style.display = "block";
    }

    // Redirection vers la page admin
    createUserBtn.addEventListener("click", () => {
        window.location.href = "create_user/admin.html";
    });
    
    // Placeholder pour l'ID de la conversation active
    let activeConversationId = "conv-123";

    // --- LOGIQUE DE GESTION DE LA FENÊTRE MODALE ---
    newChatBtn.addEventListener('click', () => {
        newChatModal.style.display = 'flex';
    });
    
    closeBtn.addEventListener('click', () => {
        newChatModal.style.display = 'none';
    });

    // Envoi de la requête de création de conversation
    createChatBtn.addEventListener('click', () => {
        const invitedUser = inviteUserInput.value.trim();
        
        if (invitedUser) {
            sendNewConversationRequest(invitedUser);
            document.querySelector('.main-chat').style.display = 'flex';
            newChatModal.style.display = 'none';
            inviteUserInput.value = '';
        } else {
            alert('Veuillez entrer un nom d\'utilisateur et un mot de passe.');
        }
    });

    // Fonction vérifiant si des messages doivent être chargés       
        try {
            const response = await fetch(process.env.API_URL, {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'},
            });
            const data = JSON.stringify(response);
            if(data.message!='') {
                document.querySelector('.main-chat').style.display = 'flex';
                messagesDisplay.appendChild(data);
            } else return 
        } catch {
            console.log(new Error);
        }
    


    async function sendNewConversationRequest(invitedUser, password) {
        // NOTE: Cette fonction devrait envoyer une requête au back-end pour créer une conversation
        console.log(`Requête de création de conversation envoyée pour : ${invitedUser}`);
        try {
            const response = await fetch(process.env.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invitedUser, password })
            });
            const data = await response.json();
            activeConversationId = data.conversationId;
            // ... mettre à jour l'interface ...
        } catch (error) {
            console.error('Erreur lors de la création de la conversation:', error);
        }
    }

    // --- LOGIQUE D'ENVOI DES MESSAGES ---
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage(idUser) {
        console.log(idUser);
        
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        const messageData = {
            message: messageText, 
            idResistant: activeConversationId, 
            sender: idUser, 
        };
        console.log(messageData);
        
        try {
            const response = await fetch(process.env.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log('Message envoyé et reçu du serveur:', data);

            // Création de l'élément visuel du message
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            messageElement.textContent = messageText;
            messagesDisplay.appendChild(messageElement);
            messagesDisplay.scrollTop = messagesDisplay.scrollHeight;

            messageInput.value = '';

            // Rendre le message éphémère
            const DURATION_MS = 30 * 1000;
            setTimeout(() => {
                messageElement.remove();
            }, DURATION_MS);
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            Toastify({
                text: "Échec de l'envoi du message.",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                duration: 3000
            }).showToast();
        }
    }
    
    // --- LOGIQUE DE FERMETURE DE CONVERSATION ---
    closeChatBtn.addEventListener('click', () => {
        if (confirm("Êtes-vous sûr de vouloir fermer cette conversation et supprimer toutes ses données ?")) {
            closeActiveConversation();
        }
    });

    async function closeActiveConversation() {
        if (activeConversationId) {
            console.log(`Requête de suppression envoyée pour la conversation ID: ${activeConversationId}`);
            
            // ALIGNEMENT AVEC LE BACK-END :
            // Il faudrait envoyer l'ID de l'utilisateur qui ferme la conversation,
            // et non l'ID de la conversation elle-même. 
            const userToDelete = {
                id_User: "id-de-l-utilisateur-actuel" // Ceci devrait être dynamique
            };

            try {
                // Utilisation d'une méthode 'DELETE' pour des raisons de sémantique REST
                const response = await fetch(`${process.env.API_CONVERSATIONS_URL}/${activeConversationId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userToDelete) 
                });

                if (!response.ok) {
                    throw new Error(`Erreur lors de la suppression: ${response.status}`);
                }

                messagesDisplay.innerHTML = '';
                inviteUserInput.value = '';

                Toastify({
                    text: "La conversation a été fermée et supprimée.",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();

            } catch (error) {
                console.error("Erreur lors de la fermeture de la conversation:", error);
                Toastify({
                    text: "Erreur lors de la fermeture de la conversation.",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }).showToast();
            }

        } else {
            console.warn("Aucune conversation active n'est sélectionnée à fermer.");
            Toastify({
                text: "Aucune conversation active à fermer.",
                duration: 3000,
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }).showToast();
        }
    }
});