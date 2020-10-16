// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("deck-block");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
let closeicon = document.querySelector(".close");

 // declare modal
let modal = document.getElementById("popup-win");

 // array for opened cards
var openedCards = [];

var firstOverlay = document.getElementById("popup-name");

var countWin = 0;


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function username(){
    var pname = document.getElementById("pname").value;
    if (pname == ""){
        alert("Name must be filled out");
        return false;
    } else {
        document.getElementById("player-name").innerHTML = pname;
        firstOverlay.classList.remove('visible');
    }
}


// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


// @description function to start a new play 
function startGame(){
    console.log(countWin);
    if(countWin==3){
        countWin == 0;
    }
    console.log("after cleanup " + countWin);
    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0  secs";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    //this.classList.toggle("show");
    //this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    this.classList.add("disabled");
    openedCards.push(this);
    var len = openedCards.length;
    console.log("after the push: " + len)
    if(len < 2){
        console.log("Less than 2")
    }
    else if(len === 2){
        moveCounter();
        if(openedCards[0].dataset.peak === openedCards[1].dataset.peak){
            console.log(openedCards[0].dataset.peak)
            console.log(openedCards[1].dataset.peak)
            matched();
        } else {
            console.log(openedCards[0].dataset.peak)
            console.log(openedCards[0].classList)
            console.log(openedCards[1].dataset.peak)
            console.log(openedCards[1].classList)
            unmatched();
        }
    }
    else {
        console.log("It already contains 2 items")
        return;
    }
};


// @description when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    //openedCards[0].classList.remove("open");
    //openedCards[1].classList.remove("open");
    openedCards = [];
}


// description when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    console.log(openedCards[0].classList)
    console.log(openedCards[1].classList)
    setTimeout(function(){
        openedCards[0].classList.remove("open");
        openedCards[1].classList.remove("open");
        console.log(openedCards[0].classList);
        console.log(openedCards[1].classList);
        enable();
        console.log(openedCards[0].classList);
        console.log(openedCards[1].classList);
        openedCards = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
        card.addEventListener("click", lostGame);
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function lostGame(){
    console.log("lostGame checker")
    if(countWin == 0){
        setTimeout( function(){
            if(matchedCard.length !== 16){
                prompt("60 seconds passed");
                console.log("60 seconds passed");
                startGame();
            } else {
                return
            }
        }, 60000);
    } else if(countWin == 1){
        setTimeout( function(){
            if(matchedCard.length !== 16){
                prompt("50 seconds passed");
            } else {
                return
            }
        }, 50000);
    } else {
        setTimeout( function(){
            if(matchedCard.length !== 16){
                prompt("45 seconds passed");
            } else {
                return
            }
        }, 45000);
    }
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        countWin++
        //clearTimeout(lostGame);
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("gamer").innerHTML = document.getElementById("pname").value;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    //clearTimeout(lostGame);
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};

