(function (window) {
    let someGame = {};
        someGame.createsome = function() {
        console.log('some')
    }
    let number = 10;
    let defaultNumber = 10;
    let mines;
    let defaultMines = 20;
    someGame.newArr;
    let newnewArr;
    let superNewArr;
    let gameEnded = false;
    let shiftPushed = false;
    let minesArr = [];
    const MAX = 70, MIN = 10;
    let SPEED = 200;
    let direction;
    let snake;
    let foodLocation = null;
    someGame.hero = null;
    someGame.renderMap = function() {
        superNewArr = someGame.newArr.map((item, index) => {
            if (item === 1) {
                return { content: 1, isSnake: true, id: index };
            }
            if (item === 2) {
                return { content: 1, isFood: true, id: index };
            }
            return { content: 0, isSnake: false, id: index };
        })
        for (let i = 0; i < number; i++) {
            newnewArr[i] = superNewArr.slice(number * i, (i + 1) * number);
        }
        let game = document.getElementById('game');
        game.innerHTML = '';
        if (number >= 40) {
            game.className = 'small';
        } else {
            game.className = '';
        }
        newnewArr.forEach(item => {
            let div = document.createElement('div');
            div.className = 'row';
            let string = '';
            item.forEach(it => {
                let tag = '<span class="tile "';
                if (it.isSnake) {
                    tag = '<span class="tile snake" ';
                }
                if (it.isFood) {
                    tag = '<span class="tile food" ';
                    string += tag + 'value="' + it.id + '" ' + '><span></span></span>';
                    return;
                }
                // let insertedTag = it.denger === true ? '<span class="front-ground denger' : '<span class="front-ground';
                string += tag + 'value="' + it.id + '" ' + '></span>';
            })
            div.innerHTML = string;
            game.appendChild(div);
        })

    }

    let stakArray = [setArray, someGame.renderMap];

    function setMapSize() {
        let promptVal = prompt('Set size of map in format number*number\nInput number(min: ' + MIN + ', max: ' + MAX + '): ', defaultNumber);
        number = promptVal === null || promptVal === '' ? defaultNumber : promptVal;
        if (isNaN(number) || number > MAX || number < MIN) {
            setMapSize();
        }
        number = parseInt(number, 10);
        defaultNumber = number;
    }

    function fillTile(index) {
        if(this.newArr[index] === 1) return; 
        this.newArr[index] = 1;
        this.renderMap();
    }

    function unfillTile(index) {
        if(this.newArr[index] === 0) return;
        this.newArr[index] = 0;
        this.renderMap();
    }

    function toggleFillTile(index) {
        this.newArr[index] = this.newArr[index] === 0 ? 1 : 0;
        this.renderMap();
    }

    someGame.fillTile = fillTile.bind(someGame);

    someGame.unfillTile = unfillTile.bind(someGame);

    someGame.toggleFillTile = toggleFillTile.bind(someGame);

    someGame.setLoop = function(func, speed) {
        stakArray.push(() => setLoop(func, speed))
    }

    someGame.setHero = function(index) {
        someGame.hero = index;
        someGame.newArr[index] = 1;
        someGame.renderMap();
    }

    function setDirection(e) {
        switch (e.key) {
            case 'ArrowUp': changeHeroPosition(someGame.hero - number);
                break;
            case 'ArrowDown': changeHeroPosition(someGame.hero + number);
                break;
            case 'ArrowLeft': changeHeroPosition(someGame.hero - 1);
                break;
            case 'ArrowRight': changeHeroPosition(someGame.hero + 1);
                break;
        }
    }

    function changeHeroPosition(newPosition) {
        someGame.newArr[someGame.hero] = 0;
        someGame.newArr[newPosition] = 1;
        someGame.hero = newPosition;
        someGame.renderMap();
    }

    someGame.setHeroCanWalk = function() {
        document.body.addEventListener('keydown', setDirection)
    }

    someGame.setAskingForMapSize = function() {
        stakArray.unshift(setMapSize);
    }

    someGame.setMapSize = function(size) {
        number = size;
    }

    someGame.startGame = function() {
        stakArray.forEach(func => {
            func();
        })
    }

    someGame.setClick = function(callback) {
        document.body.addEventListener('click', function(e) {
            let index = e.target.getAttribute('value');
            if(index === null) return;
            callback(index);
        })
    }

    function setArray() {
        someGame.newArr = new Array(number * number);
        someGame.newArr.fill(0);
        newnewArr = [];
    }

    function setLoop(func, speed) {
        setTimeout(function iteration() {
            func();
            setTimeout(iteration, speed);
        }, speed)
    }


    function endGame() {
        alert('End Game!');
        gameEnded = true;
        // return startGame();
    }

    function snakeMove() {
        let nextMove = snake[0] + direction;
        if (''.indexOf.call(snake[0], '9') !== -1 && nextMove % number === 0) return endGame();
        if (''.indexOf.call(nextMove, '9') !== -1 && snake[0] % number === 0) return endGame();
        if (nextMove < 0) return endGame();
        if (nextMove >= number * number) return endGame();
        if (snake.some(item => item === nextMove)) return endGame();
        snake.unshift(nextMove);
        if (superNewArr[nextMove].isFood) {
            newArr[nextMove] = 1;
            setFood();
            // if(!(SPEED <= 50)) SPEED -= 25;
        }
        if (!superNewArr[nextMove].isFood) snake.pop();
        renderMap();
    }

    // startGame();

    function setFood() {
        let random = Math.floor(Math.random() * (number * number)) + 0;
        if (newArr[random] !== 1 && newArr[random] !== 2) {
            // newArr[newArr.indexOf(2)] = 1;
            newArr[random] = 2;
            foodLocation = random;
            return;
        }
        setFood();
    }

    


    return window.someGame = someGame;
})(window)