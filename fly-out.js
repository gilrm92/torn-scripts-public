// ==UserScript==
// @name         Fast-Flight Panel
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Creates a panel to help you fly out faster
// @author       CrowleyJr
// @match        www.torn.com/*
// @icon         https://img.icons8.com/?size=100&id=60631&format=png&color=000000
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/fly-out.meta.js
// @downloadURL  https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/fly-out.js
// ==/UserScript==

(function() {
    'use strict';

 
    // List of allowed UID values
    //var allowedUIDs = ['2827691']; // Replace with your actual allowed UIDs

    // Function to get a cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if the UID is in the allowed list
    // var uid = getCookie('uid');
    // if (!allowedUIDs.includes(uid)) {
        // //alert('You do not have permission to use this script.');
        // return;
    // }

    // URL of the plane icon
    var planeIconUrl = 'https://img.icons8.com/?size=100&id=60631&format=png&color=000000'; // Replace with your plane icon URL

    // Mapping of countries to their codes
    var countryCodes = {
        'Cayman Islands': 12,
        'Canada': 9,
        'Hawaii': 3,
        'United Kingdom': 10,
        'Argentina': 7,
        'Switzerland': 8,
        'Japan': 5,
        'China': 6,
        'UAE': 11,
        'South Africa': 4,
        'Mexico': 2
    };

    // Function to set a cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Create the toggle button
    var toggleButton = document.createElement('div');
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '10px';
    toggleButton.style.right = '10px';
    toggleButton.style.width = '50px';
    toggleButton.style.height = '50px';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.backgroundColor = 'white';
    toggleButton.style.backgroundImage = `url(${planeIconUrl})`;
    toggleButton.style.backgroundSize = '30px 30px';
    toggleButton.style.backgroundPosition = 'center';
    toggleButton.style.backgroundRepeat = 'no-repeat';
    toggleButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '1000';
    toggleButton.title = 'Fast-Flight';

    // Create the floating panel container
    var floatingPanel = document.createElement('div');
    floatingPanel.style.position = 'fixed';
    floatingPanel.style.top = '70px';
    floatingPanel.style.right = '10px';
    floatingPanel.style.width = '220px';
    floatingPanel.style.padding = '20px';
    floatingPanel.style.backgroundColor = 'white';
    floatingPanel.style.border = '1px solid #ccc';
    floatingPanel.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    floatingPanel.style.zIndex = '1000';
    floatingPanel.style.display = 'none'; // Initially hidden

    // Create the HTML content for the floating panel
    floatingPanel.innerHTML = `
        <div>
            <h3 style="margin-top: 0;">Fast-Flight</h3>
            <label for="typeSelect">Type: </label>
            <select id="typeSelect" style="width: 100%; margin-bottom: 10px;">
                <option value="Standard">Standard</option>
                <option value="Airstrip">Airstrip</option>
                <option value="Private">Private</option>
                <option value="Business">Business</option>
            </select>
            <br>
            <label for="destinationSelect">Destination: </label>
            <select id="destinationSelect" style="width: 100%; margin-bottom: 10px;">
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Canada">Canada</option>
                <option value="Hawaii">Hawaii</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Argentina">Argentina</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="UAE">UAE</option>
                <option value="South Africa">South Africa</option>
                <option value="Mexico">Mexico</option>
            </select>
            <br>
            <button id="flyAgency" style="width: 100%; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Flying Agency</button>
			<br />
			<button id="flyoutButton" style="width: 100%; padding: 10px; background-color: gray; color: white; border: none; border-radius: 5px; cursor: not-allowed;" disabled>Fly out!</button>
        </div>
    `;

    // Append the toggle button and floating panel to the body
    document.body.appendChild(toggleButton);
    document.body.appendChild(floatingPanel);
    var flyoutButton = document.getElementById('flyoutButton');
	var flyAgency = document.getElementById('flyAgency');
	
    // Enable the "Fly out" button if the URL contains "travelagency.php"
    if (window.location.href.includes('travelagency.php')) {
        flyoutButton.removeAttribute('disabled');
        flyoutButton.style.backgroundColor = '#4CAF50';
        flyoutButton.style.cursor = 'pointer';
		flyAgency.style.display = 'none';
    }

    // Function to toggle the panel and set a cookie
    function togglePanel() {
        if (floatingPanel.style.display === 'none') {
            floatingPanel.style.display = 'block';
            setCookie('panelVisible', 'true', 7);
        } else {
            floatingPanel.style.display = 'none';
            setCookie('panelVisible', 'false', 7);
        }
    }

    // Add change event listeners to the dropdowns to save their values in cookies
    var typeSelect = document.getElementById('typeSelect');
    var destinationSelect = document.getElementById('destinationSelect');

    typeSelect.addEventListener('change', function() {
        setCookie('typeSelect', typeSelect.value, 7);
    });

    destinationSelect.addEventListener('change', function() {
        setCookie('destinationSelect', destinationSelect.value, 7);
    });

    // Add click event listener to the toggle button
    toggleButton.addEventListener('click', togglePanel);

    // Function to dispatch click event
    function dispatchClickEvent(element) {
        var event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    }
	
	flyAgency.addEventListener('click', function() {
		window.location.href = 'travelagency.php'
	});
	
    // Add click event listener to the "Fly out!" button
    flyoutButton.addEventListener('click', function() {
        // Check if the button is disabled
        if (flyoutButton.disabled) {
            return;
        }

        // Get the selected type and destination
        var selectedType = typeSelect.value.toLowerCase();
        var selectedDestination = destinationSelect.value;
        var countryId = countryCodes[selectedDestination];

        // Find the target element and set the attributes
        var el = document.querySelector('.travel-confirm .btn');
        if (el) {
            el.closest('.travel-buttons').setAttribute('data-id', countryId);
            el.closest('.tab-menu-cont').setAttribute('type', selectedType);
            dispatchClickEvent(el);

            // Disable the button to prevent multiple clicks
            flyoutButton.disabled = true;
            flyoutButton.style.backgroundColor = 'gray';
            flyoutButton.style.cursor = 'not-allowed';
            location.reload();

            // Re-enable the button after 5 seconds
            setTimeout(function() {
                flyoutButton.disabled = false;
                flyoutButton.style.backgroundColor = '#4CAF50';
                flyoutButton.style.cursor = 'pointer';
            }, 5000);

        } else {
            alert('Target element not found!');
        }
    });

    // Check the cookie on page load to set the initial state of the panel and dropdowns
    if (getCookie('panelVisible') === 'true') {
        floatingPanel.style.display = 'block';
    }

    var savedType = getCookie('typeSelect');
    if (savedType) {
        typeSelect.value = savedType;
    }

    var savedDestination = getCookie('destinationSelect');
    if (savedDestination) {
        destinationSelect.value = savedDestination;
    }
	
})();
