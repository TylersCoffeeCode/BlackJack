//***************GLOBAL***********************//
const houseMoney = 0;
const playerMoney = 0;
let wager = 50;
const dealButton = document.querySelector('.dealBtn')
const stayButton = document.querySelector('.stayBtn')
const resetButton = document.querySelector('.resetBtn')
const dealerTable = document.querySelector('.card-list')
const createCardDiv = document.createElement('div')
const createCardNumberDiv = document.createElement('div')
const playerCardArea = document.querySelector('.playerCards')
const hiddenDiv = document.createElement('div')
createCardDiv.classList.add('card')
hiddenDiv.classList.add('card')
hiddenDiv.classList.add('hidden')
const cardSelecterPlayer = document.querySelector('.playerCards')
const cardSelecterDealer = document.querySelector('.card-list')
const wagerUpBtn = document.querySelector('.up')
const wagerDownBtn = document.querySelector('.down')
const grabBanner = document.querySelector('.dealer p')
const yourMoney = document.querySelector('.cash')
const wagerText = document.querySelector('.wager')
let counter = document.querySelector('.counter')
let cardSound = new Audio('cardFlip.mp3')
cardSound.volume = 0.5
let dealerCardSound = new Audio('cardDealFlip.mp3')
dealerCardSound.volume = 0.5
let cardResetSound = new Audio('cardReset.mp3')
cardResetSound.volume = 0.3
let isPlaying = true
let isDealing = true
let isOver21 = false
let checkArr = 0
let dealerCheckArr = 0
let pScore = document.querySelector('.pScore')
let dScore = document.querySelector('.dScore')
//***************FUNCTIONS***********************//

function reset() {
    removePlayerElements()
    removeDealerElements()
    isOver21 = false
    isPlaying = true
    player1.cardHand = []
    player1.hasAce = 0
    player1.compareAmt = 0
    cardDealer.compareDealerAmt = 0
    cardDealer.dealerDeck = []
    cardDealer.hasAce = 0
    cardDealer.dealerHand = []
    cardDealer.compareDealerAmt = 0
    dealButton.classList.remove('gameOff')
    stayButton.classList.remove('gameOff')
    grabBanner.innerText = "Hit or Hold"
    hiddenDiv.classList.add('hidden')
    cardResetSound.play()
    wagerText.innerText = `Wager: ${wager = 50}`
    wagerDownBtn.classList.remove('gameOff')
    wagerUpBtn.classList.remove('gameOff')
    startGame()

}
function removePlayerElements() {
    for (let i = 0; i < cardSelecterPlayer.children.length; i++) {
        while (cardSelecterPlayer.children.length > 0) {
            cardSelecterPlayer.children[i].remove()
        }
    }
}
function removeDealerElements() {
    for (let i = 0; i < cardSelecterDealer.children.length; i++) {
        while (cardSelecterDealer.children.length > 0) {
            cardSelecterDealer.children[i].remove()
        }
    }
}
function checkWinner() {
    if (isOver21 === true) {
        console.log('Dealer WON');
        grabBanner.innerText = "Dealer Won"
        cardDealer.winAmount++
        counter.innerText = `Win: ${player1.winAmount} \n Loss: ${cardDealer.winAmount}`
        yourMoney.innerHTML = `Your Money: ${player1.cash -= wager}`
    } else if (isDealing === true && player1.compareAmt > cardDealer.compareDealerAmt) {
        console.log('Player WON');
        player1.winAmount++
        grabBanner.innerText = "Player Won"
        counter.innerText = `Win: ${player1.winAmount} \n Loss: ${cardDealer.winAmount}`
        yourMoney.innerHTML = `Your Money: ${player1.cash += (wager * 1.5)}`
    } else if (cardDealer.compareDealerAmt <= 21 && player1.compareAmt < cardDealer.compareDealerAmt) {
        console.log('Dealer WIN by cards');
        grabBanner.innerText = "Dealer Won"
        cardDealer.winAmount++
        counter.innerText = `Win: ${player1.winAmount} \n Loss: ${cardDealer.winAmount}`
        yourMoney.innerHTML = `Your Money: ${player1.cash -= wager}`
    } else if (cardDealer.compareDealerAmt > 21 && isOver21 === false) {
        console.log('player wins by dealer busting');
        grabBanner.innerText = "Player Won"
        player1.winAmount++
        counter.innerText = `Win: ${player1.winAmount} \n Loss: ${cardDealer.winAmount}`
        yourMoney.innerHTML = `Your Money: ${player1.cash += (wager * 1.5)}`
    } else if (cardDealer.compareDealerAmt === player1.compareAmt) {
        console.log('its a draw');
        grabBanner.innerText = "DRAW"
    }
}
function checkBustV2() {
    if (player1.compareAmt > 21) {
        console.log(console.log('game over'));
        console.log(player1.compareAmt);
        isPlaying = false
        isOver21 = true
    }
}
function checkDealerBustV2() {
    if (cardDealer.compareDealerAmt > 21) {
        isDealing = false
        console.log(cardDealer.compareDealerAmt);
    }
}
function increaseWager() {
    if (wager >= player1.cash) {
        wagerUpBtn.setAttribute("disabled", "disabled");
    } else wager += 50
    wagerText.innerText = `Wager: ${wager}`
    wagerDownBtn.removeAttribute("disabled", "disabled")

}
function decreaseWager() {
    if (wager <= 50) {
        wagerDownBtn.setAttribute("disabled", "disabled");
    } else wager -= 50
    wagerText.innerText = `Wager: ${wager}`
    wagerUpBtn.removeAttribute("disabled", "disabled")
}

