<<<<<<< HEAD
=======
Projet A.L.P.H.A.
–
Application de Liaison Post-Humanité Asynchrone




Un projet imaginé et mené par Nicolas, Florent, Pierre, Antoine et Caroline, recrues de la D.I.P., à l’EPSI Arras.
 





Explication détaillée de chaque terme du nom de notre projet :
Application : C'est le terme générique pour le logiciel. Cela souligne qu'il ne s'agit pas d'un simple protocole ou idée, mais d'un instrument opérationnel et déployable.
Raccord : Ce terme est essentiel. Dans un univers disloqué et périlleux, l'expression « liaison » fait référence à la réinstauration d'une connexion locale, d'un rattachement entre des entités isolées (les refuges, les collectifs de survivants).. C'est le moyen de briser l'isolement et de coordonner les efforts. 
Post-Humanité : L'ancien monde est mort, et ce qui reste est un vestige, une nouvelle ère pour l'humanité survivante. La solution est conçue pour une ère où les systèmes et les façons de vivre d'avant Ultron ne sont plus viables. C'est un instrument destiné aux « derniers hommes », ceux qui existent après la « chute ».
Asynchrone : Sur le plan technique, une communication asynchrone implique que l'expéditeur n'est pas tenu d'attendre une réaction instantanée du destinataire pour poursuivre ses propres activités. Dans ce contexte, il s'agit d'une méthode de communication basée sur des « éclairs » plutôt que sur un « flux continu », rendant ainsi la détection plus complexe pour Ultron.

En résumé, « Application de Liaison Post-Humanité Asynchrone » décrit un outil software essentiel pour rétablir le lien entre une humanité dévastée, en se servant de modes de communication discrets et non entravés, appropriés à cette nouvelle et périlleuse époque dirigée par Ultron.

Contexte
Dans cet univers ravagé par Ultron, la communication est essentielle pour la survie. L'IA supervise les réseaux publics, devenus des instruments de suivi et de traque. Les derniers rescapés, qui se sont rassemblés dans des abris, ont un besoin crucial de communiquer des informations (stratégies d'approvisionnement, alertes, localisation des dangers) de façon sécurisée, non détectable et temporaire. Chaque message conservé est une vulnérabilité et peut être une nouvelle porte d’entrée pour la destruction. 
Dans une nouvelle cellule clandestine appelée D.I.P., pour Défense Informatique Planétaire, nous avons été recrutés pour imaginer et concevoir une solution concrète qui permette aux populations résistantes de survivre, de s’organiser et de se reconstruire. Nous sommes le dernier rempart pour l’humanité et la planète. 
Ultron était une machine, un corps métallique froid contre lequel nous pouvions lutter physiquement.
Maintenant, il n’est plus matériel. Il est partout. Nous devons trouver une nouvelle solution pour lutter différemment, dans un environnement complexe.

Problématique
Comment établir une communication locale fiable entre les rares survivants sans qu'Ultron ne puisse intercepter, déchiffrer ou utiliser les informations pour les localiser ? 
L'enjeu est de protéger les informations vitales (lieux d'approvisionnement, plans d'évasion, localisation des refuges) des capacités de déchiffrement d'Ultron. 

