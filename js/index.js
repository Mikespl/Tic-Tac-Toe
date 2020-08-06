const fieldsElement = document.querySelectorAll('.board__item')
let fields = ['', '', '', '', '', '', '', '', '']
const panel = document.querySelector('.panel')
const button = document.querySelector('button')

let activePlayer = 'X'
panel.innerHTML = `teraz gra ${activePlayer}`
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
const displayWinMesssage = () => {
    panel.innerHTML = `Gratulacje ${activePlayer === 'X' ? activePlayer='O' : activePlayer="X"}, Wygrałeś!`
    panel.classList.add('active')
}
const displayTieMessage = () => {
    panel.innerHTML = `Remis! zagrajcie jeszcze raz`
    panel.classList.add('active')
}
const changePlayer = () => {
    activePlayer = activePlayer === 'X' ? 'O' : 'X';
    panel.innerHTML = `teraz gra ${activePlayer}`

}
const validateGame = () => {
    let gameWon = false;
    for (let i = 0; i < 8; i++) {
        const [posA, posB, posC] = winningConditions[i]
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];
        if (value1 !== '' && value1 === value2 && value2 === value3) {
            gameWon = true
            break;
        }
    }
    if (gameWon) {
        gameActive = false;
        displayWinMesssage()
    } else if (isBoardFull()) {
        gameActive = false
        displayTieMessage()
    }
}

const isBoardFull = () => {
    return fields.find(field => field === '') === undefined
}

fieldsElement.forEach(field => {
    field.addEventListener('click', (e) => {
        const { pos } = e.target.dataset;
        if (gameActive && fields[pos] === '') {
            fields[pos] = activePlayer
            e.target.classList.add(`board__item--filled--${activePlayer}`);
            changePlayer();
            validateGame()

        }
    })

    button.addEventListener('click', () => {
        field.classList.remove('board__item--filled--X',
            'board__item--filled--O')
        fields = ['', '', '', '', '', '', '', '', '']
        activePlayer = 'X'
        panel.innerHTML = `teraz gra ${activePlayer}`
        panel.classList.remove('active')
        gameActive = true
    })
});