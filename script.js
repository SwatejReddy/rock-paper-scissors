const rockTile = document.querySelector(".rock-tile");
const paperTile = document.querySelector(".paper-tile");
const scissorsTile = document.querySelector(".scissors-tile");
const statusText = document.querySelector(".status-text");
const resetButton = document.querySelector(".reset-button")
const computerScoreElement = document.querySelector(".computer-score");
const playerScoreElement = document.querySelector(".player-score");
const overlayDiv = document.querySelector(".overlay-div");
const popupText = document.querySelector(".popup-text");


let playerChoice;
let computerChoice;

let computerScore = 0;
let playerScore = 0;

let flag = 1;


const options = [rockTile, paperTile, scissorsTile];

function generateBid(){
    const randomChoice = Math.floor(Math.random()*3);
    const generatedBid = options[randomChoice];
    return generatedBid;
}

let remainingRounds;

function startRotation(rock, paper, scissors, selectedElement, playerChoice){
    //disable all the rock, paper and scissors options from clicking.
    disableClickableElements();
    //change the status text!
    statusText.innerText = "Game on!"

    //start the animations.
    if(selectedElement === rockTile){
        setTimeout(() => {
            rock.style.animation = "rotateRock 1s linear infinite";
            scissors.style.animation = "rotateScissorsAntiClock 0.7s linear infinite";
            paper.style.animation = "rotatePaperClock 0.5s linear infinite";
        }, 300);
    }
    else if(selectedElement === paperTile){
        setTimeout(() => {
            paper.style.animation = "rotatePaperClock 1s linear infinite";
            scissors.style.animation = "rotateScissorsAntiClock 0.7s linear infinite";
            rock.style.animation = "rotateRock 0.5s linear infinite";
        }, 300);
    }
    else if(selectedElement === scissorsTile){
        setTimeout(() => {
            scissors.style.animation = "rotateScissorsClock 1s linear infinite";
            paper.style.animation = "rotatePaperAntiClock 0.7s linear infinite";
            rock.style.animation = "rotateRock 0.5s linear infinite";
        }, 300);
    }

    //Stop the rotation.
    setTimeout(() => 
    stopRotation(rock, paper, scissors), 2000);

    //Reset the blocks to their initial position.
    setTimeout(() => {
        resetBlocks(rock, paper, scissors);
    }, 2001);

    const bid = generateBid();
    computerChoice = bid;
    setTimeout(() => {

        //bring the z-index of the bid choice to top.
        bid.style.zIndex = 999;
        
        //evaluate the score.
        evaluateScore(computerChoice, playerChoice);


        //flag is true if the event has not been stopped yet.
        if(flag){
            //scale the bid element to 1.2x.
            bid.style.transform = "rotate(0deg) scale(1.2) translate(0%, 0%)";
            setTimeout(() => {
                //bring z-index of the bid to normal.
                bid.style.zIndex = 99
                //scale the bid element to 1x.
                bid.style.transform = "rotate(0deg) scale(1) translate(0%, 0%)"; 
                if(computerScore == 3){
                    statusText.innerText = "Oh! looks like computer had better luck this time :(";
                }
                else if(playerScore == 3){
                    statusText.innerText = "Congratulations! you won!";
                }
                // else{
                //     enableClickableElements();
                // }
            }, 1500);
        }

        //wait till the selected bid popup is over to enable click for user again.
        if(computerScore < 3 && playerScore < 3){
            setTimeout(() => {
                enableClickableElements();
            }, 1510);
        }
        
    }, 2010);
}

function stopRotation(rock, paper, scissors){
    rock.style.animation = "";
    paper.style.animation = "";
    scissors.style.animation = "";
}

function resetBlocks(rock, paper, scissors){
    rock.style.transform = "rotate(0deg) scale(1) translate(0%, 0%)";
    paper.style.transform = "rotate(0deg) scale(1) translate(0%, 0%)";
    scissors.style.transform = "rotate(0deg) scale(1) translate(0%, 0%)";
}

