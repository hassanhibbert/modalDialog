var modalDialog = (function () {

    "use strict";

    var method = {},
        options,
        defaults,
        transitionEnd;

    // private methods

    // get id utility
    function getId(el) {
        return document.getElementById(el);
    }
    // check if element exists
    function exists(el) {
        return el === null ? true : false;
    }
    // add class
    function addClass(element, classname) {
        var cn;
        cn = element.className;
        if (cn.indexOf(classname) !== -1) {
            return;
        }
        if (cn !== '') {
            classname = ' ' + classname;
        }
        element.className += classname;
    }

    // extend options utility
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    // center modal
    function autoCenter() {
        var window_w, window_h, modal_w, modal_h;
        window_w = window.innerWidth;
        window_h = window.innerHeight;
        modal_w = getId('modal-div-container').clientWidth;
        modal_h = getId('modal-div-container').clientHeight;
        getId('modal-div-container').style.top = (window_h - modal_h) / 2 + 'px';
        getId('modal-div-container').style.left = (window_w - modal_w) / 2 + 'px';
    }

    // build modal 
    function buildModal() {
        var docFrag, modalDiv, overlayDiv, closeButton, contentHolder, confirmBtn, cancelBtn, btnContainer, okBtn;

        // create document fragment
        docFrag = document.createDocumentFragment();

        // create modal container
        modalDiv = document.createElement('div');
        modalDiv.style.width = options.width;
        modalDiv.setAttribute('id', 'modal-div-container');
        modalDiv.setAttribute('class', options.animate);


        // Create Close Button
        if (options.hideClose === false) {
            closeButton = document.createElement('div');
            closeButton.setAttribute('id', 'modal-close');
            modalDiv.appendChild(closeButton);
        }
        // create overlay
        overlayDiv = document.createElement('div');
        overlayDiv.setAttribute('id', 'modal-div-overlay');

        docFrag.appendChild(overlayDiv);

        // Create content area and append to modal
        contentHolder = document.createElement('div');
        contentHolder.className = 'modal-div-content';
        contentHolder.innerHTML = options.content;
        modalDiv.appendChild(contentHolder);

        // Create verify elements
        if (options.verify === true) {
            // btn container
            btnContainer = document.createElement('div');
            btnContainer.setAttribute('id', 'modal-btn-container');

            // create yes button
            confirmBtn = document.createElement('div');
            confirmBtn.innerHTML = options.confirmText;
            confirmBtn.setAttribute('id', 'modal-confirm-yes');
            // create no button
            cancelBtn = document.createElement('div');
            cancelBtn.innerHTML = options.cancelText;
            cancelBtn.setAttribute('id', 'modal-confirm-no');
            // append to modal
            btnContainer.appendChild(confirmBtn);
            btnContainer.appendChild(cancelBtn);
            modalDiv.appendChild(btnContainer);
        }

        // Create alert elements
        if (options.alert === true) {

            // btn container
            btnContainer = document.createElement('div');
            btnContainer.setAttribute('id', 'modal-btn-container');

            // create ok button
            okBtn = document.createElement('div');
            okBtn.innerHTML = 'OK';
            okBtn.setAttribute('id', 'modal-alert-ok');

            // append to modal
            btnContainer.appendChild(okBtn);
            modalDiv.appendChild(btnContainer);
        }

        // attach docFrag to DOM
        docFrag.appendChild(modalDiv);
        document.body.appendChild(docFrag);
        autoCenter();

        // add classes for animation
        getId('modal-div-overlay').setAttribute('class', 'fadeInOverlay');
        addClass(getId('modal-div-container'), options.animate);
        addClass(getId('modal-div-container'), options.animate + 'InModal');
    }

    // detect css animation completion
    function animationEnd() {
        var t, el, transitions;
        el = document.createElement('div');
        transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (transitions.hasOwnProperty(t)) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }
    }
    transitionEnd = animationEnd();

    // close modal
    function closeModal() {

        // add classes for animation
        getId('modal-div-overlay').setAttribute('class', 'fadeOutOverlay');
        getId('modal-div-container').setAttribute('class', options.animate + 'OutModal');

        if (getId('modal-div-overlay').style.transition !== undefined) { // IE9 compatibility
            // remove element once transition animation has ended
            getId('modal-div-overlay').addEventListener(transitionEnd, function () {
                // check if element exist
                if (!exists(getId('modal-div-overlay'))) {
                    getId('modal-div-container').parentElement.removeChild(getId('modal-div-container'));
                    getId('modal-div-overlay').parentElement.removeChild(getId('modal-div-overlay'));
                }
            });
        } else {
            if (!exists(getId('modal-div-overlay'))) {
                getId('modal-div-container').parentElement.removeChild(getId('modal-div-container'));
                getId('modal-div-overlay').parentElement.removeChild(getId('modal-div-overlay'));
            }
        }

    }

    // initilize events 
    function initializeEvents() {
        getId('modal-div-overlay').addEventListener('click', closeModal, false);
        if (options.hideClose === false) {
            getId('modal-close').addEventListener('click', closeModal, false);
        }
        // if true initialize listeners for verify buttons
        if (options.verify === true) {
            getId('modal-confirm-yes').addEventListener('click', options.confirm, false);
            getId('modal-confirm-no').addEventListener('click', options.cancel, false);
        }
        // if true initialize listeners for alert button
        if (options.alert === true) {
            getId('modal-alert-ok').addEventListener('click', options.alertCallback, false);
        }
    }

    // public methods

    method.open = function (obj) {
        // default options
        defaults = {
            width: '400px',
            animate: 'fade',
            hideClose: false,
            content: '',
            verify: false,
            confirm: '',
            cancel: '',
            confirmText: 'Ok',
            cancelText: 'Cancel',
            alert: false,
            alertCallback: ''
        };

        // extend defaults and assign it to options
        if (obj && typeof obj === "object") {
            options = extendDefaults(defaults, obj);
        }

        // build out modal and initialize events
        buildModal();
        initializeEvents();
    };

    // close modal
    method.close = function () {
        closeModal();
    };

    return method;

}());