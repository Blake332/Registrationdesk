document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const totalCountText = document.getElementById("total-registrations-count");
    const resultsList = document.getElementById("results-list");

    // Fetch and render list
    function renderResults() {
        const query = searchInput.value.trim().toLowerCase();
        const attendees = Storage.getAttendees();
        
        // Update database count indicator (digits remain untranslated)
        totalCountText.textContent = attendees.length;

        // Filter attendees
        const filtered = attendees.filter(attendee => {
            return (
                attendee.name.toLowerCase().includes(query) ||
                attendee.company.toLowerCase().includes(query) ||
                attendee.email.toLowerCase().includes(query) ||
                attendee.phone.toLowerCase().includes(query)
            );
        });

        // Clear list
        resultsList.innerHTML = "";

        if (filtered.length === 0) {
            renderEmptyState();
            return;
        }

        filtered.forEach(attendee => {
            const card = document.createElement("div");
            card.className = "glass-card attendee-card";
            
            // Check-in status details
            const statusBadgeClass = attendee.checkedIn ? "badge badge-checked" : "badge badge-pending";
            const statusTextKey = attendee.checkedIn ? "checkedin_status" : "not_checkedin_status";
            const statusText = Storage.t(statusTextKey);

            // Sector translation
            const sectorObj = SECTORS_LIST.find(s => s.value === attendee.sector);
            const sectorText = sectorObj ? Storage.t(sectorObj.key) : attendee.sector;

            // Action button configurations
            let actionBtnHTML = '';
            if (attendee.checkedIn) {
                actionBtnHTML = `
                    <button class="btn btn-sm btn-secondary checkin-btn" data-id="${attendee.id}" data-action="undo">
                        Undo
                    </button>
                `;
            } else {
                actionBtnHTML = `
                    <button class="btn btn-sm btn-success checkin-btn" style="background: var(--secondary); box-shadow: 0 4px 10px rgba(6, 182, 212, 0.2);" data-id="${attendee.id}" data-action="checkin">
                        ${Storage.t('checkin_btn')}
                    </button>
                `;
            }

            card.innerHTML = `
                <div class="attendee-info">
                    <div class="attendee-name-row">
                        <span class="attendee-name">${escapeHTML(attendee.name)}</span>
                        <span class="attendee-code">${attendee.id}</span>
                    </div>
                    <div class="attendee-details">
                        <div class="detail-item" style="font-weight: 500; color: #fff;">
                            <svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                            <span>${escapeHTML(attendee.company)}</span>
                        </div>
                        <div class="detail-item">
                            <span style="background: rgba(139, 92, 246, 0.15); color: var(--primary); padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.8rem; border: 1px solid rgba(139, 92, 246, 0.25);">
                                ${escapeHTML(sectorText)}
                            </span>
                        </div>
                    </div>
                    <div class="attendee-details" style="margin-top: 0.25rem;">
                        <div class="detail-item">
                            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            <span>${escapeHTML(attendee.email)}</span>
                        </div>
                        <div class="detail-item">
                            <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                            <span>${escapeHTML(attendee.phone)}</span>
                        </div>
                    </div>
                </div>
                <div class="checkin-action-area">
                    <span class="${statusBadgeClass}">${statusText}</span>
                    ${actionBtnHTML}
                </div>
            `;

            // Bind button actions
            const btn = card.querySelector(".checkin-btn");
            btn.addEventListener("click", () => {
                const action = btn.getAttribute("data-action");
                const id = btn.getAttribute("data-id");
                
                if (action === "checkin") {
                    Storage.updateAttendee(id, { checkedIn: true });
                    const msg = Storage.getCurrentLanguage() === 'zh' ? 
                        `${attendee.name} 已成功签到！` : 
                        `${attendee.name} checked in successfully!`;
                    Toast.show(msg, "success");
                } else {
                    Storage.updateAttendee(id, { checkedIn: false });
                    const msg = Storage.getCurrentLanguage() === 'zh' ? 
                        `已取消 ${attendee.name} 的签到状态。` : 
                        `Undone check-in for ${attendee.name}.`;
                    Toast.show(msg, "success");
                }
                renderResults();
            });

            resultsList.appendChild(card);
        });
    }

    function renderEmptyState() {
        resultsList.innerHTML = `
            <div class="glass-card no-records">
                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                <p data-i18n="search_no_results">${Storage.t('search_no_results')}</p>
            </div>
        `;
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

    // Bind Search Input
    searchInput.addEventListener("input", renderResults);

    // Initial render
    renderResults();

    // Sync views
    window.addEventListener("expo_db_update", renderResults);
    window.addEventListener("expo_settings_update", () => {
        Storage.translatePage();
        renderResults();
    });
});
