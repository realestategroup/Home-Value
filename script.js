/**
 * Home Value Maximizer
 * AI-powered property analysis with photo upload capability
 * Version: 3.0
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

let currentPage = 1;
let selectedImprovements = [];
let uploadedPhotos = {
    exterior: [],
    kitchen: [],
    bathrooms: [],
    living: [],
    landscaping: [],
    other: []
};

let propertyData = {
    currentValue: 0,
    squareFeet: 0,
    bedrooms: 0,
    bathrooms: 0,
    yearBuilt: 0,
    propertyType: 'single-family',
    address: '',
    additionalNotes: '',
    conditions: {
        kitchen: 'fair',
        bathroom: 'fair',
        flooring: 'fair',
        exterior: 'fair',
        roof: 'fair',
        landscaping: 'fair'
    }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application
 */
function init() {
    renderImprovements();
    setupEventListeners();
    setupFileUploads();
}

// ============================================================================
// PAGE NAVIGATION
// ============================================================================

/**
 * Navigate to a specific page
 * @param {number} pageNumber - The page number to navigate to
 */
function goToPage(pageNumber) {
    // Validate page 1 before proceeding
    if (currentPage === 1 && pageNumber > 1) {
        if (!validatePage1()) {
            return;
        }
    }

    // Hide current page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    if (pageNumber === 4) {
        document.getElementById('resultsPage').classList.add('active');
    } else {
        document.getElementById(`page${pageNumber}`).classList.add('active');
    }

    // Update progress indicator
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < pageNumber) {
            step.classList.add('completed');
        } else if (index + 1 === pageNumber) {
            step.classList.add('active');
        }
    });

    currentPage = pageNumber;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Validate page 1 inputs
 * @returns {boolean} Whether validation passed
 */
function validatePage1() {
    const currentValue = parseFloat(document.getElementById('currentValue').value);
    const squareFeet = parseFloat(document.getElementById('squareFeet').value);
    const bedrooms = parseFloat(document.getElementById('bedrooms').value);
    const bathrooms = parseFloat(document.getElementById('bathrooms').value);
    const yearBuilt = parseFloat(document.getElementById('yearBuilt').value);
    const propertyType = document.getElementById('propertyType').value;

    if (!currentValue || currentValue <= 0) {
        alert('Please enter a valid current home value');
        return false;
    }

    if (!squareFeet || squareFeet <= 0) {
        alert('Please enter valid square footage');
        return false;
    }

    if (!bedrooms || bedrooms <= 0) {
        alert('Please enter the number of bedrooms');
        return false;
    }

    if (!bathrooms || bathrooms <= 0) {
        alert('Please enter the number of bathrooms');
        return false;
    }

    if (!yearBuilt || yearBuilt < 1800 || yearBuilt > 2024) {
        alert('Please enter a valid year built');
        return false;
    }

    if (!propertyType) {
        alert('Please select a property type');
        return false;
    }

    // Store data
    propertyData.currentValue = currentValue;
    propertyData.squareFeet = squareFeet;
    propertyData.bedrooms = bedrooms;
    propertyData.bathrooms = bathrooms;
    propertyData.yearBuilt = yearBuilt;
    propertyData.propertyType = propertyType;
    propertyData.address = document.getElementById('address').value;
    propertyData.additionalNotes = document.getElementById('additionalNotes').value;

    return true;
}

// ============================================================================
// FILE UPLOAD HANDLING
// ============================================================================

/**
 * Setup file upload functionality
 */
function setupFileUploads() {
    const categories = ['exterior', 'kitchen', 'bathrooms', 'living', 'landscaping', 'other'];

    categories.forEach(category => {
        const input = document.getElementById(`upload-${category}`);
        const zone = input.closest('.upload-zone');
        const previewContainer = document.getElementById(`preview-${category}`);

        // File input change
        input.addEventListener('change', (e) => {
            handleFiles(e.target.files, category, previewContainer);
        });

        // Drag and drop
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = 'var(--primary-color)';
            zone.style.background = 'rgba(37, 99, 235, 0.05)';
        });

        zone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            zone.style.borderColor = '';
            zone.style.background = '';
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '';
            zone.style.background = '';
            handleFiles(e.dataTransfer.files, category, previewContainer);
        });
    });
}

