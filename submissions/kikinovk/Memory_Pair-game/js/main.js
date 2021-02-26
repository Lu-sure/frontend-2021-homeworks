const images = [
  { src : './img/card_1.svg',
    id : '01',
    alt : 'Camel'
  },
  { src : './img/card_2.svg',
    id : '02',
    alt: 'Dog'
  },
  { src : './img/card_3.svg',
      id : '03',
      alt: 'Tasmanian devil'
  },
  { src : './img/card_4.svg',
    id : '04',
    alt: 'Bear'
  },
  { src : './img/card_5.svg',
    id : '05',
    alt: 'Goat'
  },
  { src : './img/card_6.svg',
    id : '06',
    alt: 'Owl'
  }
];

let openedCard;
const delay = 500;
const maxCard = 6;
const cards = [];
const gameBoard = document.querySelector('.gameboard');
const restartButton = document.querySelector('#restart_game');

const selectImage = (cards, images) => {
  const maxRandom = images.length;
  let random = 0;

  do {
    random = Math.floor(Math.random() * Math.floor(maxRandom));
  } while (cards
              .filter(card => card.dataset.id === images[random].id)
              .length === 2);
  return images[random]
};

const createCard = ({src, id, alt}) => {
  const card =  document.createElement('div');
  card.classList.add('card');
  card.dataset.id = id;
  card.innerHTML = `<div class="card__front">
                      <img src="./img/face.png" class="card__img--front" alt="face card">
                    </div>
                    <div class="card__back">
                      <img src="${src}" class="card__img--back" alt="${alt}">
                    </div>`;
  return card
};

const initGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < maxCard*2; i++) {
    const card = createCard(selectImage(cards, images));

    fragment.appendChild(card);
    cards.push(card);
  };
  gameBoard.appendChild(fragment);
};

const openCard = (card) => {
  card.classList.add('card--open');
};

const closeCard = (card) => {
  if (card.classList.contains('card--open')) {
    setTimeout(() => {
      card.classList.remove('card--open')
    }, delay);
  };
};

const disappearCard = (card) => {
  setTimeout(() => {
    card.classList.add('card--disappear')
    setTimeout(() => {
      card.classList.add('card--disable')
    }, delay);
  },  delay*2);
};

const turnCard = () => {
  gameBoard.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    openCard(card);
    if (!openedCard) {
      openedCard = card;
    } else if (openedCard.dataset.id === card.dataset.id
                && card.classList.contains('card--open')) {
      disappearCard(card);
      disappearCard(openedCard);
      openedCard = undefined;
    } else {
        closeCard(card);
        closeCard(openedCard);
        openedCard = undefined;
    };
  });
};

const restartGame = () => {
  cards.length = 0;
  gameBoard.innerHTML = '';
  initGameBoard();
};

document.addEventListener('DOMContentLoaded', () => {

  initGameBoard();
  turnCard();

  restartButton.addEventListener('click', () => restartGame() );
})
