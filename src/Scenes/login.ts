/*
DEFAULT LOGIN SCREEN FOR DEMO
applies a anchor tag in middle to start the game scene
*/

import { Scene } from "../../_Squeleto/SceneManager";
import { MultiPlayerInterface, Regions, User, AuthenticationType } from "../../_Squeleto/Multiplayer";
import { Game } from "./game";

type GameType = "public" | "private";
type LoginStatus = "unconnected" | "connected";

/**************************
 * Lobby State
 *************************/
type LobbyState = {
  numPlayers: number;
  playerCapacity: number;
};

export class Login extends Scene {
  HathoraClient: MultiPlayerInterface = new MultiPlayerInterface(
    "app-fd2a351f-f6f4-4bae-ae58-70687bb2d9bb",
    (msg: any) => {
      console.log("login:", msg);
    },
    9000,
    [AuthenticationType.anonymous],
    true
  );
  name: string = "Login";
  playerCap: any;
  start = () => {
    this.setScene(this, 1);
  };
  get disableStatus() {
    if (this.loginStatus == "connected") return "";
    else return "disabled";
  }
  loginStatus: LoginStatus = "unconnected";
  openGames = <any>[];
  gameType: GameType = "public";
  region: Regions = "Chicago";
  user: User = { token: "", userdata: { id: "" } };
  privateActiveCSS: string = "";
  publicActiveCSS: string = "";
  isLobbiesEmpty: boolean = true;
  roomJoinInput: any;
  setGamePublic = () => {
    this.gameType = "public";
    this.publicActiveCSS = "lbyFlip";
    this.privateActiveCSS = "";
  };
  setGamePrivate = () => {
    this.gameType = "private";
    this.privateActiveCSS = "lbyFlip";
    this.publicActiveCSS = "";
  };
  login = async () => {
    if (this.loginStatus == "connected") return;
    this.user = await this.HathoraClient.login();
    this.refreshLobbies();

    if (this.user.token != "" && this.user.userdata?.id != "") {
      this.loginStatus = "connected";
    }
  };
  refreshLobbies = async () => {
    const lobbies = await this.HathoraClient.getPublicLobbies();
    this.openGames = [];
    if (lobbies?.length != 0) {
      this.isLobbiesEmpty = false;
      lobbies?.forEach(lobby => {
        console.log(lobby);
        this.openGames.push({
          roomId: lobby.roomId,
          playerCap: (lobby.initialConfig as LobbyState).playerCapacity,
          numPlayers: lobby.state ? this.getNumPlayers(lobby.state as LobbyState) : 0,
          server: lobby.region,
          owner: lobby.createdBy,
          started: lobby.createdAt.toLocaleDateString(),
        });
      });
    } else this.isLobbiesEmpty = true;
  };

  createGame = async () => {
    const cap = parseInt(this.playerCap.value);
    if (this.loginStatus == "unconnected") return;
    const lobbyState: LobbyState = {
      playerCapacity: cap,
      numPlayers: 0,
    };
    await this.HathoraClient.createRoom(this.gameType, this.region, lobbyState);
    this.refreshLobbies();
  };

