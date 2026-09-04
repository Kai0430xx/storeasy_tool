// sidebar.js - 共用側邊欄導覽腳本

function initSidebar() {
    // 💡 保持使用您原本的 'sidebar' ID，完美保留 CSS 與手機版功能
    const container = document.getElementById('sidebar'); 
    if (!container) return;

    // 取得目前頁面檔名
    let path = window.location.pathname;
    let pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    // 處理 GitHub Pages 沒有帶檔名的狀況 (例如直接訪問網域根目錄)
    if (pageName === '' || pageName === 'storeasy_tool') {
        pageName = 'index.html';
    }

    // 判斷目前是迷你倉庫還是快存櫃，決定子選單是否展開
    const isMinis = ['index.html', 'quote.html', 'invoice.html'].includes(pageName);
    const isElocker = ['elocker-branches.html', 'elocker-tutorial.html', 'elocker-data.html'].includes(pageName);

    const sidebarHTML = `
        <div class="sidebar-header">
            <div>
                <h1>收多易迷你倉庫</h1>
                <p>Storeasy Storage</p>
            </div>
            <button class="mobile-close-btn" onclick="toggleMobileSidebar()">×</button>
        </div>
        <nav>
            <div class="menu-group">
                <button type="button" class="menu-category" onclick="toggleMenu(this)">
                    <span>📦 迷你倉庫</span>
                    <span class="arrow">${isMinis ? '▼' : '▶'}</span>
                </button>
                <div class="menu-items" style="display: ${isMinis ? 'flex' : 'none'};">
                    <a href="index.html" class="sub-btn ${pageName === 'index.html' ? 'active' : ''}">📦 倉位資料</a>
                    <a href="quote.html" class="sub-btn ${pageName === 'quote.html' ? 'active' : ''}">📄 生成報價單</a>
                    <a href="invoice.html" class="sub-btn ${pageName === 'invoice.html' ? 'active' : ''}">💰 生成請款單</a>
                    <a href="calculator.html" class="sub-btn ${pageName === 'calculator.html' ? 'active' : ''}">🧮 費用計算小工具</a>
                    <a href="address-record.html" class="sub-btn ${pageName === 'address-record.html' ? 'active' : ''}">🏢 借址登記紀錄</a>
                    <a href="notes-record.html" class="sub-btn ${pageName === 'notes-record.html' ? 'active' : ''}">📝 其他事項紀錄</a>
                </div>
            </div>
            <div class="menu-group" style="margin-top: 8px;">
                <button type="button" class="menu-category" onclick="toggleMenu(this)">
                    <span>🗄️ 快存櫃</span>
                    <span class="arrow">${isElocker ? '▼' : '▶'}</span>
                </button>
                <div class="menu-items" style="display: ${isElocker ? 'flex' : 'none'};">
                    <a href="elocker-branches.html" class="sub-btn ${pageName === 'elocker-branches.html' ? 'active' : ''}">🏢 各據點資訊</a>
                    <a href="elocker-tutorial.html" class="sub-btn ${pageName === 'elocker-tutorial.html' ? 'active' : ''}">📖 操作教學</a>
                    <a href="elocker-data.html" class="sub-btn ${pageName === 'elocker-data.html' ? 'active' : ''}">⚙️ 管理資料</a>
                </div>
            </div>
        </nav>
        <div class="sidebar-footer">資料已永久儲存於本機瀏覽器</div>
    `;

    container.innerHTML = sidebarHTML;
}

// 💡 確保腳本無論放在 <head> 還是 <body> 底部都能正確被執行
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initSidebar);
} else {
    initSidebar();
}