Objectifs
L'objectif est de développer une application de messagerie de fortune, de mettre en place un système de chiffrement où les clés ne sont jamais transmises en clair sur le réseau et où les données ne sont stockées que temporairement puis supprimées de façon permanente. 
Cette application doit permettre :
Une communication local-first, où tous les appareils ont été réinitialisés.
L'absence de stockage de données à long terme.
Des messages éphémères qui ne laissent aucune trace persistante.
La création des identifiants et des mots de passe via un administrateur sûr.
La création de canaux privés via l’identifiant.
Une communication secrète où le chiffrement se fait avant l'envoi grâce à un chiffrement asymétrique.
La protection des clés de chiffrement en n'envoyant que les clés publiques lors de la connexion entre les machines des deux survivants.
Utilisation 
Architecture
Le projet A.L.P.H.A. répond à ces derniers objectifs. C’est une application web conçue pour fonctionner sur les terminaux de fortune des survivants, en réseau local. Son design est épuré afin de réduire au minimum sa « présence » sur le réseau.
Interface des survivants (Frontend) : Élaborée en HTML, CSS et JavaScript. L'interface est minimaliste, pensée pour la performance. Elle comporte une console de messages et des commandes pour initier des communications chiffrées. Elle gère la génération des paires de clés (publique et privée) pour le chiffrement asymétrique.
Backend (Le Relais) : Basé sur Node.js, le backend ne sert qu'à relayer le trafic, c’est une API. Il fait la passerelle entre le front et la base de données. C’est aussi un pont qui ne fait que transmettre les messages chiffrés asymétriquement à leur destinataire afin de contourner la surveillance d'Ultron. 

Sécurité ou l'art de l'invisibilité
La sécurité est la pierre angulaire de ce projet. Il a été pour nous un point d’honneur à sécuriser un maximum les conversations, afin de garder secret les échanges.  
Chiffrement Asymétrique pour l'échange de clés de session et des messages :
Chaque terminal génère une paire de clés lors de la première connexion : une clé publique (qui peut être partagée) et une clé privée (qui reste secrète).
Pour démarrer une conversation, les deux terminaux échangent leurs clés publiques. C'est le seul moment où une clé est transmise, et la clé publique ne peut pas être utilisée pour déchiffrer.
L'expéditeur utilise la clé publique du destinataire pour chiffrer son message.
Le destinataire utilise sa propre clé privée pour déchiffrer le message et le rendre lisible.
Le message chiffré est alors envoyé sur le réseau. Même si Ultron intercepte ce message, il ne possède pas la clé publique pour le déchiffrer.

L'Autodestruction :
Après que le message a été envoyé et décodé par le destinataire, une minuterie de 30 secondes se déclenche. Le message s'efface du DOM, et le relais supprime toute empreinte de son existence.
Le backend ne garde aucune clé de cryptage ni message.
Toute les  10 minutes, tout les messages 



Autorisations : 
METTRE QQ MOTS DESSUS


Protocole HTTPS pour A.L.P.H.A. :
Chiffrement du trafic : 
METTRE QQ MOTS SUR CA



Fail 2 Ban : 
Défense contre les intrusions :
Dans un environnement où chaque liaison peut constituer un risque pour la sûreté des survivants, il est essentiel de sauvegarder le serveur central et les conteneurs Docker contre les tentatives d'intrusion non autorisées. C'est pourquoi nous avons implémenté Fail2Ban, un outil open-source de protection contre les intrusions qui se base sur l'analyse des logs système.


Principe de fonctionnement : 
Fail2Ban examine les journaux du serveur et identifie les tentatives de connexion infructueuses répétées, qu'elles se fassent par le biais de SSH, HTTP ou d'autres services mis à disposition. Lorsqu'un nombre spécifié d'échecs successifs est détecté, Fail2Ban impose automatiquement un blocage à l'adresse IP responsable pendant une durée déterminée, minimisant de cette façon le danger des attaques par force brute ou automatisées.


Configuration pour A.L.P.H.A. pour protéger plusieurs couches : 
Accès SSH aux machines hébergeant les conteneurs :
Restriction de 5 essais sur 10 minutes.
L'adresse IP sera automatiquement exclue pendant 24 heures après avoir dépassé le nombre de tentatives autorisé.


Accès HTTPS (Flask, OpenSSL et Apache) :
Surveillance des requêtes incorrectes ou des tentatives de force brute sur les formulaires de connexion.
Blocage temporaire des adresses IP suspectes afin de sauvegarder les conteneurs temporaires et prévenir toute intrusion sur les sessions en cours.


