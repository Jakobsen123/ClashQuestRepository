{
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
        else if (window.location.pathname.endsWith('EmojiSite.html')) {
            const response = await fetch('./src/cards.json')
            cards = await response.json()
            const Keys = Object.keys(cards);
            const RandIt = Math.floor(Math.random() * Keys.length);
            const cardname = Keys[RandIt]
            const card2 = cards[cardname]
            const Emojis = card2.emojis

            const Suggestions = document.querySelector('#SugContainer')
            const baseSug = document.querySelector('#baseSug')
            const EmojiContainer = document.querySelector('.EmojiContainer')

            const Emoji1 = document.querySelector('#Emoji1')
            const Emoji2 = document.querySelector('#Emoji2')
            const Emoji3 = document.querySelector('#Emoji3')

            const GuessInput2 = document.querySelector('#GuessInput')

            Emoji1.innerText = ''
            Emoji2.innerText = ''
            Emoji3.innerText = ''

            let guess = 2

            const emojisList = [Emoji3, Emoji2, Emoji1]

            const em = Emojis.split(',')

            const hb = document.querySelector('#HintBtn')
            const h = document.querySelector('#hint')

            hb.addEventListener('click', () => {
                h.innerText = cards[cardname].hint
            })


            console.log(cardname)
            Emoji1.innerText = em[0]
            GuessInput2.addEventListener('keyup', (eve) => {
                if (eve.key == 'Enter') {
                    if (GuessInput2.value.toLowerCase() == cardname.toLowerCase()) {
                        console.log('correct')
                        h.style.color = 'Green'
                        h.innerText = 'Correct!'
                        setTimeout(() => {
                            window.location.reload()
                        }, wait);
                    } else {
                        guess -= 1
                        console.log('Incorrect')
                        if (guess >= 0) {
                            emojisList[guess].innerHTML = em[guess]
                        }
                        else {
                            h.innerText = `Incorrect, card was ${cardname}`
                            h.style.color = 'Red'
                        }
                    }
                }
                else if (Characters.includes(eve.key.toLowerCase())) {
                    const searchFor = GuessInput2.value.trim().toLowerCase();
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
                            GuessInput2.value = match
                            Suggestions.style.display = 'none'
                        })

                        Suggestions.appendChild(newsug);
                    });
                }
            })
        }
    });
}