  public template = `
  <style>
    .LoginGrid{
      display: grid;
      grid-template-columns: 10px 1fr 1fr 1fr 1fr 1fr 10px;
      grid-template-rows: 10px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 10px;
      row-gap:3px;
      column-gap: 3px;
      width: 100%;
      height: 100%;
      
    }
    .Title{
      border: 1px solid white;
      border-radius: 3px;
      grid-column-start: 2;
      grid-column-end: 7;
      grid-row-start: 2;
      grid-row-end: 3;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }
    .openGames{
      font-size: x-small;
      border: 1px solid white;
      border-radius: 3px;
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 3;
      grid-row-end: 9;
      overflow-y: scroll; 
    }
    .createGame{
      border: 1px solid white;
      border-radius: 3px;
      grid-column-start: 5;
      grid-column-end: 7;
      grid-row-start: 3;
      grid-row-end: 7;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 8px;
    }
    .JoinGame{
      width: 100%;
      border: 1px solid white;
      border-radius: 3px;
      grid-column-start: 5;
      grid-column-end: 7;
      grid-row-start: 7;
      grid-row-end: 9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }

    .joinGameInput{
      width: 100px;
    }

    .createGameButtons{
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    .lbyButton{
      border: 1px solid white;
      border-radius: 5000px;
      padding-left: 4px;
      padding-right: 4px;
    }
    .lbyButton:hover,
    .lbySelect:hover{
      box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.75);
      cursor: pointer;
    }
    .lbyButton.disabled:hover{
      cursor: not-allowed;
      border: 1px solid #333333;
      color: #333333;
    }

    .lbyFlip{
      background-color: white;
      color: black;

    }

    .opengame{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 94%;
      margin: 2.5px;
      border: 0.5px solid white;
      font-size: 0.4vw;
      gap: 2px;
      padding-left: 2px;
      padding-right: 2px;
    }
    .lbyServerdata{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .titleblock{
      width: 94%;
      display:flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.4vw;
      background-color: #333333;
      margin: 2.5px;
      padding-left: 2px;
      padding-right: 4px;
    }

    .disabled{
      cursor: not-allowed;
    }

    .smallbutton{
      width: 20%; 
      font-size: xx-small;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }


  </style>
  <div class="scene" style="width: 100%; height: 100%; position: absolute; top: 0; left:0; color: white;">
    
    <div class="LoginGrid">
        <div class="Title"><div>SQUELETO DEMO 3</div></div>
        <div class="openGames">
          <div \${click@=>refreshLobbies} style="cursor: pointer">Public Games - refresh</div>
          <div class="titleblock">
            <div class="titleblockID">Room ID</div>
            <div class="titleblockPlayers">Spots Free</div>
            <div class="titleblockServer">Server Deets</div>
            <div class="titleblockJoin">Join</div>
          </div>
          <div \${!==isLobbiesEmpty}>
            <div class='opengame' \${opengame<=*openGames}>
              <div class="lbyRoomID">
              \${opengame.roomId}
              </div>  
              <div class="">
                \${opengame.numPlayers}/\${opengame.playerCap}
              </div>  
              <div class="lbyServerdata">
                <div style="display: flex; justify-content: space-evenly; align-items: center; gap: 3px;">
                    <div>\${opengame.server}</div>
                    <div>\${opengame.started}</div>
                </div>
                <div>Owner: \${opengame.owner}</div>  
              </div>  
              <div class="">
                <div class="lbyButton" \${click@=>joinPublicGame}>Join</div>
              </div>  
            
            </div>
          </div>
          <div class='opengame' \${===isLobbiesEmpty}>
            <div style="text-align: center; padding: 4px;"> There are no public games available, please login and create a new game!</div>  
          </div>
        </div>
        <div class="createGame">
          <div class="createGameButtons">
            <div class="lbyButton \${publicActiveCSS}" \${click@=>setGamePublic} >Public</div>
            <div class="lbyButton \${privateActiveCSS}" \${click@=>setGamePrivate}>Private</div>
          </div>
          
            <select class="lbySelect" name="server" id="server">
              <option value="Seattle">Seattle</option>
              <option value="Washington_DC">Washingon DC</option>
              <option value="Chicago" selected>Chicago</option>
              <option value="London">London</option>
              <option value="Frankfurt">Frankfurt</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Singapore">Singapore</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Sydney">Sydney</option>
              <option value="Sao_Paulo">Sao Paulo</option>
            </select>
            <select \${==>playerCap} class="lbySelect" name="player" id="player">
              <option value="1">1 Player</option>
              <option value="2">2 Players</option>
              <option value="3">3 Players</option>
            </select>
            <div class="lbyButton" \${click@=>login}>Login</div>
            <div class="lbyButton \${disableStatus}" \${click@=>createGame} >Create Game</div>
          
        </div>
        <div class="JoinGame">
          <div> Join Game </div>
          <div style="display: flex; width: 100%; justify-content:space-evenly;">
            <input class="joinGameInput"  style="width: 55%;" \${==>roomJoinInput}></input>
            <div class="lbyButton smallbutton" \${click@=>joinRoom}>Join</div>
          </div>
        </div>
    </div>
      
  </div>`;

  public init() {
    //fire up client
  }

  joinPublicGame = async (e: any, model: any) => {
    console.log(model);
    console.log(model.opengame.roomId);

    await this.HathoraClient.enterRoom(model.opengame.roomId);
  };

  joinRoom = async (e: any, model: any) => {
    if (this.roomJoinInput.value == "") return;
    await this.HathoraClient.enterRoom(this.roomJoinInput.value);
    this.passedParams.push(this.HathoraClient);
    this.start();
  };

  getNumPlayers = (state: LobbyState): number => {
    return state.numPlayers;
  };
}
