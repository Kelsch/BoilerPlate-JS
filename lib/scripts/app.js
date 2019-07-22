// To start this app type: npm run start
// In the terminal

import { MDCTopAppBar } from '@material/top-app-bar';
// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

import {MDCDrawer} from "@material/drawer";
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const modalButton = document.querySelector('.mdc-ripple-upgraded--unbounded');

modalButton.addEventListener('click', (event) => {
    drawer.open = true;
});
