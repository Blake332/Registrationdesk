document.addEventListener("DOMContentLoaded", () => {
    const formView = document.getElementById("kiosk-form-view");
    const successView = document.getElementById("kiosk-success-view");
    const regForm = document.getElementById("registration-form");
    const sectorSelect = document.getElementById("reg-sector");
    const newRegBtn = document.getElementById("new-reg-btn");
    const resetTickerText = document.getElementById("reset-ticker-text");

    let countdownInterval = null;
    let countdownSec = 5;

    // Populate sector dropdown
    function populateSectors() {
        const selectedVal = sectorSelect.value;
        sectorSelect.innerHTML = "";

        // Add a default placeholder option
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.disabled = true;
        placeholderOption.selected = !selectedVal;
        placeholderOption.textContent = Storage.getCurrentLanguage() === 'zh' ? "-- 请选择行业部门 --" : "-- Select Industry Sector --";
        sectorSelect.appendChild(placeholderOption);

        // Add defined sectors
        SECTORS_LIST.forEach(sector => {
            const opt = document.createElement("option");
            opt.value = sector.value;
            opt.textContent = Storage.t(sector.key);
            if (sector.value === selectedVal) {
                opt.selected = true;
            }
            sectorSelect.appendChild(opt);
        });
    }

    // Call populateSectors
    populateSectors();

    // Listen to custom settings update (which includes language)
    window.addEventListener("expo_settings_update", () => {
        populateSectors();
    });

    // Form Submission
    regForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Retrieve elements
        const nameInput = document.getElementById("reg-name");
        const companyInput = document.getElementById("reg-company");
        const emailInput = document.getElementById("reg-email");
        const phoneInput = document.getElementById("reg-phone");

        const name = nameInput.value.trim();
        const company = companyInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const sector = sectorSelect.value;

        // Validations
        if (!name || !company || !email || !phone || !sector) {
            const err = Storage.getCurrentLanguage() === 'zh' ? "请填写所有必填字段。" : "Please fill out all required fields.";
            Toast.show(err, "error");
            return;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const err = Storage.getCurrentLanguage() === 'zh' ? "请输入有效的邮箱地址。" : "Please enter a valid email address.";
            Toast.show(err, "error");
            return;
        }

        // Add Attendee
        const newAttendee = Storage.addAttendee({
            name,
            company,
            email,
            phone,
            sector
        });

        // Populate Success Ticket Badge details
        document.getElementById("badge-name").textContent = newAttendee.name;
        document.getElementById("badge-company").textContent = newAttendee.company;
        document.getElementById("badge-id").textContent = newAttendee.id;
        
        // Find sector translated label
        const sectorObj = SECTORS_LIST.find(s => s.value === newAttendee.sector);
        document.getElementById("badge-sector").textContent = sectorObj ? Storage.t(sectorObj.key) : newAttendee.sector;

        // Show success and hide form
        formView.style.display = "none";
        successView.style.display = "block";

        Toast.show(Storage.t('reg_success'), "success");

        // Start reset countdown
        startSuccessResetCountdown();
    });

    // Reset Form and View
    function resetKiosk() {
        // Clear countdown timer
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        regForm.reset();
        populateSectors(); // restore select placeholder
        successView.style.display = "none";
        formView.style.display = "block";
    }

    newRegBtn.addEventListener("click", resetKiosk);

    // Auto reset countdown
    function startSuccessResetCountdown() {
        countdownSec = 5;
        updateCountdownLabel();

        if (countdownInterval) clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            countdownSec--;
            if (countdownSec <= 0) {
                clearInterval(countdownInterval);
                resetKiosk();
            } else {
                updateCountdownLabel();
            }
        }, 1000);
    }

    function updateCountdownLabel() {
        // Note: keeping numbers as Arabic numerals per user specs
        const translatedMsg = Storage.t('reg_reset_msg', { sec: countdownSec });
        resetTickerText.textContent = translatedMsg;
    }
});
