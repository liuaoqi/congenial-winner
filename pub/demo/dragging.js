'use strict';

// Draggable by certain elements
const draggingTopBtn = document.getElementById('dragging-top-btn');
draggingTopBtn.addEventListener('click', function() {
    // Disable dragging for the whole box
    boxes.disableDragging();

    // Update message
    let setOfBoxes = boxes.getBoxes();
    let curr;
    for (var box in setOfBoxes) {
        curr = setOfBoxes[box].domElement;
        curr.children[curr.children.length - 1].innerText = 'This box is now only draggable by the top border.'
    }

    boxes.enableDragging('border-top');
})
