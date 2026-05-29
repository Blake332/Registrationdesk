document.addEventListener("DOMContentLoaded", () => {
    // Tab switching elements
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    // Form elements
    const mainPanel = document.getElementById("desk-main-panel");
    const successPanel = document.getElementById("desk-success-panel");
    const fullForm = document.getElementById("full-reg-form");
    const quickForm = document.getElementById("quick-phone-form");
    const fullSectorSelect = document.getElementById("full-sector");

    // Lookup elements
    const lookupSearchInput = document.getElementById("lookup-search-input");
    const lookupResults = document.getElementById("lookup-results");

    // Success elements
    const badgeName = document.getElementById("desk-badge-name");
    const badgeCompany = document.getElementById("desk-badge-company");
    const badgeId = document.getElementById("desk-badge-id");
    const badgeSector = document.getElementById("desk-badge-sector");
    const successHeader = document.getElementById("success-header-text");
    const newRegBtn = document.getElementById("desk-new-reg-btn");
    const resetTickerText = document.getElementById("desk-reset-ticker-text");

    let countdownInterval = null;
    let countdownSec = 5;
    let activeTabName = "lookup";

    // Tab Switching Logic
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            activeTabName = btn.getAttribute("data-tab");
            document.getElementById(`panel-${activeTabName}`).classList.add("active");
            
            if (activeTabName === "lookup") {
                renderLookupResults();
            }
        });
    });

    // Populate sector selector options
    function populateSectors() {
        const selectedVal = fullSectorSelect.value;
        fullSectorSelect.innerHTML = "";

        const placeholderOpt = document.createElement("option");
        placeholderOpt.value = "";
        placeholderOpt.disabled = true;
        placeholderOpt.selected = !selectedVal;
        placeholderOpt.textContent = Storage.getCurrentLanguage() === 'zh' ? "-- 请选择行业部门 --" : "-- Select Industry Sector --";
        fullSectorSelect.appendChild(placeholderOpt);

        SECTORS_LIST.forEach(sector => {
            const opt = document.createElement("option");
            opt.value = sector.value;
            opt.textContent = Storage.t(sector.key);
            if (sector.value === selectedVal) {
                opt.selected = true;
            }
            fullSectorSelect.appendChild(opt);
        });
    }

    populateSectors();

    // Render Lookup Search Results
    function renderLookupResults() {
        const query = lookupSearchInput.value.trim().toLowerCase();
        const attendees = Storage.getAttendees();

        lookupResults.innerHTML = "";

        // If search query is empty, show empty state prompt
        if (query === "") {
            lookupResults.innerHTML = `
                <div class="glass-card" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" style="margin-bottom: 0.5rem; opacity: 0.5;"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <p data-i18n="search_placeholder">${Storage.t('search_placeholder')}</p>
                </div>
            `;
            return;
        }

        // Filter list
        const filtered = attendees.filter(a => {
            return (
                a.name.toLowerCase().includes(query) ||
                a.company.toLowerCase().includes(query) ||
                a.email.toLowerCase().includes(query) ||
                a.phone.toLowerCase().includes(query)
            );
        });

        if (filtered.length === 0) {
            lookupResults.innerHTML = `
                <div class="glass-card" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <p data-i18n="search_no_results">${Storage.t('search_no_results')}</p>
                </div>
            `;
            return;
        }

        filtered.forEach(attendee => {
            const card = document.createElement("div");
            card.className = "glass-card attendee-row-card";

            const statusBadgeClass = attendee.checkedIn ? "badge badge-checked" : "badge badge-pending";
            const statusText = Storage.t(attendee.checkedIn ? "checkedin_status" : "not_checkedin_status");

            // Sector translation
            const sectorObj = SECTORS_LIST.find(s => s.value === attendee.sector);
            const sectorText = sectorObj ? Storage.t(sectorObj.key) : attendee.sector;

            let actionBtnHTML = '';
            if (attendee.checkedIn) {
                actionBtnHTML = `
                    <button class="btn btn-sm btn-secondary desk-checkin-btn" data-id="${attendee.id}" data-action="undo">
                        Undo
                    </button>
                `;
            } else {
                actionBtnHTML = `
                    <button class="btn btn-sm btn-success desk-checkin-btn" style="background: var(--secondary); box-shadow: 0 4px 10px rgba(6, 182, 212, 0.2);" data-id="${attendee.id}" data-action="checkin">
                        ${Storage.t('checkin_btn')}
                    </button>
                `;
            }

            card.innerHTML = `
                <div style="flex-grow: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                        <span style="font-size: 1.2rem; font-weight: 700; color: #fff;">${escapeHTML(attendee.name)}</span>
                        <span class="attendee-code">${attendee.id}</span>
                    </div>
                    <div class="attendee-details-grid">
                        <div style="font-weight: 500; color: #fff;">
                            <svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                            <span>${escapeHTML(attendee.company)}</span>
                        </div>
                        <div>
                            <span style="background: rgba(139, 92, 246, 0.15); color: var(--primary); padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.8rem; border: 1px solid rgba(139, 92, 246, 0.25);">
                                ${escapeHTML(sectorText)}
                            </span>
                        </div>
                    </div>
                    <div class="attendee-details-grid" style="margin-top: 0.25rem;">
                        <div>
                            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            <span>${escapeHTML(attendee.email)}</span>
                        </div>
                        <div>
                            <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                            <span>${escapeHTML(attendee.phone)}</span>
                        </div>
                    </div>
                </div>
                <div class="action-flex">
                    <span class="${statusBadgeClass}">${statusText}</span>
                    ${actionBtnHTML}
                </div>
            `;

            // Button actions
            card.querySelector(".desk-checkin-btn").addEventListener("click", () => {
                const action = card.querySelector(".desk-checkin-btn").getAttribute("data-action");
                if (action === "checkin") {
                    Storage.updateAttendee(attendee.id, { checkedIn: true });
                    Toast.show(Storage.getCurrentLanguage() === 'zh' ? `${attendee.name} 签到成功！` : `${attendee.name} checked in successfully!`, "success");
                } else {
                    Storage.updateAttendee(attendee.id, { checkedIn: false });
                    Toast.show(Storage.getCurrentLanguage() === 'zh' ? `已撤销 ${attendee.name} 的签到。` : `Check-in undone for ${attendee.name}.`, "success");
                }
                renderLookupResults();
            });

            lookupResults.appendChild(card);
        });
    }

    lookupSearchInput.addEventListener("input", renderLookupResults);

    // Full Registration Form Submit
    fullForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("full-name").value.trim();
        const company = document.getElementById("full-company").value.trim();
        const email = document.getElementById("full-email").value.trim();
        const phone = document.getElementById("full-phone").value.trim();
        const sector = fullSectorSelect.value;

        if (!name || !company || !email || !phone || !sector) {
            Toast.show(Storage.getCurrentLanguage() === 'zh' ? "请填写所有字段" : "Please fill in all fields", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show(Storage.getCurrentLanguage() === 'zh' ? "请输入有效的邮箱" : "Invalid email address", "error");
            return;
        }

        const attendee = Storage.addAttendee({ name, company, email, phone, sector });
        showSuccessBadge(attendee, 'reg_success');
    });

    // Quick Phone-only Registration Form Submit
    quickForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const phone = document.getElementById("quick-phone").value.trim();

        if (phone.length < 6) {
            Toast.show(Storage.getCurrentLanguage() === 'zh' ? "请输入有效的电话号码（至少6位）" : "Please enter a valid phone number (at least 6 digits)", "error");
            return;
        }

        // Get last 4 digits of phone
        const lastDigits = phone.slice(-4);
        const nameVal = Storage.getCurrentLanguage() === 'zh' ? `来宾 (*${lastDigits})` : `Guest (*${lastDigits})`;
        const companyVal = Storage.t('badge_quick_reg');

        const attendee = Storage.addAttendee({
            name: nameVal,
            company: companyVal,
            email: "N/A",
            phone: phone,
            sector: "other"
        });

        showSuccessBadge(attendee, 'quick_reg_success');
    });

    // Display ticket badge
    function showSuccessBadge(attendee, titleKey) {
        successHeader.setAttribute("data-i18n", titleKey);
        successHeader.textContent = Storage.t(titleKey);

        badgeName.textContent = attendee.name;
        badgeCompany.textContent = attendee.company;
        badgeId.textContent = attendee.id;

        const sectorObj = SECTORS_LIST.find(s => s.value === attendee.sector);
        badgeSector.textContent = sectorObj ? Storage.t(sectorObj.key) : attendee.sector;

        mainPanel.style.display = "none";
        successPanel.style.display = "block";

        Toast.show(Storage.t(titleKey), "success");
        startResetTimer();
    }

    function resetDesk() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        fullForm.reset();
        quickForm.reset();
        populateSectors();

        successPanel.style.display = "none";
        mainPanel.style.display = "block";

        if (activeTabName === "lookup") {
            renderLookupResults();
        }
    }

    newRegBtn.addEventListener("click", resetDesk);

    function startResetTimer() {
        countdownSec = 5;
        updateTimerLabel();

        if (countdownInterval) clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            countdownSec--;
            if (countdownSec <= 0) {
                clearInterval(countdownInterval);
                resetDesk();
            } else {
                updateTimerLabel();
            }
        }, 1000);
    }

    function updateTimerLabel() {
        resetTickerText.textContent = Storage.t('reg_reset_msg', { sec: countdownSec });
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

    // Storage listeners for real time updates
    window.addEventListener("expo_db_update", () => {
        if (activeTabName === "lookup") {
            renderLookupResults();
        }
    });

    window.addEventListener("expo_settings_update", () => {
        Storage.translatePage();
        populateSectors();
        if (activeTabName === "lookup") {
            renderLookupResults();
        }
    });
});
