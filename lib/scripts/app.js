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
    let buttons = document.getElementsByClassName('mdc-button');
    let buttonCount = buttons.length;

    for (let i = 0; i < buttonCount; i++) {
        const element = buttons[i];
        const buttonRipple = new MDCRipple(element);
        
        if (!element.classList.contains('button-layout') && !element.classList.contains('button-log')) {
            element.addEventListener('click', (event) => {
                hiddenModal.classList.toggle('loadDetailsContainer-show');
                let resizable = hiddenModal.querySelector('#boilerPlate_modalContents');
                resizable.style.height = `${modalContent.clientHeight + 22 + 5}px`;
                jobLoader();
            });
        }
        
        if (element.classList.contains('button-layout')) {
            element.addEventListener('click', (event) => {
                console.log(event)
            });
        }
        if (element.classList.contains('button-log')) {
            element.addEventListener('click', (event) => {
                console.log(event)
            });
        }
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
});

function jobLoader() {
    // let hiddenText = hiddenModal.querySelectorAll('.loadDetails-textTransparent');
    
    let loadDetailButtons = document.getElementsByClassName('loadDetails-jobButton');

    for (let i = 0; i < loadDetailButtons.length; i++) {
        const element = loadDetailButtons[i];
        if (element.getAttribute('listener') !== 'true') {
            element.addEventListener('click', (event) => {
                let buttonType = event.target.getAttribute('data-buttontype');
    
                // hiddenModal.classList.toggle('loadDetailsContainer-show');
                // let resizable = hiddenModal.querySelector('#boilerPlate_modalContents');
                // resizable.style.height = `${modalContent.clientHeight + 22 + 5}px`;
                // jobLoader();
    
                switch (buttonType) {
                    case 'info':
                        infoLoader();
                        break;
                    case 'status':
                        statusLoader();
                        break;
                    case 'note':
                        noteLoader();
                        break;
                    case 'job':
                        jobDetailsLoader();
                        break;
                    case 'layouts':
                        layoutDetailsLoader();
                        break;
                }
    
            });
            element.setAttribute('listener', 'true');
        }
    }
}

let loadModalContent = hiddenModal.querySelector('#loadDetails_contentContainer');

let infoModal = document.getElementById('info_modal');
// let infoModalContent = hiddenModal.querySelector('#loadDetails_contentContainer');
function infoLoader() {
    infoModal.classList.toggle('loadDetailsContainer-show');
    infoModal.style.zIndex = 1;
    let resizable = infoModal.querySelector('#info_modalContents');
    resizable.style.height = `${loadModalContent.clientHeight + 22 + 5 - 30}px`;
}

let statusModal = document.getElementById('status_modal');
// let statusModalContent = hiddenModal.querySelector('#loadDetails_contentContainer');
function statusLoader() {
    statusModal.classList.toggle('loadDetailsContainer-show');
    statusModal.style.zIndex = 1;
    let resizable = statusModal.querySelector('#status_modalContents');
    resizable.style.height = `${loadModalContent.clientHeight + 22 + 5 - 30}px`;
}

let noteModal = document.getElementById('note_modal');
// let noteModalContent = hiddenModal.querySelector('#loadDetails_contentContainer');
function noteLoader() {
    noteModal.classList.toggle('loadDetailsContainer-show');
    noteModal.style.zIndex = 1;
    let resizable = noteModal.querySelector('#note_modalContents');
    resizable.style.height = `${loadModalContent.clientHeight + 22 + 5 - 30}px`;
}

let jobModal = document.getElementById('job_modal');
function jobDetailsLoader() {
    jobModal.classList.toggle('loadDetailsContainer-show');
    jobModal.style.zIndex = 1;
    let resizable = jobModal.querySelector('#job_modalContents');
    resizable.style.height = `${loadModalContent.clientHeight + 22 + 5 - 30}px`;
}

let layoutModal = document.getElementById('layout_modal');
function layoutDetailsLoader() {
    layoutModal.classList.toggle('loadDetailsContainer-show');
    layoutModal.style.zIndex = 1;
    let resizable = layoutModal.querySelector('#layout_modalContents');
    resizable.style.height = `${loadModalContent.clientHeight + 22 + 5 - 30}px`;
}