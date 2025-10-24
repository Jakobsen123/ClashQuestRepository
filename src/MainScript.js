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

let Characters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

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
        const Suggestions = document.querySelector('#SugContainer')
        const baseSug = document.querySelector('#baseSug')

        const maxBlur = 20
        let currentblur = 20
        let attempt = 3

        const Keys = Object.keys(cards);
        const RandIt = Math.floor(Math.random() * Keys.length);
        const cardname = Keys[RandIt];
        Card = cards[cardname];
        BlurImg.src = Card.img;

        GuessInput.addEventListener('keyup', () => {
            if (!GuessInput.value) {
                Suggestions.style.display = 'none'
            }
            else if (GuessInput.value) {
                Suggestions.style.display = 'grid'
            }
        })
        Suggestions.addEventListener('input', (evnt) => {
            if (!evnt.key) {
                Suggestions.style.display = 'grid'
            }
            else {
                Suggestions.style.display = 'none'
            }
        })
        GuessInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const gues = GuessInput.value.trim().toLowerCase();
                if (gues === cardname.toLowerCase()) {
                    HintArea.innerText = 'Correct!';
                    Suggestions.style.display = 'none'
                    HintArea.style.color = 'Green';
                    BlurImg.style.filter = 'blur(0px)';
                    setTimeout(() => window.location.reload(), wait);
                } else {
                    Suggestions.style.display = 'none'
                    attempt -= 1;
                    currentblur -= maxBlur / MaxTries;
                    BlurImg.style.filter = `blur(${currentblur}px)`;
                    if (attempt <= 0) {
                        HintArea.style.color = 'Red';
                        Suggestions.style.display = 'none'
                        HintArea.innerText = `You failed! Correct was ${cardname}`;
                        BlurImg.style.filter = 'blur(0px)';
                        setTimeout(() => window.location.reload(), wait);
                    }
                }
                GuessInput.value = '';
                Suggestions.innerHTML = '';
            }

            else if (Characters.includes(event.key.toLowerCase())) {
                const searchFor = GuessInput.value.trim().toLowerCase();
                const matchKeys = Object.keys(cards).filter(key => key.toLowerCase().startsWith(searchFor));

                Suggestions.innerHTML = '';

                matchKeys.forEach(match => {
                    const newsug = baseSug.cloneNode(true);
                    newsug.style.display = 'flex';
                    const SugImg = newsug.querySelector('#SugImg');
                    const SugTitle = newsug.querySelector('#SugTitle');
                    SugImg.src = cards[match].img;
                    SugTitle.innerText = match;
                    newsug.addEventListener('click', () => {
                        GuessInput.value = match
                        Suggestions.style.display = 'none'
                    })

                    Suggestions.appendChild(newsug);
                });
            }
        });

        HintBtn.addEventListener('click', () => {
            HintArea.innerText = `HINT: ${Card.hint}`;
        });

    } else if (window.location.pathname.endsWith('index.html')) {
        const gameDesc = document.querySelector('#gameDescription')
        const HoverButton = document.getElementsByClassName('HoverButton')
        for (let btn of HoverButton) {
            btn.addEventListener('mouseenter', () => {
                const h3 = btn.getElementsByTagName('h3')[0]
                gameDesc.innerText = `Guess the card by: ${h3.innerText.toLowerCase()}`
            });
            btn.addEventListener('mouseleave', () => {
                gameDesc.innerText = ''
            });
        }
    }
    else if (window.location.pathname.endsWith('EmojiGameSite.html')) {
        const Keys = Object.keys(cards);
        const RandIt = Math.floor(Math.random() * Keys.length);
        const cardname = Keys[RandIt]
        const card = cards[cardname]
        const Emojis = card.emojis

        console.log(`card: ${card}, emoji: ${emojis}`)
    }
});
