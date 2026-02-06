/**
 * Home Value Calculator
 * A comprehensive tool for estimating home value and improvement ROI
 * Version: 2.0
 */

// ============================================================================
// DATA STRUCTURE: Home Improvements Database
// ============================================================================

const improvements = [
    {
        id: 'kitchen-remodel',
        title: 'Kitchen Remodel',
        icon: '🍳',
        cost: 25000,
        valueIncrease: 20000,
        roi: 80,
        duration: '4-6 weeks',
        priority: 'high',
        description: 'Modern kitchen with updated appliances, countertops, and cabinets'
    },
    {
        id: 'bathroom-renovation',
        title: 'Bathroom Renovation',
        icon: '🛁',
        cost: 15000,
        valueIncrease: 12000,
        roi: 80,
        duration: '3-4 weeks',
        priority: 'high',
        description: 'Updated fixtures, tile, and vanity'
    },
    {
        id: 'flooring-upgrade',
        title: 'Flooring Upgrade',
        icon: '🏠',
        cost: 8000,
        valueIncrease: 6500,
        roi: 81,
        duration: '2-3 weeks',
        priority: 'medium',
        description: 'Hardwood or high-quality laminate flooring throughout'
    },
    {
        id: 'exterior-painting',
        title: 'Exterior Painting',
        icon: '🎨',
        cost: 5000,
        valueIncrease: 5000,
        roi: 100,
        duration: '1-2 weeks',
        priority: 'high',
        description: 'Fresh coat of paint to boost curb appeal'
    },
    {
        id: 'landscaping',
        title: 'Professional Landscaping',
        icon: '🌳',
        cost: 4000,
        valueIncrease: 4500,
        roi: 113,
        duration: '1 week',
        priority: 'high',
        description: 'Enhanced curb appeal with professional landscaping'
    },
    {
        id: 'hvac-system',
        title: 'HVAC System Upgrade',
        icon: '❄️',
        cost: 7000,
        valueIncrease: 5500,
        roi: 79,
        duration: '1 week',
        priority: 'medium',
        description: 'Energy-efficient heating and cooling system'
    },
    {
        id: 'window-replacement',
        title: 'Window Replacement',
        icon: '🪟',
        cost: 10000,
        valueIncrease: 8000,
        roi: 80,
        duration: '2-3 weeks',
        priority: 'medium',
        description: 'Energy-efficient windows throughout'
    },
    {
        id: 'roof-replacement',
        title: 'Roof Replacement',
        icon: '🏚️',
        cost: 12000,
        valueIncrease: 9000,
        roi: 75,
        duration: '1-2 weeks',
        priority: 'medium',
        description: 'New roof with modern materials'
    },
    {
        id: 'deck-addition',
        title: 'Deck Addition',
        icon: '🪵',
        cost: 10000,
        valueIncrease: 8500,
        roi: 85,
        duration: '2-3 weeks',
        priority: 'low',
        description: 'Outdoor living space with quality decking'
    },
    {
        id: 'smart-home',
        title: 'Smart Home Technology',
        icon: '📱',
        cost: 3000,
        valueIncrease: 3500,
        roi: 117,
        duration: '1 week',
        priority: 'medium',
        description: 'Smart thermostat, locks, and lighting'
    },
    {
        id: 'garage-door',
        title: 'Garage Door Replacement',
        icon: '🚪',
        cost: 3500,
        valueIncrease: 3500,
        roi: 100,
        duration: '1 day',
        priority: 'medium',
        description: 'Modern insulated garage door'
    },
    {
        id: 'basement-finish',
        title: 'Basement Finishing',
        icon: '🏗️',
        cost: 20000,
        valueIncrease: 15000,
        roi: 75,
        duration: '6-8 weeks',
        priority: 'low',
        description: 'Convert basement into usable living space'
    }
];

// ============================================================================
// STATE MANAGEMENT: Application Data
// ============================================================================

let selectedImprovements = [];

