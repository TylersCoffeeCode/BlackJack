const houseMoney = 0;
const playerMoney = 0;
const wager = 0;
const dealButton = document.querySelector('.dealBtn')
let isPlaying = true


function checkBust() {
    if (isPlaying = true) {
        let checkArr = 0
        for (let i = 0; i < player1.cardScores.length; i++) {
            checkArr += player1.cardScores[i]
            console.log(checkArr);
            if (checkArr > 21 && player1.hasAce === 0) {
                isPlaying = false
            }
            else if (player1.hasAce > 0 && checkArr > 21) {
                if (player1.hasAce === 1 && checkArr > 32) {
                    isPlaying = false
                } else if (player1.hasAce === 2 && checkArr > 41) {
                    isPlaying = false
                } else if (player1.hasAce === 3 && checkArr > 51) {
                    isPlaying = false
                } else if (player1.hasAce === 4 && checkArr > 61) {
                    isPlaying = false
                }
            }
        }
    }
}

function score(player1) {
    let ace = 0;
    for (let i = 0; i < this.cardScores; i++)
        return this.cardScores[i].reduce((total, current) => {
            if (current.points === 11) ace++;
            while (total + current.points > 21 && ace > 0) {
                total = total - 10;
                ace--;
                console.log(total + current.points);

            }
            return total + current.points;
        }, 0);
}

class Player {
    constructor(name) {
        this.name = name
        this.cash = 0
        this.winAmount = 0
        this.cardHand = []
        this.cardScores = []
        this.hasAce = 0
    }
    wager() {

    }

    addToPlayerHand(deltCard) {
        this.cardHand.push(deltCard)
        this.cardScores.push(deltCard[0].Worth)
        // this.cardHand.pop(deltCard)
    }


}

class Dealer {
    constructor() {
        this.cash = 0
        this.winAmount = 0
        this.dealerDeck = []
    }
    createDeckArray() {
        const cardSuites = ["Diamonds", "Spades", "Hearts", "Clubs"]
        const cardValues = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "Jack", "Queen", "King"]
        const cardWorth = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]

        for (let i = 0; i < cardSuites.length; i++) { //for every suite add a card value
            for (let j = 0; j < cardValues.length; j++) {//make an array with suite and value 
                let card = { Suits: cardSuites[i], Values: cardValues[j], Worth: cardWorth[j] }
                this.dealerDeck.push(card)
            }
        }
    }

    shuffleDeck() {
        this.dealerDeck.sort(() => Math.random() - 0.5) //math.random returns a random number compared to -.5 (i.e 50%) to place order

    }

    deal(player1) {
        const randomizer = [Math.floor(Math.random() * this.dealerDeck.length)]
        const randomCard = this.dealerDeck[randomizer]
        const deltCard = this.dealerDeck.splice(randomizer, 1)
        player1.addToPlayerHand(deltCard)

        console.log(randomCard);
        if (deltCard[0].Values === 'Ace') {
            player1.hasAce++
        }
    }

    dealDealer() {
    
    }




}

const askName = () => {
    let = playerName = prompt("What's your name?")
    return playerName
}
const player1 = new Player("Tyler")
const cardDealer = new Dealer("Dealer")
cardDealer.createDeckArray()
cardDealer.shuffleDeck()

dealButton.addEventListener('click', () => {
    cardDealer.deal(player1)
    checkBust()
    if (isPlaying === false) {
        dealButton.classList.add('gameOff')
    }
    // score(player1)

})



