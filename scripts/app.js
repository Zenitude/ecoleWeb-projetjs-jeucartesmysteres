/* Variables */

    const cartes = document.querySelectorAll('.carte');   
    const facesRecto = [];
    const facesVerso = [];  

    let tousLesFruits = [];
    let carteRetournee = false;
    let premiereCarte, secondeCarte;
    let verrouillage = false;
    let tabRetournement = [];
    
/* Affichage */

    affichageDesFaces();
    faceRecto(tousLesFruits);

    let images = document.querySelectorAll('img');

    images.forEach(image => 
    {
        image.parentNode.parentNode.setAttribute('data-carte', image.getAttribute('data-fruit'))
    });


/* Événements */

    cartes.forEach(carte => 
    {
        carte.addEventListener('click', retourneCarte);
    });

/* Fonctions */

    function affichageDesFaces() 
    {
        for(let i = 0 ; i < cartes.length ; i++) 
        {
            facesRecto.push(document.createElement('div'));
            facesRecto[i].classList.add(`recto`);

            facesVerso.push(document.createElement('div'));   
            facesVerso[i].classList.add(`verso`);
            facesVerso[i].innerHTML = document.createElement('p').innerText = `❓`;

            cartes[i].appendChild(facesRecto[i]);
            cartes[i].appendChild(facesVerso[i]);
        }

        const pomme = [];
        const banane = [];
        const brocoli = [];
        const cerise = [];
        const piment = [];
        const fraise = [];

        fruits(pomme, 'pomme');
        fruits(banane, 'banane');
        fruits(brocoli, 'brocoli');
        fruits(cerise, 'cerise');
        fruits(piment, 'piment');
        fruits(fraise, 'fraise');

        tousLesFruits = [pomme[0], pomme[1], banane[0], banane[1], brocoli[0], brocoli[1], cerise[0], cerise[1], piment[0], piment[1], fraise[0], fraise[1]];
    }

    function fruits(fruits, fruit) 
    {
        for(let i = 0; i < 2; i++) 
        {
            const image = document.createElement('img');
            image.setAttribute('src', 'ressources/'+fruit+'.svg');
            image.setAttribute('alt', fruit);
            image.setAttribute('data-fruit', fruit)
            fruits.push(image);
        }
    }

    function faceRecto(fruit) 
    {
        for(let i = 0; i < 12 ; i++) 
        {
            facesRecto[i].appendChild(fruit[i]);
        }
    }

    function retourneCarte() 
    {
        if(verrouillage) return;

        this.classList.toggle('retournement');

        if(!carteRetournee) 
        {
            carteRetournee = true;
            premiereCarte = this;
            return;
        }

        carteRetournee = false;
        secondeCarte = this;

        correspondance();

        if(tabRetournement.length >= 12)
        {
            location.reload();
        }
    }

    function correspondance() 
    {
        if(premiereCarte.getAttribute('data-carte') === secondeCarte.getAttribute('data-carte'))
        {
            premiereCarte.removeEventListener('click', retourneCarte);
            secondeCarte.removeEventListener('click', retourneCarte);
            tabRetournement.push(premiereCarte);
            tabRetournement.push(secondeCarte);
            console.log(tabRetournement);
        }
        else
        {
            verrouillage = true;


            setTimeout(() => 
            {
                premiereCarte.classList.remove('retournement');
                secondeCarte.classList.remove('retournement');
                verrouillage = false;

            }, 1500);
        }
    }

    function positionAleatoire()
    {
        cartes.forEach(carte =>
        {
            let positionRandom = Math.floor(Math.random() * 12 );
            carte.style.order = positionRandom;
        });
    }

    positionAleatoire();

    