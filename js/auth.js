// 認証関連の機能
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isInitialized = false;
        this.lastLogoutTime = 0; // ログアウト時間を記録
        this.init();
    }

    // 初期化
    async init() {
        // セッション状態をチェック
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            this.currentUser = session.user;
            this.updateUI(true);
        }
        this.isInitialized = true;

        // 認証状態の変更を監視
        supabase.auth.onAuthStateChange((event, session) => {
            // 初期化後のみメッセージを表示
            if (this.isInitialized) {
                if (event === 'SIGNED_IN') {
                    this.currentUser = session.user;
                    this.updateUI(true);
                    // ログインページからの遷移の場合のみメッセージを表示
                    if (window.location.pathname.includes('login.html')) {
                        this.showMessage('ログインしました', 'success');
                    }
                } else if (event === 'SIGNED_OUT') {
                    this.currentUser = null;
                    this.updateUI(false);
                    // 短時間での重複ログアウトメッセージを防ぐ
                    const now = Date.now();
                    if (now - this.lastLogoutTime > 1000) { // 1秒以内の重複を防ぐ
                        this.showMessage('ログアウトしました', 'info');
                        this.lastLogoutTime = now;
                    }
                }
            } else {
                // 初期化時は UI の更新のみ
                if (event === 'SIGNED_IN') {
                    this.currentUser = session.user;
                    this.updateUI(true);
                } else if (event === 'SIGNED_OUT') {
                    this.currentUser = null;
                    this.updateUI(false);
                }
            }
        });
    }

    // メールアドレスでサインアップ
    async signUp(email, password) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) throw error;

            this.showMessage('確認メールを送信しました。メールを確認してアカウントを有効化してください。', 'success');
            return { success: true, data };
        } catch (error) {
            this.showMessage(`サインアップエラー: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    // メールアドレスでサインイン
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            this.showMessage(`ログインエラー: ${error.message}`, 'error');
            return { success: false, error };
        }
    }



    // サインアウト
    async signOut() {
        try {
            // ログアウト時間を記録
            this.lastLogoutTime = Date.now();
            
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            return { success: true };
        } catch (error) {
            this.showMessage(`ログアウトエラー: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    // パスワードリセット
    async resetPassword(email) {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password.html`
            });

            if (error) throw error;

            this.showMessage('パスワードリセットメールを送信しました', 'success');
            return { success: true, data };
        } catch (error) {
            this.showMessage(`パスワードリセットエラー: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    // UI更新
    updateUI(isLoggedIn) {
        const authSection = document.getElementById('auth-section');
        const userSection = document.getElementById('user-section');
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userEmail = document.getElementById('user-email');

        if (isLoggedIn && this.currentUser) {
            if (authSection) authSection.style.display = 'none';
            if (userSection) userSection.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (userEmail) userEmail.textContent = this.currentUser.email;
        } else {
            if (authSection) authSection.style.display = 'block';
            if (userSection) userSection.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userEmail) userEmail.textContent = '';
        }
    }

    // メッセージ表示
    showMessage(message, type = 'info') {
        const messageDiv = document.getElementById('auth-message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `auth-message ${type}`;
            messageDiv.style.display = 'block';
            
            // 3秒後に自動で非表示
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        } else {
            // フォールバック: アラート表示
            alert(message);
        }
    }

    // ユーザー情報取得
    getCurrentUser() {
        return this.currentUser;
    }

    // ログイン状態確認
    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// グローバルに認証マネージャーを初期化
const authManager = new AuthManager();