Logs Docker et conteneurs éphémères :
Analyse des journaux pour repérer des accès illicites ou des tentatives de modification des conteneurs.
Mise en œuvre d'une exclusion instantanée en présence d'un comportement anormal.


Documentation fonctionnelle et technique
L'environnement :
Conteneurs éphémères isolés : Chaque visiteur qui se connecte au site obtient son propre conteneur Docker temporaire. Ces conteneurs fonctionnent comme un bac à sable pour la gestion des messages cryptés.
Cryptage des messages : Dans le conteneur, tous les messages sont réceptionnés et déchiffrés exclusivement à l'aide de la clé de session asymétrique. Le conteneur ne stocke jamais les clés ou les messages sur le disque, assurant que toutes les informations demeurent éphémères et protégées.
Auto-destruction : Chaque conteneur est paramétré pour se détruire de manière automatique après un laps de temps déterminé ou dès que l'utilisateur termine sa session.
Séparation totale : Docker permet de créer un environnement totalement isolé, évitant ainsi qu'un utilisateur puisse accéder aux données d'un autre.
Redirection par le biais du serveur principal : Le serveur principal Apache génère le conteneur à la requête, obtient le port exposé et oriente l'internaute vers son propre conteneur. Une fois la session achevée, le conteneur se supprime, laissant l'environnement préparé pour le futur visiteur.

Cette application a été conçue en utilisant Flask et s'appuie sur la librairie Docker Python. Elle autorise le démarrage automatique d'un conteneur Docker à chaque nouvelle connexion. Un identifiant unique basé sur UUID est attribué à chaque utilisateur. Le conteneur est généré en se basant sur l'image « docker-site ». Son port 80 est mappé vers un port aléatoire sur la machine hôte. Une fois lancé, l’utilisateur est redirigé vers l’URL du conteneur. Les conteneurs sont mémorisés dans un dictionnaire sessions. Une route /cleanup/<session_id> permet d’arrêter et nettoyer un conteneur. Cela garantit que chaque session reste isolée et temporaire. L’ensemble automatise le déploiement et la gestion de conteneurs à la demande.

Git : 

Pour le côté open source, nous avons mis en place un github pour enregistrer nos données et aussi pour avoir une trace de nos avancements.  
Lien vers le github : https://github.com/pierre3150/ALPHA




Les points qui ont échoué : 
Il était d’abord question d’utiliser un Raspberry Pi 4. Nous avons abandonné l’idée quand le travail sur ce dernier est devenu impossible, dû aux surchauffes et aux plantages. Nous avons ainsi décidé d’utiliser une machine virtuelle pour le développement et l’installation de tous les packages pour ainsi tout transférer sur la Raspberry Pi.
En parallèle, nous avons testé la capacité du Raspberry Pi à émettre un Wi-Fi puis un Bluetooth.
Wi-Fi sur Raspberry Pi (AP & STA)
Définition :
AP (Access Point) : mode dans lequel un appareil émet un réseau Wi-Fi, permettant à d’autres appareils de s’y connecter.
STA (Station) : mode dans lequel un appareil se connecte à un réseau Wi-Fi existant en tant que client.

