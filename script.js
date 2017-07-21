function some(index) {
    someGame.fillTile(index);
}

// someGame.setLoop(some, 200);
// someGame.fillTile(50);

someGame.setMapSize(20);


// someGame.setClick(some);



// someGame.setClick(someGame.fillTile)
// someGame.setClick(someGame.unfillTile)

someGame.startGame();

someGame.setHero(50);

someGame.setHero(100);

someGame.setHeroCanWalk();

function some(e) {
    let id = e.target.getAttribute('value');
    if(!id) return;
    someGame.fillTile(id);
}
add()

function add() {
    document.body.addEventListener('mouseover', some)
    document.body.removeEventListener('click', add)
    document.body.addEventListener('click', remove)
}


function remove() {
    document.body.removeEventListener('mouseover', some)
    document.body.removeEventListener('click', remove)
    document.body.addEventListener('click', add)
}
// someGame.fillTile(50)