//***************Player Class***********************//


class Player {
    constructor(name) {
        this.name = name
        this.cash = 1000
        this.cashText = yourMoney.innerHTML = `Your Money: ${this.cash}`
        this.winAmount = 0
        this.cardHand = []
        // this.cardScores = []
        this.hasAce = 0
        this.compareAmt = 0
    }
    wager() {
        if (isPlaying) {
            this.winAmount += wager
        }
    }
    addToPlayerHand(deltCard) {
        this.cardHand.push(deltCard)
        // this.cardScores.push(deltCard[0].Worth)
        // this.cardHand.pop(deltCard)
    }

}

//***************Dealer Class***********************//


class Dealer {
    constructor() {
        this.cash = 0
        this.winAmount = 0
        this.dealerDeck = []
        this.hasAce = 0
        this.dealerHand = []
        // this.dealerCardScores = []
        this.compareDealerAmt = 0
    }
    createDeckArray() {
        const cardSuites = ["Diamonds", "Spades", "Hearts", "Clubs"]
        const cardValues = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
        const cardWorth = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
        for (let i = 0; i < cardSuites.length; i++) { //for every suite add a card value
            for (let j = 0; j < cardValues.length; j++) {//make an array with suite and value 
                let card = { Suits: cardSuites[i], Values: cardValues[j], Worth: cardWorth[j] }
                this.dealerDeck.push(card)
            }
        }
    }
    shuffleDeck() {
        this.dealerDeck.sort(() => Math.random() - 0.5)
        console.log('HERE');
        //math.random returns a random number compared to -.5 (i.e 50%) to place order
    }
    deal(player1) {
        const randomizer = [Math.floor(Math.random() * this.dealerDeck.length)]
        const randomCard = this.dealerDeck[randomizer]
        const deltCard = this.dealerDeck.splice(randomizer, 1)
        player1.addToPlayerHand(deltCard)
        // console.log(randomCard);
        player1.compareAmt += deltCard[0].Worth
        if (deltCard[0].Values === 'Ace') {
            player1.hasAce++
        }
        if (deltCard[0].Worth === 'Ace') {
            if (player1.compareAmt >= 11) {
                player1.compareAmt += 1
            } else {
                player1.compareAmt += 11
            }
        }
        if (player1.hasAce > 0 && player1.compareAmt > 21) {
            let sub = player1.hasAce * 10;
            player1.compareAmt -= sub
            player1.hasAce -= player1.hasAce;
        }
        for (let card of deltCard) {
            card = document.createElement('div')
            playerCardArea.appendChild(card)
            card.classList.add('card')
            card.innerText = `${deltCard[0].Values} of ${deltCard[0].Suits}`
        }
    }
    dealDealer() {
        const randomizerForDealer = [Math.floor(Math.random() * this.dealerDeck.length)]
        const randomCardForDealer = this.dealerDeck[randomizerForDealer]
        const deltCardForDealer = this.dealerDeck.splice(randomizerForDealer, 1)
        cardDealer.addToDealerHand(deltCardForDealer)
        this.compareDealerAmt += deltCardForDealer[0].Worth
        if (deltCardForDealer[0].Worth == 11) {
            console.log('HELLO');
            this.hasAce++
        }
        if (deltCardForDealer[0].Values === 'Ace') {
            if (this.compareDealerAmt >= 11) {
                deltCardForDealer[0].Worth = 1
            } else {
                this.compareDealerAmt += 11
                console.log('under eleven');
            }
        }
        if (this.hasAce > 0 && this.compareDealerAmt > 21) {
            let sub = this.hasAce * 10;
            this.compareDealerAmt -= sub
            this.hasAce -= this.hasAce
            console.log('Ace subbed');
        }
        for (let dealerCard of deltCardForDealer) {
            dealerCard = document.createElement('div')
            dealerTable.appendChild(dealerCard)
            dealerCard.classList.add('card')
            dealerCard.innerText = `${deltCardForDealer[0].Values} of ${deltCardForDealer[0].Suits}`
        }
    }
    dealDealerHidden() {
        const randomizerForDealer = [Math.floor(Math.random() * this.dealerDeck.length)]
        const randomCardForDealer = this.dealerDeck[randomizerForDealer]
        const deltCardForDealer = this.dealerDeck.splice(randomizerForDealer, 1)
        cardDealer.addToDealerHand(deltCardForDealer)
        console.log(randomCardForDealer);
        this.compareDealerAmt += deltCardForDealer[0].Worth
        if (deltCardForDealer[0].Values === 'Ace') {
            this.hasAce++
        }
        dealerTable.appendChild(hiddenDiv)
        hiddenDiv.innerText = `${deltCardForDealer[0].Values} of ${deltCardForDealer[0].Suits}`
    }
    addToDealerHand(deltCardForDealer) {
        this.dealerHand.push(deltCardForDealer)
        // this.dealerCardScores.push(deltCardForDealer[0].Worth)
    }
}