Objectif : L’objectif principal du projet était de transformer le Raspberry Pi en point d’accès Wi-Fi (AP) afin de créer un réseau local sécurisé et entièrement contrôlable.
Mise en place : 
Assigner une adresse IP fixe à l'interface Wi-Fi en configurant le DHCP.
Il faut désactiver la configuration client (STA) administrée par wpa_supplicant et activer le mode AP à l'aide de hostapd.
Instaurer un service dnsmasq pour administrer l'attribution des adresses IP aux clients connectés.
Par conséquent, hostapd permet au Raspberry Pi de diffuser un signal Wi-Fi (point d'accès), tandis que dnsmasq est responsable de l'administration du réseau local. La transition de wpa_supplicant vers hostapd est indispensable pour changer le rôle de receveur (STA) à celui d'émetteur (AP).

Problèmes survenus après l'instauration du Raspberry Pi en tant que point d'accès Wi-Fi :
Conflit entre les modes AP et STA
Il n'est pas possible pour le Raspberry Pi 4 d'être simultanément un client Wi-Fi (STA) et un point d'accès (AP) via une seule interface sans intégrer du matériel complémentaire (dongle Wi-Fi).
Cela a entraîné des interruptions de connexion et a entravé le fonctionnement adéquat de l'AP.
Il y a aussi eu des problèmes de changement car même en changeant la connexion en AP elle rester en STA et donc empêcher la connexion


Adresse IP non persistante
Malgré la configuration d’une adresse IP statique pour l’interface wlan0, celle-ci changeait après certains redémarrages ou à cause de conflits avec dhcpcd.



Service hostapd instable
Le lancement de hostapd échouait parfois, parce que wpa_supplicant occupait encore l’interface malgré l'arrêt complet de celui-ci.
Ce problème empêchait l’AP d’être visible depuis les autres appareils.


Bluetooth sur Raspberry Pi
Objectif : L'idée était d'exploiter la fonction Bluetooth du Raspberry Pi pour créer un lien direct avec un autre dispositif (ordinateur ou téléphone portable), facilitant ainsi le transfert de données sans l'aide d'un réseau Wi-Fi ou Ethernet.

Mise en place : 
Enclencher et contrôler le module Bluetooth intégré du Raspberry Pi à travers le service Bluetooth.
Recourir aux utilitaires bluetoothctl et hcitool pour : Explorer les dispositifs Bluetooth à disposition, associer le Raspberry Pi à un autre dispositif, mettre en place une liaison sécurisée.
Mettre en place une liaison de communication (RFCOMM) pour tester le transfert de messages ou fichiers.


Problèmes rencontrés : 


Pairing instable
Malgré une détection précise des périphériques, le couplage du Raspberry Pi avec certains appareils échouait fréquemment.
Il a fallu procéder à plusieurs reprises à la procédure de jumelage manuelle ou de suppression manuelle des clés de jumelage.


Services limités
Le Raspberry Pi était capable de détecter et d'établir une connexion, cependant certains profils Bluetooth (comme le transfert de fichiers ou l'audio) ne fonctionnaient pas correctement sans une configuration supplémentaire.
Portée et interférences
Étant donné que la portée Bluetooth est limitée (quelques mètres), la liaison perdait vite en fiabilité.
La communication pouvait également être perturbée par des interférences Wi-Fi, étant donné que les deux technologies utilisent la même fréquence (2,4 GHz).


Difficulté d’intégration
Contrairement au Wi-Fi, la configuration Bluetooth demande de manipuler plusieurs outils (bluetoothctl, rfcomm, bluez), ce qui rend la mise en place plus complexe et moins automatisée.
De plus, pour attribuer une adresse IP utilisable pour accéder au site web via Bluetooth, il aurait fallu mettre en place un pont réseau (Bluetooth PAN) et configurer manuellement l’attribution d’adresses IP, ce qui s’est révélé trop complexe dans le cadre de ce projet.

Face à ces problèmes, nous avons laissé notre projet sur la VM qui sert aussi de routeur local.

Si on devrait recommencer
Suite à l'examen de nos défis et des contraintes rencontrées lors de la conception et de la mise en œuvre de l'application A.L.P.H.A., plusieurs éléments cruciaux émergent afin d'améliorer la robustesse, la sûreté et l'ergonomie du projet.
1. Une meilleure configuration matérielle pour le Raspberry Pi
Le choix du Raspberry Pi 4 a entraîné plusieurs limitations techniques :
Surchauffe et instabilité : Le modèle déployé n'a pas pu faire face à la charge du réseau et du logiciel, entraînant des pannes et des coupures de service.


