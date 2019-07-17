let game = new Game()
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  startGame = () => {
      game.init()
  }
};

