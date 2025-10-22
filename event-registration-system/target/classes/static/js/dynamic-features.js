// Event Registration System - Dynamic UI Features

// Global variables
let currentPage = 1;
let pageSize = 10;
let searchTerm = '';
let selectedCategory = 'all';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDynamicFeatures();
    setupEventListeners();
    loadDashboardStats();
});

// Initialize dynamic features
function initializeDynamicFeatures() {
    // Add loading indicators
    addLoadingIndicators();

    // Initialize tooltips
    initializeTooltips();

    // Setup real-time updates
    setupRealTimeUpdates();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }

    // Pagination
    setupPagination();

    // Form enhancements
    setupFormEnhancements();

    // Modal handling
    setupModalHandling();
}

// Add loading indicators
function addLoadingIndicators() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay d-none';
        loadingDiv.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        table.parentNode.style.position = 'relative';
        table.parentNode.appendChild(loadingDiv);
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Setup real-time updates
function setupRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateLiveStats();
    }, 30000);
}

// Handle search functionality
function handleSearch(event) {
    searchTerm = event.target.value.toLowerCase();
    currentPage = 1;
    filterAndDisplayEvents();
}

// Handle category filter
function handleCategoryFilter(event) {
    selectedCategory = event.target.value;
    currentPage = 1;
    filterAndDisplayEvents();
}

// Filter and display events
function filterAndDisplayEvents() {
    const eventRows = document.querySelectorAll('#eventsTable tbody tr');
    let visibleCount = 0;

    eventRows.forEach(row => {
        const eventName = row.cells[0].textContent.toLowerCase();
        const eventLocation = row.cells[2].textContent.toLowerCase();
        const matchesSearch = eventName.includes(searchTerm) || eventLocation.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || row.dataset.category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    updatePagination(visibleCount);
}

// Setup pagination
function setupPagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    if (paginationContainer) {
        paginationContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('page-link')) {
                e.preventDefault();
                const page = parseInt(e.target.dataset.page);
                if (page) {
                    currentPage = page;
                    displayPage(page);
                }
            }
        });
    }
}

// Display specific page
function displayPage(page) {
    const rows = document.querySelectorAll('#eventsTable tbody tr');
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    rows.forEach((row, index) => {
        if (index >= startIndex && index < endIndex) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    updatePaginationButtons(page);
}

// Update pagination
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginationContainer = document.getElementById('paginationContainer');

    if (paginationContainer && totalPages > 1) {
        let paginationHtml = '<nav><ul class="pagination justify-content-center">';

        // Previous button
        paginationHtml += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>`;
        }

        // Next button
        paginationHtml += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>`;

        paginationHtml += '</ul></nav>';
        paginationContainer.innerHTML = paginationHtml;
    }
}

// Update pagination buttons
function updatePaginationButtons(activePage) {
    const pageLinks = document.querySelectorAll('.pagination .page-link');
    pageLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (parseInt(link.dataset.page) === activePage) {
            link.parentElement.classList.add('active');
        }
    });
}

// Setup form enhancements
function setupFormEnhancements() {
    // Auto-format date inputs
    const dateInputs = document.querySelectorAll('input[type="datetime-local"]');
    dateInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value) {
                // Ensure proper datetime format
                const date = new Date(this.value);
                if (!isNaN(date.getTime())) {
                    this.value = date.toISOString().slice(0, 16);
                }
            }
        });
    });

    // Real-time validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

// Validate field
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const feedback = field.parentNode.querySelector('.invalid-feedback');

    field.classList.remove('is-valid', 'is-invalid');

    if (isRequired && !value) {
        field.classList.add('is-invalid');
        if (feedback) feedback.style.display = 'block';
        return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            if (feedback) feedback.textContent = 'Please enter a valid email address.';
            if (feedback) feedback.style.display = 'block';
            return false;
        }
    }

    // Date validation
    if (field.type === 'datetime-local' && value) {
        const selectedDate = new Date(value);
        const now = new Date();
        if (selectedDate < now) {
            field.classList.add('is-invalid');
            if (feedback) feedback.textContent = 'Event date must be in the future.';
            if (feedback) feedback.style.display = 'block';
            return false;
        }
    }

    if (value) {
        field.classList.add('is-valid');
    }
    if (feedback) feedback.style.display = 'none';
    return true;
}

// Setup modal handling
function setupModalHandling() {
    // Auto-focus on modal show
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            const firstInput = modal.querySelector('input, textarea, select');
            if (firstInput) firstInput.focus();
        });
    });
}

// Load dashboard statistics
function loadDashboardStats() {
    const statsContainer = document.getElementById('dashboardStats');
    if (statsContainer) {
        // Simulate loading stats
        fetch('/api/stats')
            .then(response => response.json())
            .then(data => {
                updateDashboardStats(data);
            })
            .catch(error => {
                console.log('Stats not available, using mock data');
                updateDashboardStats({
                    totalEvents: 5,
                    totalRegistrations: 23,
                    upcomingEvents: 3,
                    capacityUtilization: 78
                });
            });
    }
}

// Update dashboard statistics
function updateDashboardStats(stats) {
    const statsContainer = document.getElementById('dashboardStats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="row g-4">
                <div class="col-md-3">
                    <div class="card stat-card">
                        <div class="card-body text-center">
                            <i class="fas fa-calendar-alt fa-2x text-primary mb-2"></i>
                            <h3 class="card-title">${stats.totalEvents}</h3>
                            <p class="card-text">Total Events</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card stat-card">
                        <div class="card-body text-center">
                            <i class="fas fa-users fa-2x text-success mb-2"></i>
                            <h3 class="card-title">${stats.totalRegistrations}</h3>
                            <p class="card-text">Total Registrations</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card stat-card">
                        <div class="card-body text-center">
                            <i class="fas fa-clock fa-2x text-warning mb-2"></i>
                            <h3 class="card-title">${stats.upcomingEvents}</h3>
                            <p class="card-text">Upcoming Events</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card stat-card">
                        <div class="card-body text-center">
                            <i class="fas fa-chart-pie fa-2x text-info mb-2"></i>
                            <h3 class="card-title">${stats.capacityUtilization}%</h3>
                            <p class="card-text">Capacity Used</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Update live statistics
function updateLiveStats() {
    const statCards = document.querySelectorAll('.stat-card h3');
    statCards.forEach(card => {
        // Add subtle animation for live updates
        card.style.transition = 'color 0.3s ease';
        card.style.color = '#007bff';
        setTimeout(() => {
            card.style.color = '';
        }, 1000);
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functionality
function exportData(type) {
    const table = document.getElementById('eventsTable') || document.getElementById('registrationsTable');
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll('td, th');

        for (let j = 0; j < cols.length; j++) {
            row.push('"' + cols[j].innerText + '"');
        }

        csv.push(row.join(','));
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `event_data_${new Date().toISOString().split('T')[0]}.${type}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }, 5000);
    });
}

// Enhanced form submission with loading states
function enhanceFormSubmission() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';

                // Re-enable after 3 seconds (in case of error)
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = submitBtn.textContent || 'Save';
                }, 3000);
            }
        });
    });
}

// Initialize enhanced form submission
enhanceFormSubmission();

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
