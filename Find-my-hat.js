

const prompt = require('prompt-sync')({sigint: true});



const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this._field = field;
    this._originalField = this._field.map(row => [...row]);
    this.position = {
        x:this._field[0].findIndex(elm => elm === pathCharacter), y:0
    }
    this.hatPosition = {x:this._field[field.length - 1].findIndex(elm => elm === hat),y: this._field.length-1}
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
  checkSuper(x,y){
    if(this.checkForBoundryX(x)){
      console.log('You hit the boundry try again!');
      this.reset();
      this.start();
    } 
    if(this.checkForBoundryY(y)){
      console.log('You hit the boundry try again!');
      this.reset();
      this.start();
    }
    if(this.checkForHole(x,y)){
      console.log('You fell down a hole try again!');
      this.reset();
      this.start()
    }
    if(this.checkForPath(x,y)){
      this._field[this.position.y][this.position.x] = fieldCharacter;
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
     if (this.position.x === this.hatPosition.x && this.position.y === this.hatPosition.y) {
      console.log('You found your hat! Good job!');
      return;
    }       
    return this.start()  
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
  generate() {
    this._field = [];
    this.emptyField();
    this.holes();
    this.placePath();
    this.placeHat();
    let originalField = this._field.map(row => row.slice());
    if (this.fillFuncTwo()) {
      this._field = originalField;
      return this._field;
    }
    return this.generate();
  }
  fillFuncTwo(){
    const y = 0;
    const x = parseFloat(this._field[0].findIndex(elm => elm === pathCharacter));
    this._field[0][x] = fieldCharacter;
    return this.fillFunc(x,y) ? true : false;
  }
  
  fillFunc(x, y) {
    if (
      x < 0 || 
      x > this._field[0].length - 1 || 
      y < 0 || 
      y > this._field.length - 1 ||  
      this._field[y][x] === hole ||
      this._field[y][x] === pathCharacter
    ) {
      return false;
    }
    if (this._field[y][x] === hat) {
      return true;
    }
    this._field[y][x] = pathCharacter;
    if (this.fillFunc(x, y + 1)) return true; 
    if (this.fillFunc(x + 1, y)) return true;
    if (this.fillFunc(x, y - 1)) return true;
    if (this.fillFunc(x - 1, y)) return true;
    return false;
  }
}



const generatedField = new GenerateField(20,20,80); // (width, height, percentage of holes)
const newField = new Field(generatedField.generate());
newField.start()


