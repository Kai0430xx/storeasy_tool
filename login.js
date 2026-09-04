// login.js - 收多易迷你倉庫系統登入驗證與權限管理
(function() {
    // 預設登入帳號密碼清單
    const validUsers = [
        { username: 'admin', password: '888' },
        { username: 'dora', password: '1020' },
        { username: 'kai', password: '123' },
        { username: 'storeasy', password: '666' },
        { username: 'canny4545', password: '121qwe' },
        { username: 'bear', password: '809105' },
        { username: 'emmy', password: '123' },
        { username: 'yoko', password: '123' },
        { username: 'joyce', password: '123' }
    ];

    // 檢查目前是否已登入
    function checkAuth() {
        const isLogged = sessionStorage.getItem('storeasy_logged_in');
        const currentPath = window.location.pathname;
        const isLoginPage = currentPath.includes('login.html');

        if (!isLogged && !isLoginPage) {
            // 如果未登入且不在登入頁，直接強制導向登入頁
            window.location.href = 'login.html';
        }
    }

    // 頁面載入時立即執行檢查
    checkAuth();

    // 全域登入檢查綁定
    window.StoreasyAuth = {
        login: function(username, password) {
            let found = validUsers.find(u => u.username === username && u.password === password);
            if (found) {
                sessionStorage.setItem('storeasy_logged_in', 'true');
                sessionStorage.setItem('storeasy_user', username);
                return true;
            }
            return false;
        },
        logout: function() {
            sessionStorage.removeItem('storeasy_logged_in');
            sessionStorage.removeItem('storeasy_user');
            window.location.href = 'login.html';
        },
        getCurrentUser: function() {
            return sessionStorage.getItem('storeasy_user') || '店長';
        }
    };
})();
