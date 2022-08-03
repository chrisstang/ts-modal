# TS Modal

Very simple library for Modal built using TypeScript. Useful when just wanted a simple modal to be show/close.


## Installation
Install all dependencies
```
$ npm install
```
Run development
```
$ npm start
```
## Build / Dist
### Development Build
```
$ npm run build
```
### Production Build
For production, all files distribute to `dist` folder
```
$ npm run dist
```
Production output for several format below:
- IIFE
- ES
- UMD

## Usage
TS Modal could be instantiated via Javascript by:
``` javascript
const tsModal = new TsModal()
```
It will automatically find all trigger elements with valid `href` id/class.

Open/close modal are not included with inline css, you will need to self define css animation for open or close state.

Dynamically show/close modal via method, passing element as argument:
``` javascript
// Open modal
const modal = document.querySelector('.modal')
tsModal.showModal(modal)

// Close Modal
tsModal.closeModal(modal)
```

## Options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| triggerElement | string / HTMLElement / NodeList | `'.ts-modal-toggle'` | Trigger element for the modal
| openClass | string | `'.is-open'` | Modal open state class
| closeClass | string | `'.ts-close'` | Modal close state class |
| preventDefault | boolean | `true` | Specify whether triggerElement should prevent default event |
| onShow | function | void | Callback function while showing the modal |
| onClose | function | void | Callback function while closing the modal |

## Methods
`.showModal()`  
Shows modal instance. Returns instance itself.  
``` javascript
const modal = document.querySelector('.modal')
tsModal.showModal(modal)
```
`.closeModal()`  
Shows modal instance. Returns instance itself.  
``` javascript
const modal = document.querySelector('.modal')
tsModal.closeModal(modal)
```