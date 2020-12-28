// const oval = document.querySelector('.oval')
// const diamond = document.querySelector(".diamond");
// const rectangle = document.querySelector('.rectangle')
// const parallelogram = document.querySelector(".parallelogram");
// const arrow = document.querySelector('.arrow')
const items=document.querySelectorAll('.item')
const empty = document.querySelector('.empty')
const container = document.querySelector("#container");
 let nodeList=[]
 let active = false;
 let currentX;
 let currentY;
 let initialX;
 let initialY;
 let xOffset = 0;
 let yOffset = 0;
let activeNode; 
// fill.addEventListener("dragstart", dragstart);
// fill.addEventListener("dragend", dragend);
container.addEventListener("touchstart", moveStart, false);
container.addEventListener("touchend", moveEnd, false);
container.addEventListener("touchmove", move, false);

container.addEventListener("mousedown", moveStart, false);
container.addEventListener("mouseup", moveEnd, false);
container.addEventListener("mousemove", move, false);



for (const item of items) {
    item.addEventListener("dragstart", dragstart);
    item.addEventListener("dragend", dragend);
}

    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);



function dragstart(e) {
  e.dataTransfer.setData('text/html',e.target.id)
    // this.className += " hold"
    // setTimeout(()=>this.className="invisible",0)
  
    
}

function moveStart(e) {
  nodeList = document.querySelectorAll("#container .item");
  console.log(e)
 for (let node of nodeList) {
     if (node.isEqualNode(e.target)) {
       active = true;
       activeNode = node;
       initialX = e.offsetX; 
       initialY = e.offsetY; 
    }
  }
  
}

function moveEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function move(e) {
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;
    setTranslate(currentX, currentY, activeNode);

  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function dragOver(e) {
    e.preventDefault()
  
}

function dragEnter(e) {
    e.preventDefault()
    // this.className +=" hovered"
  
}
function dragLeave() {
    // this.className = "empty";
  
}
function dragend() {
    // this.className = "empty";
  
}
function dragDrop(e) {
  e.preventDefault()
  const data = e.dataTransfer.getData("text/html");
  const nodeCopy = document.getElementById(data).cloneNode(true)
  nodeCopy.id = `${nodeCopy.id}${Math.floor(Math.random()*10000)}`;
  e.target.appendChild(nodeCopy)
   
    // this.className = "empty";
    // this.append(fill)

}