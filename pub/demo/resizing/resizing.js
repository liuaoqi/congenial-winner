'use strict';

// Enable resizing
const resizingBtn = document.getElementById('enable-resizing-btn');
resizingBtn.addEventListener('click', function() {
    // Enable resizing of all boxes
    boxes.enableResizing();

    // Update message
    let setOfBoxes = boxes.getBoxes();
    let curr;
    for (var box in setOfBoxes) {
        curr = setOfBoxes[box].domElement;
        curr.children[curr.children.length - 1].innerText = 'This box is now available for resizing.'
    }

})

// Disable resizing
const resizingDisableBtn = document.getElementById('disable-resizing-btn');
resizingDisableBtn.addEventListener('click', function() {
    // Enable resizing of all boxes
    boxes.disableResizing();

    // Update message
    let setOfBoxes = boxes.getBoxes();
    let curr;
    for (var box in setOfBoxes) {
        curr = setOfBoxes[box].domElement;
        curr.children[curr.children.length - 1].innerText = 'This box is no longer available for resizing.'
    }

})