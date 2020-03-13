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
    get jobHomeOwner() {
        return this.hasAttribute('jobhomeowner');
    }
    get jobCOD() {
        return this.hasAttribute('jobcod');
    }
    get jobShippingNotes() {
        return this.hasAttribute('jobshippingnotes');
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
    set jobHomeOwner(val) {
        console.log(val)
        if (val) {
            this.setAttribute('jobHomeOwner', val);
        }
        else {
            this.removeAttribute('jobHomeOwner');
        }
    }
    set jobCOD(val) {
        console.log(val)
        if (val) {
            this.setAttribute('jobCOD', val);
        }
        else {
            this.removeAttribute('jobCOD');
        }
    }
    set jobShippingNotes(val) {
        console.log(val)
        if (val) {
            this.setAttribute('jobShippingNotes', val);
        }
        else {
            this.removeAttribute('jobShippingNotes');
        }
    }

    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let jobObj = { name: this.getAttribute('jobname'), address: this.getAttribute('jobaddress'), cabinetCount: this.getAttribute('jobcabinetcount'), homeOwner: this.getAttribute('jobhomeowner') === "1", COD: this.getAttribute('jobcod') === "1", shippingNotes: this.getAttribute('jobshippingnotes') };

        let shippingNoteHTML = () => html`<span class="loadDetails-jobLabel">Shipping Notes:</span>`;

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
        
        <div class="loadDetails-datails loadDetails-jobShippingNotes">
            <span class="loadDetails-jobLabel">H.O.:</span>
            ${jobObj.homeOwner ? "Yes" : "No"}
        </div>

        <div class="loadDetails-datails loadDetails-jobShippingNotes">
            <span class="loadDetails-jobLabel">C.O.D.:</span>
            ${jobObj.COD ? "Yes" : "No"}
        </div>

        <div class="loadDetails-datails loadDetails-jobShippingNotes">
            ${jobObj.shippingNotes === '' || jobObj.shippingNotes === null ? "" : shippingNoteHTML()}
            ${jobObj.shippingNotes === '' || jobObj.shippingNotes === null ? "" : jobObj.shippingNotes}
        </div>

        <div class="loadDetails-datails loadDetails-jobButtons">
            <!-- <span class="loadDetails-jobButton loadDetails-jobShipBtn">
                <i class="material-icons">local_shipping</i>
            </span> -->
            <span class="loadDetails-jobButton" data-buttontype="info">
                <i class="material-icons">info</i>
            </span>
            <span class="loadDetails-jobButton" data-buttontype="status">
                <i class="material-icons">directions_run</i>
            </span>
            <span class="loadDetails-jobButton" data-buttontype="note">
                <i class="material-icons">note</i>
            </span>
            <span class="loadDetails-jobButton" data-buttontype="job">
                <i class="material-icons">arrow_forward</i>
            </span>
        </div>
        `;
        render(jobCardHTML(), this);
    }
}
customElements.define('job-card', JobCard);