// Translation Dictionary
const i18n = {
    en: {
        // Hub Launcher
        launcher_title: "Expo Management Suite",
        launcher_subtitle: "Unified real-time attendee and kiosk manager",
        launch: "Launch",
        kiosk_title: "Registration Kiosk",
        kiosk_desc: "Self-service registration form for attendees.",
        lookup_title: "Check-in Desk",
        lookup_desc: "Search, verify and check-in attendees.",
        display_title: "Big Screen Display",
        display_desc: "Live countdown and real-time statistics.",
        admin_title: "General Admin",
        admin_desc: "Configure event details, manage records & utilities.",

        // Registration Form
        reg_title: "Expo Registration",
        reg_subtitle: "Register for your entry pass below",
        field_name: "Full Name",
        field_company: "Company / Organization",
        field_email: "Email Address",
        field_phone: "Phone Number",
        field_sector: "Industry Sector",
        btn_register: "Submit Registration",
        reg_success: "Registration Successful!",
        reg_badge_sub: "Present this pass at the gate for check-in",
        reg_badge_id: "Pass ID",
        reg_new_btn: "New Registration",
        reg_reset_msg: "This screen will reset in {sec} seconds...",

        // Search & Check-in
        search_title: "Attendee Lookup & Check-In",
        search_placeholder: "Search by name, company, email, or phone...",
        search_no_results: "No registrations match your search criteria.",
        checkin_btn: "Check In",
        checkedin_status: "Checked In",
        not_checkedin_status: "Pending Check-In",
        search_total: "Registered Database",

        // Countdown & Stats
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        starts_in: "Event Starts In",
        live_ticker: "Live Registration Feed",
        welcome_feed: "{name} from {company} registered!",
        checkin_feed: "{name} checked in!",
        total_registered_label: "Total Registered Attendees",

        // Admin Console
        admin_dashboard: "Admin Dashboard",
        stats_total: "Total Registrations",
        stats_checked: "Checked In",
        stats_rate: "Check-In Rate",
        config_title: "Countdown Settings",
        event_name: "Event Title",
        target_date: "Countdown Target Date/Time",
        btn_save_config: "Save Configurations",
        db_utilities: "Database Utilities",
        btn_mock: "Add 10 Mock Attendees",
        btn_clear: "Clear All Database",
        btn_export: "Export to CSV",
        btn_import: "Import from JSON",
        table_name: "Name",
        table_company: "Company",
        table_email: "Email",
        table_phone: "Phone",
        table_sector: "Sector",
        table_status: "Status",
        table_actions: "Actions",
        btn_edit: "Edit",
        btn_delete: "Delete",
        edit_modal_title: "Edit Attendee Details",
        btn_cancel: "Cancel",
        btn_save: "Save Changes",

        // Sectors
        sector_tech: "Technology",
        sector_health: "Health & Medicine",
        sector_finance: "Finance & Banking",
        sector_energy: "Energy & Environment",
        sector_education: "Education & Research",
        sector_agriculture: "Agriculture & Food",
        sector_hospitality: "Hospitality & Tourism",
        sector_manufacturing: "Manufacturing & Construction",
        sector_retail: "Retail & E-commerce",
        sector_other: "Other",

        // NEW: Desk, Directory, Password
        desk_title: "Registration & Check-In Desk",
        desk_subtitle: "Search early registrations or register new arrivals",
        tab_lookup: "Search & Lookup",
        tab_full: "Full Registration",
        tab_quick: "Quick Phone-Only",
        btn_quick_reg: "Submit Phone Registration",
        phone_only_label: "Enter Phone Number (Only)",
        dir_title: "Attendee Directory",
        dir_subtitle: "List of registered participants (Read-Only)",
        dir_placeholder: "Filter registered attendees by name, company, or sector...",
        admin_lock_title: "Admin Portal Locked",
        admin_lock_subtitle: "Enter admin password to unlock this page",
        admin_password_label: "Administrator Password",
        btn_unlock: "Unlock Dashboard",
        btn_logout: "Logout",
        change_pass_title: "Security & Password Settings",
        field_curr_pass: "Current Password",
        field_new_pass: "New Password",
        btn_update_pass: "Change Password",
        err_wrong_pass: "Incorrect password. Access denied.",
        err_curr_pass: "Current password was incorrect.",
        msg_pass_changed: "Admin password updated successfully!",
        badge_quick_reg: "Quick Registry"
    },
    zh: {
        // Hub Launcher
        launcher_title: "博览会管理系统",
        launcher_subtitle: "统一的实时参会者和自助终端管理器",
        launch: "启动项目",
        kiosk_title: "自助注册终端",
        kiosk_desc: "供参会者自行填写的注册页面。",
        lookup_title: "签到服务台",
        lookup_desc: "搜索、核对并为参会者办理签到操作。",
        display_title: "大屏幕投屏",
        display_desc: "实时倒计时和数据注册情况统计。",
        admin_title: "系统后台管理",
        admin_desc: "配置博览会信息、管理数据以及各种工具。",

        // Registration Form
        reg_title: "博览会参会注册",
        reg_subtitle: "请在下方填写信息以注册您的入场通行证",
        field_name: "姓名",
        field_company: "公司 / 机构名称",
        field_email: "电子邮箱",
        field_phone: "手机号码",
        field_sector: "所属行业部门",
        btn_register: "提交注册信息",
        reg_success: "注册成功！",
        reg_badge_sub: "请在入口处出示此通行证以办理签到",
        reg_badge_id: "通行证 ID",
        reg_new_btn: "继续注册",
        reg_reset_msg: "页面将在 {sec} 秒内自动重置...",

        // Search & Check-in
        search_title: "参会人员查询与签到",
        search_placeholder: "通过姓名、公司、邮箱或电话搜索...",
        search_no_results: "没有找到符合搜索条件的注册记录。",
        checkin_btn: "办理签到",
        checkedin_status: "已签到",
        not_checkedin_status: "待签到",
        search_total: "已注册人员库",

        // Countdown & Stats
        days: "天",
        hours: "小时",
        minutes: "分钟",
        seconds: "秒",
        starts_in: "博览会倒计时",
        live_ticker: "实时动态播报",
        welcome_feed: "欢迎来自 {company} 的 {name} 注册参会！",
        checkin_feed: "{name} 已成功签到！",
        total_registered_label: "已注册参会总人数",

        // Admin Console
        admin_dashboard: "管理控制台",
        stats_total: "注册总人数",
        stats_checked: "签到总人数",
        stats_rate: "签到率",
        config_title: "倒计时时间设置",
        event_name: "博览会主题名称",
        target_date: "倒计时截止时间",
        btn_save_config: "保存系统配置",
        db_utilities: "数据库实用工具",
        btn_mock: "快速导入 10 条模拟数据",
        btn_clear: "清空所有数据库",
        btn_export: "导出为 CSV 表格",
        btn_import: "导入 JSON 备份",
        table_name: "姓名",
        table_company: "公司名称",
        table_email: "电子邮箱",
        table_phone: "手机号",
        table_sector: "行业部门",
        table_status: "签到状态",
        table_actions: "管理操作",
        btn_edit: "编辑",
        btn_delete: "删除",
        edit_modal_title: "修改参会者信息",
        btn_cancel: "取消",
        btn_save: "保存修改",

        // Sectors
        sector_tech: "科技信息技术",
        sector_health: "医疗健康与医药",
        sector_finance: "金融与银行服务",
        sector_energy: "能源与环境保护",
        sector_education: "教育与科学研究",
        sector_agriculture: "农业与食品科学",
        sector_hospitality: "餐饮住宿与旅游",
        sector_manufacturing: "工业制造与建筑",
        sector_retail: "零售商贸与电商",
        sector_other: "其他行业",

        // NEW: Desk, Directory, Password
        desk_title: "登记与签到服务台",
        desk_subtitle: "查询预注册信息或为现场抵达的来宾注册登记",
        tab_lookup: "查询与核对",
        tab_full: "完整信息登记",
        tab_quick: "手机号快速登记",
        btn_quick_reg: "提交手机号登记",
        phone_only_label: "仅需输入手机号码",
        dir_title: "参会人员名册",
        dir_subtitle: "已注册参会人员公开名单（只读）",
        dir_placeholder: "通过姓名、公司或行业筛选已注册人员...",
        admin_lock_title: "管理后台已锁定",
        admin_lock_subtitle: "请输入管理员密码以访问此页面",
        admin_password_label: "管理员密码",
        btn_unlock: "验证解锁",
        btn_logout: "退出登录",
        change_pass_title: "安全密码设置",
        field_curr_pass: "当前旧密码",
        field_new_pass: "新设置密码",
        btn_update_pass: "更新修改密码",
        err_wrong_pass: "密码错误，拒绝访问。",
        err_curr_pass: "当前旧密码输入错误。",
        msg_pass_changed: "管理员密码已更新成功！",
        badge_quick_reg: "快速通道"
    }
};

