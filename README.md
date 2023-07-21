# Find-My-Hat

## Needed
Need prompt-sync package in order to work.
prompt-sync: https://github.com/heapwolf/prompt-sync;

siginit is set to true so to exit out of the program press control+c

##Controls & Inputs

"r" - go right
"l" - go left
"d" - go down
"u" - go up

##Changing Map Generation

at the bottom of Find-my-hat.js is where you'll find the execution code to change the map generation and hole generation:

`
const generatedField = new GenerateField(20,20,80); // (width, height, percentage of holes)
const newField = new Field(generatedField.generate());
newField.start()
`
