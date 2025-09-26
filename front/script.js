// script.js
document.addEventListener('DOMContentLoaded', async () => {
  const BASE = "http://10.60.12.114:3000"; // adapte si besoin
  const authToken = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');
  const idUser = localStorage.getItem('idUser');
  const usernameDisplay = document.getElementById('usernameDisplay');

  // Initialisation du gestionnaire de chiffrement
  const cryptoManager = new CryptoManager();
  
  // UI elements
  const newChatBtn = document.getElementById('new-chat-btn');
  const newChatModal = document.getElementById('new-chat-modal');
  const closeBtn = newChatModal.querySelector('.close-btn');
  const inviteUserInput = document.getElementById('invite-user-input');
  const createChatBtn = document.getElementById('create-chat-btn');
  const userList = document.getElementById('user-list');
  const messagesDisplay = document.getElementById('messages-display');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const logoutBtn = document.getElementById('logoutBtn');
  const createUserBtn = document.getElementById('createUserBtn');
  const closeChatBtn = document.getElementById('close-chat-btn');

  // State
  let conversations = []; // list of canaux for current user
  let activeConversation = null; // { id, userid1, userid2 }
  let pollingInterval = null;

  // Small Toast helper
  const toast = (text, type = 'info') => {
    const bg =
      type === 'error'
        ? 'linear-gradient(to right, #ff5f6d, #ffc371)'
        : type === 'success'
        ? 'linear-gradient(to right, #00b09b, #96c93d)'
        : 'linear-gradient(to right,#4b6cb7,#182848)';
    Toastify({ text, duration: 4000, gravity: 'top', position: 'center', backgroundColor: bg }).showToast();
  };

  // Redirect if no token
  if (!authToken) {
    window.location.href = 'authentification/auth.html';
    return;
  }

  // Verify token on server
  try {
    const resp = await fetch(`${BASE}/auth/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) throw new Error('Token invalide');
    const d = await resp.json();
    usernameDisplay.textContent = d.username;
    // optionally update localStorage id/role if missing
    if (!idUser && d.id) localStorage.setItem('idUser', d.id);
    if (!localStorage.getItem('role') && d.role) localStorage.setItem('role', d.role);
  } catch (err) {
    console.error(err);
    localStorage.removeItem('authToken');
    window.location.href = 'authentification/auth.html';
    return;
  }

  // Show admin button if role
  if (role === 'admin') createUserBtn.style.display = 'block';

  // Modal open/close
  newChatBtn.addEventListener('click', () => {
    newChatModal.style.display = 'flex';
    inviteUserInput.focus();
  });
  closeBtn.addEventListener('click', () => (newChatModal.style.display = 'none'));
  window.addEventListener('click', (e) => {
    if (e.target === newChatModal) newChatModal.style.display = 'none';
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('idUser');
    window.location.href = 'authentification/auth.html';
  });

  // Fetch conversations for current user and render UI
  async function loadConversations() {
    try {
      const res = await fetch(`${BASE}/canaux?userId=${idUser}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error('Impossible de récupérer les conversations');
      conversations = await res.json();
      renderConversationList();
    } catch (err) {
      console.error(err);
      toast('Erreur chargement conversations', 'error');
    }
  }

  function renderConversationList() {
    userList.innerHTML = '';
    if (!conversations.length) {
      userList.innerHTML = '<li>Aucune conversation</li>';
      return;
    }
    conversations.forEach((c) => {
      const otherId = c.userid1 == idUser ? c.userid2 : c.userid1;
      const item = document.createElement('li');
      item.className = 'conversation-item';
      item.dataset.canalId = c.id;
      item.textContent = `Conversation #${c.id}`;
      item.addEventListener('click', () => selectConversation(c));
      userList.appendChild(item);
    });
  }

  // Select a conversation (load messages)
  async function selectConversation(canal) {
    activeConversation = canal;
    messagesDisplay.innerHTML = '';
    document.querySelector('.main-chat').style.display = 'flex';

    try {
      const res = await fetch(`${BASE}/messages?canalId=${canal.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error('Impossible de charger les messages');
      const msgs = await res.json();
      for (const msg of msgs) {
        await renderMessage(msg);
      }
      // start polling new messages for this canal
      if (pollingInterval) clearInterval(pollingInterval);
      pollingInterval = setInterval(() => refreshMessages(canal.id), 3000);
      messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
    } catch (err) {
      console.error(err);
      toast('Erreur chargement messages', 'error');
    }
  }

  async function refreshMessages(canalId) {
    try {
      const res = await fetch(`${BASE}/messages?canalId=${canalId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) return;
      const msgs = await res.json();
      messagesDisplay.innerHTML = '';
      msgs.forEach(renderMessage);
      messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
    } catch (err) {
      console.error('Refresh messages:', err);
    }
  }

  async function renderMessage(msg) {
    const div = document.createElement('div');
    div.className = msg.senderId == idUser ? 'sent' : 'received';
    
    let displayText = '';
    
    // Si le message est chiffré, tenter de le déchiffrer
    if (msg.encryptedMessage) {
      try {
        const decryptedText = cryptoManager.decryptMessage(msg.encryptedMessage);
        if (decryptedText) {
          displayText = decryptedText;
          console.log('✅ Message déchiffré avec succès');
        } else {
          displayText = '🔒 Message chiffré (clé privée manquante)';
        }
      } catch (err) {
        console.error('❌ Erreur déchiffrement:', err);
        displayText = '🔒 Erreur déchiffrement du message';
      }
    } else if (msg.content) {
      displayText = msg.content;
    } else {
      displayText = JSON.stringify(msg);
    }
    
    div.textContent = displayText;
    messagesDisplay.appendChild(div);
  }

  // Create conversation flow
  createChatBtn.addEventListener('click', async () => {
    const invitedUsername = inviteUserInput.value.trim();
    if (!invitedUsername) {
      toast("Entre le nom d'utilisateur à inviter", 'error');
      return;
    }

    try {
      // find invited user by username
      const ures = await fetch(`${BASE}/users?username=${encodeURIComponent(invitedUsername)}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!ures.ok) throw new Error('Utilisateur introuvable');
      const users = await ures.json();
      if (!users || users.length === 0) {
        toast("Utilisateur introuvable", 'error');
        return;
      }
      const invitedUser = users[0];

      // create canal
      const cres = await fetch(`${BASE}/canaux/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ userId1: idUser, userId2: invitedUser.id }),
      });
      if (!cres.ok) {
        const err = await cres.json().catch(() => ({}));
        throw new Error(err.message || 'Impossible de créer le canal');
      }
      const newCanal = await cres.json();
      toast('Canal créé', 'success');
      newChatModal.style.display = 'none';
      inviteUserInput.value = '';
      // refresh list and auto-select
      await loadConversations();
      const created = conversations.find((c) => Number(c.id) === Number(newCanal.id));
      if (created) selectConversation(created);
    } catch (err) {
      console.error(err);
      toast(err.message || 'Erreur création canal', 'error');
    }
  });

  // Send message
  sendButton.addEventListener('click', () => sendMessage(idUser));
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(idUser);
  });

  async function sendMessage(senderId) {
    if (!activeConversation) {
      toast('Sélectionne une conversation d\'abord', 'error');
      return;
    }
    const text = messageInput.value.trim();
    if (!text) return;
    try {
      const res = await fetch(`${BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({
          canalId: activeConversation.id,
          senderId,
          content: text,
        }),
      });
      if (!res.ok) throw new Error('Erreur envoi message');
      const msg = await res.json();
      renderMessage(msg); // afficher immédiatement
      messageInput.value = '';
      messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
    } catch (err) {
      console.error(err);
      toast('Erreur envoi message', 'error');
    }
  }

  // Close conversation (delete canal)
  closeChatBtn.addEventListener('click', async (activeConversation) => {
    if (!activeConversation) {
      toast('Aucune conversation active', 'error');
      return;
    }
    if (!confirm('Clore la conversation et supprimer les messages ?')) return;
    console.log(activeConversation);
    
    try {
      const res = await fetch(`${BASE}/canaux/${activeConversation.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ userId: idUser }),
      });
      if (!res.ok) throw new Error('Erreur suppression conversation');
      toast('Conversation supprimée', 'success');
      activeConversation = null;
      messagesDisplay.innerHTML = '';
      await loadConversations();
    } catch (err) {
      console.error(err);
      toast('Erreur suppression conversation', 'error');
    }
  });

  // initial load
  await loadConversations();
});