const SECTORS_LIST = [
    { key: "sector_tech", value: "technology" },
    { key: "sector_health", value: "health" },
    { key: "sector_finance", value: "finance" },
    { key: "sector_energy", value: "energy" },
    { key: "sector_education", value: "education" },
    { key: "sector_agriculture", value: "agriculture" },
    { key: "sector_hospitality", value: "hospitality" },
    { key: "sector_manufacturing", value: "manufacturing" },
    { key: "sector_retail", value: "retail" },
    { key: "sector_other", value: "other" }
];

// Data Base Storage functions
const Storage = {
    // Attendees
    getAttendees() {
        const data = localStorage.getItem("expo_attendees");
        return data ? JSON.parse(data) : [];
    },

    saveAttendees(attendees) {
        localStorage.setItem("expo_attendees", JSON.stringify(attendees));
        // Dispatch local event for same window listeners
        window.dispatchEvent(new Event("expo_db_update"));
    },

    addAttendee(attendee) {
        const attendees = this.getAttendees();
        const newAttendee = {
            id: 'EXP-' + Math.floor(100000 + Math.random() * 900000),
            checkedIn: false,
            registeredAt: new Date().toISOString(),
            checkedInAt: null,
            ...attendee
        };
        attendees.unshift(newAttendee); // Add to the top
        this.saveAttendees(attendees);
        this.logActivity('welcome', newAttendee);
        return newAttendee;
    },

    updateAttendee(id, updatedFields) {
        const attendees = this.getAttendees();
        const index = attendees.findIndex(a => a.id === id);
        if (index !== -1) {
            const oldCheckedIn = attendees[index].checkedIn;
            attendees[index] = { ...attendees[index], ...updatedFields };
            
            // Log check-in events
            if (!oldCheckedIn && updatedFields.checkedIn) {
                attendees[index].checkedInAt = new Date().toISOString();
                this.logActivity('checkin', attendees[index]);
            } else if (updatedFields.checkedIn === false) {
                attendees[index].checkedInAt = null;
            }

            this.saveAttendees(attendees);
            return true;
        }
        return false;
    },

    deleteAttendee(id) {
        let attendees = this.getAttendees();
        attendees = attendees.filter(a => a.id !== id);
        this.saveAttendees(attendees);
    },

    clearAll() {
        this.saveAttendees([]);
        localStorage.setItem("expo_activities", JSON.stringify([]));
        window.dispatchEvent(new Event("expo_db_update"));
    },

    // Settings
    getSettings() {
        const defaultDate = new Date();
        defaultDate.setHours(defaultDate.getHours() + 24); // 24 hours from now

        const defaults = {
            eventTitle: "Global Expo 2026",
            countdownDate: defaultDate.toISOString(),
            language: "en",
            adminPassword: "admin123"
        };
        const data = localStorage.getItem("expo_settings");
        return data ? { ...defaults, ...JSON.parse(data) } : defaults;
    },

    saveSettings(settings) {
        localStorage.setItem("expo_settings", JSON.stringify(settings));
        window.dispatchEvent(new Event("expo_settings_update"));
    },

    // Live Feed Logs
    getActivities() {
        const data = localStorage.getItem("expo_activities");
        return data ? JSON.parse(data) : [];
    },

    logActivity(type, attendee) {
        const activities = this.getActivities();
        activities.unshift({
            id: 'ACT-' + Date.now() + Math.floor(Math.random() * 1000),
            type, // 'welcome' or 'checkin'
            name: attendee.name,
            company: attendee.company,
            timestamp: new Date().toISOString()
        });
        // Keep only last 30 activities
        if (activities.length > 30) {
            activities.pop();
        }
        localStorage.setItem("expo_activities", JSON.stringify(activities));
        window.dispatchEvent(new Event("expo_activity_update"));
    },

    // Language Utilities
    getCurrentLanguage() {
        return this.getSettings().language;
    },

    setLanguage(lang) {
        const settings = this.getSettings();
        settings.language = lang;
        this.saveSettings(settings);
    },

    t(key, replacements = {}) {
        const lang = this.getCurrentLanguage();
        let text = i18n[lang][key] || i18n['en'][key] || key;
        
        // Handle replacements e.g. {sec} or {name}
        Object.keys(replacements).forEach(k => {
            text = text.replace(`{${k}}`, replacements[k]);
        });
        return text;
    },

    // Apply translations to all DOM elements marked with data-i18n
    translatePage() {
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            
            // Support input placeholders
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = this.t(key);
            } else {
                el.textContent = this.t(key);
            }
        });

        // Set active state on lang toggle buttons if present
        const currentLang = this.getCurrentLanguage();
        const enBtn = document.getElementById("lang-en");
        const zhBtn = document.getElementById("lang-zh");
        if (enBtn && zhBtn) {
            if (currentLang === 'en') {
                enBtn.classList.add("active");
                zhBtn.classList.remove("active");
            } else {
                zhBtn.classList.add("active");
                enBtn.classList.remove("active");
            }
        }
    },

    // Mock Data Generator
    generateMockData() {
        const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Li", "Wei", "Zhang", "Min", "Wang", "Jie", "Chen", "Lei"];
        const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Wong", "Chan", "Zhou", "Liu", "Yang", "Huang", "Wu"];
        const companies = ["TechCorp", "InnoHealth", "Apex Financial", "EcoPower Systems", "EduTech Labs", "AgriFuture", "Nomad Lodging", "Cybernet Systems", "Global Logistics", "Metaverse Inc", "Alibaba", "Tencent", "Baidu", "Xiaomi", "Huawei"];
        
        const mockAttendees = [];
        for (let i = 0; i < 10; i++) {
            const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = `${fName} ${lName}`;
            const company = companies[Math.floor(Math.random() * companies.length)];
            const email = `${fName.toLowerCase()}.${lName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`;
            const phone = '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000);
            const sector = SECTORS_LIST[Math.floor(Math.random() * SECTORS_LIST.length)].value;
            
            // Random check-in state
            const checkedIn = Math.random() > 0.5;
            const regTime = new Date();
            regTime.setMinutes(regTime.getMinutes() - Math.floor(Math.random() * 120)); // registered in last 2 hours
            
            mockAttendees.push({
                id: 'EXP-' + Math.floor(100000 + Math.random() * 900000),
                name,
                company,
                email,
                phone,
                sector,
                checkedIn,
                registeredAt: regTime.toISOString(),
                checkedInAt: checkedIn ? new Date().toISOString() : null
            });
        }

        const currentAttendees = this.getAttendees();
        const merged = [...mockAttendees, ...currentAttendees];
        this.saveAttendees(merged);
        
        // Log activities for some
        mockAttendees.slice(0, 3).forEach(attendee => {
            this.logActivity('welcome', attendee);
            if (attendee.checkedIn) {
                this.logActivity('checkin', attendee);
            }
        });
    }
};

