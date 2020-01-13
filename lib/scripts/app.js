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
let hiddenLoader = document.getElementById('boiderPlate_loader');

let resizable = document.querySelector('#boilerPlate_modalContents'),
    resizer = document.querySelector('.loadDetails-loadName'),
    startY, startHeight;

for (let i = 0; i < document.getElementsByClassName('mdc-button').length; i++) {
    const element = document.getElementsByClassName('mdc-button')[i];
    const buttonRipple = new MDCRipple(element);

    element.addEventListener('click', (event) => {
        hiddenModal.classList.toggle('loadDetailsContainer-show');
        // hiddenLoader.classList.add('loadDetails-loaderShow');

        jobLoader();
    });
}

hiddenModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('loadDetails-tint')) {
        resetModal();
    }
});

hiddenModal.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('loadDetails-tint')) {
        resetModal();
    }
});

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

resizer.addEventListener('mousedown', initDrag, false);
resizer.addEventListener('touchstart', initDrag, false);

function initDrag(e) {
    // startX = e.clientX;
    startY = e.clientY || e.targetTouches[0].pageY;
    
    // startWidth = parseInt( document.defaultView.getComputedStyle( resizable ).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(resizable).height, 10);
    
    if (e.type == 'touchstart') {
        document.querySelector('.loadContainer').classList.add('stopScroll');

        document.documentElement.addEventListener('touchmove', doDrag, false);
        document.documentElement.addEventListener('touchstop', stopDrag, false);
    }
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
}
 
function doDrag(e) {
    let clientY = e.clientY || e.targetTouches[0].clientY;
    resizable.style.height = (startHeight - clientY + startY) + 'px';
    
    if ((startHeight - clientY + startY) <= 65) {
        resetModal();
    }
}
 
function stopDrag() {
    document.documentElement.removeEventListener('mousemove', doDrag, false);    
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    document.documentElement.removeEventListener('touchmove', doDrag, false);
    document.documentElement.removeEventListener('touchstop', stopDrag, false);
}

function resetModal() {
    hiddenModal.classList.remove('loadDetailsContainer-show');

    resizable.style.height = 76 + 'px';

    document.querySelector('.loadContainer').classList.remove('stopScroll');

    stopDrag();
}