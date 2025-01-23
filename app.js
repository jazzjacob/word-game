import { validWordTrie } from './dictionary.js';

const button = document.getElementById('button');
button.addEventListener('click', onButtonClick);

const textInput = document.getElementById("word");
const messageBox =  document.createElement("div");
const body = document.querySelector('body');
const guessedWordsBeforeElement = document.createElement("ul");
const guessedWordsAfterElement = document.createElement("ul");

const wordOfTheDay = "hell";
const formElement = document.querySelector('form');
const wordOfTheDayElement = document.createElement("p");
wordOfTheDayElement.innerHTML = `Today's word: ${wordOfTheDay}`;

body.insertBefore(wordOfTheDayElement, formElement);

const guessedWordsBefore = [];
const guessedWordsAfter = [];

function compareWithTodaysWord(word) {
  console.log("Comparing with todays word!");
  console.log(`${word} vs ${wordOfTheDay}`);

  if (word == wordOfTheDay) {
    console.log("WORD OF THE DAY FOUND!");
    return;
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i] == wordOfTheDay[i]) {
      console.log(`${word[i]} == ${wordOfTheDay[i]}`);
    } else if (word[i] < wordOfTheDay[i]) {
      // Word comes before word of the day alphabetically
      console.log(`${word[i]} < ${wordOfTheDay[i]}`);
      console.log(`"${word}" comes before "${wordOfTheDay}" alphabetically.`);
      addGuessedWord(word, "before");
      return;
    } else {
      // Word comes before after of the day alphabetically
      console.log(`${word[i]} > ${wordOfTheDay[i]}`);
      console.log(`"${word}" comes after "${wordOfTheDay}" alphabetically.`);
      addGuessedWord(word, "after");
      return;
    }
  }
  // The word contains the same letters as the word of the day, but is shorter
  // E.g. word="hell", but word of the day is "hello"
  console.log(`"${word}" comes before "${wordOfTheDay}" alphabetically.`);
  addGuessedWord(word, "before");
  return;
}

function addGuessedWord(word, placement) {
  const wordListItem = document.createElement("li");

  if (placement == "before") {
    guessedWordsBefore.push(word);
    wordListItem.innerHTML = word;
    guessedWordsBeforeElement.appendChild(wordListItem);
    body.insertBefore(guessedWordsBeforeElement, formElement);

  } else if (placement == "after") {
    guessedWordsAfter.push(word);
    wordListItem.innerHTML = word;
    guessedWordsAfterElement.appendChild(wordListItem);
    body.insertBefore(guessedWordsAfterElement, formElement.nextSibling);

  } else {
    console.error("Erroneous useage of placement argument.");
  }

  console.log(guessedWordsBefore);
  console.log(guessedWordsAfter);
}

function formatText(text) {
  return text.toLowerCase();
}

function onButtonClick(event) {
  event.preventDefault();
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

function displayMessage(message) {
  console.log(message);

  const newContent = document.createTextNode(message);
  messageBox.innerHTML = "";
  messageBox.appendChild(newContent);
  body.appendChild(messageBox);
}

function printNoWordFoundMessage(word) {
  const message = `Sorry bro! "${word}" is not a valid word.`;
  console.log(message);
  displayMessage(message);
}

function printSuccessMessage(word) {
  const message = `Success! "${word}" is a valid word.`;
  console.log(message);
  displayMessage(message);
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

function app(word) {
  word = formatText(word);
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
          printSuccessMessage(word);
          compareWithTodaysWord(word);
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
