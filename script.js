const gridBtn = document.querySelector(".btn");
const dimText = document.querySelector(".dimSize");
const colorBtn = document.querySelector(".color");
const opacityBtn = document.querySelector(".transparency");
const bothFeat = document.querySelector(".both")

let opacityToggle = 0;
const getRandomRgb = () => Math.floor(Math.random() * 255);

function createGrid(dimension, operatingFunc) {
    const container = document.createElement("div");
    container.className = "container";
    document.body.appendChild(container)

    let hugeSquareSide = 2.25 * 16;
    let squareSide = hugeSquareSide / dimension;
    let unit = (window.innerWidth > window.innerHeight) ? "vw" : "vh";
    container.style.width = `${hugeSquareSide}${unit}`;
    container.style.height = `${hugeSquareSide}${unit}`;

    for (let i = 0; i < dimension**2; i++) {
        let box = document.createElement("div");
        box.style.height = `${squareSide}${unit}`;
        box.style.width = `${squareSide}${unit}`;
        box.style.opacity = opacityToggle;
        box.className = '0';
        container.appendChild(box);
    };
    
    operatingFunc(container);
    
    dimText.textContent = `${dimension}x${dimension}`;
};

function bothFeatures(container) {
    opacityToggle = 0;
    container.childNodes.forEach(child => child.addEventListener("mouseenter", () => {
        if (parseInt(child.className) < 10) {
            child.className = `${1+parseInt(child.className)}`;
        }
        child.style.opacity = parseFloat(`${child.className/10}`);
        child.style.backgroundColor = `rgb(${getRandomRgb()}, ${getRandomRgb()}, ${getRandomRgb()})`;
        child.style.transition = 'background-color 0s';
    }));
    container.childNodes.forEach(child => child.addEventListener("mouseleave", () => {
        child.style.backgroundColor = 'white';
        child.style.transition = 'background-color 2s ease';
    }));
}

function multipleColor(container) {
    opacityToggle = 1;
    container.childNodes.forEach(child => child.addEventListener("mouseenter", () => {
        child.style.backgroundColor = `rgb(${getRandomRgb()}, ${getRandomRgb()}, ${getRandomRgb()})`;
        child.style.transition = 'background-color 0s';
    }));
    container.childNodes.forEach(child => child.addEventListener("mouseleave", () => {
        child.style.backgroundColor = 'white';
        child.style.transition = 'background-color 2s ease';
    }));
}

function increasingOpacity(container) {
    opacityToggle = 0;
    container.childNodes.forEach(child => child.addEventListener("mouseenter", () => {
        if (parseInt(child.className) < 10) {
            child.className = `${1+parseInt(child.className)}`;
        }
        child.style.opacity = parseFloat(`${child.className/10}`);
        child.style.backgroundColor = 'black';
        child.style.transition = 'background-color 0s';
    }));
    container.childNodes.forEach(child => child.addEventListener("mouseleave", () => {
        child.style.backgroundColor = 'white';
        child.style.transition = 'background-color 2s ease';
    }));
}

createGrid(2, bothFeatures);

function removeGrid() {
    const container = document.querySelector(".container");
    container.remove();
}

function changeGrid(operatingFunc) {
    let newDim;
    while (true) {
        newDim = parseInt(prompt("Enter number of square per side (Max: 100)"));
        if (newDim <= 100) break;
    }
    removeGrid();
    createGrid(newDim, operatingFunc);
}

function colorBtnFunc() {
    opacityToggle = 1;
    changeGrid(multipleColor);
}

function opacityBtnFunc() {
    opacityToggle = 0;
    changeGrid(increasingOpacity);
}



gridBtn.addEventListener("click", () => changeGrid(bothFeatures));
colorBtn.addEventListener("click", () => colorBtnFunc());
opacityBtn.addEventListener("click", () => opacityBtnFunc());
bothFeat.addEventListener("click", () => changeGrid(bothFeatures));

