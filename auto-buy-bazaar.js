// ==UserScript==
// @name         Torn Bazaar Auto Click
// @namespace    http://tampermonkey.net/
// @version      2.1
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
    'use strict';
    var checkInterval2 = null;
    var checkInterval3 = null;

    // Function to handle the click event on controlPanelButton
    function handleControlPanelButtonClick() {
       checkInterval2  = setInterval(checkForbuyOptions, 500);
    }

    function skipConfirmation() {
        checkInterval3 = setInterval(checkForYesButton, 500)

    }
    function checkForYesButton() {
        if ($('button[aria-label="Yes"]').length > 0) {
            $('button[aria-label="Yes"]').click();

            clearInterval(checkInterval3);
        }
    }

    function checkForReactVirtualizedDiv() {
        if ($('div[class*="ReactVirtualized"]').length > 0) {

            // Add click event to all existing buttons with class containing "controlPanelButton"
           $('button[aria-label*="Buy:"]').click(handleControlPanelButtonClick);

           clearInterval(checkInterval); // Stop the interval once the element is found and the handlers are added
        }
    }

    function checkForbuyOptions() {
    if ($('span[class*="tt-max-buy"]').length > 0) {

            // Add click event to all existing buttons with class containing "controlPanelButton"
           $('span[class*="tt-max-buy"]').click();
           $('button[class*="buy"]').click(skipConfirmation);

           clearInterval(checkInterval2); // Stop the interval once the element is found and the handlers are added
        }
    }

    // Set an interval to check for the ReactVirtualized div every 500 milliseconds
    const checkInterval = setInterval(checkForReactVirtualizedDiv, 500);

    // Initial check in case the element is already present
    checkForReactVirtualizedDiv();
})();
