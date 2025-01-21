import { validWordTrie } from './dictionary.js';

const button = document.getElementById('button');
button.addEventListener('click', onButtonClick);

const textInput = document.getElementById("word");

function onButtonClick() {
  app(textInput.value);
  textInput.value = "";
}



function isCharacterInObject(character, object) {
  // console.log("Looking for a character in an object");

  for (let key in object) {
    if (character == key) {
      //console.log(`It's a match! Character: ${character}. Key: ${key}`);
      return true;
    }
  }
  return false;
}

function printNoWordFoundMessage(word) {
  console.log(`Sorry bro! "${word}" is not a valid word.`);
}

function isCurrentObjectAWord(object) {
  // console.log("Checking if current object is a word");
  if (object.hasOwnProperty("")) {
    // console.log("IT'S A WORD");
    return true;
  }
  return false;
}

function accessNestedObject(object, keys) {
  return keys.reduce((current, key) => current[key], object);
}

function app(word = "hello") {
  console.log(`Looking for word: ${word}`);

  const foundCharacters = [];

  for (let i = 0; i < word.length; i++) {
    const character = word[i];
    // console.log(character);

    let currentObjectInWordTrie = accessNestedObject(validWordTrie, foundCharacters);
    let characterIsInObject = isCharacterInObject(character, currentObjectInWordTrie);

    if (characterIsInObject) {
      foundCharacters.push(character);
      const currentObject = accessNestedObject(validWordTrie, foundCharacters);
      const currentObjectIsAWord = isCurrentObjectAWord(currentObject);
      //console.log(`Word length: ${word.length - 1}`);
      //console.log(`Current i: ${i}`);

      if (i === word.length - 1) {
        if (currentObjectIsAWord) {
          console.log("Success! You have entered a valid word.");
        } else {
          printNoWordFoundMessage(word);
        }
      }
    } else {
      console.log("Character is not in object, breaking word for-loop.");
      printNoWordFoundMessage(word);
      break;
    }
  }
  console.log(foundCharacters);
}

function lookUpWord() {
  console.log("Hello");
  //app();
}

app();
