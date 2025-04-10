// ==UserScript==
// @name         Torn Medical Cooldown Optimizer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Calculates the best medical items to reduce hospital cooldown
// @author       CrowleyJr
// @match        https://www.torn.com/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/medical-cooldown-optimizer.meta.js
// @downloadURL  https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/medical-cooldown-optimizer.js
// ==/UserScript==

(function($) {
    'use strict';

    console.log('Medical Cooldown Optimizer script started');

    // API key for Torn
    const API_KEY = 'YOUR API KEY HERE';
    const API_URL = 'https://api.torn.com/user/?selections=basic&key=' + API_KEY;

    // Define the items: [hospital time removed, medical CD added]
    const items = {
        'Small First Aid Kit': [20, 10],
        'First Aid Kit': [40, 15],
        'Morphine': [70, 20],
        'Blood Bag': [120, 30]
    };

    // Function to calculate the medical cooldown based on the items used
    function calculateMedicalCooldown(hospitalCd, itemList) {
        let totalMedicalCd = 0;

        // Apply each item and adjust hospital and medical cooldowns
        itemList.forEach(item => {
            let [heal, medicalCdIncrease] = item;
            hospitalCd -= heal;
            totalMedicalCd += medicalCdIncrease;
        });

        return [hospitalCd, totalMedicalCd];
    }

    // Function to find the best combination of items to minimize medical cooldown
    function findBestCombination(hospitalCd) {
        console.log('Finding best combination for hospital cooldown:', hospitalCd);

        let bestCombination = [];
        let bestMedicalCd = Infinity; // Start with a large number
        let bestOverHeal = 0;

        // Try different combinations of items, including possible leftover time
        for (let smallFaKit = 0; smallFaKit <= Math.floor(hospitalCd / 20) + 1; smallFaKit++) {
            for (let faKit = 0; faKit <= Math.floor((hospitalCd - smallFaKit * 20) / 40) + 1; faKit++) {
                for (let morphine = 0; morphine <= Math.floor((hospitalCd - smallFaKit * 20 - faKit * 40) / 70) + 1; morphine++) {
                    for (let bloodBag = 0; bloodBag <= Math.floor((hospitalCd - smallFaKit * 20 - faKit * 40 - morphine * 70) / 120) + 1; bloodBag++) {
                        // Calculate total healing
                        const totalHeal = smallFaKit * 20 + faKit * 40 + morphine * 70 + bloodBag * 120;

                        // If we over heal, we still want to consider it
                        if (totalHeal >= hospitalCd) {
                            let itemList = [
                                ...Array(smallFaKit).fill(items['Small First Aid Kit']),
                                ...Array(faKit).fill(items['First Aid Kit']),
                                ...Array(morphine).fill(items['Morphine']),
                                ...Array(bloodBag).fill(items['Blood Bag'])
                            ];

                            let [hospitalCdLeft, totalMedicalCd] = calculateMedicalCooldown(hospitalCd, itemList);

                            // Prioritize combination with the lowest medical CD
                            if (totalMedicalCd < bestMedicalCd) {
                                bestCombination = itemList;
                                bestMedicalCd = totalMedicalCd;
                                bestOverHeal = totalHeal;
                            }
                        }
                    }
                }
            }
        }

        console.log('Best combination found:', bestCombination);
        console.log('Best medical cooldown:', bestMedicalCd);
        console.log('Best overheal:', bestOverHeal);

        return {
            bestCombination,
            bestMedicalCd,
            bestOverHeal
        };
    }

    // Convert Unix timestamp (seconds) to minutes
    function convertTimestampToMinutes(timestamp) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds
        const timeDifferenceInSeconds = timestamp - currentTimestamp;
        return Math.ceil(timeDifferenceInSeconds / 60); // Convert seconds to minutes and round up
    }

    // Function to create and display the results panel
    function createResultsPanel(hospitalCd, bestCombination, bestMedicalCd, bestOverHeal) {
        console.log('Creating results panel');

        // Create a container for the results
        const $resultsContainer = $('<div>', {
            id: 'medical-optimizer-panel',
            class: 'tt-container collapsible rounding compact mt10 tt-theme-background',
            css: {
                marginTop: '10px',
                marginBottom: '10px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '5px',
                overflow: 'hidden'
            }
        });

        // Create the title bar
        const $titleBar = $('<div>', {
            class: 'title',
            css: {
                backgroundColor: '#4a4a4a',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
            }
        });

        // Create the title text
        const $titleText = $('<div>', {
            class: 'text',
            text: 'Medical Cooldown Optimizer',
            css: {
                fontWeight: 'bold'
            }
        });

        // Create the caret icon
        const $caretIcon = $('<i>', {
            class: 'icon fa-solid fa-caret-down'
        });

        // Add title text and caret icon to title bar
        $titleBar.append($titleText, $caretIcon);

        // Create the main content area
        const $mainContent = $('<main>', {
            class: 'background',
            css: {
                padding: '10px',
                backgroundColor: '#fff'
            }
        });

        // Create the inner content
        const $innerContent = $('<div>', {
            class: 'inner-content',
            css: {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }
        });

        // Hospital cooldown info
        const $hospitalCdInfo = $('<div>', {
            css: {
                padding: '5px',
                backgroundColor: '#f0f0f0',
                borderRadius: '3px',
                fontWeight: 'bold'
            },
            html: `<span style="color: #d9534f;">Hospital Cooldown:</span> ${hospitalCd} minutes`
        });

        // Best items section
        const $bestItemsSection = $('<div>', {
            css: {
                padding: '5px',
                backgroundColor: '#f0f0f0',
                borderRadius: '3px'
            },
            html: `<span style="font-weight: bold;">Best Items:</span>`
        });

        // Count items
        const itemCounts = {};
        bestCombination.forEach(item => {
            const itemName = Object.keys(items).find(key =>
                JSON.stringify(items[key]) === JSON.stringify(item)
            );
            itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
        });

        // Create items list
        const $itemsList = $('<div>', {
            css: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginTop: '5px'
            }
        });

        // Add each item to the list
        for (const [itemName, count] of Object.entries(itemCounts)) {
            if (count > 0) {
                // Get item ID based on name
                let itemId = '';
                switch(itemName) {
                    case 'Small First Aid Kit': itemId = '68'; break;
                    case 'First Aid Kit': itemId = '67'; break;
                    case 'Morphine': itemId = '66'; break;
                    case 'Blood Bag': itemId = '732'; break;
                }

                const $itemElement = $('<div>', {
                    class: 'item',
                    css: {
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#e9e9e9',
                        borderRadius: '3px',
                        padding: '5px 8px',
                        marginRight: '5px',
                        marginBottom: '5px'
                    }
                });

                // Create item pic
                const $itemPic = $('<div>', {
                    class: 'pic',
                    css: {
                        width: '44px',
                        height: '24px',
                        backgroundImage: `url(/images/items/${itemId}/medium.png)`,
                        backgroundSize: 'cover',
                        marginRight: '5px'
                    }
                });

                // Create item text
                const $itemText = $('<div>', {
                    class: 'text',
                    text: `${itemName} (${count})`,
                    css: {
                        fontSize: '12px'
                    }
                });

                $itemElement.append($itemPic, $itemText);
                $itemsList.append($itemElement);
            }
        }
        $bestItemsSection.append($itemsList);

        // Medical cooldown info
        const $medicalCdInfo = $('<div>', {
            css: {
                padding: '5px',
                backgroundColor: '#f0f0f0',
                borderRadius: '3px',
                fontWeight: 'bold'
            },
            html: `<span style="color: #5cb85c;">Medical Cooldown:</span> ${bestMedicalCd} minutes`
        });

        // Overheal info
        const $overhealInfo = $('<div>', {
            css: {
                padding: '5px',
                backgroundColor: '#f0f0f0',
                borderRadius: '3px',
                fontWeight: 'bold'
            },
            html: `<span style="color: #5bc0de;">Hospital Cooldown Decrease by:</span> ${bestOverHeal} minutes`
        });

        // Add all elements to inner content
        $innerContent.append($hospitalCdInfo, $bestItemsSection, $medicalCdInfo, $overhealInfo);

        // Add inner content to main content
        $mainContent.append($innerContent);

        // Add title bar and main content to container
        $resultsContainer.append($titleBar, $mainContent);

        // Add toggle functionality
        $titleBar.on('click', function() {
            const isExpanded = $mainContent.is(':visible');
            $mainContent.slideToggle();
            $caretIcon.toggleClass('fa-caret-down fa-caret-right');
        });

        // Find the target container
        const $targetContainer = $('.faction-armoury');
        if ($targetContainer.length) {
            // Insert the panel at the beginning of the target container
            $targetContainer.prepend($resultsContainer);
            console.log('Panel added to faction-armoury container');
        } else {
            // Fallback to appending to body if target container not found
            $('body').append($resultsContainer);
            console.log('Panel added to body (fallback)');
        }
    }

    // Function to fetch user data from Torn API
    function fetchUserData() {
        console.log('Fetching user data from API');

        // Use GM_xmlhttpRequest instead of fetch API
        GM_xmlhttpRequest({
            method: 'GET',
            url: API_URL,
            onload: function(response) {
                console.log('API response received');
                try {
                    const data = JSON.parse(response.responseText);
                    console.log('API Response:', data);

                    // Check if user is in hospital
                    if (data.status && data.status.state === "Hospital" && data.status.until) {
                        console.log('User is in hospital, until:', data.status.until);

                        // Calculate hospital cooldown in minutes
                        const hospitalCd = convertTimestampToMinutes(data.status.until);
                        console.log('Hospital cooldown in minutes:', hospitalCd);

                        // Find the best combination of items
                        const { bestCombination, bestMedicalCd, bestOverHeal } = findBestCombination(hospitalCd);

                        // Display the results
                        createResultsPanel(hospitalCd, bestCombination, bestMedicalCd, bestOverHeal);
                    } else {
                        console.log('User is not in hospital or missing hospital data');
                    }
                } catch (error) {
                    console.error("Error parsing API response:", error);
                }
            },
            onerror: function(error) {
                console.error("Error fetching user data:", error);
            }
        });
    }

    // Function to check if we're on the correct page with the right parameters
    function isCorrectPage() {
        const url = window.location.href;
        return url.includes('factions.php') &&
               url.includes('tab=armoury');
    }

    // Variable to track if the script has already run
    let scriptHasRun = false;

    // Function to monitor URL changes
    function monitorUrlChanges() {
        // Check if we're on the correct page and the script hasn't run yet
        if (isCorrectPage() && !scriptHasRun) {
            console.log('Correct page detected, running script');
            scriptHasRun = true; // Mark that the script has run
            fetchUserData();
        }
    }

    // Main function to initialize the script
    function init() {
        console.log('Initializing script');

         // Set up URL monitoring
        setInterval(monitorUrlChanges, 1000); // Check every second

        // Check immediately in case we're already on the correct page
        monitorUrlChanges();
    }

    // Run the script when the page is loaded
    console.log('Setting up document ready handler');
    // $(document).ready(function() {
    //     console.log('Document ready event fired');
    //     init();
    // });

    // Also try running init directly in case document.ready doesn't fire
    console.log('Running init directly');
    init();
})(jQuery);