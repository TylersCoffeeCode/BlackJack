
const cardSuites = ["Diamonds", "Spades", "Hearts", "Clubs"]
const cardValues = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "Jack", "Queen", "King", "Joker"]
const player = "";
const dealer = "";
const houseMoney = 0;
const playerMoney = 0;
const wager = 0;

class Player {
    constructor(name) {
        this.name = name
        this.cash = 0
        this.winAmount = 0
    }
    wager(cash) {

    }
}

class Dealer {
    constructor() {
        this.cash = 0
        this.winAmount = 0
        this.dealerDeck = []
    }
    deal() {
    }

    createDeck() {
        
        for(let i = 0; i < cardSuites.length; i++) { //for every suite add a card value
            for(let j = 0; j < cardValues.length; j++) {//make an array with suite and value 
                    let card = {Suits: cardSuites[i],Values: cardValues[j]}
                    this.dealerDeck.push(card)
            }
        }
    }

    shuffleDeck() {
    this.dealerDeck.sort(() => Math.random() - 0.5) //math.random returns a random number compared to -.5 (i.e 50%) to place order
    
    }
}

const askName = () => {
    let = playerName = prompt("What's your name?")
    return playerName
}

// askName()

// console.log(playerName);

const cardDealer = new Dealer("Dealer")


cardDealer.createDeck()

cardDealer.shuffleDeck()

// console.log(arr);



