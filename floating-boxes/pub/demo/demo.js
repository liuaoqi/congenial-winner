'use strict';

const boxes = new FloatingBoxGenerator(0);
let i = 0;

// Adding new boxes
const createBoxBtn = document.getElementById("create-new-btn");
createBoxBtn.addEventListener('click', function() {

    boxes.createBox(i);

    /* Get name of the box using getBoxNameById(id) */
    const boxName = boxes.getBoxNameById(i);

    const nameElement = document.createElement('h5');
    nameElement.innerText = 'Box Name: ' + boxName;
    nameElement.style = 'margin: 15px; z-index: 0; overflow: auto;'
    /* Adding the DOM element to the box using addDOMById(element, id) */
    boxes.addDOMById(nameElement, i);

    /* Get the box DOM Element using getBoxDOMById(id) */
    const box = boxes.getBoxDOMById(i);

    const idElement = document.createElement('h5');
    idElement.innerText = 'DOM Id: ' + box.id;
    idElement.style = 'margin: 15px; z-index: 0; overflow: auto;'
    boxes.addDOMById(idElement, i);

    const defaultText = document.createElement('h5');
    defaultText.innerText = 'This is a new box with default styling.'
    defaultText.style = 'margin: 15px; z-index: 0; overflow: auto;'
    boxes.addDOMById(defaultText, i);

    i++;
});

// Enable dragging

const enableAllDraggingBoxBtn = document.getElementById("enable-dragging-btn");
enableAllDraggingBoxBtn.addEventListener('click', function() {
    boxes.enableDragging();
    let setOfBoxes = boxes.getBoxes();
    let curr;
    for (var box in setOfBoxes) {
        curr = setOfBoxes[box].domElement;
        curr.children[curr.children.length - 1].innerText = 'This box is available for dragging. Please try to drag it around the webpage.'
    }
})

// Disable dragging
const disableAllDraggingBoxBtn = document.getElementById('disable-dragging-btn');
disableAllDraggingBoxBtn.addEventListener('click', function() {
    boxes.disableDragging();
    let setOfBoxes = boxes.getBoxes();
    let curr;
    for (var box in setOfBoxes) {
        curr = setOfBoxes[box].domElement;
        curr.children[curr.children.length - 1].innerText = 'This box is no longer draggable. Please enable again if needed.'
    }
})

// Deleting boxes
const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener('click', function() {
    i--;
    boxes.removeBoxById(i);
});
