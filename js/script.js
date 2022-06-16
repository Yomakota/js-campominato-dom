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

playBtn.addEventListener('click', start);

function start () {

    const grid = document.getElementById('grid');
    const messCont = document.getElementById('message');

    grid.innerHTML = '';
    grid.className = '';

    message.innerHTML = '';

    const bombsNum = 16;
    const minRange = 1;

    let gameLevel = document.getElementById('level').value;
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

    console.log(gameRangeNum);

    const bombs = generateBomb(bombsNum, minRange, gameRangeNum);
    console.log(bombs);

    const numAttempts = gameRangeNum - bombsNum;   console.log(numAttempts);

    const userAttempts = [];

    generateGrid();

    function generateGrid() {
        // aggiungere classe alla griglia per decidere livello
        grid.classList.add(gridLevel);

        for (let i = 1; i <= gameRangeNum; i++) {
            const cell = document.createElement('div');
            cell.innerHTML = `<span>${i}</span>`;
            cell.classList.add('square');
            cell.addEventListener('click', squareClick);

            grid.append(cell);
        }
    }

    function squareClick() {


        this.classList.add('clicked');
        let attempts = this.innerText;
        console.log(attempts);
        

        let bombNum = parseInt(this.querySelector('span').innerHTML);
        console.log(bombNum);

        if (bombs.includes(bombNum)) {
            this.classList.add('bomb');
            grid.classList.add('no-pointer');
            let message = document.createElement('div');
            message = document.innerHTML = `Peccato hai perso :-( Hai azzeccato ${userAttempts.length} tentativi.Gioca ancora`;
            console.log('message');
            messCont.append(message);

        } else {

            if (!userAttempts.includes(attempts)) {
                userAttempts.push(attempts);
                console.log(userAttempts);
            }

            if (userAttempts.length == numAttempts ) {
                console.log(userAttempts);
                let message = document.createElement('div');
                message = document.innerHTML = `Congratulazioni,HAI VINTO.Il tuo punteggio è ${userAttempts.length * 10}.Gioca ancora`;
                console.log('message');
                messCont.append(message);
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