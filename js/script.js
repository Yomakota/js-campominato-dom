// Consegna
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
//     BONUS:
// 1 - quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2 - quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// generare una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range, tra 1 e 100 o tra 1 e 81 o tra 1 e 49

const playBtn = document.getElementById('play');

// al click si attiva funzione start
playBtn.addEventListener('click', start);

function start () {
    //  HTML elements
    const grid = document.getElementById('grid');
    const messContainer = document.getElementById('message');

    // con ='' svuoto la griglia e le tolgo le classi per una nuova partita al click di playBtn
    grid.innerHTML = '';
    grid.className = '';
    message.innerHTML = '';

    // tutte le var per questa funzione le dichiaro in alto
    const bombsNum = 16;
    const minRange = 1;

    const gameLevel = document.getElementById('level').value;
    let gameRangeNum;
    let gridLevel;

    // Livello di difficoltà cambia range di numeri con cui giocare:
    switch (gameLevel) {
        case '1':
            gameRangeNum = 100;
            gridLevel = 'easy';
            break;
        case '2':
            gameRangeNum = 81;
            gridLevel = 'hard';
            break;
        case '3':
            gameRangeNum = 49;
            gridLevel = 'crazy';
            break;
    }

    const bombs = generateBomb(bombsNum, minRange, gameRangeNum);
    const numAttempts = gameRangeNum - bombsNum;
    const userAttempts = [];

    generateGrid();
    // function grid per generare griglia dentro function start
    function generateGrid() {
        // aggiungere classe che assegna il numeri di quadrati per livello alla griglia
        grid.classList.add(gridLevel);

        // for per creare i quadrati della griglia
        for (let i = 1; i <= gameRangeNum; i++) {
            const cell = document.createElement('div');
            cell.innerHTML = `<span>${i}</span>`;
            cell.classList.add('square');
            cell.addEventListener('click', squareClick);

            grid.append(cell);
        }
    }

    function squareClick() {
        // funzione per gestire click su ogni cell

        // alle celle cliccate aggiungo classe clicked e no pointer per non 'riclickarla'
        this.classList.add('clicked', 'no-pointer');
        let attempts = this.innerText;
        
        // seleziono il numero dentro le celle per poi attacare la classe bomb
        let bombNum = parseInt(this.querySelector('span').innerHTML);

        // se celle fanno parte della lista bombe
        if (bombs.includes(bombNum)) {
            this.classList.add('bomb');
            // e finisco il gioco
            endGame('lost');

        } else {

            // altrimenti salvo il numero in un array tentativi
            if (!userAttempts.includes(attempts)) {
                userAttempts.push(attempts);
            }
            // se l'array tentativi eguaglia il numero di tentativi massimi
            if (userAttempts.length == numAttempts ) {
                // finisco il gioco con vittoria
                endGame('won');
            }

        }
    }
    
    // function per finire il gioco e stampare il messaggio con punteggio
    function endGame (result) {
        //  creo div per riempirlo con messaggio
        let message = document.createElement('div');
        
        if(result === 'won') {
            message = document.innerHTML = `Congratulazioni,HAI VINTO.Il tuo punteggio è ${userAttempts.length * 10}.Gioca ancora`;
            messContainer.append(message);

        } else {
            message = document.innerHTML = `Peccato hai perso :-( Hai azzeccato ${userAttempts.length} tentativi.Gioca ancora`;
            messContainer.append(message);
        }

        // seleziono tutti i quadrati per aggiungere la classe no-pointer alla fine del gioco
        const allCell = document.querySelectorAll('.square');
        for (let i = 0; i < allCell.length; i++) {
            const singleCell = allCell[i]; 

            singleCell.classList.add('no-pointer');

            const allBombs = parseInt(singleCell.querySelector('span').innerHTML);
            
            // e la classe bomb per renderle visibili alla fine del gioco
            if (bombs.includes(allBombs)) {
                singleCell.classList.add('bomb');
            }
        }

    }
}

// function per numero random per generare con bombe
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// creo bombe ossia un array di 16 elementi random e unici
function generateBomb(numBombs, minRange, maxRange) {

    const numArray = [];

    while (numArray.length < numBombs) {

        const numRand = getRndInteger(minRange, maxRange);

        if (!numArray.includes(numRand)) {
            numArray.push(numRand);
        }
    }
    return numArray;
}