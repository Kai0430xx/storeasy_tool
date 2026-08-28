<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>收多易迷你倉庫 - 系統登入</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background-color: #0f172a; color: #1e293b; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .login-card { background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 20px; }
        .login-header { text-align: center; }
        .login-header h1 { font-size: 1.35rem; font-weight: bold; color: #0f172a; margin-bottom: 6px; letter-spacing: 0.5px; }
        .login-header p { font-size: 0.8rem; color: #64748b; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
        .form-group input { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; outline: none; transition: border-color 0.2s; }
        .form-group input:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15); }
        .login-btn { background-color: #f59e0b; color: #0f172a; padding: 12px; border-radius: 8px; font-weight: bold; font-size: 1rem; border: none; cursor: pointer; transition: background 0.2s; width: 100%; margin-top: 10px; }
        .login-btn:hover { background-color: #d97706; }
        .error-msg { color: #dc2626; font-size: 0.85rem; text-align: center; display: none; background: #fef2f2; padding: 8px; border-radius: 6px; border: 1px solid #fecaca; }
    </style>
</head>
<body>

    <div class="login-card">
        <div class="login-header">
            <h1>收多易迷你倉庫</h1>
            <p>Storeasy Storage Management System</p>
        </div>
        
        <div class="form-group">
            <label>帳號 (Username)</label>
            <input type="text" id="login-user" placeholder="請輸入登入帳號" autocomplete="username">
        </div>
        
        <div class="form-group">
            <label>密碼 (Password)</label>
            <input type="password" id="login-pass" placeholder="請輸入登入密碼" autocomplete="current-password">
        </div>

        <div id="login-error" class="error-msg">帳號或密碼錯誤，請重新輸入</div>

        <button type="button" id="login-submit-btn" class="login-btn">登入系統</button>
    </div>

    <!-- 引入登入驗證邏輯 -->
    <script src="login.js"></script>
    <script>
        document.getElementById('login-submit-btn').addEventListener('click', function() {
            const u = document.getElementById('login-user').value.trim();
            const p = document.getElementById('login-pass').value.trim();
            const errEl = document.getElementById('login-error');

            if (window.StoreasyAuth && window.StoreasyAuth.login(u, p)) {
                // 登入成功，跳轉回首頁
                window.location.href = 'index.html';
            } else {
                errEl.style.display = 'block';
            }
        });

        // 支援按下 Enter 鍵直接登入
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('login-submit-btn').click();
            }
        });
    </script>
</body>
</html>
