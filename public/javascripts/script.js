document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// class Game {
//   constructor(player1, player2) {
//     this.player1 = player1;
//     this.player2 = player2;
//     this.canvasDOMEl = undefined;
//     this.ctx = undefined;
//     this.canvasW = 750;
//     this.canvasH = 750;
//     this.canvas, this.ctx, this.flag = false;
//     this.prevX = 0;
//     this.currX = 0;
//     this.prevY = 0;
//     this.currY = 0;
//     this.dot_flag = false;
//     this.dataURL = undefined
//     this.color = "black";
//     this.pencilY = 2;
//     this.canvasImg = document.getElementById("canvasimg")
//   }



//   init = () => {
//     this.canvasDOMEl = document.getElementById("canvas")
//     this.ctx = this.canvasDOMEl.getContext("2d")
//     this.canvasDOMEl.setAttribute("height", this.canvasH);
//     this.canvasDOMEl.setAttribute("width", this.canvasW)
//     this.eventListener()
//     this.draw()
//     this.save()
//     this.findxy()
//   }

//   eventListener = () => {
//     this.canvasDOMEl.addEventListener("mousemove", function (e) {
//       findxy('move', e)
//     }, false);
//     this.canvasDOMEl.addEventListener("mousedown", function (e) {
//       findxy('down', e)
//     }, false);
//     this.canvasDOMEl.addEventListener("mouseup", function (e) {
//       findxy('up', e)
//     }, false);
//     this.canvasDOMEl.addEventListener("mouseout", function (e) {
//       findxy('out', e)
//     }, false);
//   }

//   draw = () => {
//     this.ctx.beginPath();
//     this.ctx.moveTo(this.prevX, this.prevY);
//     this.ctx.lineTo(this.currX, this.currY);
//     this.ctx.strokeStyle = this.color;
//     this.ctx.lineWidth = this.pencilY;
//     this.ctx.stroke();
//     this.ctx.closePath();
//   }
  
//     findxy = (res, e) => {
//       if (res == 'down') {
//         this.prevX = this.currX;
//         this.prevY = this.currY;
//         this.currX = e.clientX - this.canvasDOMEl.offsetLeft;
//         this.currY = e.clientY - this.canvasDOMEl.offsetTop;
  
//         this.flag = true;
//         this.dot_flag = true;
//         if (this.dot_flag) {
//           this.ctx.beginPath();
//           this.ctx.fillStyle = this.x;
//           this.ctx.fillRect(this.currX, this.currY, 2, 2);
//           this.ctx.closePath();
//           this.dot_flag = false;
//         }
//       }
//       if (res == 'up' || res == "out") {
//         this.flag = false;
//       }
//       if (res == 'move') {
//         if (this.flag) {
//           this.prevX = this.currX;
//           this.prevY = this.currY;
//           this.currX = e.clientX - this.canvasDOMEl.offsetLeft;
//           this.currY = e.clientY - this.canvasDOMEl.offsetTop;
//           this.draw();
//         }
//       }
//     }


//   save = () => {
//     this.canvasImg.style.border = "2px solid";
//     this.dataURL = this.canvasDOMEl.toDataURL();
//     this.canvasImg.src = this.dataURL;
//     this.canvasImg.style.display = "inline";
//   }
// }
