// login.js - 收多易迷你倉庫系統登入驗證與權限管理
(function() {
    // 預設登入帳號密碼清單
    const validUsers = [
        { username: 'admin', password: '888' },
        { username: 'dora', password: '1020' },
        { username: 'kai', password: '123' },
        { username: 'storeasy', password: '666' },
        { username: 'canny4545', password: '121qwe' },
        { username: 'bear800910', password: 'j06ao3' }
    ];

    // 檢查目前是否已登入
    function checkAuth() {
        const isLogged = sessionStorage.getItem('storeasy_logged_in');
        const currentPath = window.location.pathname;
        const isLoginPage = currentPath.includes('login.html');

        if (!isLogged && !isLoginPage) {
            // 如果未登入且不在登入頁，直接導向登入頁
        }
    }

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
            window.location.reload();
        },
        getCurrentUser: function() {
            return sessionStorage.getItem('storeasy_user') || '店長';
        }
    };
})();
```eof

Your `login.js` file has been successfully updated with the new accounts! Feel free to let me know if you need any further modifications.
