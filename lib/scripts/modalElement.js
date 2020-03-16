import {html, render} from 'lit-html';

// Create a new modal
class ModalCard extends HTMLElement {
    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let modalObj = { modalName: this.getAttribute('modalname'), jobName: this.getAttribute('jobname') };

        let modalHTML = () => html`
        <div id="${modalObj.modalName}_modal" class="loadDetails-tint">
            <div id="${modalObj.modalName}_modalContents" class="loadDetailsContainer">
                <div class="${modalObj.modalName}Details-jobName loadDetails-loadName">
                    ${modalObj.jobName}
                </div>
                <div id="${modalObj.modalName}Details_contentContainer" class="loadDetails-content">
                    ${modalObj.modalName} Info
                </div>
            </div>
        </div>
        `;
        render(modalHTML(), this);
    }
}
customElements.define('modal-card', ModalCard);