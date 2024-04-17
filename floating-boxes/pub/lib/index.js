'use strict';

(function(global) {

	const mainDocument = document.querySelector('html');
	const mainBody = mainDocument.querySelector('body');
	// z-index reference for the box positions
	let maxZIndex = 1;
	let resizing = false;

	function FloatingBoxGenerator(id) {
		this.setId = id;
		// The boxes are stored in a dictionary
		this.boxes = {};
	}

	// Prototypal Instantiation:
	// Including all FloatingBoxGenerator utilities
	FloatingBoxGenerator.prototype = {

		// Create the box element
		createBox: function(id) {

			let newBox = null;
			// Generate a new floating box with the given id
			if (id !== null) {
				newBox = new FloatingBox(this.setId, id);
			}
			// Otherwise, throw an error
			else {
				throw new Error('Id is required for generating new floating box.');
			}

			// Push the new box object to the dictionary
			this.boxes[id] = newBox

			return newBox;
		},

		setBoxName: function(id, name) {
			const box = this.boxes[id]
			if (box) {
				box.setBoxName(name)
			} else {
				throw new Error("No box found with the given Id.")
			}
		},

		getBoxNameById: function(id) {
			const box = this.boxes[id]
			if (box) {
				return box.getBoxName()
			} else {
				throw new Error("No box found with the given Id.")
			}
		},

		// Public getters and setters
		getSetId: function() {
			return this.setId;
		},

		// Return an array of FloatingBox,
		// each element contains its set id(sid), box id(bid), name
		// and the DOM element(domElement)
		getBoxes: function() {
			return this.boxes;
		},

		// Get the DOM element of a specific box
		getBoxDOMById: function(id) {
			const box = this.boxes[id]
			if (box) {
				return box.domElement;
			} else {
				return null;
			}
		},

		// Enable dragging of all boxes
		/* element:
		  - 'corner'
		  - 'border-top'
		  - 'border-right'
		  - 'border-bottom'
		  - 'border-left'
		*/
		enableDragging: function(element) {
			for (var id in this.boxes) {
				this.boxes[id].enableDragging(element);
			}
		},

		// Enable dragging of a specified box
		enableDraggingById: function(id, element) {
			const box = this.boxes[id];
			if (box) {
				this.boxes[id].enableDragging(element);
			} else {
				throw new Error("No box found with the given Id.");
			}
		},
	
		// Disable dragging of all boxes
		disableDragging: function(element) {
			for (var id in this.boxes) {
				this.boxes[id].disableDragging(element);
			}
		},
	
		// Disable dragging of a specified box
		disableDraggingById: function(id, element) {
			const box = this.boxes[id];
			if (box) {
				this.boxes[id].disableDragging(element);
			} else {
				throw new Error("No box found with the given Id.");
			}
		},

		// Disable dragging of all boxes
		enableResizing: function() {
			for (var id in this.boxes) {
				this.boxes[id].enableResizing();
			}
		},

		// Enable resizing of a specified box
		enableResizingById: function(id) {
			const box = this.boxes[id];
			if (box) {
				this.boxes[id].enableResizing();
			} else {
				throw new Error("No box found with the given Id.");
			}
		},

		// Disable resizing of all boxes
		disableResizing: function() {
			for (var id in this.boxes) {
				this.boxes[id].disableResizing();
			}
		},

		// Remove all boxes of the current object
		removeBoxes: function() {
			const boxes = this.boxes;
			for (var box in boxes) {
				boxes[box].domElement.remove();
			}
			this.boxes = [];
		},
	
		// Remove a specific box from the set and html
		removeBoxById: function(id) {
			const boxes = this.boxes;
			const box = boxes[id];
			if (box) {
				// Remove the DOM element from html
				box.domElement.remove();
				// Remove the box from the boxes dictionary
				delete boxes[id];
			} else {
				throw new Error("No box found with the given Id.");
			}
		},
	
		// Hide a specific box
		hideBoxById: function(id) {
			const box = this.boxes[id]
			if (box) {
				box.domElement.style.display = 'none';
			} else {
				throw new Error("No box found with the given Id.");
			}
		},

		// Unhide a specific box
		unhideBoxById: function(id) {
			const box = this.boxes[id]
			if (box) {
				box.domElement.style.display = 'block';
			} else {
				throw new Error("No box found with the given Id.");
			}
		},

		// Add new DOM object to the specified box
		addDOMById: function(object, id) {
			const box = this.boxes[id];
			if (box) {
				box.addDOM(object);
			} else {
				throw new Error("No box found with the given Id.")
			}
		},

		getDOMElementsById: function(id) {
			const box = this.boxes[id];
			if (box) {
				return box.getDOMElements();
			} else {
				throw new Error("No box found with the given Id.")
			}
		}

	}

	/*
		Individual floating box
		setId: Id reference set of boxes the element belongs to
		boxId: Id reference of the current box element
	*/
	function FloatingBox(setId, boxId) {

		let box = Object.create(FloatingBox.prototype);
		box.sid = setId;
		box.bid = boxId;
		this.init(box);

		return box;

	}

	FloatingBox.prototype = {

		// Public setters and getters
		// Box name setter
		setBoxName: function(name) {
			this.name = name;
		},

		// Box name getter
		getBoxName: function() {
			return this.name;
		},

		// Box set Id getter
		getSetId: function() {
			return this.sid;
		},

		// Box Id getter
		getBoxId: function() {
			return this.bid;
		},
		
		// Get the DOM element of the current box
		getDOM: function(element) {
			if (element) {
				return document.getElementById('floating-box-' + element + '-' + this.sid + '-' + this.bid);
			} else {
				// return the main dom element as default
				return this.domElement;
			}
		},

		// Get the element Id
		getDOMId: function() {
			return this.getDOM().id;
		},

		// Initialize the DOM element with the stylesheet
		init: function(box) {
			// Setup
			let newBox = document.createElement('div');
			newBox.setAttribute('class', 'floating-box-' + box.sid);
			newBox.setAttribute('id', 'floating-box-' + box.sid + '-' + box.bid);

			// Set the default box name
			box.name = 'Floating Box ' + box.sid + '-' + box.bid;

			// Default Style:
			// Set up the box with the maximum z-index
			maxZIndex++;
			newBox.style = 'z-index: ' + maxZIndex + '; display: block; position: absolute;' +
						// default box style
						' min-width: 320px; min-height: 180px;' +
						'background-color: rgb(255, 255, 255, 0.8);';

			// Set up the corner element of the box
			const boxCorner = document.createElement('div');
			boxCorner.setAttribute('class', 'floating-box-corner');
			boxCorner.setAttribute('id', 'floating-box-corner-' + box.sid + '-' + box.bid);

			boxCorner.style = 'z-index: ' + maxZIndex + 1 + ';position: absolute; right: -4px; bottom: -4px; background: white;' + 
							'width: 8px; height: 8px; border: 3px solid rgb(71, 71, 71);'
			// Append the box corner element to the box
			newBox.append(boxCorner);

			// Set up the border elements of the box
			const borderTop = document.createElement('div');
			borderTop.setAttribute('class', 'floating-box-border-top');
			borderTop.setAttribute('id', 'floating-box-border-top-' + box.sid + '-' + box.bid);
			borderTop.style = 'position: absolute; top: 0px; width: 100%; height: 10px; border-top: 15px solid rgb(159, 204, 255)';
			// Right border
			const borderRight = document.createElement('div');
			borderRight.setAttribute('class', 'floating-box-border-right');
			borderRight.setAttribute('id', 'floating-box-border-right-' + box.sid + '-' + box.bid);
			borderRight.style = 'position: absolute; right: 0px; width: 10px; height: 100%; border-right: 2px solid rgb(71, 71, 71)';
			// Bottom border
			const borderBottom = document.createElement('div');
			borderBottom.setAttribute('class', 'floating-box-border-bottom');
			borderBottom.setAttribute('id', 'floating-box-border-bottom-' + box.sid + '-' + box.bid);
			borderBottom.style = 'position: absolute; bottom: 0px; width: 100%; height: 10px; border-bottom: 2px solid rgb(71, 71, 71)';
			// Left border
			const borderLeft = document.createElement('div');
			borderLeft.setAttribute('class', 'floating-box-border-left');
			borderLeft.setAttribute('id', 'floating-box-border-left-' + box.sid + '-' + box.bid);
			borderLeft.style = 'position: absolute; left: 0px; width: 10px; height: 100%; border-left: 2px solid rgb(71, 71, 71)';
			// Append the box corner element to the box
			newBox.append(borderTop);
			newBox.append(borderRight);
			newBox.append(borderBottom);
			newBox.append(borderLeft);

			// Add the new box element to the object and the document
			mainBody.append(newBox);

			box.domElement = newBox
		},

		// Feature: Dragging
		// Reference function for dragging mousedown event listener
		// Issue: missing positions of the cursor sometimes
		handleDraggingMousedown: function(e) {

			e = e || window.event;
			// Prevent mouse selection of other elements
			e.stopPropagation();
			e.preventDefault();

			// Always bring the current box to the front upon mousedown,
			// to prevent conflicts with other box elements
			maxZIndex++;

			const boxId = this.id.replace('corner-', '')
								.replace('border-top-','').replace('border-right-','')
								.replace('border-bottom-','').replace('border-left-','')
			const boxElement = document.getElementById(boxId)
			boxElement.style.zIndex = maxZIndex;
			this.style.zIndex = maxZIndex;

			window.addEventListener('mousemove', mousemove);
			window.addEventListener('mouseup', mouseup);

			// Get the current coordinate of the cursor
			let prevX = e.clientX;
			let prevY = e.clientY;

			function mousemove(e) {
			
				// Prevent mouse selection of other elements
				e.stopPropagation();
				e.preventDefault();

				if (!resizing) {
					let currX = prevX - e.clientX;
					let currY = prevY - e.clientY;

					// Change the position of the box
					let nextX = boxElement.offsetLeft- currX;
					let nextY = boxElement.offsetTop - currY;

					// Update the horizontal position
					if (nextX > 0) {
						boxElement.style.left = nextX+ "px";
						prevX = e.clientX;
					} else if (nextX <= 0) { // Prevent the box from going under 0
						boxElement.style.left = "1px";
						prevX = e.clientX;
					}

					// Update the vertical position
					if (nextY > 0) {
						boxElement.style.top = nextY + "px";
						prevY = e.clientY;
					} else if (nextY <= 0) { // Prevent the box from going under 0
						boxElement.style.top = "1px";
						prevY = e.clientY;
					}
				}

			}

			// Terminate the mousemove behaviour when mouseup
			function mouseup() {
				prevX = 0;
				prevY = 0;
				// Remove the event listeners
				window.removeEventListener('mousemove', mousemove);
				window.removeEventListener('mouseup', mouseup);
			}

		},

		// Enable dragging of the current floating box element
		// By adding event listener to the specified element
		enableDragging: function(element) {
			// Add the mousedown handler to the event listener for certain element
			if (element) {
				const targetElement = document.getElementById('floating-box-'
												+ element + '-' + this.sid + '-' + this.bid)
				if (targetElement) {
					targetElement.style.cursor = 'pointer';
					targetElement.addEventListener('mousedown', this.handleDraggingMousedown);
				} else {
					throw new Error("No element found with the given Id.")
				}
			}
			// If no element specified, add event listener to the main DOM element
			else {
				this.domElement.style.cursor = 'pointer';
				this.domElement.addEventListener('mousedown', this.handleDraggingMousedown);
			}
		},

		// Disable dragging of the current floating box element
		disableDragging: function(element) {
			// Remove the mousedown handler from the event listener for certain element
			if (element) {
				const targetElement = document.getElementById('floating-box-'
												+ element + '-' + this.sid + '-' + this.bid)
				if (targetElement) {
					targetElement.style.cursor = 'default';
					targetElement.removeEventListener('mousedown', this.handleDraggingMousedown);
				} else {
					throw new Error("No element found with the given Id.")
				}
			}
			// If no element specified, remove event listener from the main DOM element
			else {
				this.domElement.style.cursor = 'default';
				this.domElement.removeEventListener('mousedown', this.handleDraggingMousedown);
			}
		},

		// Feature: Resizing
		// Reference function for mousedown resizing eventlistener
		handleResizingMousedown: function(e) {
			e = e || window.event;
			// Prevent mouse selection of other elements
			e.stopPropagation();
			e.preventDefault();

			// Always bring the current box to the front upon mousedown,
			// to prevent conflicts with other box elements
			maxZIndex++;
			const boxId = this.id.replace('corner-', '')
						.replace('border-top-','').replace('border-right-','')
						.replace('border-bottom-','').replace('border-left-','')
			const boxElement = document.getElementById(boxId)
			boxElement.style.zIndex = maxZIndex;
			// Update the default position if not included
			// to prevent unexpected resizing when initialized
			boxElement.style.top = boxElement.offsetTop + 'px';
			boxElement.style.left = boxElement.offsetLeft + 'px';
			
			// Bring the element to the front
			this.style.zIndex = maxZIndex;

			const currElementId = this.id;
			
			window.addEventListener('mousemove', mousemove);
			window.addEventListener('mouseup', mouseup);

			let prevX = e.clientX;
			let prevY = e.clientY;

			function mousemove(e) {
				resizing = true;
				
				e.stopPropagation();
				e.preventDefault();

				// Change the size of the box in a certain direction
				// depending on the current element
				if (currElementId.includes('corner') || currElementId.includes('right')) {
					boxElement.style.width = e.pageX - boxElement.getBoundingClientRect().left + "px";
				}
				if (currElementId.includes('corner') || currElementId.includes('bottom')) {
					boxElement.style.height = e.pageY - boxElement.getBoundingClientRect().top + "px";
				}
				prevX = e.clientX;
				prevY = e.clientY;
			}

			// Terminate the mousemove behaviour when mouseup
			function mouseup() {
				resizing = false;
				// Remove the event listeners
				window.removeEventListener('mousemove', mousemove);
				window.removeEventListener('mouseup', mouseup);
			}

		},

		// Enable resizing of the current floating box element
		enableResizing: function() {
			const corner = this.domElement.children[0]
			corner.style.cursor = 'nwse-resize'
			const right = this.domElement.children[2]
			right.style.cursor = 'e-resize'
			const bottom = this.domElement.children[3]
			bottom.style.cursor = 's-resize'

			corner.addEventListener('mousedown', this.handleResizingMousedown);
			right.addEventListener('mousedown', this.handleResizingMousedown);
			bottom.addEventListener('mousedown', this.handleResizingMousedown);
		},

		// Disable resizing of the current floating box element
		disableResizing: function() {
			const corner = this.domElement.children[0]
			corner.style.cursor = 'default'
			const right = this.domElement.children[2]
			right.style.cursor = 'default'
			const bottom = this.domElement.children[3]
			bottom.style.cursor = 'default'
			
			corner.removeEventListener('mousedown', this.handleResizingMousedown);
			right.removeEventListener('mousedown', this.handleResizingMousedown);
			bottom.removeEventListener('mousedown', this.handleResizingMousedown);
		},

		// Add DOM object to the current box
		addDOM: function(object) {
			this.domElement.append(object);
		},

		// Return all DOM Elements added
		getDOMElements: function() {
			let elements = [];
			let children = this.domElement.children;
			for (i = 5; i < children.length; i++) {
				elements.push(children[i])
			}
			return elements;
		}
	}

	global.FloatingBoxGenerator = global.FloatingBoxGenerator || FloatingBoxGenerator

})(window);