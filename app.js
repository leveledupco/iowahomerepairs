// Iowa Home Repairs PWA - Advanced Business Management App
// 2025 Edition with AI-Powered Features

class IowaHomeRepairsApp {
    constructor() {
        this.currentView = 'dashboard';
        this.theme = this.getPreferredTheme();
        this.isInstalled = false;
        this.deferredPrompt = null;
        this.aiInsights = [];
        this.currentInsightIndex = 0;
        this.charts = {};
        
        // Business data from JSON
        this.businessData = {
            businessInfo: {
                name: "Iowa Home Repairs",
                owner: "Mike Miller",
                phone: "319-939-9200",
                address: "Cedar Falls, Iowa",
                established: "2022",
                services: ["Home Remodeling", "Handyman Services", "Repair Work", "Maintenance"]
            },
            financialData: {
                currentPeriod: "July 2024 - June 2025",
                monthlyRevenue: [4250, 4850, 5650, 4950, 3850, 3250, 3450, 4150, 4750, 5100, 4600, 4300],
                monthlyExpenses: [2635, 3007, 3503, 3069, 2387, 2015, 2138, 2573, 2945, 3162, 2852, 2666],
                monthlyProfit: [1615, 1843, 2147, 1881, 1463, 1235, 1312, 1577, 1805, 1938, 1748, 1634],
                totalRevenue: 53150,
                totalExpenses: 32952,
                totalProfit: 20198,
                profitMargin: 38.0
            },
            expenseCategories: {
                "Materials": 19693,
                "Vehicle & Fuel": 4547,
                "Tools & Equipment": 2636,
                "Insurance": 2043,
                "Marketing": 1647,
                "Office Supplies": 987,
                "Professional Services": 823,
                "Permits & Licenses": 576
            },
            mileageData: {
                totalMiles: 3479,
                monthlyMiles: [315, 298, 365, 342, 278, 245, 267, 289, 324, 346, 301, 309],
                mileageRate2024: 0.67,
                mileageRate2025: 0.70,
                totalDeduction: 2384.78
            },
            customers: [
                {"name": "Johnson Family", "totalPaid": 3450, "lastJob": "2025-05-15", "status": "Active"},
                {"name": "Smith Residence", "totalPaid": 2890, "lastJob": "2025-04-22", "status": "Active"},
                {"name": "Downtown Apartments", "totalPaid": 5670, "lastJob": "2025-06-01", "status": "Active"},
                {"name": "Miller Construction", "totalPaid": 4230, "lastJob": "2025-03-18", "status": "Active"},
                {"name": "Cedar Falls Community Center", "totalPaid": 6780, "lastJob": "2025-05-30", "status": "Active"}
            ],
            invoices: [
                {"id": "INV-2025-001", "customer": "Johnson Family", "amount": 850, "date": "2025-05-15", "status": "Paid"},
                {"id": "INV-2025-002", "customer": "Smith Residence", "amount": 1200, "date": "2025-05-20", "status": "Pending"},
                {"id": "INV-2025-003", "customer": "Downtown Apartments", "amount": 2100, "date": "2025-06-01", "status": "Paid"}
            ],
            kpis: {
                averageJobValue: 567.78,
                customerRetentionRate: 75,
                monthlyGrowthRate: 8.5,
                cashFlowRatio: 3.09,
                profitMarginTrend: "Increasing"
            },
            aiInsights: [
                "Material costs represent 59.8% of expenses - consider bulk purchasing for better margins",
                "September shows highest profitability - plan major projects during this period",
                "Fuel costs trending upward - optimize route planning for efficiency",
                "Customer retention at 75% - implement loyalty program to increase retention"
            ]
        };

        // Sample expense data
        this.expenses = [
            { id: 1, category: "Materials", vendor: "Home Depot", amount: 245.67, date: "2025-06-12", description: "Lumber and hardware for Johnson project" },
            { id: 2, category: "Vehicle & Fuel", vendor: "Casey's", amount: 67.45, date: "2025-06-11", description: "Fuel for work vehicles" },
            { id: 3, category: "Tools & Equipment", vendor: "Harbor Freight", amount: 89.99, date: "2025-06-10", description: "Cordless drill replacement" },
            { id: 4, category: "Materials", vendor: "Menards", amount: 156.78, date: "2025-06-09", description: "Paint and supplies for Smith residence" },
            { id: 5, category: "Insurance", vendor: "State Farm", amount: 178.50, date: "2025-06-08", description: "Monthly business insurance" }
        ];

        this.init();
    }

    async init() {
        await this.showSplashScreen();
        this.setupEventListeners();
        this.initializeTheme();
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.populateAIInsights();
        this.renderDashboard();
        this.setupVoiceCommands();
        this.startAutoThemeDetection();
    }

