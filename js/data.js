const ITEM_RARITIES = ["Common", "Unusual", "Rare", "Epic"];
const MONSTER_NAMES = [
  "Anti Fairy",
  "Gibdo",
  "Moblin",
  "Scissor Beetle",
  "Armos",
  "Keaton",
  "Moldworm",
  "Spiked Beetle",
  "Ball Chain Soldier",
  "Keese",
  "Octorok",
  "Stalfos",
  "Black Knight",
  "Lakitu",
  "Rope",
  "Wizzrobe Fire",
];
const MAX_MONSTERS = 8;
const ENTITY_SIZE = 32;

//UTILITY FUNCTIONS
function getRandomInt(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function newElement(element, attribute, name) {
  let el = document.createElement(element);
  el.setAttribute(attribute, name);
  return el;
}
function makeRow() {
  return newElement("div", "class", "row");
}
function assertEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((e, i) => {
    return e === arr2[i];
  });
}
function compareObj(obj1, obj2) {
  return assertEquals(Object.keys(obj1), Object.keys(obj2));
}
