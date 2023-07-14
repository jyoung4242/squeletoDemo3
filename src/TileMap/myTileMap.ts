import { TileMap, TileMapConfig, Tile } from "../../_Squeleto/LevelEditor";

//all level editor files are an extention of the TileMap class
export class mainMap extends TileMap {
  constructor(config: TileMapConfig, assets: any) {
    super(config);
    /* //set background
    if you wanted to embed a background image into the level editor
    this is the call you would make, but in this demo, the background
    is added independently
    this.backgroundImage = assets.image("mybgnd"); 
    */

    // Load Tiles, two ways for this to be done, as individual images, in which tere's not offset parameters
    // or as one image, in this case, and you tell the level editor which tiles to grab via the offset
    let TileT1 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 0, offsetY: 0 });
    let TileT2 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 64, offsetY: 0 });
    let TileT3 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 128, offsetY: 0 });
    let TileT4 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 0, offsetY: 64 });
    let TileT5 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 64, offsetY: 64 });
    let TileT6 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 128, offsetY: 64 });
    let TileT7 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 0, offsetY: 128 });
    let TileT8 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 64, offsetY: 128 });
    let TileT9 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 128, offsetY: 128 });

    let TileT10 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 320, offsetY: 0 });
    let TileT11 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 384, offsetY: 0 });
    let TileT12 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 448, offsetY: 0 });
    let TileT13 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 320, offsetY: 64 });
    let TileT14 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 384, offsetY: 64 });
    let TileT15 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 448, offsetY: 64 });
    let TileT16 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 320, offsetY: 128 });
    let TileT17 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 384, offsetY: 128 });
    let TileT18 = new Tile({ src: assets.image("tilemap"), tileWidth: 64, tileHeight: 64, offsetX: 448, offsetY: 128 });

    // Assign Tiles
    // this is the magic, this association let's the tilemap editor
    // know how to paint what ascii characters in the map with which tiles
    // and if you want a wall created with that tile, set that flag
    // if wall is false, then no wall collision body will be added
    let assignmentMap = new Map<string, { tile: Tile; wall: boolean }>();
    assignmentMap.set("7", { tile: TileT1, wall: false });
    assignmentMap.set("8", { tile: TileT2, wall: false });
    assignmentMap.set("9", { tile: TileT3, wall: false });
    assignmentMap.set("4", { tile: TileT4, wall: false });
    assignmentMap.set("5", { tile: TileT5, wall: false });
    assignmentMap.set("6", { tile: TileT6, wall: false });
    assignmentMap.set("1", { tile: TileT7, wall: false });
    assignmentMap.set("2", { tile: TileT8, wall: false });
    assignmentMap.set("3", { tile: TileT9, wall: false });

    assignmentMap.set("q", { tile: TileT10, wall: false });
    assignmentMap.set("w", { tile: TileT11, wall: false });
    assignmentMap.set("e", { tile: TileT12, wall: false });
    assignmentMap.set("a", { tile: TileT13, wall: false });
    assignmentMap.set("s", { tile: TileT14, wall: false });
    assignmentMap.set("d", { tile: TileT15, wall: false });
    assignmentMap.set("z", { tile: TileT16, wall: false });
    assignmentMap.set("x", { tile: TileT17, wall: false });
    assignmentMap.set("c", { tile: TileT18, wall: false });

    // passing the assignment map to the tileeditor
    this.setTileMapConfig(assignmentMap);
  }

  static async create(assets: any) {
    // the map is the ascii representation of the level to be created
    // these ascii characters will be replaced by tiles in the image
    let map = [
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
      "555555555555555555555555555555555555",
    ];

    // set's up the dims of the level
    let config: TileMapConfig = {
      template: map,
      tileSize: 64,
      rows: 11,
      cols: 36,
    };

    // creates new map level, AND triggers async initialization
    // which generates the map.image for the map object
    const mymap = new mainMap(config, assets);
    await mymap.initialize();
    return mymap;
  }
}
