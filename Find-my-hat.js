

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
    // i = false;
    let j = 0;
    while (j < 15){
      console.log("--------");
      this.printField();
      let newPosition = {x:this.position.x,y:this.position.y}
      j++
      if(this.botCheck(newPosition.x,newPosition.y+1)) {
        this.down();
      } else if(this.botCheck(newPosition.x-1,newPosition.y)){
        this.left();
      } else if(this.botCheck(newPosition.x+1,newPosition.y)){
        this.right();
      } else if(this.botCheck(newPosition.x,newPosition.y-1)){
        this.up();
      }
        
    } 
  

  }
  checkForHole(x,y){
    return this._field[y][x] === hole ? true : false;
  }
  checkForBoundryX(x){
   return  x < 0 || x > this._field[0].length-1 ? true : false;
  }
  checkForBoundryY(y){
    return y < 0 || y > this._field.length-1 ? true : false;
  }
  checkForPath(x,y){
    return this._field[y][x] === pathCharacter ? true : false;
  }
  checkForHat(x,y){
    return this._field[y][x] === hat ? true : false;
  }
  botCheck(x,y){
    return !this.checkForBoundryX(x)&&!this.checkForBoundryY(y)&&!this.checkForHole(x,y)&&!this.checkForPath(x,y)? true : false;
  }
  checkSuper(x,y){
    if(this.checkForBoundryX(x)){
      console.log('You hit the boundry try again!');
      this.start();
    } 
    if(this.checkForBoundryY(y)){
      console.log('You hit the boundry try again!');
      this.start();
    }
    if(this.checkForHole(x,y)){
      console.log('You fell down a hole try again!');
      this.start()
    }
    if(this.checkForPath(x,y)){
      this._field[this.position.y][this.position.x] = fieldCharacter;
    }
    if(this.checkForHat(x,y)){
      console.log('You found your hat good job!')
      this.counter=true;
    }
  }
  right(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.x++
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.x++
    this._field[this.position.y][this.position.x] = pathCharacter;

  }
  left(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.x--
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.x--
    this._field[this.position.y][this.position.x] = pathCharacter;

  }
  down(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.y++
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.y++
    this._field[this.position.y][this.position.x] = pathCharacter;
  }
  up(){
    let newPosition = {x:this.position.x,y:this.position.y};
    newPosition.y--
    this.checkSuper(newPosition.x,newPosition.y);
    this.position.y--
    this._field[this.position.y][this.position.x] = pathCharacter;
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



const generatedField = new GenerateField(10,10,30);
const newField = new Field(generatedField.generate());

newField.start();
// generatedField.emptyField();