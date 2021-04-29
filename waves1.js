const squareSide = 38;
let circles = [];
let amplitude = 3*squareSide;
let hz = 0.5;
let waveLength = 35*squareSide;
let stop = false;
function dots(){
  let canvas = document.querySelector("canvas");
  let xult = window.innerWidth;
  let yult = window.innerHeight*4/5;
  let radi = 6;
  let midline = 0;
  for(let i=0; i<=yult/2; i+=squareSide){
    midline = i;
  }
  canvas.height = yult;
  canvas.width = xult;
  let c = canvas.getContext("2d");
  function Circle(x, y, radi, color){
    this.x = x;
    this.y = y;
    this.radi = radi;
    this.color = color;
    this.direction = -1;
    this.t = 1/60;
    this. draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radi, 0 , Math.PI *2, false);
      c.strokeStyle = this.color;
      c.stroke();
      c.fillStyle = this.color;
      c.fill();
    }
    this.update = () =>{
      this.y = amplitude*Math.cos((2*Math.PI/waveLength)*this.x - (2*Math.PI*hz*this.t))+(midline);
      this.t += 1/60
      this.draw();
    }
  }
  let y
  for(i=0; i<=xult; i+=19){
    y = amplitude*Math.cos(2*Math.PI/waveLength*i)+(midline);
    circles.push(new Circle(i, y, radi, "#99ff33", amplitude, hz));
  }
  function animate(){
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.strokeStyle = "black";
    if(stop){
      return;
    }
    requestAnimationFrame(animate);
    c.beginPath();
    for(let i=0; i < xult; i+=squareSide){
      c.moveTo(i,0);
      c.lineTo(i, yult);
    }
    for(let i=0; i < yult; i+=squareSide){
      c.moveTo(0,i);
      c.lineTo(xult, i);
    }
    c.stroke();
    circles.map((item)=> item.update())
  }
  animate()
  return;
}
function reset(){
  stop = true;
  
  amplitude = parseInt(document.getElementById("A-input").value)*squareSide;
  hz = parseFloat(document.getElementById("frequency-input").value);
  waveLength = parseInt(document.getElementById("length-input").value)*squareSide;

  stop = false;
}


function increment(inputId) {
  let field = document.getElementById(inputId);
  field.value = parseInt(field.value) + 1
  reset()
}

function decrement(inputId) {
  let field = document.getElementById(inputId);
  field.value = parseInt(field.value) - 1
  reset()
}