
const items = document.querySelectorAll('.item')
const empty = document.querySelector('.empty')
let nodeList = []
 
 let active = false;
 let currentX;
 let currentY;
 let initialX;
 let initialY;
 let xOffset = 0;
 let yOffset = 0;
let activeItem; 

 const container = document.querySelector("#container");
 const containerLeftX = container.getBoundingClientRect().left;
 const containerRightX = container.getBoundingClientRect().right;
 const containerBottomY = container.getBoundingClientRect().bottom;
const containerTopY = container.getBoundingClientRect().top;
 
const deleteBlock = document.querySelector('#delete')
const deleteBlockwidth = deleteBlock.getBoundingClientRect().right;
const deleteBlockHeight = deleteBlock.getBoundingClientRect().top;
const deleteBlockBottom= deleteBlock.getBoundingClientRect().bottom;


container.addEventListener("mousedown", moveStart);
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
}

function moveStart(e) {
 
 if (e.target !== e.currentTarget) {
   active = true;
   activeItem = e.target;

   if (activeItem !== null) {
     if (!activeItem.xOffset) {
       activeItem.xOffset = 0;
     }

     if (!activeItem.yOffset) {
       activeItem.yOffset = 0;
     }

     activeItem.initialX = e.clientX - activeItem.xOffset;
     activeItem.initialY = e.clientY - activeItem.yOffset;
   }

  
    
 }
  
}

function moveEnd(e) {
  if (activeItem !== null) {
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;
  }

  active = false;
  activeItem = null;
}

function move(e) {
  if (active ) {
    console.log("element type", e.target.nodeName === "DIV");
    e.preventDefault();

    // console.log("clientY", e.clientY);
    //      console.log("pagex",e.pageX)
    //console.log("offset", e.offsetY)
    //   console.log("screenx", e.screenX)

    const height = e.target.getBoundingClientRect().height;
    const width = e.target.getBoundingClientRect().width;
    const currentItemLeftPosition = e.clientX - e.offsetX;
    const currentItemRightPosition = e.clientX - e.offsetX + width;
    const currentItemTopPosition = e.clientY - e.offsetY;
    const currentItemBottomPosition = e.clientY - e.offsetY + height;
    console.log("left",currentItemLeftPosition)
    console.log("comp left",deleteBlockwidth)
    console.log("ITM BTM", currentItemBottomPosition);
    console.log("del btm", deleteBlockHeight)
    if (currentItemLeftPosition < deleteBlockwidth-4 && currentItemBottomPosition > deleteBlockHeight) {
      const deleteNodeId =e.target.id;
      document.getElementById(deleteNodeId).remove()
    }
    // if (
    //   currentItemRightPosition > containerRightX ||
    //   currentItemLeftPosition < containerLeftX ||
    //   currentItemTopPosition < containerTopY ||
    //   currentItemBottomPosition > containerBottomY
    // ) {
    //   console.log("Out of range");
    // } else {
    
      activeItem.currentX = e.clientX - activeItem.initialX;
    activeItem.currentY = e.clientY - activeItem.initialY;

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  
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
  const xOffset=e.offsetX
  const yOffset=e.offsetY
  const nodeCopy = document.getElementById(data).cloneNode(true)
 nodeCopy.style.width = "48px";
  
  const id = `${nodeCopy.id}${Math.floor(Math.random() * 10000)} resizable`;
  nodeCopy.id = id
  nodeCopy.className += " resizable"
  let classs = nodeCopy.className.split(" ")[1]

  if (classs === "line") {
    nodeCopy.className += " rotate ";
  }

  if (classs === 'rectangle') {
     nodeCopy.style.height = "55px";
     nodeCopy.style.width = "80px";
  }
  if (classs === "parallelogram") {
    nodeCopy.style.height = "50px";
    nodeCopy.style.width = "80px";
  }
  if (classs === "oval") {
     nodeCopy.style.height = "40px";
     nodeCopy.style.width = "80px";
  }
  if (classs !=="line") {
    const inputElement = document.getElementById("input").cloneNode(true);
    inputElement.style.resize = "both";
    nodeCopy.appendChild(inputElement);

  }
  e.target.appendChild(nodeCopy);
  console.log(nodeCopy.className)
  rotateArrow()
}

function rotateArrow() {
  const arrows = document.querySelectorAll(".rotate");
  console.log(arrows)
  for (const arrow of arrows) {
    arrow.addEventListener("dblclick", function () {
      
      const div = document.getElementById(this.id);
      let rStyle = div.style.webkitTransform;
      let deg = 90;
      if (rStyle) {
        deg = Number(rStyle.replace(/[^\d.]/g, "")) + 90;
      }
      
    });
  }
}