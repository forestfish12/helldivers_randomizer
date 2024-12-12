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

const armors = data.armor_sets.map(x => x.armor)

function appendToList(arr, listElement, idPrefix) {
  for (let i = 0; i < arr.length; i++) {
    listElement.innerHTML = listElement.innerHTML + `
      <li class="list-group-item">
        <div class="form-check">
          <input class="form-check-input " type="checkbox" id="${idPrefix}-${i}">
          <label class="form-check-label" for="${idPrefix}-${i}">${arr[i]}</label>
        </div>
      </li>
    `;
  }
}

function init() {
  console.log("Hello World");


  appendToList(data.grenades, grenadesList, 'grenade');
  appendToList(data.primaries, primariesList, 'primary');
  appendToList(data.secondaries, secondariesList, 'secondary');
  appendToList(data.stratagems, stratagemsList, 'stratagem');
  appendToList(armors, armorList, 'armor');
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
  console.log('rolled');
  const armor_set = getRandomItem(data.armor_sets);

  resultHelmet.innerText = armor_set.helmet;
  resultArmor.innerText = armor_set.armor;
  resultCape.innerText = armor_set.cape;
  resultPrimary.innerText = getRandomItem(data.primaries);
  resultSecondary.innerText = getRandomItem(data.secondaries);
  resultGrenade.innerText = getRandomItem(data.grenades);
  getStratagems();
}

init();
rollButton.addEventListener('click', handleRoll);