let propertyData = {
    currentValue: 0,
    squareFeet: 0,
    bedrooms: 0,
    bathrooms: 0,
    yearBuilt: 0,
    propertyType: 'single-family',
    conditions: {
        kitchen: 'good',
        bathroom: 'good',
        flooring: 'good',
        exterior: 'good'
    }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application
 * Sets up the UI and event listeners
 */
function init() {
    renderImprovements();
    setupEventListeners();
}

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Render all improvement options as interactive cards
 */
function renderImprovements() {
    const grid = document.getElementById('improvementsGrid');
    grid.innerHTML = improvements.map(improvement => `
        <div class="improvement-card" data-id="${improvement.id}">
            <div class="improvement-header">
                <span class="improvement-icon">${improvement.icon}</span>
                <div>
                    <div class="improvement-title">${improvement.title}</div>
                </div>
            </div>
            <div class="improvement-details">
                <div class="detail-row">
                    <span class="detail-label">Cost:</span>
                    <span class="detail-value">$${improvement.cost.toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Value Added:</span>
                    <span class="detail-value success">+$${improvement.valueIncrease.toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">ROI:</span>
                    <span class="detail-value success">${improvement.roi}%</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Duration:</span>
                    <span class="detail-value">${improvement.duration}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Render recommendation cards based on selected improvements
 * @param {Array} selectedItems - Array of selected improvement objects
 */
function renderRecommendations(selectedItems) {
    // Sort by priority: high -> medium -> low
    const sortedItems = [...selectedItems].sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const list = document.getElementById('recommendationsList');
    list.innerHTML = sortedItems.map((item, index) => `
        <div class="recommendation-item">
            <div class="recommendation-priority ${item.priority}">${item.priority.toUpperCase()}</div>
            <div class="recommendation-content">
                <div class="recommendation-title">${item.icon} ${item.title}</div>
                <p>${item.description}</p>
                <div class="recommendation-details">
                    <div>💰 Cost: $${item.cost.toLocaleString()}</div>
                    <div>📈 Value Added: $${item.valueIncrease.toLocaleString()}</div>
                    <div>🎯 ROI: ${item.roi}%</div>
                    <div>⏱️ Duration: ${item.duration}</div>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Render timeline with phased approach
 * @param {Array} selectedItems - Array of selected improvement objects
 */
function renderTimeline(selectedItems) {
    // Sort by priority for phased implementation
    const sortedItems = [...selectedItems].sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Group by priority phases
    const phases = [
        { name: 'Immediate Priority', items: sortedItems.filter(i => i.priority === 'high') },
        { name: 'Secondary Priority', items: sortedItems.filter(i => i.priority === 'medium') },
        { name: 'Future Consideration', items: sortedItems.filter(i => i.priority === 'low') }
    ];

    const list = document.getElementById('timelineList');
    let phaseNumber = 1;
    
    list.innerHTML = phases.map(phase => {
        if (phase.items.length === 0) return '';
        
        return phase.items.map((item, index) => `
            <div class="timeline-item">
                <div class="timeline-marker">${phaseNumber++}</div>
                <div class="timeline-content">
                    <div class="timeline-phase">${phase.name}</div>
                    <div class="timeline-improvement">${item.icon} ${item.title}</div>
                    <div class="timeline-duration">Estimated Duration: ${item.duration}</div>
                </div>
            </div>
        `).join('');
    }).join('');
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Setup all event listeners for the application
 */
function setupEventListeners() {
    // Condition rating buttons
    document.querySelectorAll('.rating-buttons').forEach(group => {
        group.addEventListener('click', (e) => {
            if (e.target.classList.contains('rating-btn')) {
                const condition = group.dataset.condition;
                const value = e.target.dataset.value;
                
                // Update active state
                group.querySelectorAll('.rating-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Update property data
                propertyData.conditions[condition] = value;
            }
        });
    });

    // Improvement card selection
    document.getElementById('improvementsGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.improvement-card');
        if (card) {
            const id = card.dataset.id;
            card.classList.toggle('selected');
            
            if (selectedImprovements.includes(id)) {
                selectedImprovements = selectedImprovements.filter(i => i !== id);
            } else {
                selectedImprovements.push(id);
            }
        }
    });

    // Calculate button
    document.getElementById('calculateBtn').addEventListener('click', calculateResults);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetCalculator);

    // Property input fields
    document.getElementById('currentValue').addEventListener('input', (e) => {
        propertyData.currentValue = parseFloat(e.target.value) || 0;
    });
    document.getElementById('squareFeet').addEventListener('input', (e) => {
        propertyData.squareFeet = parseFloat(e.target.value) || 0;
    });
    document.getElementById('bedrooms').addEventListener('input', (e) => {
        propertyData.bedrooms = parseFloat(e.target.value) || 0;
    });
    document.getElementById('bathrooms').addEventListener('input', (e) => {
        propertyData.bathrooms = parseFloat(e.target.value) || 0;
    });
    document.getElementById('yearBuilt').addEventListener('input', (e) => {
        propertyData.yearBuilt = parseFloat(e.target.value) || 0;
    });
    document.getElementById('propertyType').addEventListener('change', (e) => {
        propertyData.propertyType = e.target.value;
    });
}

// ============================================================================
// CALCULATION LOGIC
// ============================================================================

/**
 * Calculate and display results based on user input
 */
function calculateResults() {
    // Validate inputs
    if (propertyData.currentValue <= 0) {
        alert('Please enter a valid current home value');
        return;
    }

    if (selectedImprovements.length === 0) {
        alert('Please select at least one improvement');
        return;
    }

    // Get selected improvement objects
    const selectedItems = improvements.filter(i => selectedImprovements.includes(i.id));
    
    // Calculate financial metrics
    const totalCost = selectedItems.reduce((sum, item) => sum + item.cost, 0);
    const totalValueIncrease = selectedItems.reduce((sum, item) => sum + item.valueIncrease, 0);
    const netGain = totalValueIncrease - totalCost;
    const averageROI = totalCost > 0 ? Math.round((totalValueIncrease / totalCost) * 100) : 0;
    const projectedValue = propertyData.currentValue + totalValueIncrease;
    const percentIncrease = ((totalValueIncrease / propertyData.currentValue) * 100).toFixed(2);

    // Calculate total timeline (estimate)
    const totalWeeks = selectedItems.reduce((sum, item) => {
        const weeks = parseDuration(item.duration);
        return sum + weeks;
    }, 0);

    // Update results display
    document.getElementById('currentValueResult').textContent = `$${propertyData.currentValue.toLocaleString()}`;
    document.getElementById('projectedValueResult').textContent = `$${projectedValue.toLocaleString()}`;
    document.getElementById('valueIncreaseAmount').textContent = `$${totalValueIncrease.toLocaleString()}`;
    document.getElementById('valueIncreasePercent').textContent = `+${percentIncrease}%`;
    document.getElementById('totalInvestment').textContent = `$${totalCost.toLocaleString()}`;
    document.getElementById('netGain').textContent = `$${netGain.toLocaleString()}`;
    document.getElementById('averageROI').textContent = `${averageROI}%`;
    document.getElementById('totalTimeline').textContent = `${totalWeeks} weeks`;

    // Render recommendations and timeline
    renderRecommendations(selectedItems);
    renderTimeline(selectedItems);

    // Show results section with animation
    document.getElementById('resultsSection').classList.remove('hidden');
    
    // Smooth scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Parse duration string to numeric weeks
 * @param {string} duration - Duration string (e.g., "2-3 weeks", "1 day")
 * @returns {number} Duration in weeks
 */
function parseDuration(duration) {
    const match = duration.match(/(\d+)(?:-(\d+))?\s*(\w+)/);
    if (!match) return 1;
    
    const [, min, max, unit] = match;
    const value = max ? (parseInt(min) + parseInt(max)) / 2 : parseInt(min);
    
    if (unit.includes('week')) return value;
    if (unit.includes('day')) return value / 7;
    if (unit.includes('month')) return value * 4;
    
    return value;
}

// ============================================================================
// RESET FUNCTIONALITY
// ============================================================================

/**
 * Reset the calculator to initial state
 */
function resetCalculator() {
    // Reset property data
    propertyData = {
        currentValue: 0,
        squareFeet: 0,
        bedrooms: 0,
        bathrooms: 0,
        yearBuilt: 0,
        propertyType: 'single-family',
        conditions: {
            kitchen: 'good',
            bathroom: 'good',
            flooring: 'good',
            exterior: 'good'
        }
    };

    // Reset selected improvements
    selectedImprovements = [];

    // Clear form inputs
    document.getElementById('currentValue').value = '';
    document.getElementById('squareFeet').value = '';
    document.getElementById('bedrooms').value = '';
    document.getElementById('bathrooms').value = '';
    document.getElementById('yearBuilt').value = '';
    document.getElementById('propertyType').value = 'single-family';

    // Reset rating buttons to "good"
    document.querySelectorAll('.rating-buttons').forEach(group => {
        const buttons = group.querySelectorAll('.rating-btn');
        buttons.forEach((btn, index) => {
            btn.classList.remove('active');
            if (btn.dataset.value === 'good') {
                btn.classList.add('active');
            }
        });
    });

    // Deselect all improvement cards
    document.querySelectorAll('.improvement-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Hide results section
    document.getElementById('resultsSection').classList.add('hidden');

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// APPLICATION START
// ============================================================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
