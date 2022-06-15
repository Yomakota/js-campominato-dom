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

    let gameLevel = parseInt(prompt('Scegli difficoltà 1-2-3'));
    while (gameLevel < 1 || gameLevel > 3) {
        gameLevel = parseInt(prompt('Scegli difficoltà 1-2-3'));
    }
    console.log(gameLevel);

    let gameRangeNum;

    // Livello di difficoltà cambia range di numeri con cui giocare:
    switch (gameLevel) {
        case 1:
            gameRangeNum = 100;
            break;
        case 2:
            gameRangeNum = 81;
            break;
        case 3:
            gameRangeNum = 49;
            break;
    }

    console.log(gameRangeNum);

    const bombsNum = 16;
    const minRange = 1;
    const bombs = generateBomb(bombsNum, minRange, gameRangeNum);
    console.log(bombs);

    const numAttempts = gameRangeNum - bombsNum;
    // console.log(numAttempts);

    // const userAttempts = [];

    // let winner;
    // let lost = false;
}