Wi-Fi instable en mode AP & STA : L'usage d'une seule interface Wi-Fi a entravé l'opération simultanée en tant que point d'accès et client, engendrant des conflits de connexion.


Bluetooth restreint : L'usage de ce canal pour la communication locale a été entravé par une portée limitée et des perturbations avec le Wi-Fi.


Solutions envisagées :
L'utilisation d'un Raspberry Pi plus puissant ou d'une version optimisée pour le réseau est recommandée.


Incorporer une interface Wi-Fi distincte ou un dongle USB pour dissocier les modes AP et STA.


Mettre en place des systèmes de refroidissement afin d'éviter la surchauffe durant des périodes prolongées de charge.


Examiner d'autres modules de communication (LoRa, Wi-Fi longue distance) pour un réseau local plus solide.

2. Améliorer le réseau local
Établir un réseau Wi-Fi stable et durable : mettre en place une adresse IP fixe adéquate, un DHCP de confiance et un point d'accès distinct du lien client.


Concevoir un réseau en maillage avec plusieurs Raspberry Pi pour augmenter la portée et la robustesse du réseau : chaque Pi pourrait fonctionner comme un relais ou un point d'accès secondaire.


L'automatisation des configurations réseau est mise en place pour prévenir les conflits entre hostapd, wpa_supplicant et dnsmasq.





3. Sécurité renforcée
Fail2Ban a été efficace pour stopper les attaques récurrentes, cependant, il ne fournit pas une protection contre une adresse IP compromise authentique.


L'association de Fail2Ban avec des listes blanches dynamiques et un système de détection d'intrusions (IDS/IPS) fournirait une défense plus intégrale.


Élargir la protection au niveau du conteneur et du réseau, en cryptant les transmissions entre le Raspberry Pi et la VM ou entre divers relais.

4. Simplifier l’intégration des utilisateurs
Pour chaque utilisateur, il s'agit d'automatiser le déploiement et la suppression des conteneurs Docker.


Suggérer une interface plus conviviale pour la création des clés, l'accès aux canaux privés et l'expédition de messages.


Envisager un système de reconnexion automatique pour remédier aux coupures de signal ou aux dysfonctionnements du Raspberry Pi.


5. Perspectives d’évolution technique
Examiner des options matérielles plus résistantes pour les relais de communication.


Essayer l'intégration d'autres protocoles de communication locaux (par exemple : LoRa, Zigbee) pour des communications à longue portée et à faible consommation.


Examiner l'instauration d'un réseau de relais multiples résilient, dans lequel chaque dispositif participe à la diffusion sécurisée des messages.


Assurer la maintenance et la documentation des solutions open-source sur GitHub afin de faciliter l'évolution et le suivi du projet.


Perspective d’évolution

Côté Raspberry Pi :
Il eût été souhaitable d'avoir un mode de transmission Wi-Fi plus facile à utiliser, afin de ne pas être tributaire de la complexité du Raspberry Pi. L'usage d'une antenne Wi-Fi spécifique aurait permis de diffuser le signal directement, que le téléphone aurait été en mesure de réceptionner sans intermédiaire.
De plus, le modèle de Raspberry Pi utilisé aurait gagné à être plus performant. Le code étant relativement complexe, le modèle actuel a tendance à surchauffer et à planter, ce qui compromet la stabilité et la fiabilité du système.
Enfin, il serait envisageable d’interconnecter plusieurs Raspberry Pi afin d’étendre la portée de la connexion et de créer un réseau de communication national, chaque Raspberry Pi servant alors de relais ou d’antenne.

Fail 2 Ban :
Fail2Ban protège contre les attaques répétées, mais ne peut pas empêcher une intrusion provenant d’une IP légitime compromise.


Pour assurer une sécurité optimale, il serait envisageable d'associer Fail2Ban à des listes blanches dynamiques et à une surveillance réseau plus sophistiquée (IDS/IPS).




>>>>>>> 049cff96c7b6edacdc8fe5d19a0b2155c76283d7
