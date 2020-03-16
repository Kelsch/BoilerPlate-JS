import {html, render} from 'lit-html';

// Create a new modal
class ModalCard extends HTMLElement {
    // Properties
    get name() {
        return this.hasAttribute('name');
    }
    get jobName() {
        return this.hasAttribute('jobName');
    }

    // Reflect value of set properties
    set name(val) {
        console.log(val)
        if (val) {
            this.setAttribute('name', val);
        }
        else {
            this.removeAttribute('name');
        }
    }
    set jobName(val) {
        console.log(val)
        if (val) {
            this.setAttribute('jobName', val);
        }
        else {
            this.removeAttribute('jobName');
        }
    }

    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let modalObj = { name: this.getAttribute('modalname'), jobName: this.getAttribute('jobname') };

        let modalHTML = () => html`
        <div id="${modalObj.name}_modal" class="loadDetails-tint">
            <div id="${modalObj.name}_modalContents" class="loadDetailsContainer">
                <div class="${modalObj.name}Details-jobName loadDetails-loadName">
                    ${modalObj.jobName}
                </div>
                <div id="${modalObj.name}Details_contentContainer">
                    ${modalObj.name} Info
                </div>
            </div>
        </div>
        `;
        render(modalHTML(), this);
    }
}
customElements.define('modal-card', ModalCard);