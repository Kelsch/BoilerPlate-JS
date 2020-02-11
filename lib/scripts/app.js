// To start this app type: npm run start
// Close it by Ctrl+c
// In the terminal
import pullToRefresh from 'mobile-pull-to-refresh';
// Material 2
import ptrAnimatesMaterial from 'mobile-pull-to-refresh/dist/styles/material/animates';
import 'mobile-pull-to-refresh/dist/styles/material/style.css';

import { MDCTopAppBar } from '@material/top-app-bar';
// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

import { MDCDrawer } from "@material/drawer";
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const modalButton = document.querySelector('.mdc-ripple-upgraded--unbounded');

import { MDCRipple } from '@material/ripple';

let hiddenModal = document.getElementById('boilerPlate_modal');
let modalContent = hiddenModal.querySelector('#loadDetails_contentContainer');

function createGoogleButton() {
    for (let i = 0; i < document.getElementsByClassName('mdc-button').length; i++) {
        const element = document.getElementsByClassName('mdc-button')[i];
        const buttonRipple = new MDCRipple(element);
        
        element.addEventListener('click', (event) => {
            hiddenModal.classList.toggle('loadDetailsContainer-show');
            let resizable = hiddenModal.querySelector('#boilerPlate_modalContents');
            resizable.style.height = `${modalContent.clientHeight + 22 + 5}px`;
            jobLoader();
        });
    }
}

createGoogleButton();

// export default createGoogleButton;
window.createGoogleButton = createGoogleButton;

// const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

modalButton.addEventListener('click', (event) => {
    drawer.open = true;
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
        // console.log('Registration successful, scope is:', registration.scope);
        // registration.update();
    })
    .catch(function(error) {
        console.error('Service worker registration failed, error:', error);
    });
}

const calendarBody = document.getElementById('calendarBody');

pullToRefresh({
    container: document.querySelector('.container'),
    animates: ptrAnimatesMaterial,
    // animates: ptrAnimatesMaterial2,
    // animates: ptrAnimatesIos,

    refresh() {
        return new Promise(resolve => {
            console.log(resolve)
            // here to fetch the data and rerender the contents.
            setTimeout(resolve, 2000)
            // resolve;
        })
    }
})

function jobLoader() {
    let hiddenText = hiddenModal.querySelectorAll('.loadDetails-textTransparent');
    // setTimeout(() => {
    //     for (let index = 0; index < hiddenText.length; index++) {
    //         const element = hiddenText[index];
    //         element.classList.remove('loadDetails-textTransparent');
    //     }
    //     hiddenLoader.classList.remove('loadDetails-loaderShow');
    // }, 2000);
}