//***************Constructing Classes***********************//

const player1 = new Player("Tyler")
const cardDealer = new Dealer("Dealer")

//***************START GAME***********************//
function startGame() {
    cardDealer.createDeckArray()
    cardDealer.shuffleDeck()
    cardDealer.dealDealer()
    cardDealer.dealDealerHidden()
    cardDealer.deal(player1)
}
startGame()


//***************Event Listeners***********************//

dealButton.addEventListener('click', () => {
    cardDealer.deal(player1)
    checkDealerBustV2()
    checkBustV2()
    cardSound.play()
    wagerDownBtn.classList.add('gameOff')
    wagerUpBtn.classList.add('gameOff')
    pScore.innerText = `Player's Hand: ${player1.compareAmt}`
    if (isPlaying === false) {
        dealButton.classList.add('gameOff')
        stayButton.classList.add('gameOff')
        hiddenDiv.classList.remove('hidden')
        checkWinner()
    }
}
)
stayButton.addEventListener('click', () => {
    isPlaying = false
    hiddenDiv.classList.remove('hidden')
    dealButton.classList.add('gameOff')
    stayButton.classList.add('gameOff')
    while (cardDealer.compareDealerAmt < 17) {
        cardDealer.dealDealer()
    }
    dealerCardSound.play()
    checkDealerBustV2
    checkWinner()
})
resetButton.addEventListener('click', () => {
    reset()

})