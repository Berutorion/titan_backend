//degfine generateAuthNum function
function generateAuthNum(optionLength) {
    //define things user might want
    const lowerCaseLetter = "abcdefghijklmnopqrstuvwxyz"
    const upperCaseLetter = lowerCaseLetter.toUpperCase()
    const numbers = "1234567890"
  
     // create a collection to store things user picked up
  let collection = [];
  collection = collection.concat(lowerCaseLetter.split(""))
  collection = collection.concat(...upperCaseLetter)
  collection = collection.concat(numbers.split(""))


    //start generate authNum
    let password = ""
    for (let i = 0; i < optionLength; i++) {
      password += sample(collection)
    }
    //return generated authNum
    return password
  }
  
  function sample(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  module.exports = generateAuthNum;
  