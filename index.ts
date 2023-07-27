
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

interface Tile {
  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;
  getColor(): string;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  isEdible(): boolean;
  isPushable(): boolean;
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isKey2(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
}

class Air implements Tile {
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
  getColor() { return '#ffffff'; }
  isEdible() { return true; }
  isPushable() { return false; }
  isAir() { return true; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Flux implements Tile {
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#ccffcc'; }
  isEdible() { return true; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return true; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Unbreakable implements Tile {
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  getColor() { return '#999999'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return true; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Player implements Tile {
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
  getColor() { return '#ff0000'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return true; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Stone implements Tile {
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {
    if ((this.isPushable())
      && map[playery][playerx + dx + dx].isAir()
      && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#0000cc'; }
  isEdible() { return false; }
  isPushable() { return true; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return true; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class FallingStone implements Tile {
  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#0000cc'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return true; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Box implements Tile {
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {
    if ((this.isPushable())
      && map[playery][playerx + dx + dx].isAir()
      && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#8b4513'; }
  isEdible() { return false; }
  isPushable() { return true; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return true; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class FallingBox implements Tile {
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#8b4513'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return true; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Key1 implements Tile {
  moveVertical(dy: number): void {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#ffcc00'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return true; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Key2 implements Tile {
  moveVertical(dy: number): void {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#00ccff'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return true; }
  isLock1() { return false; }
  isLock2() { return false; }
}

class Lock1 implements Tile {
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#ffcc00'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return true; }
  isLock2() { return false; }
}

class Lock2 implements Tile {
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = this.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  getColor() { return '#00ccff'; }
  isEdible() { return false; }
  isPushable() { return false; }
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isLock1() { return false; }
  isLock2() { return true; }
}

enum RawInput {
  UP, DOWN, LEFT, RIGHT
}

interface Input {
  handle(): void;
}

class Up implements Input {
  handle(): void {
    moveVertical(-1);
  }
}

class Down implements Input {
  handle(): void {
    moveVertical(1);
  }
}

class Left implements Input {
  handle(): void {
    moveHorizontal(-1);
  }
}

class Right implements Input {
  handle(): void {
    moveHorizontal(1);
  }
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
let map: Tile[][];

let inputs: Input[] = [];

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

function transformTile(rawTile: RawTile) {
  switch (rawTile) {
    case RawTile.AIR: return new Air();
    case RawTile.BOX: return new Box();
    case RawTile.FALLING_BOX: return new FallingBox();
    case RawTile.STONE: return new Stone();
    case RawTile.FALLING_STONE: return new FallingStone();
    case RawTile.FLUX: return new Flux();
    case RawTile.PLAYER: return new Player();
    case RawTile.UNBREAKABLE: return new Unbreakable();
    case RawTile.KEY1: return new Key1();
    case RawTile.KEY2: return new Key2();
    case RawTile.LOCK1: return new Lock1();
    case RawTile.LOCK2: return new Lock2();
    default: throw new Error("Unknown tile: " + rawTile);
  }
}

function remove(tile: Tile) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === tile) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  map[playery][playerx + dx].moveHorizontal(dx);
}

function moveVertical(dy: number) {
  map[playery + dy][playerx].moveVertical(dy);
}

function update() {
  handleInputs();

  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      if ((map[y][x].isStone() || map[y][x].isFallingStone())
        && map[y + 1][x].isAir()) {
        map[y + 1][x] = new FallingStone();
        map[y][x] = new Air();
      } else if ((map[y][x].isBox() || map[y][x].isFallingBox())
        && map[y + 1][x].isAir()) {
        map[y + 1][x] = new FallingBox();
        map[y][x] = new Air();
      } else if (map[y][x].isFallingStone()) {
        map[y][x] = new Stone();
      } else if (map[y][x].isFallingBox()) {
        map[y][x] = new Box();
      }
    }
  }
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
  }
}

function draw() {
  const g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function createGraphics() {
  const canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  const g = canvas.getContext("2d");
  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      drawTile(y, x, g);
    }
  }
}

function drawTile(y: number, x: number, g: CanvasRenderingContext2D) {
  map[y][x].draw(g, x, y);
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  e.preventDefault();
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});

