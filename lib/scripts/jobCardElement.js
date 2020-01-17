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

        console.log(this);
    }
}
customElements.define('job-card', JobCard);