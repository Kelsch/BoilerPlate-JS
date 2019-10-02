// To start this app type: npm run start
// Close it by Ctrl+c
// In the terminal

import { MDCTopAppBar } from '@material/top-app-bar';
/* import { MDCTopAppBar } from '../../node_modules/@material/top-app-bar'; */
// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

import { MDCDrawer } from "@material/drawer";
/* import { MDCDrawer } from "../../node_modules/@material/drawer"; */
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const modalButton = document.querySelector('.mdc-ripple-upgraded--unbounded');

import { MDCRipple } from '@material/ripple';
/* import { MDCRipple } from '../../node_modules/@material/ripple'; */

const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

console.log(this, buttonRipple, document)

/* export const btnRipple */

modalButton.addEventListener('click', (event) => {
    drawer.open = true;
});
