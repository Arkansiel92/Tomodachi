const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://192.168.1.37:3000", // IP on private network (localhost works too)
        method: ["GET", "POST"]
    }
});

const wichOfUs = [
    "est le plus sensible",
    "est le plus fort physiquement",
    "est le plus fort mentalement",
    "est le plus intelligent",
    "est le plus riche",
    "est le moins chaud pour sortir",
    "sera le plus riche",
    "peut trahir ses potes pour sa meuf",
    "peut se retrouver au milieu d'une bagarre",
    "a la plus grosse ;)",
    "a le plus de chance de se retrouver en prison",
    "est le meilleur aux jeux vidéos",
    "est le plus raciste",
    "a eu le pire date",
    "a eu la pire relation",
    "a le plus envie de baiser",
    "est le plus charismatique",
    "déteste le plus son métier/ses études",
    "est le meilleur à fortnite",
    "est le meilleur à Apex Legends",
    "est le meilleur à Rocket League",
    "tiens le mieux l'alcool",
    "pourrait coucher avec la première meuf qu'il voit",
    "est le plus extraverti",
    "parle trop",
    "est le plus éloquent",
    "est le plus infidèle",
    "est le plus cultivé",
    "est le moins cultivé",
    "est le plus drôle",
    "est le plus pessismite",
    "est le plus optimiste",
    "est le plus beau",
    "s'habille le mieux",
    "est le plus grand mytho",
    "va devenir chauve en premier",
    "est le plus masculin",
    "est le plus feminin",
    "est un(e) mec/fille facile",
    "est le plus sale",
    "qui a le plus beau cul",
    "fait le plus de story",
    "fait le plus de sport",
    "est le plus dépensier",
    "est le plus sociable",
    "est le plus maladroit",
    "est le plus geek",
    "est toujours en retard",
    "danse le mieux",
    "est le plus écolo",
    "serait le meilleur à Koh-Lanta",
    "a garder une âme d'enfant",
    "est le plus gourmand",
    "est le plus fou / folle",
    "est le plus mauvais perdant",
    "est le plus coléreux",
    "est le moins doué en informatique",
    "est le plus doué en informatique",
    "est le plus ponctuel",
    "est le plus susceptible de visiter tous les continents",
    "aime le plus la musique",
    "est le plus susceptible de mourir en premier",
    "est le plus rancunier",
    "a le plus de tatouage",
    "pourrait partir à l'autre bout du monde pour un(e) meuf/mec",
    "est le meilleur dragueur",
    "est le meilleur menteur",
    "pourrait s'endormir pendant l'amour",
    "pourrait tomber amoureux (se) d’un(e) de ses meilleur(e)s ami(e)s",
    "pourrait tourner dans un film X",
    "pourrait mourir de quelque chose de stupide",
    "est le plus influençable",
    "pourrait être youtuber",
    "pourrait être streamer",
    "déteste le plus maël"
]

