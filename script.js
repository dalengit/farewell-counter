class FarewellCounter {
    constructor() {
        this.targetDate = null;
        this.countdownInterval = null;
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            datePicker: document.getElementById('date-picker'),
            setDateBtn: document.getElementById('set-date-btn'),
            departureText: document.getElementById('departure-text'),
            targetDateDisplay: document.getElementById('target-date'),
            celebration: document.getElementById('celebration')
        };
        
        this.init();
    }

    init() {
        this.loadSavedDate();
        this.setupEventListeners();
        this.setDefaultDate();
        if (this.targetDate) {
            this.startCountdown();
        }
    }

    setupEventListeners() {
        this.elements.setDateBtn.addEventListener('click', () => {
            this.setTargetDate();
        });

        this.elements.datePicker.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.setTargetDate();
            }
        });

        // Close celebration on click
        this.elements.celebration.addEventListener('click', () => {
            this.elements.celebration.style.display = 'none';
        });
    }

    setDefaultDate() {
        if (!this.targetDate) {
            // Set default to 15/10/2025 17:00
            const defaultDate = new Date(2025, 9, 15, 17, 0, 0, 0); // Month is 0-indexed (9 = October)
            this.targetDate = defaultDate;
            this.updateDatePicker();
            this.updateTargetDateDisplay();
            this.saveDate();
        }
    }

    loadSavedDate() {
        const savedDate = localStorage.getItem('farewellCounterDate');
        if (savedDate) {
            this.targetDate = new Date(savedDate);
            this.updateDatePicker();
            this.updateTargetDateDisplay();
        }
    }

    saveDate() {
        if (this.targetDate) {
            localStorage.setItem('farewellCounterDate', this.targetDate.toISOString());
        }
    }

    setTargetDate() {
        const selectedDate = this.elements.datePicker.value;
        
        if (!selectedDate) {
            this.showNotification('Please select a date and time', 'error');
            return;
        }

        const newTargetDate = new Date(selectedDate);
        const now = new Date();

        if (newTargetDate <= now) {
            this.showNotification('Please select a future date and time', 'error');
            return;
        }

        this.targetDate = newTargetDate;
        this.updateTargetDateDisplay();
        this.saveDate();
        
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        
        this.startCountdown();
        this.showNotification('Departure date set successfully!', 'success');
    }

    updateDatePicker() {
        if (this.targetDate) {
            // Format date for datetime-local input
            const year = this.targetDate.getFullYear();
            const month = String(this.targetDate.getMonth() + 1).padStart(2, '0');
            const day = String(this.targetDate.getDate()).padStart(2, '0');
            const hours = String(this.targetDate.getHours()).padStart(2, '0');
            const minutes = String(this.targetDate.getMinutes()).padStart(2, '0');
            
            const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
            this.elements.datePicker.value = dateTimeString;
        }
    }

    updateTargetDateDisplay() {
        if (this.targetDate) {
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };
            
            const formattedDate = this.targetDate.toLocaleDateString('en-US', options);
            this.elements.targetDateDisplay.textContent = `Target Date: ${formattedDate}`;
        }
    }

    startCountdown() {
        this.updateCountdown(); // Update immediately
        
        this.countdownInterval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    updateCountdown() {
        if (!this.targetDate) return;

        const now = new Date().getTime();
        const targetTime = this.targetDate.getTime();
        const timeDifference = targetTime - now;

        if (timeDifference <= 0) {
            this.handleCountdownComplete();
            return;
        }

        const timeUnits = this.calculateTimeUnits(timeDifference);
        this.updateDisplay(timeUnits);
        this.updateDepartureText(timeDifference);
    }

    calculateTimeUnits(timeDifference) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    updateDisplay(timeUnits) {
        // Add animation class before updating
        const numbers = [this.elements.days, this.elements.hours, this.elements.minutes, this.elements.seconds];
        
        numbers.forEach((element, index) => {
            const newValue = Object.values(timeUnits)[index];
            const formattedValue = String(newValue).padStart(2, '0');
            
            if (element.textContent !== formattedValue) {
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.textContent = formattedValue;
                    element.style.transform = 'scale(1)';
                }, 150);
            }
        });
    }

    updateDepartureText(timeDifference) {
        const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (totalDays > 7) {
            this.elements.departureText.textContent = "Time until the farewell journey begins";
        } else if (totalDays > 1) {
            this.elements.departureText.textContent = "Final countdown to departure";
        } else if (totalDays === 1) {
            this.elements.departureText.textContent = "Last day before the big departure!";
        } else {
            this.elements.departureText.textContent = "Today is the day! ✨";
        }
    }

    handleCountdownComplete() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        // Set all counters to 00
        this.elements.days.textContent = '00';
        this.elements.hours.textContent = '00';
        this.elements.minutes.textContent = '00';
        this.elements.seconds.textContent = '00';

        // Update text
        this.elements.departureText.textContent = "The moment has arrived!";

        // Show celebration
        this.showCelebration();
    }

    showCelebration() {
        this.elements.celebration.style.display = 'flex';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (this.elements.celebration.style.display === 'flex') {
                this.elements.celebration.style.display = 'none';
            }
        }, 10000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            zIndex: '1001',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        });

        // Set background color based on type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #f56565, #e53e3e)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Method to reset the counter (useful for testing)
    reset() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        localStorage.removeItem('farewellCounterDate');
        this.targetDate = null;
        this.setDefaultDate();
        this.startCountdown();
    }

    // Method to add time to current target (useful for demonstrations)
    addMinutes(minutes) {
        if (this.targetDate) {
            this.targetDate.setMinutes(this.targetDate.getMinutes() + minutes);
            this.updateDatePicker();
            this.updateTargetDateDisplay();
            this.saveDate();
        }
    }

    // Method to set a specific date quickly (for testing)
    setQuickDate(minutesFromNow) {
        const newDate = new Date();
        newDate.setMinutes(newDate.getMinutes() + minutesFromNow);
        this.targetDate = newDate;
        this.updateDatePicker();
        this.updateTargetDateDisplay();
        this.saveDate();
        
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        this.startCountdown();
    }
}

// Initialize the counter when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.farewellCounter = new FarewellCounter();
    
    // Add some helpful functions to the global scope for testing/debugging
    window.testCelebration = () => {
        window.farewellCounter.setQuickDate(0.1); // 6 seconds from now
    };
    
    window.resetCounter = () => {
        window.farewellCounter.reset();
    };
    
    console.log('🎉 Farewell Counter initialized!');
    console.log('💡 Try: testCelebration() - to see the celebration in 6 seconds');
    console.log('💡 Try: resetCounter() - to reset to default date');
});
