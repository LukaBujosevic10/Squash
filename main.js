'use strict'
let string = 'Luka Bujosevic';
let arr = string.split('');
console.log(arr);
let s = 2;
let brojac = 0;
let canvas;
let context;
let con_player;
let merac_vremena = 0;
let oduzimac_vremena = 0;
let i = 0;
let player = {position: {x: 100, y: 260},
              weidth: 70,
              color: 'blue',};
let ball = {position: {x: 125, y: 70},
            color: '#ff00dc',};
canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
makeCanvas();
function makeCanvas() {

  context.fillStyle = '#000';
  context.fillRect(10, 10, 400, 400);
  makePlayer(player.position, player.weidth, player.color);
  makingBall();
}
function makePlayer(p, w, c){
//  makeCanvas();
  context.fillStyle = c;

  context.fillRect(p.x, p.y, w, 15);

}
//makePlayer(player.position, player.weidth, player.color);
function playerMove() {
  document.addEventListener('keydown', function(e) {
    if (e.which == 39) {

      player.position.x = player.position.x +2;

      if (player.position.x >= 230) {
        player.position.x= 230;
      }

    }else if (e.which == 37) {
      player.position.x = player.position.x -2;
      if (player.position.x <= 10) {
        player.position.x= 10;
      }
    }
    makeCanvas();

  })
}
playerMove();
function makingBall() {

  context.beginPath();
  context.fillStyle = ball.color;
  context.arc(ball.position.x, ball.position.y, 10, 0, 2 * Math.PI);
  context.fill();
  context.fillStyle = "black"
  context.font = "16px Arial";

  if (i == arr.length) {
    i = 0;
  }
  context.fillText(arr[i],ball.position.x-4,ball.position.y+4);
}
makingBall();
function moveBall(timestamp) {
  merac_vremena = timestamp - oduzimac_vremena;

if (merac_vremena >= 10) {
  if (s == 2) {
      ball.position.y+= 1;


  }else if (s == 7) {
    ball.position.y--;
    ball.position.x--;
  }else if (s == 8) {
    ball.position.y--;
  }else if (s == 9) {
    ball.position.y--;
    ball.position.x++;
  }else if (s == 1) {
    ball.position.y++;
    ball.position.x--;
  }else if (s == 3) {
    ball.position.y++;
    ball.position.x++;
  }
  provera_odbijanja_od_zida();
  provera_odbijanja();
  provera_pada();
  oduzimac_vremena = timestamp;
  merac_vremena = 0;
  makeCanvas();
}



window.requestAnimationFrame(moveBall);
}
moveBall();
  function provera_odbijanja() {
    if (ball.position.y == player.position.y - 10 && player.position.x <= ball.position.x && player.position.x +player.weidth >= ball.position.x) {
      let sredina_playera = player.position.x + player.weidth/2;
      i++;
      if (ball.position.x < sredina_playera) {
        s = 7;
      }else if (ball.position.x == sredina_playera) {
        s = 8;
      }else {
        s = 9;
      }
    }
  }
  function provera_odbijanja_od_zida() {
    if (ball.position.x == 20) {
      if (s == 7) {
        s = 9;
      }else {
        s = 3;
      }
      i++;
    }
    if (ball.position.x == 290) {
      if (s == 9) {
        s = 7;
      }else {
        s = 1;
      }
      i++;
    }
    if (ball.position.y == 20) {
      if (s == 7) {
        s = 1;
      }else if(s == 8){
        s =2;
      }else {
        s = 3;
      }
      i++;
    }
  }
function provera_pada() {
  if (ball.position.y == 315) {
    s = 2;
    let rnd = Math.floor(Math.random() * 300) + 10;
    console.log(rnd);
    ball.position.x =rnd;
    ball.position.y = 70;
  }

}
