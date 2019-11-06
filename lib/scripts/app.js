// To start this app type: npm run start
// Close it by Ctrl+c
// In the terminal

import { MDCTopAppBar } from '@material/top-app-bar';
// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

import { MDCDrawer } from "@material/drawer";
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const modalButton = document.querySelector('.mdc-ripple-upgraded--unbounded');

import { MDCRipple } from '@material/ripple';

for (let i = 0; i < document.getElementsByClassName('mdc-button').length; i++) {
    const element = document.getElementsByClassName('mdc-button')[i];
    const buttonRipple = new MDCRipple(element);
}

// const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

modalButton.addEventListener('click', (event) => {
    drawer.open = true;
});
