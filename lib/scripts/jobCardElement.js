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
        let jobObj = { name: this.getAttribute('jobname'), address: this.getAttribute('jobaddress'), cabinetCount: this.getAttribute('jobcabinetcount'), homeOwner: this.getAttribute('jobhomeowner') === "1",
                        COD: this.getAttribute('jobcod') === "1", jobInstallerPay: this.getAttribute('jobinstallerpay'), jobShippingNotes: this.getAttribute('jobshippingnotes'),
                        jobInstallingNotes: this.getAttribute('jobInstallNotes') };

        // let shippingNoteHTML = () => html`<span class="loadDetails-jobLabel">Shipping Notes:</span>`;
        let installNotesHTML = () => html`<span class="loadDetails-jobLabel">Installing Notes:</span>`;

        let jobCardHTML = () => html`
        <div class="loadDetails-datails loadDetails-jobName">
            ${jobObj.name}
        </div>
        <div class="loadDetails-datails loadDetails-jobAddress">
            ${jobObj.address}
        </div>
        <div class="loadDetails-datails loadDetails-jobCabinetCount">
            <span class="loadDetails-jobLabel">Cab. Count:</span>
            ${jobObj.cabinetCount}
        </div>
        
        <div class="loadDetails-datails loadDetails-jobShippingNotes">
            <span class="loadDetails-jobLabel">H.O.:</span>
            ${jobObj.homeOwner ? "Yes" : "No"}
        </div>

        <div class="loadDetails-datails loadDetails-jobShippingNotes">
            <span class="loadDetails-jobLabel">Pay:</span>
            ${jobObj.jobInstallerPay}
        </div>

        <div class="loadDetails-datails loadDetails-jobShippingNotes">
            ${jobObj.jobInstallingNotes === '' || jobObj.jobInstallingNotes === null ? "" : installNotesHTML()}
            ${jobObj.jobInstallingNotes === '' || jobObj.jobInstallingNotes === null ? "" : jobObj.jobInstallingNotes}
        </div>

        <div class="loadDetails-datails loadDetails-jobButtons">
            <!-- <span class="loadDetails-jobButton loadDetails-jobShipBtn">
                <i class="material-icons">local_shipping</i>
            </span> -->
            <span class="loadDetails-jobButton" data-buttontype="info" title="Info">
                <i class="material-icons">info</i>
            </span>
            <!-- <span class="loadDetails-jobButton" data-buttontype="status" title="Status">
                <i class="material-icons">directions_run</i>
            </span> -->
            <!-- <span class="loadDetails-jobButton" data-buttontype="note" title="Note">
                <i class="material-icons">note</i>
            </span> -->
            <!-- <span class="loadDetails-jobButton" data-buttontype="job" title="Job">
                <i class="material-icons">arrow_forward</i>
            </span> -->
            <span class="loadDetails-jobButton" data-buttontype="layouts" title="Layouts">
                <i class="material-icons">arrow_forward</i>
            </span>
        </div>
        `;
        render(jobCardHTML(), this);
    }
}
customElements.define('job-card', JobCard);

class LogCard extends HTMLElement {
    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let logObj = { userName: this.getAttribute('username'), timeStamp: this.getAttribute('timestamp'), logText: this.getAttribute('logtext') };

        let logCardHTML = () => html`
        <div class="modal-card">
            <div class="note-header">
                <div class="note-content note-datetime">
                    ${logObj.timeStamp}
                </div>
                <div class="note-content note-user">
                    ${logObj.userName}
                </div>
            </div>
            <div class="note-content">
                ${logObj.logText}
            </div>
        </div>
        `;
        render(logCardHTML(), this);
    }
}
customElements.define('log-card', LogCard);

class StatusCard extends HTMLElement {
    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let statusObj = JSON.parse(this.getAttribute('processes'));

        let statusCardHTML = () => html`
            <div class="status-item-title">14801 A1</div>
            <div class="modal-card status-card-process">
                ${statusObj.map(process => {return html`<div>
                    <span class="status-name">
                        ${process.Name}:
                    </span>
                    <span class="status-status">
                        ${process.Status}
                    </span>
                </div>`;})}
            </div>
        `;
        render(statusCardHTML(), this);
    }
}
customElements.define('status-card', StatusCard);

class PurchaseItemCard extends HTMLElement {
    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let purchaseItemObj = JSON.parse(this.getAttribute('purchaseitems'));

        let purchaseItemCardHTML = () => html`
            <div class="modal-card status-card purchaseItem-container">
                <div class="status-item-title">Items</div>
                ${purchaseItemObj.map(item => {return html`
                    <div class="purchaseItem">
                        <div class="purchaseItem-detail purchaseItem-quantity">${item.Quantity}</div>
                        <div class="purchaseItem-detail purchaseItem-name">${item.Name}:</div>
                        <div class="purchaseItem-detail purchaseItem-description">${item.Description}</div>
                    </div>`;})}
            </div>
        `;
        render(purchaseItemCardHTML(), this);
    }
}
customElements.define('purchase-item-card', PurchaseItemCard);

