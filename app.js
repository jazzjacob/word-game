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


function addToArrayAlphabetically(word, array) {
  for (let i = 0; i < array.length; i++) {
    const comparisonResults = compareWordsAlphabetically(word, array[i]);
    if (comparisonResults === "before") {
      array.splice(i, 0, word);
      return; // Exit early to avoid adding the word multiple times
    }
  }
  // If no earlier position is found, push the word at the end
  array.push(word);
  console.log(guessedWordsBefore);
  console.log(guessedWordsAfter);
}

function compareWordsAlphabetically(primaryWord, secondaryWord) {
  for (let i = 0; i < primaryWord.length; i++) {
    if (primaryWord[i] == secondaryWord[i]) {
      console.log(`${primaryWord[i]} == ${secondaryWord[i]}`);
    } else if (primaryWord[i] < secondaryWord[i]) {
      // Word comes before word of the day alphabetically
      console.log(`${primaryWord[i]} < ${secondaryWord[i]}`);
      console.log(`"${primaryWord}" comes before "${secondaryWord}" alphabetically.`);
      //addGuessedWord(primaryWord, "before");
      return "before";
    } else {
      // Word comes before after of the day alphabetically
      console.log(`${primaryWord[i]} > ${secondaryWord[i]}`);
      console.log(`"${primaryWord}" comes after "${secondaryWord}" alphabetically.`);
      return "after";
    }
  }
  // The word contains the same letters as the word of the day, but is shorter
  // E.g. word="hell", but word of the day is "hello"
  console.log(`"${primaryWord}" comes before "${secondaryWord}" alphabetically.`);
  return "before";
}

function compareWithTodaysWord(word) {
  console.log("Comparing with todays word!");
  console.log(`${word} vs ${wordOfTheDay}`);

  if (word == wordOfTheDay) {
    console.log("WORD OF THE DAY FOUND!");
    return;
  }

  const comparisonResults = compareWordsAlphabetically(word, wordOfTheDay);
  addGuessedWord(word, comparisonResults);
}

function updateUIList(wordArray, element, placement) {
  element.innerHTML = "";
  for (let i = 0; i < wordArray.length; i++) {
    const wordListItem = document.createElement("li");
    wordListItem.innerHTML = wordArray[i];
    element.appendChild(wordListItem);
  }

  if (placement == "before") {
    body.insertBefore(element, formElement);
  } else {
    body.insertBefore(element, formElement.nextSibling);
  }
}

function addGuessedWord(word, placement) {

  if (placement == "before") {
    //guessedWordsBefore.push(word);
    addToArrayAlphabetically(word, guessedWordsBefore);
    updateUIList(guessedWordsBefore, guessedWordsBeforeElement, "before");

  } else if (placement == "after") {
    addToArrayAlphabetically(word, guessedWordsAfter);
    updateUIList(guessedWordsAfter, guessedWordsAfterElement, "after");

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
