import { validWordTrie } from './dictionary.js';
import { setState, getState } from './state.js';

const formElement = document.querySelector('form');
const textInput = document.getElementById("word");
const body = document.querySelector('body');

const messageBox =  document.createElement("div");
const guessedWordsBeforeElement = document.createElement("ul");
const guessedWordsAfterElement = document.createElement("ul");
const wordOfTheDayElement = document.createElement("p");

const wordOfTheDay = "hell";
const guessedWordsBefore = [];
const guessedWordsAfter = [];

wordOfTheDayElement.innerHTML = `Today's word: ${wordOfTheDay}`;
body.insertBefore(wordOfTheDayElement, formElement);

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

function addToStateAlphabetically(word, placement) {
  const array = placement == "before" ? [...getState().wordsBefore] : [...getState().wordsAfter];

  for (let i = 0; i < array.length; i++) {
    const comparisonResults = compareWordsAlphabetically(word, array[i]);
    if (comparisonResults === "before") {
      array.splice(i, 0, word);
      setState(placement == "before"? { wordsBefore: array } : {wordsAfter: array});
      return; // Exit early to avoid adding the word multiple times
    }
  }
  // If no earlier position is found, push the word at the end
  array.push(word);
  setState(placement == "before" ? { wordsBefore: array } : {wordsAfter: array});
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
    displayMessage(`WORD OF THE DAY FOUND! ${word}`);
    return;
  }

  const comparisonResults = compareWordsAlphabetically(word, wordOfTheDay);
  addGuessedWord(word, comparisonResults);

  printSuccessMessage(word);
}

function updateUIList(wordArray, element, placement) {
  element.innerHTML = "";
  for (let i = 0; i < wordArray.length; i++) {
    const wordListItem = document.createElement("li");
    wordListItem.innerHTML = wordArray[i];
    element.appendChild(wordListItem);
  }

  if (placement == "before") {
    //body.insertBefore(element, formElement);
  } else {
   // body.insertBefore(element, formElement.nextSibling);
  }
}

function addGuessedWord(word, placement) {
  if (placement == "before") {
    //guessedWordsBefore.push(word);
    addToArrayAlphabetically(word, guessedWordsBefore);
    addToStateAlphabetically(word, "before");

    updateUIList(guessedWordsBefore, guessedWordsBeforeElement, "before");


  } else if (placement == "after") {
    addToArrayAlphabetically(word, guessedWordsAfter);
    updateUIList(guessedWordsAfter, guessedWordsAfterElement, "after");
    addToStateAlphabetically(word, "after");

  } else {
    console.error("Erroneous useage of placement argument.");
  }

  console.log(guessedWordsBefore);
  console.log(guessedWordsAfter);
}

function formatText(text) {
  return text.toLowerCase();
}


function onButtonClick() {
  event.preventDefault();
  lookUpWord(textInput.value);
  textInput.value = "";
}

function isCharacterInObject(character, object) {
  for (let key in object) {
    if (character == key) {
      return true;
    }
  }
  return false;
}

function displayMessage(message) {
  const newContent = document.createTextNode(message);
  messageBox.innerHTML = "";
  messageBox.appendChild(newContent);
  // body.insertBefore(messageBox, formElement.nextSibling);
  console.log(message);
}

function printNoWordFoundMessage(word) {
  const message = `Sorry bro! "${word}" is not a valid word.`;
  displayMessage(message);
}

function printSuccessMessage(word) {
  const message = `Success! "${word}" is a valid word.`;
  displayMessage(message);
}

function isCurrentObjectAWord(object) {
  if (object.hasOwnProperty("")) {
    return true;
  }
  return false;
}

function accessNestedObject(object, keys) {
  return keys.reduce((current, key) => current[key], object);
}


export function lookUpWord(word) {
  word = formatText(word);
  console.log(`Looking for word: ${word}`);

  const foundCharacters = [];

  const wordIsAlreadyGuessed = guessedWordsBefore.includes(word) || guessedWordsAfter.includes(word);

  if (wordIsAlreadyGuessed) {
    console.log(`${word} is already guessed!`);
    displayMessage(`"${word}" is already guessed!`);
    return;
  }

  for (let i = 0; i < word.length; i++) {
    const character = word[i];

    let currentObjectInWordTrie = accessNestedObject(validWordTrie, foundCharacters);
    let characterIsInObject = isCharacterInObject(character, currentObjectInWordTrie);

    if (characterIsInObject) {
      foundCharacters.push(character);
      const currentObject = accessNestedObject(validWordTrie, foundCharacters);
      const currentObjectIsAWord = isCurrentObjectAWord(currentObject);

      if (i === word.length - 1) {
        if (currentObjectIsAWord) {
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
