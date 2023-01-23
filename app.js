const houseMoney = 0;
const playerMoney = 0;
const wager = 0;
const dealButton = document.querySelector('.dealBtn')
let isPlaying = true
let checkArr = 0
let dealerCheckArr = 0


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
                    checkArr -= 10
                    console.log(checkArr);
                } else if (player1.hasAce === 2 && checkArr > 41) {
                    isPlaying = false
                    checkArr -= 20
                    console.log(checkArr);
                } else if (player1.hasAce === 3 && checkArr > 51) {
                    isPlaying = false
                    checkArr -= 30
                    console.log(checkArr);
                } else if (player1.hasAce === 4 && checkArr > 61) {
                    isPlaying = false
                    checkArr -= 40
                    console.log(checkArr);
                }
            }
        }
    }
}

function checkDealerBust() {
    if (isPlaying = true) {
        let dealerCheckArr = 0
        for (let i = 0; i < cardDealer.dealerCardScores.length; i++) {
            dealerCheckArr += cardDealer.dealerCardScores[i]
            console.log(dealerCheckArr);
            if (dealerCheckArr > 21 && cardDealer.hasAce === 0) {
                isPlaying = false
            }
            else if (cardDealer.hasAce > 0 && checkArr > 21) {
                if (cardDealer.hasAce === 1 && checkArr > 32) {
                    isPlaying = false
                    dealerCheckArr -= 10
                    console.log(dealerCheckArr);
                } else if (cardDealer.hasAce === 2 && checkArr > 41) {
                    isPlaying = false
                    dealerCheckArr -= 20
                    console.log(dealerCheckArr);
                } else if (cardDealer.hasAce === 3 && checkArr > 51) {
                    isPlaying = false
                    dealerCheckArr -= 30
                    console.log(dealerCheckArr);
                } else if (cardDealer.hasAce === 4 && checkArr > 61) {
                    isPlaying = false
                    dealerCheckArr -= 40
                    console.log(dealerCheckArr);
                }
            }
        }
    }
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

    stay() {
        
    }

}

class Dealer {
    constructor() {
        this.cash = 0
        this.winAmount = 0
        this.dealerDeck = []
        this.hasAce = 0
        this.dealerHand = []
        this.dealerCardScores = []
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
        const randomizerForDealer = [Math.floor(Math.random() * this.dealerDeck.length)]
        const randomCardForDealer = this.dealerDeck[randomizerForDealer]
        const deltCardForDealer = this.dealerDeck.splice(randomizerForDealer, 1)
        cardDealer.addToDealerHand(deltCardForDealer)
        console.log(randomCardForDealer);
        if (deltCardForDealer[0].Values === 'Ace') {
            this.hasAce++
        }
    }

    dealDealerHidden() {
        const randomizerForDealer = [Math.floor(Math.random() * this.dealerDeck.length)]
        const randomCardForDealer = this.dealerDeck[randomizerForDealer]
        const deltCardForDealer = this.dealerDeck.splice(randomizerForDealer, 1)
        cardDealer.addToDealerHand(deltCardForDealer)
        console.log(randomCardForDealer);
        if (deltCardForDealer[0].Values === 'Ace') {
            this.hasAce++
        }
    }



    addToDealerHand(deltCardForDealer) {
        this.dealerHand.push(deltCardForDealer)
        this.dealerCardScores.push(deltCardForDealer[0].Worth)
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
cardDealer.dealDealer()
cardDealer.dealDealerHidden()
checkDealerBust()


dealButton.addEventListener('click', () => {
    cardDealer.deal(player1)
    checkBust()
    checkDealerBust()
    if (isPlaying === false) {
        dealButton.classList.add('gameOff')
    }


})



