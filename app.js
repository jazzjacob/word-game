import { validWordTrie } from './dictionary.js';

function isCharacterInObject(character, object) {
  console.log("Looking for a character in an object");

  for (let key in object) {
    if (character == key) {
      console.log(`It's a match! Character: ${character}. Key: ${key}`);
      return true;
    }
  }

  return false;
}

function printNoWordFoundMessage() {
  console.log("Sorry bro! Please enter a valid word.");
}

function isCurrentObjectAWord(object) {
  console.log("Checking if current object is a word");
  if (object.hasOwnProperty("")) {
    console.log("IT'S A WORD");
    return true;
  }
  return false;
}

function app() {

  const word = "tre";

  console.log(`Looking for word: ${word}`);

  const foundCharacters = [];

  const accessNestedObject = (object, keys) => {
    return keys.reduce((current, key) => current[key], object);
  };


  for (let i = 0; i < word.length; i++) {
    const character = word[i];
    console.log(character);

    let nestedObject = accessNestedObject(validWordTrie, foundCharacters);
    let characterIsInObject = isCharacterInObject(character, nestedObject);


    if (characterIsInObject) {
      foundCharacters.push(character);
      const currentObject = accessNestedObject(validWordTrie, foundCharacters);
      const currentObjectIsAWord = isCurrentObjectAWord(currentObject);
      console.log(`Word length: ${word.length - 1}`);
      console.log(`Current i: ${i}`);

      if ((i === word.length - 1) && currentObjectIsAWord) {
        if (currentObjectIsAWord) {
          console.log("Success! You have entered a valid word.");
        } else {
          printNoWordFoundMessage();
        }
      }
    } else {
      console.log("Character is not in object, breaking word for-loop.");
      printNoWordFoundMessage();
      break;
    }

  }

  console.log(foundCharacters);

}


app();
