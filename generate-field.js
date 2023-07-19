
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

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
    printField(){ // remove before export ---------------------------------------------------
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
        let i = 0;
        while(i < amount){
            this._field.forEach(elm => {
                for(let j = 0; j < this._width; j+=2){
                    if(elm[j] === fieldCharacter){
                        if(this.random()){
                            i++
                            elm[j] = hole;
                            break;
                        }
                    }
                }
            })
        }
    }
    generate(){
        this.emptyField();
        this.holes();
        return this._field;
    }
}

const testField = new GenerateField(10,10,15);


    console.log(testField.generate());

export {GenerateField}
