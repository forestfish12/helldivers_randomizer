import data from "./modules/data.js";

const armorList = document.getElementById("armor-list");
const grenadesList = document.getElementById("grenades-list");
const primariesList = document.getElementById("primaries-list");
const secondariesList = document.getElementById("secondaries-list");
const stratagemsList = document.getElementById("stratagems-list");
const resultHelmet = document.getElementById("result-helmet");
const resultArmor = document.getElementById("result-armor");
const resultCape = document.getElementById("result-cape");
const resultPrimary = document.getElementById("result-primary");
const resultSecondary = document.getElementById("result-secondary");
const resultGrenade = document.getElementById("result-grenade");
const resultStratagems = document.getElementsByClassName("stratagem");
const rollButton = document.getElementById("roll-button");

/**
 * @param {MouseEvent} e 
 */
function checkboxDivClickHandler(e) {
  const checkInput = e.currentTarget.querySelector('input[type=checkbox]');
  // // If the check box is clicked directly don't do anything.
  // if (e.target == checkInput) {
  //   return
  // };
  checkInput.checked = !checkInput.checked;
  
  const objRef = checkInput.id.split('-')[0];
  const objKey = checkInput.value;
  console.log(data[objRef][objKey]);
  data[objRef][objKey] = checkInput.checked;
  console.log(data[objRef][objKey]);
}

function buildChecklist(arr, listElement, idPrefix) {
  for (let i = 0; i < arr.length; i++) {
    listElement.innerHTML = listElement.innerHTML + `
      <li class="list-group-item">
        <div class="form-check" for="${idPrefix}-${i}">
          <input class="form-check-input" type="checkbox" id="${idPrefix}-${i}" value="${arr[i]}" checked>
          <label class="form-check-label" for="${idPrefix}-${i}">${arr[i]}</label>
        </div>
      </li>
    `;
  }
}

// TODO: figure out a method to prevent double clicks when clicking on the checkbox directly.
/**
 * @param {Event} e 
 */

// function updateData(e) {
//   const objRef = e.currentTarget.id.split('-')[0];
//   const objKey = e.currentTarget.value;
//   data[objRef][objKey] = e.currentTarget.checked;
// }

function init() {
  const lists = [armorList, grenadesList, primariesList, secondariesList, stratagemsList];

  buildChecklist(Object.keys(data.grenades), grenadesList, 'grenades');
  buildChecklist(Object.keys(data.primaries), primariesList, 'primaries');
  buildChecklist(Object.keys(data.secondaries), secondariesList, 'secondaries');
  buildChecklist(Object.keys(data.stratagems), stratagemsList, 'stratagems');
  buildChecklist(Object.keys(data.armor), armorList, 'armor');

  for (const list of lists) {
    const checkLis = list.querySelectorAll('li.list-group-item');
    for (const div of checkLis) {
      div.addEventListener('click', checkboxDivClickHandler);
    }
  }

  for (const list of lists) {
    const checkInputs = list.querySelectorAll("input[type=checkbox]");
    for (const input of checkInputs) {
      // input.addEventListener('change', updateData);
    }
  }
}

function getRandomItem(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getStratagems() {
  const strats = [];
  while (strats.length < 4) {
    const index = Math.floor(Math.random() * data.stratagems.length);
    if (!strats.includes(index)) {
      strats.push(index);
    }
  }

  // let stratagems = '';
  for (const stratagem of resultStratagems) {
    stratagem.innerHTML = data.stratagems[strats.pop()]
  }
  // for (const strat of strats) {
  //   stratagems += `${data.stratagems[strat]}, `;
  // }

  // return stratagems;
}

function handleRoll() {
  // const armor_set = getRandomItem(data.armor_sets);
  // resultHelmet.innerText = armor_set.helmet;
  // resultArmor.innerText = armor_set.armor;
  // resultCape.innerText = armor_set.cape;
  
  resultPrimary.innerText = getRandomItem(data.primaries);
  resultSecondary.innerText = getRandomItem(data.secondaries);
  resultGrenade.innerText = getRandomItem(data.grenades);
  // getStratagems();
}

init();
rollButton.addEventListener('click', handleRoll);