const agentTrouble = [
    {
        place: 'Parc d\'attraction',
        professions: ['Visiteur', 'Vendeur de souvenirs', 'Mascotte', 'Directeur', 'Hôte de ménage', 'Conducteur de manège'],
        img: '',
        spyProfession: 'Mécanicien',
    },
    {
        place: 'Hôtel',
        professions: ['Barman', 'Cuisinier', 'Touriste', 'Femme de chambre', 'Directeur', 'Voiturier'],
        img: '',
        spyProfession: 'Réceptionniste',
    },
    {
        place: 'Banque',
        professions: ['Conseiller bancaire', 'Informaticien', 'Chargé de clientèle', 'Agent d\'accueil', 'Client', 'Secrétaire'],
        img: '',
        spyProfession: 'Directeur',
    },
    {
        place: 'Ecole',
        professions: ['Elève', 'Professeur', 'CPE', 'Cuisinier', 'Surveillant', 'Parent d\'élève'],
        img: '',
        spyProfession: 'Directeur',
    },
    {
        place: 'Base militaire',
        professions: ['Militaire', 'Officier', 'Ambassadeur', 'Infirmier', 'Mécanicien', 'Chef des opérations'],
        img: '',
        spyProfession: 'Colonel',
    },
    {
        place: 'Boîte de nuit',
        professions: ['Client', 'Voiturier', 'Physionomiste', 'DJ', 'Danseur', 'Client VIP'],
        img: '',
        spyProfession: 'Barman',
    },
    {
        place: 'Restaurant',
        professions: ['Client', 'Cuisinier', 'Responsable', 'Agent d\'accueil', 'Voiturier', 'Directeur'],
        img: '',
        spyProfession: 'Serveur',
    },
    {
        place: 'Fête d\'entreprise',
        professions: ['Secrétaire', 'PDG', 'Serveur', 'Comptable', 'Barman', 'Stagiaire'],
        img: '',
        spyProfession: 'Agent administratif',
    },
    {
        place: 'Zoo',
        professions: ['Vétérinaire', 'Soigneur animalier', 'Visiteur', 'Directeur', 'Hôte/Hôtesse d\'accueil', 'Caissier'],
        img: '',
        spyProfession: 'Vendeur',
    },
    {
        place: 'Supermarché',
        professions: ['Caissier', 'Client', 'Boulanger', 'Livreur', 'Directeur', 'Chef de rayon'],
        img: '',
        spyProfession: 'Boucher',
    },
    {
        place: 'Théâtre',
        professions: ['Décorateur', 'Costumier', 'Régisseur', 'Auteur', 'Danseur', 'Chargé de production'],
        img: '',
        spyProfession: 'Comédien',
    },
    {
        place: 'Plage',
        professions: ['Vendeur de beignets', 'Barman', 'Touriste', 'Vendeur de jet-ski', 'Capitaine de bateau', 'Gardien de phare'],
        img: '',
        spyProfession: 'Sauveteur',
    },
    {
        place: 'Poste de police',
        professions: ['Gardien de prison', 'Directeur', 'Cuisinier', 'Mirador', 'Infirmier', 'Psychologue'],
        img: '',
        spyProfession: 'Détenu',
    },
    {
        place: 'Bâteau pirate',
        professions: ['Capitaine', 'Timonier', 'Prisonnier', 'Second du capitaine', 'Quartiers-maîtres', 'Médecin'],
        img: '',
        spyProfession: 'Marin',
    },
    {
        place: 'Train de voyageurs',
        professions: ['Touriste', 'Conducteur du train', 'Bandit', 'Contrôleur', 'Sherif', 'Vendeur de billet'],
        img: '',
        spyProfession: 'Vendeur ambulant',
    },
    {
        place: 'Avion',
        professions: ['Pilote', 'Hôte/Hôtesse de vol', 'Passager', 'Agent de piste', 'Accompagneur de passager à mobilité réduite', 'Agent de nettoyage'],
        img: '',
        spyProfession: 'Copilote',
    },
    {
        place: 'Université',
        professions: ['Etudiant', 'Professeur', 'Doyen', 'Agent d\'entretien', 'Examinateur', 'Etudiant étranger'],
        img: '',
        spyProfession: 'Agent de sécurité',
    },
    {
        place: 'Garage',
        professions: ['Client', 'Livreur', 'Patron', 'Electricien', 'Expert technique', 'Dépanneur'],
        img: '',
        spyProfession: 'Technicien en pneumatique',
    },
    // {
    //     place: 'Station polaire',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Chef d\'expédition',
    // },
    // {
    //     place: 'Studio de cinéma',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Acteur',
    // },
    // {
    //     place: 'Station spatiale',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Touriste de l\'espace',
    // },
    // {
    //     place: 'Carnaval',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Touriste',
    // },
    // {
    //     place: 'Paquebot',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'passager de 1ère classe',
    // },
    // {
    //     place: 'Ambassade',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Touriste',
    // },
    // {
    //     place: 'Croisades',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Archer',
    // },
    // {
    //     place: 'Hôpital',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Médecin',
    // },
    // {
    //     place: 'Casino',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Serveur',
    // },
    // {
    //     place: 'Cirque',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Acrobate',
    // },
    // {
    //     place: 'Sous-marin',
    //     professions: ['', '', '', '', '', ''],
    //     img: '',
    //     spyProfession: 'Opérateur sonar',
    // }
]

