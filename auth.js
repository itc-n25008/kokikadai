// 共通認証ヘルパー: sessionStorage の userID を読んでページ上のタイトル横に表示する
(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function updateLoginStatus() {
    const id = sessionStorage.getItem("userID");
    const title = document.querySelector(".card-title");
    if (!title) return; // タイトル要素がないページは無視

    // 既に表示要素があれば再利用
    let el = document.getElementById("login-status");
    if (!el) {
      el = document.createElement("span");
      el.id = "login-status";
      el.className = "login-status";
      // タイトルの後ろに挿入（flex レイアウトの中にある想定）
      title.parentNode.insertBefore(el, title.nextSibling);
    }

    if (id) {
      el.innerHTML = `ログイン: <strong>${escapeHtml(id)}</strong> <button id=\"logout-btn\" class=\"logout-btn\">ログアウト</button>`;
      const btn = document.getElementById("logout-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          sessionStorage.removeItem("userID");
          // 状態を更新してログインページへ
          updateLoginStatus();
          location.href = "login.html";
        });
      }
    } else {
      el.innerHTML = `<a href=\"login.html\" class=\"link-login\">ログイン</a>`;
    }
  }

  // DOM の準備ができたら状態更新
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateLoginStatus);
  } else {
    updateLoginStatus();
  }
})();
