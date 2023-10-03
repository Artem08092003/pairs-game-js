(() => {
  // Этап 1. Создал функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
  const numArray = [];
  function createNumbersArray(count) {
    for (let i = 0; i < count; i++) {
      numArray.push(i + 1, i + 1);
    };

    return numArray;
  };


  // Этап 2. Создал функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    let m = arr.length,
      t,
      i;

    // Пока есть элементы для перемешивания
    while (m) {
      // Взять оставшийся элемент
      i = Math.floor(Math.random() * m--);

      // И поменять его местами с текущим элементом
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }

    return arr;
  }


  // Этап 3. Использую две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  function startGame(count) {
    return shuffle(createNumbersArray(count));
  };


  const btnCards = document.querySelectorAll('.btn');
  let firstCard = null;
  let secondCard = null;

  // вызываем функцию где цифр будет равно кол во карточек и делим на два( тк числы в игре должен быть парными)
  startGame(btnCards.length / 2);

  //Этап 4. создаем функции создание карточек
  const createCardNum = () => {
    for (let i = 0; i < btnCards.length; i++) {
      btnCards[i].textContent = numArray[i];

      btnCards[i].addEventListener("click", () => {
        if (btnCards[i].classList.contains('btn-open') || btnCards[i].classList.contains('btn-success')) {
          return;
        };

        if (firstCard !== null && secondCard !== null) {
          firstCard.classList.remove('btn-open');
          secondCard.classList.remove('btn-open');
          firstCard = null;
          secondCard = null;
        };

        btnCards[i].classList.add('btn-open');

        if (firstCard === null) {
          firstCard = btnCards[i];
        } else {
          secondCard = btnCards[i];
        };

        if (firstCard !== null && secondCard !== null) {
          let firstCardNum = firstCard.textContent;
          let secondCardNum = secondCard.textContent;

          if (firstCardNum === secondCardNum) {
            firstCard.classList.add('btn-success');
            secondCard.classList.add('btn-success');
          } else {
            setTimeout(() => {
              firstCard.classList.remove('btn-open');
              secondCard.classList.remove('btn-open');
            }, 400);
          };
        };

        if (numArray.length === document.querySelectorAll('.btn-success').length) {
          setTimeout(() => {
            alert("Молодец!");
          }, 500);
        };
      });
    };

    //обрабатываем событий кнопка сыграть еще раз
    btnReload = document.querySelector('.btn__onload');
    btnReload.addEventListener("click", () => {
      let confirmMessage = "Вы уверены ?";
      if (confirm(confirmMessage)) {
        location.reload();
      };
    });
  };

  createCardNum();
})();