/**
 * Handle uploaded files
 * @param {FileList} files - The files to handle
 * @param {string} category - The category of upload
 * @param {HTMLElement} previewContainer - The preview container element
 */
function handleFiles(files, category, previewContainer) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const photoData = {
                    id: Date.now() + Math.random(),
                    dataUrl: e.target.result,
                    name: file.name
                };

                uploadedPhotos[category].push(photoData);
                addPreview(photoData, category, previewContainer);
            };

            reader.readAsDataURL(file);
        }
    });
}

/**
 * Add photo preview to container
 * @param {object} photoData - Photo data object
 * @param {string} category - The category of upload
 * @param {HTMLElement} previewContainer - The preview container element
 */
function addPreview(photoData, category, previewContainer) {
    const preview = document.createElement('div');
    preview.className = 'preview-item';
    preview.dataset.id = photoData.id;

    preview.innerHTML = `
        <img src="${photoData.dataUrl}" alt="${photoData.name}">
        <button class="preview-remove" onclick="removePhoto('${category}', ${photoData.id})">×</button>
    `;

    previewContainer.appendChild(preview);
}

/**
 * Remove a photo
 * @param {string} category - The category of upload
 * @param {number} photoId - The ID of the photo to remove
 */
function removePhoto(category, photoId) {
    uploadedPhotos[category] = uploadedPhotos[category].filter(p => p.id !== photoId);
    
    const previewContainer = document.getElementById(`preview-${category}`);
    const previewItem = previewContainer.querySelector(`[data-id="${photoId}"]`);
    if (previewItem) {
        previewItem.remove();
    }
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

    // Generate button
    document.getElementById('generateBtn').addEventListener('click', generateResults);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetCalculator);

    // Progress step clicks
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.addEventListener('click', () => {
            const pageNum = index + 1;
            if (pageNum <= currentPage || pageNum === currentPage + 1) {
                goToPage(pageNum);
            }
        });
    });
}

// ============================================================================
// CALCULATION LOGIC
// ============================================================================

/**
 * Generate and display results
 */
function generateResults() {
    if (selectedImprovements.length === 0) {
        alert('Please select at least one improvement to analyze');
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

    // Calculate total timeline
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

    // Navigate to results page
    goToPage(4);
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
        address: '',
        additionalNotes: '',
        conditions: {
            kitchen: 'fair',
            bathroom: 'fair',
            flooring: 'fair',
            exterior: 'fair',
            roof: 'fair',
            landscaping: 'fair'
        }
    };

    // Reset selected improvements
    selectedImprovements = [];

    // Reset uploaded photos
    uploadedPhotos = {
        exterior: [],
        kitchen: [],
        bathrooms: [],
        living: [],
        landscaping: [],
        other: []
    };

    // Clear form inputs
    document.getElementById('currentValue').value = '';
    document.getElementById('squareFeet').value = '';
    document.getElementById('bedrooms').value = '';
    document.getElementById('bathrooms').value = '';
    document.getElementById('yearBuilt').value = '';
    document.getElementById('propertyType').value = '';
    document.getElementById('address').value = '';
    document.getElementById('additionalNotes').value = '';

    // Clear photo uploads
    document.querySelectorAll('.file-input').forEach(input => {
        input.value = '';
    });
    document.querySelectorAll('.preview-container').forEach(container => {
        container.innerHTML = '';
    });

    // Reset rating buttons
    document.querySelectorAll('.rating-buttons').forEach(group => {
        const buttons = group.querySelectorAll('.rating-btn');
        buttons.forEach((btn) => {
            btn.classList.remove('active');
            if (btn.dataset.value === 'fair') {
                btn.classList.add('active');
            }
        });
    });

    // Deselect all improvement cards
    document.querySelectorAll('.improvement-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Go back to page 1
    goToPage(1);
}

// ============================================================================
// APPLICATION START
// ============================================================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
