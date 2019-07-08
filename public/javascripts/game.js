class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.canvasDOMEl = undefined;
    this.ctx = undefined;
    this.canvasW = 400;
    this.canvasH = 400;
    this.canvas, this.ctx, this.flag = false;
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    this.dot_flag = false;
    this.dataURL = undefined
    this.x = "black";
    this.y = 2;
    this.canvasImg = document.getElementById("canvasImg")
    this.intervalId = undefined;
    this.dataURL = undefined

  }



  init = () => {
    this.canvasDOMEl = document.getElementById("canvas")
    this.ctx = this.canvasDOMEl.getContext("2d")
    this.canvasDOMEl.setAttribute("height", this.canvasH);
    this.canvasDOMEl.setAttribute("width", this.canvasW)
    this.eventListers()
    this.draw()
    this.color()
    this.findxy()
    this.erase()
    this.intervalId = setInterval(() => {
      this.save()
    }, 1000 / 60)
  }

  eventListers = () => {
    this.canvasDOMEl.addEventListener("mousemove", (e) => {
      this.findxy('move', e)
      
    }, false);
    this.canvasDOMEl.addEventListener("mousedown", (e) => {
      this.findxy('down', e)
    }, false)
    this.canvasDOMEl.addEventListener("mouseup", (e) => {
      this.findxy('up', e)
    }, false)
    this.canvasDOMEl.addEventListener("mouseout", (e) => {
      this.findxy('out', e)
    }, false)
  }


  color = () => {
    document.getElementById("green").onclick = () => {this.x = "green"; this.y = 2}
    document.getElementById("blue").onclick = () => {this.x = "blue"; this.y = 2}
    document.getElementById("red").onclick = () => {this.x = "red"; this.y = 2}
    document.getElementById("yellow").onclick = () => {this.x = "yellow"; this.y = 2}
    document.getElementById("orange").onclick = () => {this.x = "orange"; this.y = 2}
    document.getElementById("black").onclick = () => {this.x = "black"; this.y = 2}
    document.getElementById("white").onclick = () => {this.x = "white"; this.y = 20}  
  }

  draw = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.x;
    this.ctx.lineWidth = this.y;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  erase = () => {
    document.getElementById("clr").onclick = () => {
      let m = confirm("Want to clear");
      if (m) {
      this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      this.canvasImg.style.display = "none";
    }}
  }

  save = () => {
    document.getElementById("canvasImg").style.border = "2px solid";
      this.dataURL = this.canvasDOMEl.toDataURL();
      document.getElementById("canvasImg").src = this.dataURL;
      document.getElementById("canvasImg").style.display = "inline";
  }
  

  findxy = (res, e) => {
    if (res == 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvasDOMEl.offsetLeft;
      this.currY = e.clientY - this.canvasDOMEl.offsetTop;

      this.flag = true;
      this.dot_flag = true;
      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.x;
        this.ctx.fillRect(this.currX, this.currY, 2, 2);
        this.ctx.closePath();
        this.dot_flag = false;
      }
    }
    if (res == 'up' || res == "out") {
      this.flag = false;
    }
    if (res == 'move') {
      if (this.flag) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvasDOMEl.offsetLeft;
        this.currY = e.clientY - this.canvasDOMEl.offsetTop;
        this.draw();
      }
    }
  }
}
