//Create the Player class

class Player extends Creature {
  /*   - constructor
  - parameters: name (string), position (Position), board (Board), level (number), items (Item[]), gold (number)
  - Sets the attackSpeed to 2000 / level
  - Sets the exp to 0
  - Sets the position and board */
  constructor(name, position, board, level, items, gold) {
    super(name, "imgs/player/front.png", level, items, gold);
    this.attackSpeed = 2000 / this.level;
    this.position = position;
    this.exp = 0;
    this.element.style.position = "absolute";
    this.element.setAttribute("id", "playerElement");
    this.sound = "pattack";
    //this.hasKey = this.checkKey();
  }
  hasKey() {
    return this.items.some(item => item instanceof Key);
  }
  render(root = boardElement) {
    //- parameters: root (HTMLElement)
    root.appendChild(this.element);
    //- Appends the element to the root (the board HTML element)
    this.getSelector();
    //- Updates the player position
  }
  update() {
    //- Updates the player's HTML element position based on its position property and ENTITY_SIZE
    this.element.style.top = `${ENTITY_SIZE * this.position.row}px`;
    this.element.style.left = `${ENTITY_SIZE * this.position.column}px`;
    if (!player.selector) this.render();
  }
  moveToPosition(position) {
    //- moves to position specified unless it is a Wall entity.

    if (
      position.row !== 0 &&
      position.row !== board.rows.length - 1 &&
      position.column !== 0 &&
      position.column !== board.columns - 1
    ) {
      this.position = position;
      //- updates player (update method)
      this.update();
    }
  }
  move(direction) {
    //parameters: direction (string)
    // Sets the player image based on direction and moves to new position
    switch (direction) {
      case "up":
        this.setImg("imgs/player/back.png");
        this.moveToPosition(
          new Position(this.position.row - 1, this.position.column)
        );
        break;
      case "down":
        this.setImg("imgs/player/front.png");
        this.moveToPosition(
          new Position(this.position.row + 1, this.position.column)
        );

        break;
      case "left":
        this.setImg("imgs/player/left.png");
        this.moveToPosition(
          new Position(this.position.row, this.position.column - 1)
        );

        break;
      case "right":
        this.setImg("imgs/player/right.png");
        this.moveToPosition(
          new Position(this.position.row, this.position.column + 1)
        );

        break;

      default:
        break;
    }
  }
  getSelector() {
    this.selector = document.querySelector("#playerElement");
  }
  useItem(item, target) {
    item.use(target);
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (compareObj(element, item)) {
        this.items.splice(index, 1);
        return;
      }
    }
  }
  /* - getExpToLevel (function)
  - parameters: none
  - returns exp needed to level: level * 10 */
  getExpToLevel() {
    return this.level * 10;
  }

  /* - getExp (function)
  - parameters: entity (Monster)
  - adds exp based on entity level (level * 10)
  - level up if enough exp. It is possible to level up multiple times at once if enough exp is earned (e.g. beat enemy level 3) */
  getExp(entity) {
    this.exp += entity.level * 10;
    if (this.exp >= this.getExpToLevel()) {
      this.levelUp();
    }
  }
  levelUp() {
    this.level += 1;
    this.hp = this.getMaxHp();
    this.strength = this.level * 10;
    this.attackSpeed = 3000 / this.level;
    sounds.levelup.play();
    if (this.exp >= this.getExpToLevel()) {
      this.levelUp();
    }
  }
  /* - levelUp (function)
  - parameters: entity (Monster)
  - Increments level, sets hp to max hp
  - updates strength (level * 10) and attack speed (3000 / level)
  - plays levelup sound */

  /*   - parameters: item (Item), tradesman (Tradesman)
  - updates gold and items for both player and tradesman.
  - Plays the trade sound
  - returns true if successful trade, false if gold is insufficient */
  buy(item, tradesman) {}
}

/*
Player class definition. Player is a Creature
- constructor
  - parameters: name (string), position (Position), board (Board), level (number), items (Item[]), gold (number)
  - Sets the attackSpeed to 2000 / level
  - Sets the exp to 0
  - Sets the position and board
- attackSpeed (number)
- exp (number)
- position (Position)
- board (Board)
- render (function)
  - parameters: root (HTMLElement)
  - Appends the element to the root (the board HTML element)
  - Updates the player position
- update (function)
  - parameters: none
  - Updates the player's HTML element position based on its position property and ENTITY_SIZE
- moveToPosition (Position)
  - moves to position specified unless it is a Wall entity.
  - updates player (update method)
- move (function)
  - parameters: direction (string)
  - Sets the player image based on direction and moves to new position
- pickup (function)
  - parameters: entity (Item || Gold)
  - Adds item or gold and plays the corresponding sound ('loot' or 'gold' respectively)
- attack (function)
  - parameters: (entity)
  - calls the attack method from Creature (use super) and plays the 'pattack' sound if the attack was successful
- buy (function)
  - parameters: item (Item), tradesman (Tradesman)
  - updates gold and items for both player and tradesman.
  - Plays the trade sound
  - returns true if successful trade, false if gold is insufficient
- sell (function)
  - parameters: item (Item), tradesman (Tradesman)
  - updates gold and items for both player and tradesman.
  - Plays the trade sound
  - returns true if successful trade, false if gold is insufficient
- useItem (function)
  - parameters: item (Item), target (Creature)
  - uses the item on the target and removes it from the player
- loot (function)
  - parameters: entity (Monster || Dungeon)
  - Updates gold and items for both player and dungeon or monster.
  - plays the loot sound
- getExpToLevel (function)
  - parameters: none
  - returns exp needed to level: level * 10
- getExp (function)
  - parameters: entity (Monster)
  - adds exp based on entity level (level * 10)
  - level up if enough exp. It is possible to level up multiple times at once if enough exp is earned (e.g. beat enemy level 3)
- levelUp (function)
  - parameters: entity (Monster)
  - Increments level, sets hp to max hp
  - updates strength (level * 10) and attack speed (3000 / level)
  - plays levelup sound
Example use:
new Player('Van', new Position(5, 5), new Board(10, 10), 1, [new Potion(0)]);
*/
