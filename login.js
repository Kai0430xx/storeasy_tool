(function() {
    // 1. 初始化您的專屬帳號與登入狀態
    const MY_ACCOUNT = { user: "kai", pass: "0430", role: "admin" };
    
    // 檢查本機是否有儲存的使用者帳號，若無則寫入您的帳號
    let localUsers = JSON.parse(localStorage.getItem('storeasy_users')) || [MY_ACCOUNT];
    
    // 確保一定包含您的帳號
    if (!localUsers.some(u => u.user === "kai")) {
        localUsers.push(MY_ACCOUNT);
    }
    localStorage.setItem('storeasy_users', JSON.stringify(localUsers));

    let currentUser = JSON.parse(sessionStorage.getItem('storeasy_current_user'));

    // 2. 建立全域遮罩與登入樣式
    const style = document.createElement('style');
    style.innerHTML = `
        #login-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: #0f172a; z-index: 99999;
            display: flex; justify-content: center; align-items: center;
        }
        .login-card {
            background: #fff; padding: 40px; border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3); width: 100%; max-width: 400px;
            display: flex; flex-direction: column; gap: 20px;
        }
        .login-card h2 { font-size: 1.5rem; font-weight: bold; color: #0f172a; text-align: center; }
        .login-card p { font-size: 0.85rem; color: #64748b; text-align: center; margin-top: -12px; }
        .login-group { display: flex; flex-direction: column; gap: 6px; }
        .login-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
        .login-group input { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; outline: none; }
        .login-group input:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1); }
        .login-btn { padding: 12px; background-color: #f59e0b; color: #0f172a; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: background 0.2s; }
        .login-btn:hover { background-color: #d97706; }
        .login-error { color: #dc2626; font-size: 0.85rem; text-align: center; display: none; }
        .logout-btn-container { position: absolute; top: 16px; right: 32px; z-index: 40; }
        .logout-btn { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: bold; cursor: pointer; }
        .logout-btn:hover { background: #fecaca; }
    `;
    document.head.appendChild(style);

    // 3. 渲染登入畫面 HTML
    const overlay = document.createElement('div');
    overlay.id = 'login-overlay';
    overlay.innerHTML = `
        <div class="login-card">
            <h2>收多易迷你倉庫</h2>
            <p>營運管理工具 - 請先登入系統</p>
            <div class="login-group">
                <label>帳號</label>
                <input type="text" id="login-user" placeholder="請輸入帳號">
            </div>
            <div class="login-group">
                <label>密碼</label>
                <input type="password" id="login-pass" placeholder="請輸入密碼">
            </div>
            <div id="login-error" class="login-error">帳號或密碼錯誤！</div>
            <button type="button" class="login-btn" id="submit-login">登入系統</button>
        </div>
    `;

    // 如果未登入，顯示登入遮罩；若已登入，則解鎖畫面並加入登出按鈕
    if (!currentUser) {
        document.body.appendChild(overlay);
    } else {
        injectLogoutButton();
    }

    // 4. 綁定登入按鈕事件
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'submit-login') {
            performLogin();
        }
        if (e.target && e.target.id === 'system-logout') {
            performLogout();
        }
    });

    // 支援按下 Enter 鍵登入
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.getElementById('login-overlay')) {
            performLogin();
        }
    });

    function performLogin() {
        const uInput = document.getElementById('login-user').value.trim();
        const pInput = document.getElementById('login-pass').value.trim();
        const errEl = document.getElementById('login-error');

        let users = JSON.parse(localStorage.getItem('storeasy_users')) || [];
        let matched = users.find(u => u.user === uInput && u.pass === pInput);

        if (matched) {
            sessionStorage.setItem('storeasy_current_user', JSON.stringify(matched));
            const overlayEl = document.getElementById('login-overlay');
            if (overlayEl) overlayEl.remove();
            injectLogoutButton();
            updateActivity(matched.user);
        } else {
            errEl.style.display = 'block';
        }
    }

    function performLogout() {
        sessionStorage.removeItem('storeasy_current_user');
        location.reload();
    }

    function injectLogoutButton() {
        const headerEl = document.querySelector('header');
        if (headerEl && !document.getElementById('system-logout')) {
            const userObj = JSON.parse(sessionStorage.getItem('storeasy_current_user'));
            const div = document.createElement('div');
            div.className = 'logout-btn-container no-print';
            div.innerHTML = `<span style="font-size: 0.85rem; font-weight: 600; color: #475569; margin-right: 8px;">👤 ${userObj ? userObj.user : ''}</span><button type="button" id="system-logout" class="logout-btn">登出</button>`;
            headerEl.appendChild(div);
        }
    }

    // 5. 追蹤頁面活動狀態
    function updateActivity(username) {
        let activities = JSON.parse(localStorage.getItem('storeasy_activities')) || {};
        activities[username] = {
            lastActive: new Date().toLocaleTimeString(),
            page: document.getElementById('page-title') ? document.getElementById('page-title').innerText : '首頁'
        };
        localStorage.setItem('storeasy_activities', JSON.stringify(activities));
    }

    document.addEventListener('click', function() {
        let userObj = JSON.parse(sessionStorage.getItem('storeasy_current_user'));
        if (userObj) {
            updateActivity(userObj.user);
        }
    });
})();
