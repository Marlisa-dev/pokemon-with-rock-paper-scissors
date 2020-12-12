
//This is that state
let gameState = {
  userPokemon: '',
  rivalPokemon: '',
  pokemonDB: [
    {
      name: 'charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    },
    {
      name: 'bulbasaur',
      type: 'fire',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
    },
    {
      name: 'squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
    },    
  ],
  elements: {
    pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack'),
  },
  init: function() {
    // elements
    console.log(gameState.elements.attackBtnsEl);

  //This is the initial loop
  let i = 0;
  while(i < gameState.elements.pokemonsEl.length) {
  //add function to all characters on screen select
    gameState.elements.pokemonsEl[i].onclick = function() {

      //current selected pokemons name
      let pokemonName = this.dataset.pokemon

      // elements for images on battle screen

      let player1Img = document.querySelector('.player1').getElementsByTagName('img')

      let player2Img = document.querySelector('.player2').getElementsByTagName('img')

      // we save the current pokemon

      gameState.userPokemon = pokemonName

      //cpu picks a pokemon

      //cpuPick()

      //change screen to battle scene
      gameState.elements.battleScreenEl.classList.toggle('active')
    
      // select data from current user pokemon
      gameState.currentPokemon = gameState.pokemonDB.filter(function(pokemon) {
        return pokemon.name == gameState.userPokemon;
      })
      player1Img[0].src = gameState.currentPokemon[0].img

    // select data from current cpi pokemon

      gameState.currentRivalPokemon = gameState.pokemonDB.filter(function(pokemon) {
        return pokemon.name == gameState.rivalPokemon;
      })
    
      // current user and cpu pokemon initial health
      player2Img[0].src = gameState.currentRivalPokemon[0].img
      gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon);

      gameState.currentPokemon[0].originalhealth = gameState.calculateInitialHealth(gameState.currentPokemon);

      gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon)

      gameState.currentRivalPokemon[0].originalhealth = gameState.calculateInitialHealth(gameState.currentRivalPokemon)
      console.log(gameState);
    }
  i++
}
let a = 0
while(a < gameState.elements.attackBtnsEl.length){
  gameState.elements.attackBtnsEl[a].onclick = function() {
    let attackName = this.dataset.attack;
    gameState.currentUserAttack = attackName;

    gameState.play(attackName, gameState.cpuAttack())
    };
    a++;
  }
  },
  cpuAttack: function() {
    let attacks = ['rock', 'paper', 'scissors']
    return attacks[gameState.randomNumber(0,3)]
  },
  
  calculateInitialHealth: function(user){
    return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
  },
  
  attackMove: function(attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + 'before: ' + enemy.health);
    let attackAmount = attack * level  * (stack + critical);
    enemy.health = enemy.health - attackAmount;

    let userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
    
    let cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')

    if(enemy.owner == 'user') {
      let minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      console.log(userHP)
      userHP.style.width = ((minusPercent < 0 ) ? 0 : minusPercent) + '%'
    } else {
      let minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      console.log(userHP)
      cpuHP.style.width = ((minusPercent < 0 ) ? 0 : minusPercent) + '%'
    }
    gameState.checkWinner(enemy, attacker);
    console.log(enemy.name + 'after: ' + enemy.health);
  },
  
  checkWinner: function(enemy, attacker) {
    if(enemy.health <= 0){
      console.log('THE WINNERRRRRRR IS ' + attacker.name)
    }
  },
 
  randomNumber: function(min,max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  cpuPick: function () {
    do {
      gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon;
    }
    while (gameState.userPokemon == gameState.rivalPokemon)  
  },

  play: function(userAttack, cpuAttack){
    let currentPokemon = gameState.currentPokemon[0];
    let currentRivalPokemon = gameState.currentRivalPokemon[0];
    currentPokemon.owner = 'user';
    currentRivalPokemon.owner = 'cpu';

    switch(userAttack) {
      case 'rock':
        if(cpuAttack == 'paper'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health >=1) {
            //cpu
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon) 
            }
          }      
        }
  
        if (cpuAttack == 'scissors'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
  
            if(currentRivalPokemon.health >=1) {
            //cpu
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }   
          }                  
        }
        if (cpuAttack == 'rock'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
  
            if(currentRivalPokemon.health >=1) {
            //cpu
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentRivalPokemon)
            }
          }       
        }
        break;
        
      case 'paper':
          if(cpuAttack == 'paper'){
            if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
              //user
              gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
  
              if(currentRivalPokemon.health >=1) {
            //cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon) 
              }
          }
        }
  
        if (cpuAttack == 'scissors'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health >=1) {
  
            //cpu
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)  
            }
          }     
        }
  
        if (cpuAttack == 'rock'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
  
            if(currentRivalPokemon.health >=1) {
            //cpu
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)  
            }
          }      
        }  
        break;
  
      case 'scissors':
        if(cpuAttack == 'paper'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health >=1) {
            //cpu
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon) 
            }
          }
        }
        if (cpuAttack == 'scissors'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health >=1) {
            //cpu
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon) 
            }   
          }   
        }
        if (cpuAttack == 'rock'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >=1){
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health >=1) {
            //cpu
            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }   
          }     
        }    
        break;
      }  
  }  
};
gameState.init()













