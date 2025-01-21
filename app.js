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

function isCurrentObjectAWord(object) {
  console.log("Checking if current object is a word");
  if (object.hasOwnProperty("")) {
    console.log("IT'S A WORD");
  }
}

function app() {

  console.log("Hello");

  const word = "afraideeeee";

  console.log(`Looking for word: ${word}`);

  const foundCharacters = [];

  const accessNestedObject = (object, keys) => {
    return keys.reduce((current, key) => current[key], object);
  };


  for (let character of word) {
    console.log(character);

    let nestedObject = accessNestedObject(validWordTrie, foundCharacters);
    let characterIsInObject = isCharacterInObject(character, nestedObject);


    if (characterIsInObject) {
      foundCharacters.push(character);
      isCurrentObjectAWord(accessNestedObject(validWordTrie, foundCharacters));
    }

  }

  console.log(foundCharacters);

}


app();
