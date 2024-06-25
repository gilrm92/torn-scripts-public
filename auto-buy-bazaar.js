// ==UserScript==
// @name         Torn Bazaar Auto Click
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Auto click script for Torn Bazaar page
// @author       CrowleyJr[2827691]
// @match        https://www.torn.com/bazaar.php*
// @grant        none
// @run-at       document-end
// @icon         https://img.icons8.com/?size=100&id=sfCz8paHIqnu&format=png&color=000000
// @updateURL    https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/auto-buy-bazaar.meta.js
// @downloadURL  https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/auto-buy-bazaar.js
// ==/UserScript==

(function() {
     // Function to clone and dispatch regular DOM events
    function cloneAndDispatchEvents(sourceElement) {
        const allEvents = ['click', 'mouseover', 'mousedown', 'mouseup', 'focus', 'blur', 'input', 'change'];
        allEvents.forEach((eventName) => {
            const event = new Event(eventName, { bubbles: true, cancelable: true });
            sourceElement.dispatchEvent(event);
        });
    }

    // Function to extract and trigger the React event handlers of an element
    function triggerReactEventHandlers(element) {
        const handlerKey = Object.keys(element).find(key => key.startsWith('__reactEventHandlers'));
        if (handlerKey) {
            const eventHandlers = element[handlerKey];
            for (const [event, handler] of Object.entries(eventHandlers)) {
                const eventName = event.slice(2).toLowerCase();
                const eventObj = new Event(eventName, { bubbles: true, cancelable: true });
                element.dispatchEvent(eventObj);
            }
            console.log('React event handlers successfully triggered on the target element:', element);
        } else {
            console.log('No React event handlers found on the target element:', element);
        }
    }

    // Function to wait for the "Yes" button to appear and then trigger its event handlers
    function waitForYesButtonAndTrigger() {
        const checkInterval = setInterval(() => {
            const yesButton = document.querySelector('button.button___g7ktb[aria-label="Yes"]');
            if (yesButton) {
                console.log('"Yes" button found:', yesButton);
                triggerReactEventHandlers(yesButton);
                clearInterval(checkInterval); // Stop checking once the target element is found and triggered
            }
        }, 20); // Check every second
    }

    // Function to handle a new "Buy" button
    function handleBuyButton(buyButton) {
        // Dispatch events on the span with class tt-max-buy
        const maxBuySpan = document.querySelector('span.tt-max-buy');
        if (maxBuySpan) {
            cloneAndDispatchEvents(maxBuySpan);
            console.log('Events successfully dispatched on the tt-max-buy span:', maxBuySpan);
        } else {
            console.log('tt-max-buy span not found.');
        }

        // Add a click event listener to the "Buy" button
        buyButton.addEventListener('click', () => {
            console.log('"Buy" button clicked:', buyButton);
            waitForYesButtonAndTrigger();
            console.log('Waiting for the "Yes" button to appear...');
        });
        console.log('Click listener added to the "Buy" button:', buyButton);
    }

    // Function to continuously check for "Buy" buttons and handle them
    function continuouslyCheckForBuyButtons() {
        const handledButtons = new Set();
        setInterval(() => {
            document.querySelectorAll('button').forEach((buyButton) => {
                if (buyButton.className.split(' ').some(cls => cls.startsWith('buy__')) && !handledButtons.has(buyButton)) {
                    console.log('New or existing "Buy" button found:', buyButton);
                    handleBuyButton(buyButton);
                    handledButtons.add(buyButton);
                }
            });
        }, 20); // Check every second
    }

    // Start continuously checking for "Buy" buttons
    continuouslyCheckForBuyButtons();
    console.log('Continuously checking for "Buy" buttons to appear...');
	
})();