function evaluateScore(computerChoice, playerChoice){
    if(flag == 1){
        
        //store compscore and playerscore before updating it.
        let prevCompScore = computerScore;
        let prevPlayerScore = playerScore;

        if(computerChoice === playerChoice){
            // Show a tie message.
        }
        if(playerChoice === rockTile){
            if(computerChoice === paperTile){
                computerScore += 1;
            }
            else if(computerChoice === scissorsTile){
                playerScore += 1;
            }
        }
        else if(playerChoice === paperTile){
            if(computerChoice === scissorsTile){
                computerScore += 1;
            }
            else if(computerChoice === rockTile){
                playerScore += 1;
            }
        }
        else if(playerChoice === scissorsTile){
            if(computerChoice === rockTile){
                computerScore += 1;
            }
            else if(computerChoice === paperTile){
                playerScore += 1;
            }
        }

        if(computerScore == 2){
            disableClickableElements();
        }
        if(playerScore == 2){
            disableClickableElements();
        }
        //check if computerscore or playerscore has increased from the before round and then throw a +1 popup for whichever is increased.
        if(computerScore > prevCompScore){
            popupText.innerText = "+1 Computer";
            popupText.style.animation = "popup 1.5s linear";
            //reset animation and text after the animation ends.
            popupText.addEventListener("animationend", function(){
                popupText.style.animation = "";
                popupText.innerText = "";
            })
        }
        else if(playerScore > prevPlayerScore){
            popupText.innerText = "+1 Player";;
            popupText.style.animation = "popup 1.5s linear";
            //reset animation and text after the animation ends.
            popupText.addEventListener("animationend", function(){
                popupText.style.animation = "";
                popupText.innerText = "";
            })
        }
        else{
            popupText.innerText = "It's a tie!";;
            popupText.style.animation = "popup 1.5s linear";
            //reset animation and text after the animation ends.
            popupText.addEventListener("animationend", function(){
                popupText.style.animation = "";
                popupText.innerText = "";
            })
        }
        computerScoreElement.innerText = computerScore;
        playerScoreElement.innerText = playerScore;
    }
    
}
//     if()
// }

rockTile.addEventListener("click", function() {
    //record the playerChoice.
    playerChoice = rockTile;
    //clicked block will scale and translate to the center and come to the top of the stack. 
    rockTile.style.zIndex = "99"
    rockTile.style.transform = "scale(1.2) translate(85%, 0%)"

    //the other side block(s) will rotate and also come to the center.
    paperTile.style.transform = "rotate(-25deg) scale(1.2) translate(0%, 0%)"
    scissorsTile.style.transform = "rotate(30deg) scale(1.2) translate(-70%, 40%)";

    let selectedElement = rockTile;
    startRotation(rockTile, paperTile, scissorsTile, selectedElement, playerChoice);
})
paperTile.addEventListener("click", function() {
    //record the playerChoice.
    playerChoice = paperTile;

    //clicked block will scale and translate to the center and come to the top of the stack. 
    paperTile.style.zIndex = "99"
    paperTile.style.transform = "scale(1.2) translate(0%, 0%)"

    //the other side block(s) will rotate and also come to the center.
    rockTile.style.transform = "rotate(20deg) scale(1.2) translate(85%, -30%)";
    scissorsTile.style.transform = "rotate(30deg) scale(1.2) translate(-70%, 40%)";

    let selectedElement = paperTile;
    startRotation(rockTile, paperTile, scissorsTile, selectedElement, playerChoice);
})
scissorsTile.addEventListener("click", function() {
    //record the playerChoice.
    playerChoice = scissorsTile;

    //clicked block will scale and translate to the center and come to the top of the stack. 
    scissorsTile.style.zIndex = "99";
    scissorsTile.style.transform = "scale(1.2) translate(-85%, 0%)";

    //the other side block(s) will rotate and also come to the center.
    paperTile.style.transform = "rotate(-25deg) scale(1.2) translate(0%, 0%)";
    rockTile.style.transform = "rotate(20deg) scale(1.2) translate(85%, -30%)";

    let selectedElement = scissorsTile;
    startRotation(rockTile, paperTile, scissorsTile, selectedElement, playerChoice);
})

resetButton.addEventListener("click", function(){
    //flag --> false, takes back access to everything that was meant to happen after that adn stops everything.
    //flag becomes 0 when the match is over.
    flag = 0;
    //stop the animation and bring the animation to the start position.
    stopRotation(rockTile, paperTile, scissorsTile);
    resetBlocks(rockTile, paperTile, scissorsTile);
    //Reset computer score to 0.
    computerScore = 0;
    computerScoreElement.innerText = "0";
    //Reset player score to 0.
    playerScore = 0;
    playerScoreElement.innerText = "0";
    //Reset the status text.
    statusText.innerText = "Start playing! Make the first choice!"
    //Reset the popupText.
    popupText.style.animation = "";
    popupText.innerText = "";
    //make flag --> true so that the next cycle of things that we stopped can start and continue till the next match ends.
    // flag = 1;
    setTimeout(() => {
        flag = 1;
    }, 1510);
    enableClickableElements();
})


function disableClickableElements(){
    overlayDiv.style.zIndex = "9999";
}

function enableClickableElements(){
    overlayDiv.style.zIndex = "-1";
}