// Handle real-time sync across different open tabs
window.addEventListener("storage", (event) => {
    if (event.key === "expo_attendees" || event.key === "expo_activities") {
        window.dispatchEvent(new Event("expo_db_update"));
    }
    if (event.key === "expo_settings") {
        window.dispatchEvent(new Event("expo_settings_update"));
        Storage.translatePage();
    }
});

// Toast Notification Manager
const Toast = {
    show(message, type = 'success') {
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        
        let icon = '';
        if (type === 'success') {
            icon = `<svg width="20" height="20" fill="var(--success)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
        } else {
            icon = `<svg width="20" height="20" fill="var(--danger)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
        }

        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                ${icon}
                <span>${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;

        container.appendChild(toast);

        const closeBtn = toast.querySelector(".toast-close");
        closeBtn.addEventListener("click", () => {
            toast.remove();
        });

        // Auto remove
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = "slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse forwards";
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    }
};

// Auto-run translation on load if elements exist
document.addEventListener("DOMContentLoaded", () => {
    Storage.translatePage();

    // Bind lang toggles if they exist in the HTML
    const enBtn = document.getElementById("lang-en");
    const zhBtn = document.getElementById("lang-zh");
    if (enBtn && zhBtn) {
        enBtn.addEventListener("click", () => {
            Storage.setLanguage("en");
            Storage.translatePage();
        });
        zhBtn.addEventListener("click", () => {
            Storage.setLanguage("zh");
            Storage.translatePage();
        });
    }
});
