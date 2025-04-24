// ==UserScript==
// @name         War Panel - Central
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Create a War Panel for Assist Requests on Torn.com
// @author       Your Name
// @match        https://www.torn.com/*
// @grant        GM_xmlhttpRequest
// @connect      api.torn.com
// @connect      yata.yt
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdn.jsdelivr.net/npm/chart.js
// @updateURL    https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/war-panel-central.meta.js
// @downloadURL  https://raw.githubusercontent.com/gilrm92/torn-scripts-public/master/war-panel-central.js
// ==/UserScript==

(function($) {
    'use strict';

    // CSS Styles
    const styles = `
        #war-panel-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #4CAF50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }

        #war-panel-toggle:hover {
            transform: scale(1.1);
            background: #45a049;
        }

        #war-panel-toggle::before {
            content: '⚔️';
            font-size: 24px;
            color: white;
        }

        #war-panel {
            position: fixed;
            top: 75px;
            right: -47%;
            width: 47%;
            height: calc(100vh - 75px);
            background-color: #1a1a1a;
            border: 1px solid #333;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            color: #fff;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            transition: right 0.3s ease;
        }

        #war-panel.visible {
            right: 0;
        }

        .panel-header {
            background-color: #333;
            padding: 10px;
            border-bottom: 1px solid #444;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            flex-shrink: 0;
        }

        .api-key-section {
            padding: 10px;
            display: flex;
            gap: 10px;
            align-items: center;
            background-color: #2a2a2a;
            flex-shrink: 0;
        }

        .api-key-section input {
            flex-grow: 1;
            padding: 5px;
            border: 1px solid #444;
            background-color: #1a1a1a;
            color: #fff;
            border-radius: 3px;
        }

        .api-key-section button {
            padding: 5px 15px;
            background-color: #4a4a4a;
            border: 1px solid #555;
            color: #fff;
            border-radius: 3px;
            cursor: pointer;
        }

        .api-key-section button:hover {
            background-color: #555;
        }

        .zoo-info-section {
            padding: 10px;
            display: flex;
            background-color: #2a2a2a;
            margin-top: 1px;
            flex-shrink: 0;
        }

        .zoo-status {
            display: flex;
            gap: 20px;
            color: #fff;
        }

        .panel-tabs {
            display: flex;
            background-color: #2a2a2a;
            border-bottom: 1px solid #444;
            margin-top: 1px;
            flex-shrink: 0;
        }

        .tab {
            padding: 10px 20px;
            cursor: pointer;
            color: #888;
            border-bottom: 2px solid transparent;
        }

        .tab.active {
            color: #fff;
            border-bottom: 2px solid #4CAF50;
        }

        .faction-info {
            padding: 15px;
            background-color: #2a2a2a;
            color: #888;
            margin-top: 1px;
            text-align: center;
            font-size: 14px;
            flex-shrink: 0;
        }

        .faction-name {
            color: #4CAF50;
            font-weight: bold;
        }

        .faction-name a {
            color: #4CAF50;
            text-decoration: none;
        }

        .faction-name a:hover {
            color: #66BB6A;
            text-decoration: underline;
        }

        .panel-content {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }

        .tab-content {
            display: none;
            flex: 1;
            overflow: hidden;
            padding: 15px;
        }

        .tab-content.active {
            display: flex;
            flex-direction: column;
        }

        .table-container {
            flex: 1;
            overflow: auto;
            min-height: 0;
            max-height: calc(100vh - 350px);
            margin: 0;
            padding: 0 0 20px 0;
            background-color: #1a1a1a;
            border: 1px solid #333;
            border-radius: 3px;
        }

        .xpt-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
            background-color: #1a1a1a;
            font-size: 14px;
        }

        .xpt-table th, .xpt-table td {
            padding: 12px 8px;
            text-align: left;
            border-bottom: 1px solid #444;
            color: #fff;
            font-size: 14px;
            letter-spacing: 0.3px;
        }

        .xpt-table th {
            background-color: #1a1a1a;
            color: #888;
            border-bottom: 2px solid #333;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
            position: sticky;
            top: 0;
            z-index: 1;
        }

        .xpt-table tbody tr {
            background-color: #1a1a1a;
            height: 45px;
        }

        .xpt-table tbody tr:nth-child(even) {
            background-color: #222;
        }

        .xpt-table tbody tr:hover {
            background-color: #2a2a2a;
        }

        .xpt-table th:first-child,
        .xpt-table td:first-child {
            width: 90px;
            padding-right: 0;
        }

        .xpt-table td {
            border-right: 1px solid #333;
        }

        .xpt-table td:last-child {
            border-right: none;
        }

        .pin-action {
            cursor: pointer;
            opacity: 0.7;
            margin-right: 4px;
            font-size: 16px;
        }

        .pin-action:hover {
            opacity: 1;
        }

        .attack-button {
            cursor: pointer;
            margin-right: 4px;
            font-size: 16px;
            color: #FF5252;
            text-decoration: none;
        }

        .attack-button:hover {
            color: #FF7676;
        }

        .status-icon {
            margin-right: 0;
            font-size: 16px;
        }

        .action-cell {
            white-space: nowrap;
            text-align: left;
            padding-right: 0;
        }

        .member-name {
            color: #fff;
            font-weight: 500;
            letter-spacing: 0.3px;
        }

        .member-name a {
            color: #64B5F6;
            text-decoration: none;
        }

        .member-name a:hover {
            color: #90CAF9;
            text-decoration: underline;
        }

        .status-okay {
            color: #4CAF50;
            font-weight: 500;
        }

        .status-hospital {
            color: #f44336;
            font-weight: 500;
        }

        .status-abroad {
            color: #2196F3;
            font-weight: 500;
        }

        .status-traveling {
            color: #FF9800;
            font-weight: 500;
        }

        /* Scrollbar styling */
        .table-container::-webkit-scrollbar {
            width: 8px;
        }

        .table-container::-webkit-scrollbar-track {
            background: #1a1a1a;
        }

        .table-container::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 4px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .table-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            padding: 0 8px;
        }

        .refresh-button {
            padding: 6px 12px;
            background-color: #4CAF50;
            border: none;
            color: white;
            border-radius: 3px;
            cursor: pointer;
            font-size: 14px;
        }

        .refresh-button:hover {
            background-color: #45a049;
        }

        .refresh-button.active {
            background-color: #f44336;
        }

        .refresh-interval {
            padding: 6px 10px;
            background-color: #1a1a1a;
            border: 1px solid #444;
            color: #fff;
            border-radius: 3px;
            font-size: 14px;
            cursor: pointer;
        }

        .refresh-interval option {
            background-color: #1a1a1a;
            color: #fff;
        }

        .xpt-table th {
            position: relative;
            padding-right: 20px;
        }
        
        .xpt-table th.sort-asc::after {
            content: '▲';
            position: absolute;
            right: 5px;
            color: #4CAF50;
        }
        
        .xpt-table th.sort-desc::after {
            content: '▼';
            position: absolute;
            right: 5px;
            color: #4CAF50;
        }
        
        .xpt-table th:hover {
            background-color: #2a2a2a;
        }

        .table-loading {
            position: relative;
            pointer-events: none;
            opacity: 0.7;
        }
        
        .table-loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .table-loading::before {
            content: 'Loading...';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #4CAF50;
            font-size: 16px;
            z-index: 1001;
        }
    `;

    // Add these variables at the top of the file, after the styles
    let autoRefreshInterval = null;
    let autoRefreshIntervalAbroad = null;

    // Add these functions after the styles and before getHtmlTemplate
    function saveApiKey(apiKey) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 100);
        
        const apiKeyData = {
            key: apiKey,
            expiresAt: expirationDate.getTime()
        };
        
        localStorage.setItem('tornWarPanelApiKey', JSON.stringify(apiKeyData));
    }

    function getApiKey() {
        const apiKeyData = localStorage.getItem('tornWarPanelApiKey');
        if (!apiKeyData) return null;
        
        const data = JSON.parse(apiKeyData);
        const now = new Date().getTime();
        
        if (now > data.expiresAt) {
            localStorage.removeItem('tornWarPanelApiKey');
            return null;
        }
        
        return data.key;
    }

    // HTML Template
    function getHtmlTemplate() {
        return `
            <div id="war-panel-toggle"></div>
            <div id="war-panel">
                <div class="panel-header">War Panel</div>
                
                <div class="api-key-section">
                    <span>API Key</span>
                    <input type="text" id="api-key-input" placeholder="Enter API Key">
                    <button id="save-api-key">Save</button>
                </div>

                <div class="faction-info">
                    Currently viewing faction <span class="faction-name">XPTO</span>
                </div>

                <div class="zoo-info-section">
                    <div class="zoo-status">
                        <span>Online: 0</span>
                        <span>Idle: 0</span>
                        <span>Offline: 0</span>
                    </div>
                </div>

                <div class="panel-tabs">
                    <div class="tab active" data-tab="all-members">All Members</div>
                    <div class="tab" data-tab="abroad-members">Display only Abroad</div>
                </div>

                <div class="panel-content">
                    <div id="all-members-tab" class="tab-content active">
                        <div class="table-controls">
                            <button class="refresh-button" id="refresh-members">Refresh</button>
                            <button class="refresh-button" id="auto-refresh">Auto-refresh</button>
                            <button class="refresh-button" id="get-bsp">Get BSP</button>
                            <select class="refresh-interval" id="refresh-interval">
                                <option value="5">Every 5 seconds</option>
                                <option value="10">Every 10 seconds</option>
                                <option value="15">Every 15 seconds</option>
                            </select>
                        </div>
                        <div class="table-container">
                            <table class="xpt-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Member</th>
                                        <th>State</th>
                                        <th>Description</th>
                                        <th>Time</th>
                                        <th>Level</th>
                                        <th>Yata BS</th>
                                        <th>BSP</th>
                                        <th>Life</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Members list will be populated dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="abroad-members-tab" class="tab-content">
                        <div class="table-controls">
                            <button class="refresh-button" id="refresh-abroad">Refresh</button>
                            <button class="refresh-button" id="auto-refresh-abroad">Auto-refresh</button>
                            <button class="refresh-button" id="get-bsp-abroad">Get BSP</button>
                            <select class="refresh-interval" id="refresh-interval-abroad">
                                <option value="5">Every 5 seconds</option>
                                <option value="10">Every 10 seconds</option>
                                <option value="15">Every 15 seconds</option>
                            </select>
                        </div>
                        <div class="table-container">
                            <table class="xpt-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Member</th>
                                        <th>State</th>
                                        <th>Description</th>
                                        <th>Time</th>
                                        <th>Level</th>
                                        <th>Yata BS</th>
                                        <th>BSP</th>
                                        <th>Life</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Abroad members list will be populated dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to add styles to the page
    function addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    // Function to create panel
    function createPanel() {
        if (!$('#war-panel').length) {
            $('body').append(getHtmlTemplate());
            setupEventListeners();
        }
    }

    // Function to handle tab switching
    function switchTab(tabName) {
        $('.tab').removeClass('active');
        $(`.tab[data-tab="${tabName}"]`).addClass('active');

        $('.tab-content').removeClass('active');
        $(`#${tabName}-tab`).addClass('active');

        // Update auto-refresh button states
        if (tabName === 'all-members') {
            const isActive = autoRefreshInterval !== null;
            $('#auto-refresh')
                .toggleClass('active', isActive)
                .text(isActive ? 'Stop Auto-refresh' : 'Auto-refresh');
            $('#refresh-interval').prop('disabled', isActive);
        } else {
            const isActive = autoRefreshIntervalAbroad !== null;
            $('#auto-refresh-abroad')
                .toggleClass('active', isActive)
                .text(isActive ? 'Stop Auto-refresh' : 'Auto-refresh');
            $('#refresh-interval-abroad').prop('disabled', isActive);
        }

        // Apply saved sort state for the current tab
        const sortState = getSortState(tabName);
        const table = $(`#${tabName}-tab .xpt-table`);
        table.find('th').removeClass('sort-asc sort-desc');
        const header = table.find('th').eq(sortState.column);
        header.addClass(sortState.ascending ? 'sort-asc' : 'sort-desc');
    }

    // Update the currentFilters initialization
    let currentFilters = {
        status: 'all',
        state: 'all'
    };

    // Add this new unified function to handle all table operations
    function updateMembersTable(members) {
        try {
            console.log('Updating members table with', members.length, 'members');
            
            // Clean up existing countdowns before updating
            cleanupCountdowns();
            
            // Validate members array
            if (!Array.isArray(members)) {
                throw new Error('Invalid members data: expected an array');
            }

            // Filter out invalid members
            const validMembers = members.filter(member => member && typeof member === 'object');
            console.log('Valid members after filtering:', validMembers.length);

            // Calculate member status counts
            const statusCounts = calculateMemberStatusCounts(validMembers);
            
            // Update status counts in the UI
            $('.zoo-status').html(`
                <span>Online: ${statusCounts.online}</span>
                <span>Idle: ${statusCounts.idle}</span>
                <span>Offline: ${statusCounts.offline}</span>
            `);

            // Filter abroad members
            const abroadMembers = validMembers.filter(member => {
                const state = member.status?.state || '';
                return state === 'Traveling' || state === 'Abroad';
            });

            // Update both tables
            updateTableContent('#all-members-tab .xpt-table tbody', validMembers);
            updateTableContent('#abroad-members-tab .xpt-table tbody', abroadMembers);

            // Setup table header click handlers if not already set
            setupTableHeaders();

            console.log('Finished updating members table');
            return true;
        } catch (error) {
            console.error('Error in updateMembersTable:', error);
            showNotification('Error updating members table', 'error');
            return false;
        }
    }

    // Helper function to update table content
    function updateTableContent(selector, members) {
        const tbody = $(selector);
        tbody.empty();

        members.forEach((member, index) => {
            try {
                const memberStatus = member.status || {};
                const memberState = memberStatus.state || 'Unknown';
                const statusClass = getStatusClass(memberState);
                const statusIcon = getStatusIcon(member.lastAction || {});
                const lifeBar = createLifeBar(
                    member.life?.current || 0,
                    member.life?.maximum || 0
                );
                
                const countdownId = `countdown-${member.id || `unknown-${index}`}`;
                
                const row = `
                    <tr>
                        <td class="action-cell">
                            <a href="https://www.torn.com/loader.php?sid=attack&user2ID=${member.id}" target="_blank" class="attack-button">⚔️</a>
                            <span class="status-icon">${statusIcon}</span>
                        </td>
                        <td class="member-name">
                            <a href="https://www.torn.com/profiles.php?XID=${member.id}" target="_blank">${member.name || 'Unknown'}</a>
                        </td>
                        <td class="${statusClass}">${memberState}</td>
                        <td>${memberStatus.description || '-'}</td>
                        <td id="${countdownId}">${formatTimeRemaining(memberStatus.until)}</td>
                        <td>${member.level || 0}</td>
                        <td>${formatBSValue(member.yataBS)}</td>
                        <td>${member.bsp || '-'}</td>
                        <td>${lifeBar}</td>
                    </tr>
                `;
                tbody.append(row);

                // Start countdown if member is in hospital
                if (memberState === 'Hospital' && memberStatus.until) {
                    startCountdown(countdownId, memberStatus.until);
                }
            } catch (memberError) {
                console.error(`Error processing member at index ${index}:`, memberError);
            }
        });
    }

    // Helper function to setup table headers
    function setupTableHeaders() {
        $('.xpt-table').each(function() {
            const table = $(this);
            const tabName = table.closest('.tab-content').attr('id').replace('-tab', '');
            
            if (!table.data('handlers-set')) {
                const headers = table.find('th');
                headers.each((index, header) => {
                    $(header).css('cursor', 'pointer');
                    $(header).on('click', () => sortTable(index, header.closest('table')));
                });
                table.data('handlers-set', true);
            }

            // Apply saved sort state visual indicators
            const sortState = getSortState(tabName);
            table.find('th').removeClass('sort-asc sort-desc');
            const header = table.find('th').eq(sortState.column);
            header.addClass(sortState.ascending ? 'sort-asc' : 'sort-desc');
        });
    }

    // Update the setupEventListeners function
    function setupEventListeners() {
        // Load API key if exists
        const savedApiKey = getApiKey();
        if (savedApiKey) {
            $('#api-key-input').val(savedApiKey);
            // Load war data if API key exists
            loadWarData(savedApiKey);
        }

        // Add toggle functionality
        $('#war-panel-toggle').on('click', function() {
            $('#war-panel').toggleClass('visible');
            $(this).toggleClass('active');
        });

        $('#save-api-key').on('click', function() {
            const apiKey = $('#api-key-input').val().trim();
            if (!apiKey) {
                showNotification('Please enter a valid API key', 'error');
                return;
            }
            
            saveApiKey(apiKey);
            showNotification('API key saved successfully!');
            
            // Fetch and save war data
            loadWarData(apiKey);
        });

        $('#refresh-members').on('click', refreshMembersData);
        
        $('#auto-refresh').on('click', function() {
            const button = $(this);
            const interval = $('#refresh-interval').val();

            if (autoRefreshInterval) {
                clearInterval(autoRefreshInterval);
                autoRefreshInterval = null;
                button.removeClass('active');
                button.text('Auto-refresh');
                $('#refresh-interval').prop('disabled', false);
            } else {
                button.addClass('active');
                button.text('Stop Auto-refresh');
                $('#refresh-interval').prop('disabled', true);
                autoRefreshInterval = setInterval(refreshMembersData, interval * 1000);
            }
        });

        $('#get-bsp').on('click', scrapeBSPValues);

        // Tab switching
        $('.tab').on('click', function() {
            const tabName = $(this).data('tab');
            switchTab(tabName);
        });

        // Abroad tab refresh button
        $('#refresh-abroad').on('click', refreshMembersData);
        
        // Abroad tab auto-refresh
        $('#auto-refresh-abroad').on('click', function() {
            const button = $(this);
            const interval = $('#refresh-interval-abroad').val();

            if (autoRefreshIntervalAbroad) {
                clearInterval(autoRefreshIntervalAbroad);
                autoRefreshIntervalAbroad = null;
                button.removeClass('active');
                button.text('Stop Auto-refresh');
                $('#refresh-interval-abroad').prop('disabled', true);
            } else {
                button.addClass('active');
                button.text('Stop Auto-refresh');
                $('#refresh-interval-abroad').prop('disabled', true);
                autoRefreshIntervalAbroad = setInterval(refreshMembersData, interval * 1000);
            }
        });

        // Abroad tab BSP button
        $('#get-bsp-abroad').on('click', scrapeBSPValues);

        // Change monitoring interval for main tab
        $('#refresh-interval').on('change', function() {
            if (autoRefreshInterval) {
                clearInterval(autoRefreshInterval);
                autoRefreshInterval = setInterval(refreshMembersData, $(this).val() * 1000);
            }
        });

        // Change monitoring interval for abroad tab
        $('#refresh-interval-abroad').on('change', function() {
            if (autoRefreshIntervalAbroad) {
                clearInterval(autoRefreshIntervalAbroad);
                autoRefreshIntervalAbroad = setInterval(refreshMembersData, $(this).val() * 1000);
            }
        });
    }

    // Add this function to create and update the chart
    function createActivityChart(hours) {
        const ctx = document.getElementById('activityChart').getContext('2d');

        // Generate sample data (replace this with real data)
        const data = {
            labels: Array.from({length: hours}, (_, i) => `${hours-i}h ago`).reverse(),
            datasets: [
                {
                    label: 'Attacks',
                    data: Array.from({length: hours}, () => Math.floor(Math.random() * 20)),
                    borderColor: '#4CAF50',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Wall Joins',
                    data: Array.from({length: hours}, () => Math.floor(Math.random() * 15)),
                    borderColor: '#2196F3',
                    tension: 0.4,
                    fill: false
                }
            ]
        };

        if (window.activityChart) {
            window.activityChart.destroy();
        }

        window.activityChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#333'
                        },
                        ticks: {
                            color: '#888'
                        }
                    },
                    x: {
                        grid: {
                            color: '#333'
                        },
                        ticks: {
                            color: '#888'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#888'
                        }
                    }
                }
            }
        });
    }

    // Add this function after the styles and before getHtmlTemplate
    function showNotification(message, type = 'success') {
        // Remove any existing notifications
        $('.notification').remove();
        
        // Create new notification
        const notification = $(`<div class="notification ${type}">${message}</div>`);
        $('body').append(notification);
        
        // Trigger reflow to ensure animation works
        notification[0].offsetHeight;
        
        // Show notification
        notification.addClass('show');
        
        // Hide and remove after delay
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add these functions after the existing functions
    function fetchRankedWarData(apiKey) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://api.torn.com/v2/faction/15151/rankedwars?key=${apiKey}`,
                onload: function(response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        if (data.error) {
                            reject(new Error(data.error.error || 'Failed to fetch ranked war data'));
                        } else {
                            resolve(data);
                        }
                    } catch (error) {
                        reject(new Error('Failed to parse API response'));
                    }
                },
                onerror: function(error) {
                    reject(new Error('Network error occurred'));
                }
            });
        });
    }

    function saveRankedWarData(warData) {
        if (!warData.rankedwars || warData.rankedwars.length === 0) {
            throw new Error('No active ranked wars found');
        }

        const currentWar = warData.rankedwars[0];
        const enemyFaction = currentWar.factions.find(f => f.id !== 15151);

        if (!enemyFaction) {
            throw new Error('Enemy faction not found in war data');
        }

        const warInfo = {
            warId: currentWar.id,
            startTime: currentWar.start,
            endTime: currentWar.end,
            enemyFactionId: enemyFaction.id,
            enemyFactionName: enemyFaction.name
        };

        localStorage.setItem('tornWarPanelCurrentWar', JSON.stringify(warInfo));
        return warInfo;
    }

    // Add this function to handle loading war data
    function loadWarData(apiKey) {
        showNotification('Loading war data...', 'info');
        
        fetchRankedWarData(apiKey)
            .then(data => {
                const warInfo = saveRankedWarData(data);
                showNotification(`Loaded war data for ${warInfo.enemyFactionName}`);
                
                // Update UI with enemy faction name and link
                $('.faction-name').html(`
                    <a href="https://www.torn.com/factions.php?step=profile&ID=${warInfo.enemyFactionId}" target="_blank">
                        ${warInfo.enemyFactionName}
                    </a>
                `);

                // Fetch and save members data
                return fetchFactionMembers(apiKey, warInfo.enemyFactionId);
            })
            .then(membersData => {
                const processedMembers = saveFactionMembers(membersData);
                showNotification(`Loaded ${processedMembers.length} members`);
            })
            .catch(error => {
                showNotification(error.message, 'error');
                console.error('Error loading data:', error);
            });
    }

    // Add this function after the existing functions
    function loadSavedFactionInfo() {
        const savedWarInfo = localStorage.getItem('tornWarPanelCurrentWar');
        if (savedWarInfo) {
            try {
                const warInfo = JSON.parse(savedWarInfo);
                $('.faction-name').text(warInfo.enemyFactionName);
            } catch (error) {
                console.error('Error loading saved faction info:', error);
            }
        }
    }

    // Add these functions after the existing functions
    function fetchFactionMembers(apiKey, factionId) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://api.torn.com/v2/faction/${factionId}/members?striptags=true&key=${apiKey}`,
                onload: function(response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        if (data.error) {
                            reject(new Error(data.error.error || 'Failed to fetch faction members'));
                        } else {
                            resolve(data);
                        }
                    } catch (error) {
                        reject(new Error('Failed to parse API response'));
                    }
                },
                onerror: function(error) {
                    reject(new Error('Network error occurred'));
                }
            });
        });
    }

    function saveFactionMembers(membersData) {
        console.log('Starting saveFactionMembers with data:', membersData);
        
        if (!membersData || !membersData.members || !Array.isArray(membersData.members)) {
            console.error('Invalid members data received:', membersData);
            throw new Error('Invalid members data received from API');
        }

        // Get existing members to preserve Yata BS and BSP values
        const existingMembers = JSON.parse(localStorage.getItem('tornWarPanelMembers') || '[]');
        const existingMembersMap = new Map(existingMembers.map(m => [m.id, m]));

        const processedMembers = membersData.members.map(member => {
            if (!member) return null;

            const processedMember = {
                id: member.id || 0,
                name: member.name || 'Unknown',
                level: member.level || 0,
                yataBS: '',  // Will be updated if needed
                bsp: '',     // Will be preserved from existing data
                lastAction: {
                    status: member.last_action?.status || 'Unknown',
                    timestamp: member.last_action?.timestamp || 0,
                    relative: member.last_action?.relative || '-'
                },
                status: {
                    state: member.status?.state || 'Unknown',
                    description: member.status?.description || '-',
                    until: member.status?.until || 0
                },
                life: {
                    current: member.life?.current || 0,
                    maximum: member.life?.maximum || 0
                }
            };

            // Preserve existing Yata BS and BSP values if they exist
            const existingMember = existingMembersMap.get(processedMember.id);
            if (existingMember) {
                if (existingMember.yataBS) {
                    processedMember.yataBS = existingMember.yataBS;
                }
                if (existingMember.bsp) {
                    processedMember.bsp = existingMember.bsp;
                }
            }
            
            console.log('Processed member:', processedMember);
            return processedMember;
        }).filter(member => member !== null);

        // Save to localStorage first to ensure we have the base data
        localStorage.setItem('tornWarPanelMembers', JSON.stringify(processedMembers));

        // Now fetch Yata BS values only for members who don't have them
        const apiKey = getApiKey();
        if (apiKey) {
            processedMembers.forEach(async (member) => {
                if (!member.yataBS) {
                    const bsValue = await fetchYataBS(member.id, apiKey);
                    if (bsValue !== null) {
                        member.yataBS = bsValue;
                        // Update localStorage with the new BS value
                        const currentMembers = JSON.parse(localStorage.getItem('tornWarPanelMembers') || '[]');
                        const updatedMembers = currentMembers.map(m => 
                            m.id === member.id ? {...m, yataBS: bsValue} : m
                        );
                        localStorage.setItem('tornWarPanelMembers', JSON.stringify(updatedMembers));
                    }
                }
            });
        }

        return processedMembers;
    }

    // Add this helper function to determine status icon
    function getStatusIcon(lastAction) {
        try {
            if (!lastAction) return '⚪';
            
            // Safely access status property
            const status = lastAction.status ? String(lastAction.status).toLowerCase() : '';
            
            if (status.includes('online')) {
                return '🟢';
            } else if (status.includes('idle')) {
                return '🟡';
            } else {
                return '⚪';
            }
        } catch (error) {
            console.error('Error in getStatusIcon:', error);
            return '⚪';
        }
    }

    // Add these helper functions for time formatting and life bar
    function formatTimeRemaining(timestamp) {
        if (!timestamp) return '-';
        
        const now = Math.floor(Date.now() / 1000);
        const remaining = timestamp - now;
        
        if (remaining <= 0) return '0s';
        
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    function createLifeBar(current, maximum) {
        if (!maximum) return '0/0';
        
        const percentage = Math.round((current / maximum) * 100);
        const barWidth = 100; // pixels
        const filledWidth = Math.round((percentage / 100) * barWidth);
        
        return `
            <div class="life-bar-container" style="width: ${barWidth}px; display: inline-block;">
                <div class="life-bar-fill" style="width: ${filledWidth}px; height: 8px; background-color: ${getLifeBarColor(percentage)}; display: inline-block; vertical-align: middle;"></div>
                <span style="margin-left: 5px;">${current}/${maximum}</span>
            </div>
        `;
    }

    function getLifeBarColor(percentage) {
        if (percentage > 75) return '#4CAF50'; // Green
        if (percentage > 25) return '#FFA500'; // Orange
        return '#f44336'; // Red
    }

    // Update sort state management
    function saveSortState(columnIndex, isAscending, tabName = 'all-members') {
        const sortStates = JSON.parse(localStorage.getItem('tornWarPanelSortStates') || '{}');
        sortStates[tabName] = {
            column: columnIndex,
            ascending: isAscending
        };
        localStorage.setItem('tornWarPanelSortStates', JSON.stringify(sortStates));
    }

    function getSortState(tabName = 'all-members') {
        const sortStates = JSON.parse(localStorage.getItem('tornWarPanelSortStates') || '{}');
        if (sortStates[tabName]) {
            return sortStates[tabName];
        }
        return { column: 0, ascending: true }; // Default sort
    }

    // Update sortTable function to handle both tabs
    function sortTable(columnIndex, table) {
        try {
            console.log('Starting sort operation on column:', columnIndex);
            
            const savedMembers = localStorage.getItem('tornWarPanelMembers');
            if (!savedMembers) {
                console.error('No members found in localStorage');
                return;
            }

            let members = JSON.parse(savedMembers);
            console.log('Total members before sorting:', members.length);

            // Determine which tab we're sorting
            const tabName = $(table).closest('.tab-content').attr('id').replace('-tab', '');
            
            // Get current sort state
            const currentHeader = $(table).find('th').eq(columnIndex);
            const isAscending = currentHeader.hasClass('sort-asc');
            
            // Update sort indicators
            $(table).find('th').removeClass('sort-asc sort-desc');
            currentHeader.addClass(isAscending ? 'sort-desc' : 'sort-asc');
            
            // Save sort state
            saveSortState(columnIndex, !isAscending, tabName);
            
            // Sort members array based on column
            members.sort((a, b) => {
                let aValue, bValue;
                
                switch(columnIndex) {
                    case 0: // Action column (status icon)
                        aValue = getStatusPriority(getStatusIcon(a?.lastAction || {}));
                        bValue = getStatusPriority(getStatusIcon(b?.lastAction || {}));
                        break;
                    case 1: // Name
                        aValue = (a?.name || '').toLowerCase();
                        bValue = (b?.name || '').toLowerCase();
                        break;
                    case 2: // Status
                        aValue = getStatePriority(a?.status?.state || '');
                        bValue = getStatePriority(b?.status?.state || '');
                        break;
                    case 3: // Description
                        aValue = (a?.status?.description || '').toLowerCase();
                        bValue = (b?.status?.description || '').toLowerCase();
                        break;
                    case 4: // Time
                        aValue = a?.status?.until || 0;
                        bValue = b?.status?.until || 0;
                        break;
                    case 5: // Level
                        aValue = parseInt(a?.level || 0);
                        bValue = parseInt(b?.level || 0);
                        break;
                    case 6: // BS
                        aValue = parseInt(a?.yataBS || 0);
                        bValue = parseInt(b?.yataBS || 0);
                        break;
                    case 7: // BSP
                        aValue = parseBSPValue(a?.bsp);
                        bValue = parseBSPValue(b?.bsp);
                        break;
                    case 8: // Life
                        aValue = parseInt(a?.life?.current || 0);
                        bValue = parseInt(b?.life?.current || 0);
                        break;
                    default:
                        return 0;
                }
                
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return isAscending ? 
                        bValue.localeCompare(aValue) : 
                        aValue.localeCompare(bValue);
                }
                
                return isAscending ? 
                    (bValue - aValue) : 
                    (aValue - bValue);
            });
            
            console.log('Total members after sorting:', members.length);
            updateMembersTable(members);
            
        } catch (error) {
            console.error('Error in sortTable:', error);
            showNotification('Error sorting members', 'error');
        }
    }

    // Helper function to get status priority
    function getStatusPriority(status) {
        const priorities = {
            '🟢': 3, // Online
            '🟡': 2, // Idle
            '⚪': 1  // Offline
        };
        return priorities[status] || 0;
    }

    // Helper function to get state priority
    function getStatePriority(state) {
        const priorities = {
            'Hospital': 4,
            'Traveling': 3,
            'Abroad': 2,
            'Okay': 1
        };
        return priorities[state] || 0;
    }

    // Add countdown functionality
    function startCountdown(elementId, endTime) {
        try {
            // Clear any existing interval for this element
            const existingInterval = document.getElementById(elementId)?.getAttribute('data-interval-id');
            if (existingInterval) {
                clearInterval(parseInt(existingInterval));
            }

            // Create new interval
            const intervalId = setInterval(() => {
                const element = document.getElementById(elementId);
                if (!element) {
                    clearInterval(intervalId);
                    return;
                }

                const now = Math.floor(Date.now() / 1000);
                const remaining = endTime - now;

                if (remaining <= 0) {
                    element.textContent = '0s';
                    clearInterval(intervalId);
                    return;
                }

                const hours = Math.floor(remaining / 3600);
                const minutes = Math.floor((remaining % 3600) / 60);
                const seconds = remaining % 60;

                let timeText = '';
                if (hours > 0) {
                    timeText = `${hours}h ${minutes}m`;
                } else if (minutes > 0) {
                    timeText = `${minutes}m ${seconds}s`;
                } else {
                    timeText = `${seconds}s`;
                }

                element.textContent = timeText;
            }, 1000);

            // Store interval ID on the element
            const element = document.getElementById(elementId);
            if (element) {
                element.setAttribute('data-interval-id', intervalId.toString());
            }
        } catch (error) {
            console.error('Error in startCountdown:', error);
        }
    }

    // Add cleanup function for countdowns
    function cleanupCountdowns() {
        const countdownElements = document.querySelectorAll('[id^="countdown-"]');
        countdownElements.forEach(element => {
            const intervalId = element.getAttribute('data-interval-id');
            if (intervalId) {
                clearInterval(parseInt(intervalId));
                element.removeAttribute('data-interval-id');
            }
        });
    }

    // Update the refreshMembersData function to handle both tables
    function refreshMembersData() {
        const table = $('.xpt-table');
        table.addClass('table-loading');
        
        const apiKey = getApiKey();
        if (!apiKey) {
            showNotification('Please enter a valid API key', 'error');
            table.removeClass('table-loading');
            return;
        }

        const savedWarInfo = localStorage.getItem('tornWarPanelCurrentWar');
        if (!savedWarInfo) {
            showNotification('No war data found', 'error');
            table.removeClass('table-loading');
            return;
        }

        const warInfo = JSON.parse(savedWarInfo);
        
        // Make the API request
        fetchFactionMembers(apiKey, warInfo.enemyFactionId)
            .then(membersData => {
                // Save the new data (which will handle Yata BS values appropriately)
                const processedMembers = saveFactionMembers(membersData);
                
                // Get current sort state
                const sortState = getSortState();
                
                // Sort the members according to saved state
                const sortedMembers = [...processedMembers].sort((a, b) => {
                    let aValue, bValue;
                    
                    switch(sortState.column) {
                        case 0: // Action column (status icon)
                            aValue = getStatusPriority(getStatusIcon(a?.lastAction || {}));
                            bValue = getStatusPriority(getStatusIcon(b?.lastAction || {}));
                            break;
                        case 1: // Name
                            aValue = (a?.name || '').toLowerCase();
                            bValue = (b?.name || '').toLowerCase();
                            break;
                        case 2: // Status
                            aValue = getStatePriority(a?.status?.state || '');
                            bValue = getStatePriority(b?.status?.state || '');
                            break;
                        case 3: // Description
                            aValue = (a?.status?.description || '').toLowerCase();
                            bValue = (b?.status?.description || '').toLowerCase();
                            break;
                        case 4: // Time
                            aValue = a?.status?.until || 0;
                            bValue = b?.status?.until || 0;
                            break;
                        case 5: // Level
                            aValue = parseInt(a?.level || 0);
                            bValue = parseInt(b?.level || 0);
                            break;
                        case 6: // BS
                            aValue = parseInt(a?.yataBS || 0);
                            bValue = parseInt(b?.yataBS || 0);
                            break;
                        case 7: // BSP
                            aValue = parseBSPValue(a?.bsp);
                            bValue = parseBSPValue(b?.bsp);
                            break;
                        case 8: // Life
                            aValue = parseInt(a?.life?.current || 0);
                            bValue = parseInt(b?.life?.current || 0);
                            break;
                        default:
                            return 0;
                    }
                    
                    if (typeof aValue === 'string' && typeof bValue === 'string') {
                        return sortState.ascending ? 
                            aValue.localeCompare(bValue) : 
                            bValue.localeCompare(aValue);
                    }
                    
                    return sortState.ascending ? 
                        (aValue - bValue) : 
                        (bValue - aValue);
                });
                
                // Update both tables with the sorted data
                updateMembersTable(sortedMembers);
                showNotification('Members data refreshed');
            })
            .catch(error => {
                console.error('Error refreshing members:', error);
                showNotification('Error refreshing members data', 'error');
            })
            .finally(() => {
                table.removeClass('table-loading');
            });
    }

    // Update the getStatusClass function with more robust error handling
    function getStatusClass(state) {
        try {
            if (!state) return 'status-okay';
            
            // Ensure state is a string and handle any potential errors
            const stateStr = String(state || '');
            const stateLower = stateStr.toLowerCase();
            
            switch (stateLower) {
                case 'okay':
                    return 'status-okay';
                case 'hospital':
                    return 'status-hospital';
                case 'abroad':
                    return 'status-abroad';
                case 'traveling':
                    return 'status-traveling';
                default:
                    return 'status-okay';
            }
        } catch (error) {
            console.error('Error in getStatusClass:', error);
            return 'status-okay';
        }
    }

    // Add function to calculate member status counts
    function calculateMemberStatusCounts(members) {
        const counts = {
            online: 0,
            idle: 0,
            offline: 0
        };

        members.forEach(member => {
            if (!member?.lastAction?.status) {
                counts.offline++;
                return;
            }

            const status = member.lastAction.status.toLowerCase();
            if (status.includes('online')) {
                counts.online++;
            } else if (status.includes('idle')) {
                counts.idle++;
            } else {
                counts.offline++;
            }
        });

        return counts;
    }

    // Update function to fetch Yata BS value using GM_xmlhttpRequest
    function fetchYataBS(targetId, apiKey) {
        return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                method: 'GET',
                url: `https://yata.yt/api/v1/bs/${targetId}?key=${apiKey}`,
                    onload: function(response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        resolve(data[targetId]?.total || null);
                    } catch (error) {
                        console.error(`Error parsing Yata BS response for target ${targetId}:`, error);
                        resolve(null);
                    }
                },
                onerror: function(error) {
                    console.error(`Error fetching Yata BS for target ${targetId}:`, error);
                    resolve(null);
                }
            });
        });
    }

    // Add function to format BS values
    function formatBSValue(value) {
        if (!value || value === '-') return '-';
        
        const num = parseInt(value);
        if (isNaN(num)) return '-';

        const absNum = Math.abs(num);
        
        if (absNum >= 1e12) {
            return (num / 1e12).toFixed(1) + 'T';
        } else if (absNum >= 1e9) {
            return (num / 1e9).toFixed(1) + 'B';
        } else if (absNum >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';
        } else if (absNum >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K';
        }
        
        return num.toString();
    }

    // Add function to scrape BSP values
    function scrapeBSPValues() {
        try {
            console.log('Starting BSP scraping');
            const savedMembers = localStorage.getItem('tornWarPanelMembers');
            if (!savedMembers) {
                showNotification('No members found to scrape BSP', 'error');
                return;
            }

            const members = JSON.parse(savedMembers);
            let updatedCount = 0;

            // Find all attack links in the page
            const attackLinks = document.querySelectorAll('a[href*="loader2.php?sid=getInAttack"]');
            
            attackLinks.forEach(link => {
                try {
                    // Extract user ID from the link
                    const userIdMatch = link.href.match(/user2ID=(\d+)/);
                    if (!userIdMatch) return;
                    
                    const userId = parseInt(userIdMatch[1]);
                    
                    // Find the iconStats div within this link
                    const iconStats = link.querySelector('.iconStats');
                    if (!iconStats) return;
                    
                    // Extract BSP value
                    const bspValue = iconStats.textContent.trim();
                    
                    // Update member in the array
                    const memberIndex = members.findIndex(m => m.id === userId);
                    if (memberIndex !== -1) {
                        members[memberIndex].bsp = bspValue;
                        updatedCount++;
                    }
                } catch (linkError) {
                    console.error('Error processing link:', linkError);
                }
            });

            // Save updated members
            localStorage.setItem('tornWarPanelMembers', JSON.stringify(members));
            
            // Update the table
            updateMembersTable(members);
            
            showNotification(`Updated BSP values for ${updatedCount} members`);
        } catch (error) {
            console.error('Error scraping BSP values:', error);
            showNotification('Error scraping BSP values', 'error');
        }
    }

    // Initialize the panel
    function init() {
        addStyles();
        createPanel();
        loadSavedFactionInfo();
        loadSavedMembers();
    }

    // Add this function to load saved members
    function loadSavedMembers() {
        try {
            console.log('Starting loadSavedMembers');
            const savedMembers = localStorage.getItem('tornWarPanelMembers');
            
            if (!savedMembers) {
                console.log('No saved members found');
                return;
            }

            const members = JSON.parse(savedMembers);
            updateMembersTable(members);
            
        } catch (error) {
            console.error('Error in loadSavedMembers:', error);
            showNotification('Error loading members data', 'error');
        }
    }

    // Run the script when the page is loaded
    $(document).ready(setTimeout(init, 2000));
})(jQuery);
