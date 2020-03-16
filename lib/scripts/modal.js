let hiddenModals = document.getElementsByClassName('loadDetails-tint');

let resizable, resizer, startY, startHeight;

let initDrag = function (e) {
    resizable = this.parentElement;
    
    startY = e.clientY || e.targetTouches[0].pageY;
    
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
    console.log(e)
    if (!e.target.classList.contains('loadDetails-loadName') && (e.type == "mousemove" || e.type == "touchmove") && typeof window.orientation != 'undefined') {
        return;
    }
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
    resizable.parentElement.classList.remove('loadDetailsContainer-show')
    resizable.style.height = 76 + 'px';

    document.querySelector('.loadContainer').classList.remove('stopScroll');

    stopDrag();
}

for (let index = 0; index < hiddenModals.length; index++) {
    const hiddenModal = hiddenModals[index];
    
    resizable = hiddenModal.querySelector('.loadDetailsContainer'),
        resizer = hiddenModal.querySelector('.loadDetails-loadName'),
        startY, startHeight;

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
    
    resizer.addEventListener('mousedown', initDrag, false);
    resizer.addEventListener('touchstart', initDrag, false);
}