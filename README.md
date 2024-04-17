# [FloatingBoxes](https://floating-boxes.herokuapp.com/)

Landing page: `https://floating-boxes.herokuapp.com/`

## Getting Started

In order to use the library, load the `index.js` under the `lib` folder.


## [Documentation](https://floating-boxes.herokuapp.com/demo/api)

The goal of this project is to build a library that allows the developers to easily add non-modal pop-up windows to the web pages, which are named floating boxes. This library is implemented with a collection of floating boxes, that facilitates the object management process when building web pages.

## API

## FloatingBoxGenerator
### Properties

#### setId:
Id of the set of boxes set when FloatingBoxGenerator is created.
#### boxes:
A dictionary of FloatingBox objects having each object mapped to its id.

### Methods
#### createBox
parameters: setId, boxId
description: Create a FloatingBox element with the given set id and box id (div id: 'floating-box-' + setId + '-' + boxId), add it to the document body

#### setBoxName
            
parameteres:id, name

description: Set name to the box with given id

#### getBoxNameById

parameteres: id

description: Return the box element with the given id

#### getSetId

description: Return the set id of the current FloatingBoxGenerator instance

#### getBoxes

description: Return the array of FloatingBox

#### getBoxDOMById

parameteres: id

description: Return the DOM element of the box matching the given id

#### enableDragging

parameteres: element

description: enable dragging by the given element, if no element is given, enable dragging for the whole box

default elements:  'corner', 'border-top', 'border-right', 'border-bottom', 'border-left'

#### enableDraggingById

parameteres: id, element

description: enable dragging by the given element for the box with the given id

default elements:  'corner', 'border-top', 'border-right', 'border-bottom', 'border-left'

#### disableDragging

parameteres: element

description: disable dragging by the given element, if no element is given, disable dragging for the whole box

default elements:  'corner', 'border-top', 'border-right', 'border-bottom', 'border-left'

#### disableDraggingById

parameteres: id, element

description: disable dragging for the box with the given id of the given element

default elements:  'corner', 'border-top', 'border-right', 'border-bottom', 'border-left'

#### enableResizing

description: enable resizing for all boxes

#### enableResizingById

parameteres: id

description: enable resizing for the box with the given id

#### disableResizing

description: disable resizing for all boxes

#### removeBoxes

description: remove all added boxes

#### removeBoxById

parameteres: id

description: remove the box with the given id from the html and dictionary of FloatingBoxes

#### hideBoxById

parameteres: id

description: hide the box with the given id on the web page

#### unhideBoxById

parameteres: id

description: unhide the box with the given id on the web page

#### addDOMById

parameteres: object: HTMLDOMElement, id

description: add the given object to the box with the specified id

#### getDOMElementsById

parameteres: id

description: return the HTMLDOMElement of the box with given id

## FloatingBox
### Properties
#### box
##### sid:
Id of the set of boxes set the box belongs to
##### bid:
Id of the box set when the FloatingBox instance is created
##### name:
A string represents the name set to the box
