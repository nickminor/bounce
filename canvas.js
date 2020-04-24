var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 40;

var colorArray = [
  // '#99E8F0',
  // '#FFD65D',
  // '#FFC498',
  // '#FFBAD8',
  // '#FFA375',
  '#285348',
  '#6BDFC2',
  '#469380',
  '#4DA08B',
  '#3A7969',
  '#FFFFFF',
];

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
  this.minRadius = .5;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) { this.radius += .5 }
    }
    else if (this.radius > this.minRadius) {
      this.radius -= .5;
    }
    this.draw();

  }
}
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;
var circleArray = [];

for (var i = 0; i < 2000; i++) {
  var radius = Math.random() * 2 + 1;
  var x = Math.random() * (innerWidth - radius * 5) + radius;
  var y = Math.random() * (innerHeight - radius * 5) + radius;
  var dx = (Math.random() - .5);
  var dy = (Math.random() - .5);
  circleArray.push(new Circle(x, y, dx, dy, radius));
}
console.log(circleArray);
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();