import {html, render} from 'lit-html';

// Create a new Job card
class JobCard extends HTMLElement {
    // Properties
    get jobName() {
        return this.hasAttribute('jobName');
    }
    get jobAddress() {
        return this.hasAttribute('jobAddress');
    }
    get jobCabinetCount() {
        return this.hasAttribute('jobCabinetCount');
    }

    // Reflect value of set properties
    set jobName(val) {
        console.log(val)
        if (val) {
            this.setAttribute('jobName', val);
        }
        else {
            this.removeAttribute('jobName');
        }
    }
    set jobAddress(val) {
        console.log(val)
        if (val) {
            this.setAttribute('jobAddress', val);
        }
        else {
            this.removeAttribute('jobAddress');
        }
    }
    set jobCabinetCount(val) {
        console.log(val)
        if (val) {
            this.setAttribute('jobCabinetCount', val);
        }
        else {
            this.removeAttribute('jobCabinetCount');
        }
    }

    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let jobObj = { name: this.getAttribute('jobname'), address: this.getAttribute('jobaddress'), cabinetCount: this.getAttribute('jobcabinetcount') };

        let jobCardHTML = () => html`
        <div class="loadDetails-datails loadDetails-jobName">
            ${jobObj.name}
        </div>
        <div class="loadDetails-datails loadDetails-jobAddress">
            ${jobObj.address}
        </div>
        <div class="loadDetails-datails loadDetails-jobCabinetCount">
            ${jobObj.cabinetCount}
        </div>
        <div class="loadDetails-datails loadDetails-jobButtons">
            <span>
                Shipped
            </span>
            <span>
                Info
            </span>
            <span>
                Man
            </span>
            <span>
                Note
            </span>
            <span>
                Job
            </span>
        </div>
        `;
        render(jobCardHTML(), this);
    }
}
customElements.define('job-card', JobCard);