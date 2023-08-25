# Find-My-Hat

## Controls & Inputs

"r" - go right
"l" - go left
"d" - go down
"u" - go up

## Changing Map Generation

at the bottom of Find-my-hat.js is where you'll find the execution code to change the map generation and hole generation:

`
const generatedField = new GenerateField(20,20,80); // (width, height, percentage of holes)
const newField = new Field(generatedField.generate());
newField.start()
`
## Blog
[
](https://medium.com/@davies.matt.02/project-2-find-my-hat-10a9f45a3332)https://medium.com/@davies.matt.02/project-2-find-my-hat-10a9f45a3332
Check out my blog for the mistakes and learnings this took awhile 
