document.addEventListener("DOMContentLoaded", () => {
    const titleEl = document.getElementById("display-event-title");
    const daysVal = document.getElementById("days-val");
    const hoursVal = document.getElementById("hours-val");
    const minutesVal = document.getElementById("minutes-val");
    const secondsVal = document.getElementById("seconds-val");
    const regCountEl = document.getElementById("display-reg-count");
    const activityListEl = document.getElementById("live-activity-list");

    let countdownTimer = null;
    let lastRegisteredCount = 0;

    // Load Settings
    function loadSettings() {
        const settings = Storage.getSettings();
        titleEl.textContent = settings.eventTitle;
        
        // Start countdown timer
        startCountdown(settings.countdownDate);
    }

    // Countdown Timer logic
    function startCountdown(targetDateStr) {
        if (countdownTimer) clearInterval(countdownTimer);

        const targetDate = new Date(targetDateStr).getTime();

        function updateClock() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                daysVal.textContent = "00";
                hoursVal.textContent = "00";
                minutesVal.textContent = "00";
                secondsVal.textContent = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Pad values with leading zeros - numbers remain digits
            daysVal.textContent = String(days).padStart(2, '0');
            hoursVal.textContent = String(hours).padStart(2, '0');
            minutesVal.textContent = String(minutes).padStart(2, '0');
            secondsVal.textContent = String(seconds).padStart(2, '0');
        }

        updateClock();
        countdownTimer = setInterval(updateClock, 1000);
    }

    // Update attendees stats
    function updateMetrics() {
        const attendees = Storage.getAttendees();
        const count = attendees.length;

        // If the number increases, add a pulse effect
        if (count > lastRegisteredCount && lastRegisteredCount > 0) {
            regCountEl.classList.add("pulse");
            setTimeout(() => {
                regCountEl.classList.remove("pulse");
            }, 300);
        }

        lastRegisteredCount = count;
        regCountEl.textContent = count; // numbers stay as digits
    }

    // Render activity feed
    function updateActivityFeed() {
        const activities = Storage.getActivities();
        activityListEl.innerHTML = "";

        // Display the top 4 activities
        const topActivities = activities.slice(0, 4);

        if (topActivities.length === 0) {
            const emptyLi = document.createElement("li");
            emptyLi.className = "feed-item";
            emptyLi.style.justifyContent = "center";
            emptyLi.style.borderLeft = "none";
            emptyLi.innerHTML = `<span style="color: var(--text-secondary); font-size: 0.9rem;">No recent activities yet</span>`;
            activityListEl.appendChild(emptyLi);
            return;
        }

        topActivities.forEach(act => {
            const li = document.createElement("li");
            li.className = `feed-item ${act.type}`; // welcome or checkin class

            // Formulate translated feed string
            let feedMessage = '';
            if (act.type === 'welcome') {
                feedMessage = Storage.t('welcome_feed', { 
                    name: `<strong>${escapeHTML(act.name)}</strong>`, 
                    company: `<strong>${escapeHTML(act.company)}</strong>` 
                });
            } else {
                feedMessage = Storage.t('checkin_feed', { 
                    name: `<strong>${escapeHTML(act.name)}</strong>` 
                });
            }

            const timeStr = formatActivityTime(act.timestamp);

            li.innerHTML = `
                <span class="feed-text">${feedMessage}</span>
                <span class="feed-time">${timeStr}</span>
            `;
            activityListEl.appendChild(li);
        });
    }

    function formatActivityTime(isoString) {
        const date = new Date(isoString);
        const hrs = String(date.getHours()).padStart(2, '0');
        const mins = String(date.getMinutes()).padStart(2, '0');
        const secs = String(date.getSeconds()).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Initialize
    loadSettings();
    updateMetrics();
    updateActivityFeed();

    // Listeners for updates
    window.addEventListener("expo_settings_update", () => {
        loadSettings();
        Storage.translatePage();
        updateActivityFeed();
    });

    window.addEventListener("expo_db_update", () => {
        updateMetrics();
        updateActivityFeed();
    });

    window.addEventListener("expo_activity_update", () => {
        updateActivityFeed();
    });
});
