class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)

    //Added this line to call the static function. Since we are not creating player class objects, we have to do this
    Player.getPlayerInfo();

    if(allPlayers !== undefined){

      var display_position = 130;
      for(var plr in allPlayers){

        //Changed players.index to player.index (typo)
        if(plr === "player"+ player.index)
        fill("red")
        else
        fill("black");
      
      display_position+=20;
      textSize(20);
      text(allPlayers[plr].name + ": "+ allPlayers[plr].distance,120, display_position);
    }
  }

    //Remove double quotes from UP_ARROW
    if(keyIsDown(UP_ARROW) && player.index !== null){
       player.distance += 50;
       player.update();
    }
   
}
}