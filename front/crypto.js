// crypto.js - Module de chiffrement RSA
class CryptoManager {
    constructor() {
        this.crypt = new JSEncrypt();
        this.privateKey = null;
        this.publicKey = null;
    }

    // Générer une paire de clés RSA
    generateKeyPair() {
        console.log('🔑 Génération des clés RSA...');
        
        // Générer les clés avec JSEncrypt
        this.crypt.generate(2048, "65537");
        
        // Récupérer les clés
        this.privateKey = this.crypt.getPrivateKey();
        this.publicKey = this.crypt.getPublicKey();
        
        // Stocker la clé privée localement (sécurisé côté client)
        localStorage.setItem('privateKey', this.privateKey);
        
        console.log('✅ Clés RSA générées');
        return {
            privateKey: this.privateKey,
            publicKey: this.publicKey
        };
    }

    // Charger les clés depuis le localStorage
    loadKeys() {
        this.privateKey = localStorage.getItem('privateKey');
        if (this.privateKey) {
            this.crypt.setPrivateKey(this.privateKey);
            // Extraire la clé publique de la clé privée
            this.publicKey = this.crypt.getPublicKey();
            return true;
        }
        return false;
    }

    // Envoyer la clé publique au serveur
    async uploadPublicKey(authToken) {
        if (!this.publicKey) {
            throw new Error('Aucune clé publique disponible');
        }

        try {
            const response = await fetch('http://10.60.12.114:3000/auth/save-public-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    public_key: this.publicKey
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi de la clé publique');
            }

            console.log('✅ Clé publique envoyée au serveur');
            return true;
        } catch (error) {
            console.error('❌ Erreur envoi clé publique:', error);
            throw error;
        }
    }

    // Récupérer la clé publique d'un utilisateur
    async getUserPublicKey(userId, authToken) {
        try {
            const response = await fetch(`http://10.60.12.114:3000/users/${userId}/public-key`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Clé publique introuvable');
            }

            const data = await response.json();
            return data.publicKey;
        } catch (error) {
            console.error('❌ Erreur récupération clé publique:', error);
            throw error;
        }
    }

    // Chiffrer un message avec la clé publique du destinataire
    encryptMessage(message, recipientPublicKey) {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(recipientPublicKey);
        
        const encrypted = encrypt.encrypt(message);
        if (!encrypted) {
            throw new Error('Erreur lors du chiffrement');
        }
        
        return encrypted;
    }

    // Déchiffrer un message avec notre clé privée
    decryptMessage(encryptedMessage) {
        if (!this.privateKey) {
            throw new Error('Clé privée non disponible');
        }

        this.crypt.setPrivateKey(this.privateKey);
        const decrypted = this.crypt.decrypt(encryptedMessage);
        
        if (!decrypted) {
            throw new Error('Erreur lors du déchiffrement');
        }
        
        return decrypted;
    }

    // Vérifier si l'utilisateur a des clés
    hasKeys() {
        return this.privateKey !== null && this.publicKey !== null;
    }

    // Initialiser le gestionnaire de crypto
    async initialize(authToken) {
        // Essayer de charger les clés existantes
        if (this.loadKeys()) {
            console.log('🔑 Clés RSA chargées depuis le stockage local');
            return true;
        }

        // Sinon, générer de nouvelles clés
        console.log('🔑 Génération de nouvelles clés RSA...');
        this.generateKeyPair();
        
        // Envoyer la clé publique au serveur
        try {
            await this.uploadPublicKey(authToken);
            return true;
        } catch (error) {
            console.error('❌ Erreur initialisation crypto:', error);
            return false;
        }
    }
}

// Export pour utilisation dans d'autres scripts
window.CryptoManager = CryptoManager;