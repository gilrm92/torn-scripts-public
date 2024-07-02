// ==UserScript==
// @name         Save me from Casino!
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Saves you from spending more money in the casino
// @author       CrowleyJr[2827691]
// @match        https://www.torn.com/page.php?sid=slots*
// @match        https://www.torn.com/casino.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove parent <li> elements containing <a> with specific classes
    function removeParentLiWithClass(className) {
        $('a.' + className).closest('li').remove();
    }

    // Function to add 'disabled' class to <li> elements containing specific classes
    function addDisabledToLiWithClass(className) {
        $('li.' + className).addClass('disabled');
    }

    function removeLastClass(className) {
        className = className.replace(' ', '.');
        $('li.' + className).removeClass('last');
    }

    // Initial removal of parent <li> for <a> with class 'poker' and 'bookie'
    removeParentLiWithClass('poker');
    removeParentLiWithClass('bookie');
    removeLastClass('left.t-last.last');

    // Function to observe DOM changes
    function observeDOM() {
        // Create a MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver((mutationsList, observer) => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    // Add 'disabled' class to <li> with class 'betbtn btn-10m'
                    addDisabledToLiWithClass('btn-10m');

                    // Add 'disabled' class to <li> with class 'betbtn btn-1m'
                    addDisabledToLiWithClass('btn-1m');
                }
            });
        });

        // Start observing the document body for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Optionally disconnect the observer after some time if you want to stop observing
        setTimeout(() => {
            observer.disconnect();
        }, 10000); // Stop observing after 10 seconds
    }

    // Call the function to observe DOM changes
    observeDOM();

})();