io.on("connection", (socket) => {
    console.log('CONNECTION :', socket.id);

    socket.on('clear', () => {
        const rooms = [...socket.rooms];

        rooms.forEach((room) => {
            if (room !== socket.id) {
                socket.leave(room);
            }
        })
    })

    socket.on('redirectToGame', () => {
        io.to(socket.room).emit('redirectToGame');
    })

    socket.on('getPlaces', () => {
        io.to(socket.room).emit('getPlaces', agentTrouble);
    })

    socket.on('getRoom', () => {
        const hub = io.sockets.adapter.rooms.get(socket.room);
        hub.sockets = [...hub.values()];
        console.log(hub);

        io.to(socket.room).emit('getRoom', hub);
    })

    socket.on('nextRound', () => {
        const hub = io.sockets.adapter.rooms.get(socket.room);

        hub.place = agentTrouble[Math.floor(Math.random() * agentTrouble.length)];
        hub.roles = [];
        hub.professions = [];
        hub.votes = [];
        hub.spy = '';

        io.to(socket.room).emit('nextRound');
        io.to(socket.room).emit('getRoom');
    })

    socket.on('vote', impostor => {
        const hub = io.sockets.adapter.rooms.get(socket.room);

        for (let i = 0; i < hub.sockets.length; i++) {
            if (hub.sockets[i] === socket.id) {
                hub.votes[i] = impostor;
            };     
        };

        if (hub.votes.includes('') === false) {
            io.to(socket.room).emit('reveal', hub.spy);
            io.to(socket.room).emit('finish', `l'espion était : ${hub.spy}`);
        }

        console.log(hub.votes);
    })

    socket.on('findPlace', place => {
        const hub = io.sockets.adapter.rooms.get(socket.room);

        if (hub.place.place === place) {
            io.to(socket.room).emit('finish', 'L\'espion a trouvé le lieu !');
        } else {
            io.to(socket.room).emit('finish', 'Les agents ont gagné !');
        }
    })

    socket.on('reveal', (id) => {
        io.to(socket.room).emit('reveal', id);
    })

    socket.on('role', (id) => {
        const hub = io.sockets.adapter.rooms.get(id);
        const roles = ['Agent', 'Espion'];

        console.log("attribution des rôles !");

        for (let i = 0; i < hub.sockets.length; i++) {

            if (hub.roles.length === hub.sockets.length || hub.professions.length === hub.sockets.length) {
                return;
            };
            
            let roleSocket = roles[Math.floor(Math.random() * roles.length)];
            let profession = hub.place.professions[Math.floor(Math.random() * hub.professions.length)];

            if (hub.roles.includes('Espion')) {
                roleSocket = 'Agent';
            };

            // check if there is already at least one Spy in the game
            if ((hub.roles[i] + 1) === hub.sockets.length && hub.roles.includes('Espion') === false) { 
                roleSocket = 'Espion';
            }

            if(roleSocket === 'Espion') {
                profession = hub.place.spyProfession;
                hub.spy = hub.players[i]
            }

            while (hub.professions.includes(profession)) {
                profession = hub.place.professions[Math.floor(Math.random() * hub.professions.length)];
            }

            console.log(`role : ${roleSocket}`);
            console.log(`profession : ${profession}`);

            hub.roles.push(roleSocket);
            hub.professions.push(profession);
            hub.votes.push('');


            io.to(hub.sockets[i]).emit('profession', profession);
            io.to(hub.sockets[i]).emit('role', roleSocket);
        }
    })

    socket.on('join', ({id, pseudo}) => {
        const hub = io.sockets.adapter.rooms.get(id);

        if (hub.size < hub.nbPlayers) {
            hub.players.push(pseudo);
            socket.room = id;
            socket.name = pseudo;
            socket.join(id);
            socket.emit('redirectToSettings', id);
            return;
        } else {
            socket.emit('alert', `La salle est complète !`)
            return;
        }
    })

    socket.on('isRoom', (id) => {
        const room = [...socket.rooms.values()];

        if (room.includes(id)) {
            socket.emit('isRoom', {isRoom : true})
        } else {
            socket.emit('isRoom', {isRoom : false});
        }
    })

    socket.on('setRoom', ({id, players, pseudo}) => {
        socket.room = id;
        socket.name = pseudo
        socket.join(id);
        

        const hub = io.sockets.adapter.rooms.get(id);
        hub.status = 'private';
        hub.author = socket.id;
        hub.nbPlayers = players;
        hub.players = [socket.name];
        hub.place = agentTrouble[Math.floor(Math.random() * agentTrouble.length)];
        hub.roles = [];
        hub.professions = [];
        hub.votes = [];
    })

    socket.on('disconnect', () => {
        console.log('DISCONNECT :', socket.id)
    })
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});