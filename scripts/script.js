'use strict';

//calling html signs to funtion with scripts

const boxsEL = document.querySelectorAll('.box');
const updateEL = document.querySelector('.updates');
const btnReset = document.querySelector('.btn');

//variables 

let x = '-X-'
let o = '-O-'
const winningPosibility = [
    [0,1,2],   
    [3,4,5],
    [6,7,8],
    [0,3,6],   //winnig posibilitys
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let positions = ['','','','','','','','','',];
let currentPlayer = x;
let statusTex = 'X'
let gameRunning = false;


                                    //fuctions

//init seting to start the game

function init() {
    //creating addeventlistener
    boxsEL.forEach(boxs=>boxs.addEventListener('click', boxClicked));
    //btn to be resatart
    btnReset.addEventListener('click', gameRestart);
    //uptating the messages to show the player
    updateEL.textContent= `'${statusTex}'  Strat the game`;
    //game ongoing TRUE
    gameRunning = true;
}

init();

//slecting the each data set as value

function boxClicked() {
    //slecting the each datasets
    const index = this.dataset.value;
    
    //using the if chechicking the game is running or Not
    if(positions[index]!= '' || !gameRunning){
        return;
    }

    updateDom(this,index);
    chekkingTheWinner()
}

//updating the box to be clicked by the player

function updateDom(boxs,index) {
    
    positions[index] = statusTex;
    boxs.innerHTML = currentPlayer;
    
}

//creating the function for the winner posobilitys
function chekkingTheWinner() {

    let xoWon = false; //setting the defult winning to false

    for(let i=0;i<winningPosibility.length;i++){  //using the loop menthod
        const condition = winningPosibility[i]; //Ex = [0,1,2]
        const box1 = positions[condition[0]];
        const box2 = positions[condition[1]];
        const box3 = positions[condition[2]];
        console.log(condition);
        //using the if value to the posibility are matching or not
        if(box1 == '' || box2 == '' || box3 == ''){
            continue;
        }
        if(box1==box2 && box2==box3){
            xoWon = true;
        }
    }

    //updating the player the current senorieo
    if(xoWon) {
        updateEL.textContent = `${statusTex} WON..`;
        gameRunning = false;
    }else if(!positions.includes('')) {
        updateEL.textContent = `GAME DRAW..!`
        gameRunning = false;
    }else {
        changePlayer(); // 
    }
}


function changePlayer() {
    statusTex = (statusTex == 'X') ? '0' : 'X';
    currentPlayer = (currentPlayer == x) ? o : x;
    updateEL.textContent = `${statusTex} YOUR TURN..`
}


function gameRestart(){
    positions = ['','','','','','','','','',];
    currentPlayer = x;
    statusTex = 'X'
    gameRunning = true;
    updateEL.textContent= `'${statusTex}'  Strat the game`;

    boxsEL.forEach(boxs=>{
        boxs.innerHTML = '';
    });
}
