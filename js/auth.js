let currentUser = null;

// 初期化
async function initAuth() {
    // 現在のセッションを取得
    const { data: { session } } = await supabase.auth.getSession();
    currentUser = session?.user || null;
    updateAuthUI();

    // 認証状態の変更を監視
    supabase.auth.onAuthStateChange((event, session) => {
        currentUser = session?.user || null;
        updateAuthUI();
        
        // メッセージ表示
        if (event === 'SIGNED_IN') {
            showMessage('ログインしました');
        } else if (event === 'SIGNED_OUT') {
            showMessage('ログアウトしました');
        }
    });
}

// サインアップ
async function signUp(email, password) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
        showMessage(`エラー: ${error.message}`);
        return false;
    }
    showMessage('確認メールを送信しました');
    return true;
}

// サインイン
async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        showMessage(`エラー: ${error.message}`);
        return false;
    }
    return true;
}

// サインアウト
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        showMessage(`エラー: ${error.message}`);
        return false;
    }
    return true;
}

// パスワードリセット
async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
        showMessage(`エラー: ${error.message}`);
        return false;
    }
    showMessage('リセットメールを送信しました');
    return true;
}

// UI更新
function updateAuthUI() {
    const userSection = document.getElementById('user-section');
    const loginBtn = document.getElementById('login-btn');
    const userEmail = document.getElementById('user-email');

    if (currentUser) {
        if (userSection) userSection.style.display = 'flex';
        if (loginBtn) loginBtn.style.display = 'none';
        if (userEmail) userEmail.textContent = currentUser.email;
    } else {
        if (userSection) userSection.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (userEmail) userEmail.textContent = '';
    }
}

// メッセージ表示
function showMessage(message) {
    const messageDiv = document.getElementById('auth-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        setTimeout(() => messageDiv.style.display = 'none', 3000);
    } else {
        alert(message);
    }
}

// ユーティリティ関数
function getCurrentUser() {
    return currentUser;
}

function isLoggedIn() {
    return !!currentUser;
}

// 初期化実行
initAuth();