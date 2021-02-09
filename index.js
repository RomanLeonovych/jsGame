const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

const colors = ['red', 'blue', 'green', 'black', 'yellow', 'brown', 'pink']

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleGameBoxClick)
$gameTime.addEventListener('input', setGameTime)


function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    hide($start)
    isGameStarted = true
    $game.style.backgroundColor = '#fff'

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function handleGameBoxClick(event) {

    if (isGameStarted) {
        if (event.target.dataset.box) {
            score++
            renderBox()
        }
    } else {
        return
    }

}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    hide($timeHeader)
    show($resultHeader)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
}

function renderBox() {
    $game.innerHTML = ''
    let color = colors[getRandom(0, colors.length)]

    const box = document.createElement('div')
    const boxSize = getRandom(30, 100)
    const gameSize = $game.getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize


    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = color
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}
