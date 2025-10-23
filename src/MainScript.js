let cards = {}
const rarities = [
    'common',
    'rare',
    'epic',
    'legendary',
    'champion'
]

const MaxTries = 3

const wait = 2000



const imgs = 'src/img/cards'

const MainImg = document.querySelector('#MainImg')






document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.endsWith('GameSite.html')) {

        const response = await fetch('./src/cards.json')
        cards = await response.json()
        let Card = null
        const BlurImg = document.querySelector('#BlurImg');
        const GuessInput = document.querySelector('#GuessInput');
        const HintBtn = document.querySelector('#HintBtn');
        const HintArea = document.querySelector('#HintArea');

        const maxBlur = 20
        let currentblur = 20
        let attempt = 3

        const Keys = Object.keys(cards);
        const RandIt = Math.floor(Math.random() * Keys.length);
        const cardname = Keys[RandIt];
        Card = cards[Keys[RandIt]];
        BlurImg.src = Card.img;
        GuessInput.addEventListener('keyup', (event) => {
            if (event.key == 'Enter') {
                const gues = GuessInput.value.toLowerCase()
                if (gues == cardname.toLowerCase()) {
                    console.log('Correct!');
                    HintArea.innerText = 'Correct!'
                    HintArea.style.color = 'Green'
                    BlurImg.style.filter = 'blur(0px)'
                    setTimeout(() => {
                        window.location.reload();
                    }, wait);
                }
                else {
                    console.log('incorrect')
                    BlurImg.style.filter = `blur(${currentblur - maxBlur / MaxTries}px)`
                    attempt -= 1
                    currentblur -= 5
                    if (attempt == 0) {
                        HintArea.style.color = 'Red'
                        HintArea.innerText = `You failed! Correct was ${cardname}`
                        BlurImg.style.filter = 'blur(0px)'
                        setTimeout(() => {
                            window.location.reload()
                        }, wait);
                    }
                }
                GuessInput.value = ''
            }
        })
        HintBtn.addEventListener('click', () => {
            HintArea.innerText = `HINT: ${Card.hint}`
        })
    }
    else if (window.location.pathname.endsWith('index.html')) {
        const gameDesc = document.querySelector('#gameDescription')
        const HoverButton = document.getElementsByClassName('HoverButton')
        for (let btn of HoverButton) {
            btn.addEventListener('mouseenter', () => {
                const h3 = btn.getElementsByTagName('h3')[0]
                gameDesc.innerText = `Clash Quest: ${h3.innerText.toLowerCase()}`
            })
            btn.addEventListener('mouseleave', () => {
                const h3 = btn.getElementsByTagName('h3')[0]
                gameDesc.innerText = ''
            })
        }
    }
})

