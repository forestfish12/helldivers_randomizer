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
  const checkInput = e.target.querySelector('input[type=checkbox]');
  console.log(checkInput);
  // checkInput.click(o);
  checkInput.checked = false;
  // console.log(!e.target.firstChild.checked);
  console.log("div clicked");
}

function appendToList(arr, listElement, idPrefix) {
  for (let i = 0; i < arr.length; i++) {
    listElement.innerHTML = listElement.innerHTML + `
      <li class="list-group-item">
        <div class="form-check" for="${idPrefix}-${i}">
          <input class="form-check-input" type="checkbox" id="${idPrefix}-${i}" checked>
          <label class="form-check-label" for="${idPrefix}-${i}">${arr[i]}</label>
        </div>
      </li>
    `;
  }
}

function init() {
  console.log("Hello World");
  const lists = [armorList, grenadesList, primariesList, secondariesList, stratagemsList];

  buildChecklist(Object.keys(data.grenades), grenadesList, 'grenades');
  buildChecklist(Object.keys(data.primaries), primariesList, 'primaries');
  buildChecklist(Object.keys(data.secondaries), secondariesList, 'secondaries');
  buildChecklist(Object.keys(data.stratagems), stratagemsList, 'stratagems');
  buildChecklist(Object.keys(data.armor), armorList, 'armor');

  // TODO: fix checkboxDivClickHandler to prevent errors when clicking on child elements instead of list element.
  // for (const list of lists) {
  //   const checkLis = list.querySelectorAll('li.list-group-item');
  //   for (const div of checkLis) {
  //     div.addEventListener('click', checkboxDivClickHandler);
  //   }
  // }
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