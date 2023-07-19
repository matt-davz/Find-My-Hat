

const prompt = require('prompt-sync')({sigint: true});



const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this._originalField = field;
    this._field = field;
    this.position = {
        x:0, y:0
    }
    this.counter = false;
  }
  mazeSolver(){
    this.reset();
    i = false;
    while(i != true){
      check
      this.down()
    } 
  

  }
  check(x,y){
    if(this._field[y][x] === hole && x  ){
      return true;
    } else {
      return false;
    }
  }
  checkForHole(x,y){
    if(this._field[y][x] === hole){
        console.log('You fell down a hole try again!')
        this.start();
    } 
  }
  checkForBoundry(x,y){
    if(y < 0 || y > this._field.length-1){ //need to change for when generative map
        console.log('You hit the boundry try again!');
        this.start()
    } else if (x < 0 || x > this._field[0].length-1){ //need to change for when generative map
        console.log('You hit the boundry try again!');
        this.start()
    }
  }
  checkForPath(x,y){
    if(this._field[y][x] === '*'){
        this._field[this.position.y][this.position.x] = '░';
    }
  }
  checkForHat(x,y){
    if(this._field[y][x] === hat){
        console.log('You found your hat good job!')
        this.counter=true;
    } 
  }
  checkSuper(x,y){
    this.checkForBoundry(x,y);
    this.checkForHole(x,y);
    this.checkForPath(x,y);
    this.checkForHat(x,y)
  }
  right(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.x++
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.x++
    this._field[this.position.y][this.position.x] = '*';

  }
  left(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.x--
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.x--
    this._field[this.position.y][this.position.x] = '*';

  }
  down(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.y++
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.y++
    this._field[this.position.y][this.position.x] = '*';
  }
  up(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.y--
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.y--
    this._field[this.position.y][this.position.x] = '*';
  }
  reset(){
    this._field = this._originalField.map(row => [...row]);
    this.position.x = parseFloat(this._field[0].findIndex(elm => elm === pathCharacter));
    this.position.y = 0;
  }
  start(){
    this.reset();
    for(let i = 0; i < 1;){
        if(!this.counter){
            this.printField();
            let direction = prompt('which direction?');
            switch(direction){
                case 'r':
                    this.right();
                    break;
                case 'l':
                    this.left();
                    break;
                case 'd':
                    this.down();
                    break;
                case 'u':
                    this.up();
                    break;    
            }   
        } else {
            i = 1;
        }
        
    }
  }
  printField(){
    this._field.forEach(element => {
       console.log(element.join(''));
    });
  }
}


class GenerateField{
  constructor(width,height,percentage){
      this._width = width;
      this._height = height;
      this._percentage = percentage;
      this._field = [];
  }
  emptyField(){
      for(let i = 0; i < this._height; i++){
          this._field.push([]);
      }
      this._field.forEach(elm => {
          for(let j = 0; j < this._width; j++){
              elm.push(fieldCharacter);
          }
      })
  }
  printField(){ // only for testing generation class ---------------------------------------------------
      this._field.forEach(element => {
         console.log(element.join(''));
      });
    }
  random(){
      let rand=Math.round(Math.random());
      if(!rand){
          return true
      } else {
          return false
      }
  }
  holes(){
    let amount = Math.floor(this._width*this._height*(this._percentage/100));
    for (let index = 0; index <= amount; index++) {
      this._field[Math.floor(Math.random()*this._height)][Math.floor(Math.random()*this._width)] = hole;
    }
  }
  placePath(){
    this._field[0][Math.floor(Math.random()*this._width)] = pathCharacter;
  }
  placeHat(){
    this._field[this._height-1][Math.floor(Math.random()*this._width)] = hat;
  }
  generate(){
      this.emptyField();
      this.holes();
      this.placePath();
      this.placeHat();
      return this._field;
  }
}

const generatedField = new GenerateField(10,10,50);
const newField = new Field(generatedField.generate());

newField.start();
// generatedField.emptyField();