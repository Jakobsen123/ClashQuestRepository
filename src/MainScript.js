const rarities = [
    'common',
    'rare',
    'epic',
    'legendary',
    'champion'
]

const MaxTries = 3

const imgs = 'src/img/cards'

const MainImg = document.querySelector('#MainImg')

const cards = {
    'Knight': { rarity: rarities[0], hint: 'A brave melee fighter with decent hp', img: `${imgs}/knight.png` },
    'Goblins': { rarity: rarities[0], hint: 'Three to four fast creatures armed with daggers.', img: `${imgs}/goblins.png` },
    'Archers': { rarity: rarities[0], hint: 'Two ranged attackers that shoot from a distance.', img: `${imgs}/archers.png` },
    'Skeletons': { rarity: rarities[0], hint: 'Three low-cost, fragile fighters.', img: `${imgs}/skeletons.png` },
    'Fireball': { rarity: rarities[1], hint: 'A powerful spell that deals area damage.', img: `${imgs}/fireball.png` },
    'Arrows': { rarity: rarities[1], hint: 'A cheap spell that clears swarms of troops.', img: `${imgs}/arrows.png` },
    'Zap': { rarity: rarities[1], hint: 'A quick spell that stuns and damages.', img: `${imgs}/zap.png` },
    'Valkyrie': { rarity: rarities[2], hint: 'A melee fighter with a spinning attack that hits all nearby enemies.', img: `${imgs}/valkyrie.png` },
    'Mini P.E.K.K.A': { rarity: rarities[2], hint: 'A smaller but fast version of P.E.K.K.A that deals heavy single-target damage.', img: `${imgs}/mini-pekka.png` },
    'Mega Minion': { rarity: rarities[2], hint: 'A flying unit that deals moderate damage.', img: `${imgs}/mega-minion.png` },
    'Musketeer': { rarity: rarities[2], hint: 'A long-range shooter that targets both air and ground units.', img: `${imgs}/musketeer.png` },
    'PEKKA': { rarity: rarities[3], hint: 'A heavily armored melee unit with high damage.', img: `${imgs}/pekka.png` },
    'Giant': { rarity: rarities[3], hint: 'A tanky unit that targets buildings.', img: `${imgs}/giant.png` },
    'Balloon': { rarity: rarities[3], hint: 'A flying unit that targets buildings and drops bombs.', img: `${imgs}/balloon.png` },
    'Wizard': { rarity: rarities[3], hint: 'A ranged unit that deals area splash damage.', img: `${imgs}/wizard.png` },
    'Princess': { rarity: rarities[4], hint: 'A long-range archer that can attack from afar.', img: `${imgs}/princess.png` },
    'Ice Wizard': { rarity: rarities[4], hint: 'Slows down enemies while dealing moderate area damage.', img: `${imgs}/ice-wizard.png` },
    'Miner': { rarity: rarities[4], hint: 'A unit that can be deployed anywhere in the arena.', img: `${imgs}/miner.png` },
    'Electro Wizard': { rarity: rarities[4], hint: 'Deals damage and stuns two targets on spawn and attack.', img: `${imgs}/electro-wizard.png` },
    'Baby Dragon': { rarity: rarities[0], hint: 'A flying unit that deals area damage.', img: `${imgs}/baby-dragon.png` },
    'Bomber': { rarity: rarities[0], hint: 'Throws bombs that deal area damage.', img: `${imgs}/bomber.png` },
    'Cannon': { rarity: rarities[0], hint: 'A defensive building that targets ground units.', img: `${imgs}/cannon.png` },
    'Tesla': { rarity: rarities[0], hint: 'A defensive building that targets both air and ground units.', img: `${imgs}/tesla.png` },
    'Tornado': { rarity: rarities[1], hint: 'A spell that pulls units into its center.', img: `${imgs}/tornado.png` },
    'Freeze': { rarity: rarities[1], hint: 'A spell that freezes enemy units and buildings.', img: `${imgs}/freeze.png` },
    'Rocket': { rarity: rarities[1], hint: 'A high-damage spell that targets a small area.', img: `${imgs}/rocket.png` },
    'Giant Snowball': { rarity: rarities[1], hint: 'A spell that deals damage and knocks back units.', img: `${imgs}/giant-snowball.png` },
    'Hunter': { rarity: rarities[2], hint: 'A close-range unit that deals high burst damage.', img: `${imgs}/hunter.png` },
    'Executioner': { rarity: rarities[2], hint: 'Throws an axe that bounces between enemies.', img: `${imgs}/executioner.png` },
    'Electro Dragon': { rarity: rarities[2], hint: 'A flying unit that chains lightning between enemies.', img: `${imgs}/electro-dragon.png` },
    'Firecracker': { rarity: rarities[2], hint: 'A ranged unit that deals high burst damage.', img: `${imgs}/firecracker.png` },
    'Royal Ghost': { rarity: rarities[3], hint: 'A stealthy unit that becomes invisible when not attacking.', img: `${imgs}/royal-ghost.png` },
    'Lumberjack': { rarity: rarities[3], hint: 'A fast-moving unit that drops a Rage spell upon death.', img: `${imgs}/lumberjack.png` },
    'Inferno Dragon': { rarity: rarities[3], hint: 'A flying unit that deals increasing damage over time.', img: `${imgs}/inferno-dragon.png` },
    'Royal Recruits': { rarity: rarities[3], hint: 'Seven units that deploy in a line.', img: `${imgs}/royal-recruits.png` },
    'Golden Knight': { rarity: rarities[4], hint: 'A Champion with a dash ability.', img: `${imgs}/golden-knight.png` },
    'Archer Queen': { rarity: rarities[4], hint: 'A Champion with a cloak ability.', img: `${imgs}/archer-queen.png` },
    'Skeleton King': { rarity: rarities[4], hint: 'A Champion that summons skeletons upon death.', img: `${imgs}/skeleton-king.png` },
};

function getRandomCard(img,card) {
    const Keys = Object.keys(cards);
    const RandIt = Math.floor(Math.random() * Keys.length);
    card = cards[Keys[RandIt]];
    img.src = card.img;
}


document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith('GameSite.html')) {
        let card = null

        const BlurImg = document.querySelector('#BlurImg');
        const GuessInput = document.querySelector('#GuessInput');
        const HintBtn = document.querySelector('#HintBtn');
        const HintArea = document.querySelector('#HintArea');
        getRandomCard(BlurImg,card);
        GuessInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && GuessInput.value.toLowerCase() == card) {
                console.log('Correct!');
            }
        })
    }
});