class DesignSetInfoCard extends HTMLElement {
    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let designSetInfoObj = JSON.parse(this.getAttribute('designsetinfo'));
        let designSetDetailObj = JSON.parse(this.getAttribute('designsetdetail'));

        let designSetIndoCardHTML = () => html`
            <div class="modal-card modal-information">
                <div class="modal-job-info">
                    <div class="modal-job-details">
                        <div class="modal-job-detail modal-salesRep">Sales Rep: ${designSetInfoObj.salesRepName}</div>
                        <div class="modal-job-detail modal-branch">Branch: ${designSetInfoObj.branchName}</div>
                        <div class="modal-job-detail modal-costs">
                            <!-- <div class="modal-cost-detail">Shop Cost: ${designSetInfoObj.shopCost}</div>
                            <div class="modal-cost-detail">Final Total: ${designSetInfoObj.finalTotal}</div> -->
                            <div class="modal-cost-detail">Sales #: ${designSetInfoObj.salesRepNumber}</div>
                            <div class="modal-cost-detail">Status: ${designSetInfoObj.jobStatus}</div>
                        </div>
                    </div>
                    <div class="modal-job-detail modal-address">
                        <div class="modal-address-detail">${designSetInfoObj.addressName}</div>
                        <div class="modal-address-detail">${designSetInfoObj.address}</div>
                        <div class="modal-address-detail">${designSetInfoObj.addressPhoneNumber}</div>
                    </div>
                </div>
            </div>
            <div class="modal-designSets">
                ${designSetDetailObj.map(item => {return html`
                    <div class="modal-card">
                        <div class="status-item-title">${item.jobDisplayName}</div>
                        <div class="modal-designSet-container">
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Species:</div>
                                <div class="designSet-detail-info">${item.specie}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Upper Door:</div>
                                <div class="designSet-detail-info">${item.upperDoor}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Lower Door:</div>
                                <div class="designSet-detail-info">${item.lowerDoor}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Front:</div>
                                <div class="designSet-detail-info">${item.front}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Finish:</div>
                                <div class="designSet-detail-info">${item.finish}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Glaze:</div>
                                <div class="designSet-detail-info">${item.glaze}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Finish Option:</div>
                                <div class="designSet-detail-info">${item.finishOption}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Distress:</div>
                                <div class="designSet-detail-info">${item.distress}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Sheen:</div>
                                <div class="designSet-detail-info">${item.sheen}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Interior:</div>
                                <div class="designSet-detail-info">${item.interior}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Drawer:</div>
                                <div class="designSet-detail-info">${item.drawer}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Hinge:</div>
                                <div class="designSet-detail-info">${item.hinge}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Slide:</div>
                                <div class="designSet-detail-info">${item.slide}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Order Date:</div>
                                <div class="designSet-detail-info">${item.orderDate}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Ship Date:</div>
                                <div class="designSet-detail-info">${item.shipDate}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Scheduled Time:</div>
                                <div class="designSet-detail-info">${item.scheduledTime}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Complete Date:</div>
                                <div class="designSet-detail-info">${item.completeDate}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Installer:</div>
                                <div class="designSet-detail-info">${item.installer}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Install Date:</div>
                                <div class="designSet-detail-info">${item.installDate}</div>
                            </div>
                            <div class="designSet-detail">
                                <div class="designSet-detail-name">Close Date:</div>
                                <div class="designSet-detail-info">${item.closeDate}</div>
                            </div>
                        </div>
                        <div class="designSet-product-container">
                            ${item.products.map(prod => {return html`
                                <div class="designSet-product">
                                    <div class="product-quantity">${prod.quantity}</div>
                                    <div class="product-detail product-name">${prod.productName}</div>
                                    <div class="product-detail product-info product-mods">${prod.productMods}</div>
                                    <div class="product-detail product-info product-notes">${prod.productNotes}</div>
                                </div>
                            `;})}
                        </div>
                    </div>
                `;})}
            </div>
        `;
        render(designSetIndoCardHTML(), this);
    }
}
customElements.define('designset-info-card', DesignSetInfoCard);

class LayoutCard extends HTMLElement {
    // Define constructor
    constructor() {
        super();
    }

    // Create inner HTML contents
    connectedCallback() {
        let layoutObj = JSON.parse(this.getAttribute('layouts'));
        
        let logCardHTML = () => html`
        <div class="modal-card">
            ${layoutObj.map(item => {return html`
                <div class="button-container layout-button">
                    <button class="mdc-button">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label">
                            ${item.layoutName}
                        </span>
                    </button>
                </div>
            `;})}
        </div>
        `;
        render(logCardHTML(), this);
    }
}
customElements.define('layout-card', LayoutCard);