    // Splash Screen
    async showSplashScreen() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const splash = document.getElementById('splash-screen');
                const app = document.getElementById('app');
                
                splash.classList.add('fade-out');
                
                setTimeout(() => {
                    splash.style.display = 'none';
                    app.classList.remove('hidden');
                    resolve();
                }, 500);
            }, 2500);
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Install button
        document.getElementById('install-btn').addEventListener('click', () => {
            this.installApp();
        });

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Quick actions
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // AI insights
        document.getElementById('next-insight').addEventListener('click', () => {
            this.nextAIInsight();
        });

        // Receipt scanner
        document.getElementById('receipt-scanner').addEventListener('click', () => {
            this.simulateReceiptScan();
        });

        // Invoice form
        document.getElementById('create-invoice-btn').addEventListener('click', () => {
            this.showInvoiceForm();
        });

        document.getElementById('cancel-invoice').addEventListener('click', () => {
            this.hideInvoiceForm();
        });

        document.getElementById('invoice-form-element').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createInvoice();
        });

        // Add expense button
        document.getElementById('add-expense-btn').addEventListener('click', () => {
            this.addExpenseDialog();
        });

        // Expense filter
        document.getElementById('expense-filter').addEventListener('change', (e) => {
            this.filterExpenses(e.target.value);
        });
    }

    // Theme Management
    getPreferredTheme() {
        const saved = localStorage.getItem('ihr-theme');
        if (saved) return saved;
        
        const hour = new Date().getHours();
        return (hour >= 6 && hour < 18) ? 'light' : 'dark';
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.theme);
        localStorage.setItem('ihr-theme', this.theme);
        this.updateThemeIcon();
        this.showNotification('Theme updated', 'success');
    }

    updateThemeIcon() {
        const icon = document.querySelector('#theme-toggle svg');
        if (this.theme === 'dark') {
            icon.innerHTML = `
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            `;
        } else {
            icon.innerHTML = `
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            `;
        }
    }

    startAutoThemeDetection() {
        setInterval(() => {
            if (!localStorage.getItem('ihr-theme')) {
                const hour = new Date().getHours();
                const newTheme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
                if (newTheme !== this.theme) {
                    this.theme = newTheme;
                    this.initializeTheme();
                }
            }
        }, 60000); // Check every minute
    }

    // PWA Features  
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('SW registered:', registration);
            } catch (error) {
                console.log('SW registration failed:', error);
            }
        }
    }

    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            document.getElementById('install-btn').style.display = 'flex';
        });

        window.addEventListener('appinstalled', () => {
            this.isInstalled = true;
            document.getElementById('install-btn').style.display = 'none';
            this.showNotification('App installed successfully!', 'success');
        });
    }

    async installApp() {
        if (!this.deferredPrompt) {
            this.showNotification('App is already installed or not available for installation', 'info');
            return;
        }

        const result = await this.deferredPrompt.prompt();
        if (result.outcome === 'accepted') {
            this.showNotification('Installing app...', 'success');
        }
        this.deferredPrompt = null;
    }

    // Navigation
    switchView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Update view
        document.querySelectorAll('.view-container').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');

        this.currentView = viewName;

        // Load view-specific content
        switch(viewName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'expense':
                this.renderExpenses();
                break;
            case 'invoice':
                this.renderInvoices();
                break;
            case 'reports':
                this.renderReports();
                break;
        }

        // Haptic feedback simulation
        this.simulateHapticFeedback();
    }

    // AI Features
    populateAIInsights() {
        this.aiInsights = this.businessData.aiInsights;
        this.updateAIInsight();
    }

    updateAIInsight() {
        const insightText = document.getElementById('ai-insight-text');
        if (insightText && this.aiInsights.length > 0) {
            insightText.textContent = this.aiInsights[this.currentInsightIndex];
        }
    }

    nextAIInsight() {
        this.currentInsightIndex = (this.currentInsightIndex + 1) % this.aiInsights.length;
        this.updateAIInsight();
        this.simulateHapticFeedback();
    }

    // Quick Actions
    handleQuickAction(action) {
        switch(action) {
            case 'scan-receipt':
                this.simulateReceiptScan();
                break;
            case 'track-mileage':
                this.simulateMileageTracking();
                break;
            case 'create-invoice':
                this.switchView('invoice');
                setTimeout(() => this.showInvoiceForm(), 300);
                break;
            case 'view-reports':
                this.switchView('reports');
                break;
        }
        this.simulateHapticFeedback();
    }

    simulateReceiptScan() {
        this.showNotification('📸 Starting AI receipt scan...', 'info');
        
        setTimeout(() => {
            const mockReceipt = {
                vendor: 'Home Depot',
                amount: 187.45,
                date: new Date().toISOString().split('T')[0],
                items: ['Lumber 2x4x8', 'Screws', 'Sandpaper'],
                category: 'Materials'
            };
            
            this.showNotification(`🤖 Receipt processed: $${mockReceipt.amount} from ${mockReceipt.vendor}`, 'success');
            this.addExpense(mockReceipt);
        }, 2000);
    }

    simulateMileageTracking() {
        this.showNotification('📍 GPS tracking started...', 'info');
        
        setTimeout(() => {
            const miles = Math.round((Math.random() * 50 + 10) * 100) / 100;
            const deduction = (miles * 0.70).toFixed(2);
            this.showNotification(`✅ Trip recorded: ${miles} miles ($${deduction} deduction)`, 'success');
        }, 3000);
    }

    // Dashboard Rendering
    renderDashboard() {
        this.createRevenueChart();
    }

    createRevenueChart() {
        const ctx = document.getElementById('revenue-chart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.revenue) {
            this.charts.revenue.destroy();
        }

        const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        
        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Revenue',
                        data: this.businessData.financialData.monthlyRevenue,
                        borderColor: '#1a2b4a',
                        backgroundColor: 'rgba(26, 43, 74, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Profit',
                        data: this.businessData.financialData.monthlyProfit,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Expense Management
    renderExpenses() {
        const expenseList = document.getElementById('expense-list');
        if (!expenseList) return;

        expenseList.innerHTML = this.expenses.map(expense => `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-category">${this.getCategoryIcon(expense.category)}</div>
                    <div class="expense-details">
                        <h4>${expense.vendor}</h4>
                        <p>${expense.description}</p>
                        <p>${this.formatDate(expense.date)} • ${expense.category}</p>
                    </div>
                </div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            </div>
        `).join('');
    }

    getCategoryIcon(category) {
        const icons = {
            'Materials': '🔨',
            'Vehicle & Fuel': '⛽',
            'Tools & Equipment': '🛠️',
            'Insurance': '🛡️',
            'Marketing': '📢',
            'Office Supplies': '📋',
            'Professional Services': '💼',
            'Permits & Licenses': '📋'
        };
        return icons[category] || '💰';
    }

    addExpense(expenseData) {
        const newExpense = {
            id: this.expenses.length + 1,
            category: expenseData.category,
            vendor: expenseData.vendor,
            amount: expenseData.amount,
            date: expenseData.date,
            description: expenseData.description || `Purchase from ${expenseData.vendor}`
        };
        
        this.expenses.unshift(newExpense);
        if (this.currentView === 'expense') {
            this.renderExpenses();
        }
    }

    addExpenseDialog() {
        const amount = prompt('Enter expense amount:');
        const vendor = prompt('Enter vendor name:');
        const description = prompt('Enter description:');
        
        if (amount && vendor) {
            const expense = {
                category: 'Materials', // Default category
                vendor: vendor,
                amount: parseFloat(amount),
                date: new Date().toISOString().split('T')[0],
                description: description || `Purchase from ${vendor}`
            };
            
            this.addExpense(expense);
            this.showNotification('Expense added successfully!', 'success');
        }
    }

    filterExpenses(category) {
        const filteredExpenses = category === 'all' ? 
            this.expenses : 
            this.expenses.filter(expense => expense.category.toLowerCase().includes(category));
        
        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = filteredExpenses.map(expense => `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-category">${this.getCategoryIcon(expense.category)}</div>
                    <div class="expense-details">
                        <h4>${expense.vendor}</h4>
                        <p>${expense.description}</p>
                        <p>${this.formatDate(expense.date)} • ${expense.category}</p>
                    </div>
                </div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            </div>
        `).join('');
    }

    // Invoice Management
    renderInvoices() {
        const invoiceList = document.getElementById('invoice-list');
        if (!invoiceList) return;

        invoiceList.innerHTML = this.businessData.invoices.map(invoice => `
            <div class="invoice-item">
                <div class="invoice-details">
                    <h4>${invoice.id}</h4>
                    <p>${invoice.customer}</p>
                    <p>${this.formatDate(invoice.date)}</p>
                </div>
                <div class="invoice-amount">$${invoice.amount.toFixed(2)}</div>
                <div class="status status--${invoice.status.toLowerCase() === 'paid' ? 'success' : 'warning'}">
                    ${invoice.status}
                </div>
            </div>
        `).join('');
    }

    showInvoiceForm() {
        document.getElementById('invoice-form').style.display = 'block';
        document.getElementById('invoice-due-date').value = this.getDefaultDueDate();
    }

    hideInvoiceForm() {
        document.getElementById('invoice-form').style.display = 'none';
        document.getElementById('invoice-form-element').reset();
    }

    createInvoice() {
        const formData = new FormData(document.getElementById('invoice-form-element'));
        const customer = document.getElementById('invoice-customer').value;
        const amount = parseFloat(document.getElementById('invoice-amount').value);
        const description = document.getElementById('invoice-description').value;
        const dueDate = document.getElementById('invoice-due-date').value;

        const newInvoice = {
            id: `INV-2025-${String(this.businessData.invoices.length + 1).padStart(3, '0')}`,
            customer: customer,
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            dueDate: dueDate,
            description: description,
            status: 'Pending'
        };

        this.businessData.invoices.unshift(newInvoice);
        this.renderInvoices();
        this.hideInvoiceForm();
        this.showNotification('Invoice created successfully!', 'success');
    }

    getDefaultDueDate() {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toISOString().split('T')[0];
    }

    // Reports
    renderReports() {
        this.createExpenseChart();
        this.createTrendChart();
    }

    createExpenseChart() {
        const ctx = document.getElementById('expense-chart');
        if (!ctx) return;

        if (this.charts.expense) {
            this.charts.expense.destroy();
        }

        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325'];
        
        this.charts.expense = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(this.businessData.expenseCategories),
                datasets: [{
                    data: Object.values(this.businessData.expenseCategories),
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }

    createTrendChart() {
        const ctx = document.getElementById('trend-chart');
        if (!ctx) return;

        if (this.charts.trend) {
            this.charts.trend.destroy();
        }

        const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        
        this.charts.trend = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Revenue',
                        data: this.businessData.financialData.monthlyRevenue,
                        backgroundColor: 'rgba(26, 43, 74, 0.8)',
                        borderColor: '#1a2b4a',
                        borderWidth: 1
                    },
                    {
                        label: 'Expenses',
                        data: this.businessData.financialData.monthlyExpenses,
                        backgroundColor: 'rgba(180, 65, 60, 0.8)',
                        borderColor: '#B4413C',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Voice Commands
    setupVoiceCommands() {
        if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                document.getElementById('voice-indicator').classList.remove('hidden');
            };

            this.recognition.onend = () => {
                document.getElementById('voice-indicator').classList.add('hidden');
            };

            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };

            // Listen for double tap to start voice recognition
            let tapCount = 0;
            document.addEventListener('touchstart', () => {
                tapCount++;
                setTimeout(() => {
                    if (tapCount === 2) {
                        this.recognition.start();
                    }
                    tapCount = 0;
                }, 300);
            });
        }
    }

    processVoiceCommand(command) {
        if (command.includes('add expense')) {
            const match = command.match(/add (\d+) (\w+) expense/);
            if (match) {
                const amount = parseFloat(match[1]);
                const category = match[2];
                this.addExpense({
                    category: 'Materials',
                    vendor: 'Voice Entry',
                    amount: amount,
                    date: new Date().toISOString().split('T')[0],
                    description: `Voice command: ${command}`
                });
                this.showNotification(`Added $${amount} expense via voice`, 'success');
            }
        } else if (command.includes('dashboard')) {
            this.switchView('dashboard');
        } else if (command.includes('expenses')) {
            this.switchView('expense');
        } else if (command.includes('invoices')) {
            this.switchView('invoice');
        } else if (command.includes('reports')) {
            this.switchView('reports');
        } else {
            this.showNotification('Voice command not recognized', 'warning');
        }
    }

    // Utility Functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    simulateHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
            </div>
        `;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                container.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Background Sync Simulation
    simulateBackgroundSync() {
        // Simulate syncing data when coming back online
        window.addEventListener('online', () => {
            this.showNotification('Back online - syncing data...', 'success');
            setTimeout(() => {
                this.showNotification('Data synchronized successfully', 'success');
            }, 2000);
        });

        window.addEventListener('offline', () => {
            this.showNotification('Working offline - changes will sync when reconnected', 'warning');
        });
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Load time:', perfData.loadEventEnd - perfData.loadEventStart);
                
                // Measure Core Web Vitals
                if ('web-vital' in window) {
                    // This would integrate with real Web Vitals library
                    console.log('Core Web Vitals tracking enabled');
                }
            });
        }
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    const swCode = `
        const CACHE_NAME = 'ihr-v1';
        const urlsToCache = [
            '/',
            '/style.css',
            '/app.js',
            'https://cdn.jsdelivr.net/npm/chart.js'
        ];

        self.addEventListener('install', event => {
            event.waitUntil(
                caches.open(CACHE_NAME)
                    .then(cache => cache.addAll(urlsToCache))
            );
        });

        self.addEventListener('fetch', event => {
            event.respondWith(
                caches.match(event.request)
                    .then(response => {
                        if (response) {
                            return response;
                        }
                        return fetch(event.request);
                    })
            );
        });
    `;

    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker.register(swUrl)
        .then(registration => console.log('SW registered'))
        .catch(error => console.log('SW registration failed'));
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.iowaHomeRepairsApp = new IowaHomeRepairsApp();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IowaHomeRepairsApp;
}