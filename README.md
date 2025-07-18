# Othello

オセロサイト

## 概要

これは**研究開発リテラシーの最終課題**として開発したWebアプリです．
このサイトの詳細については以下のdeepwikiをご覧ください．[**deepwikiはこちら**](https://deepwiki.com/RDLG3/Othello)

## デモ

[**🔥ログイン🔥**](https://rdlg3.github.io/Othello/auth/login)

## 特徴

- **レスポンシブデザイン** - スマホでも快適にプレイ可能
- **モダンなUI** - シンプルで美しいデザイン
- **認証機能** - Supabase Authを使用したユーザー管理
- **高速動作** - GitHub Pagesで静的ホスティング
- favicon（サイトのアイコンも作成しました）

## 技術スタック

- **HTML5** - ページ構造
- **CSS3** - スタイリング・レスポンシブデザイン
- **JavaScript** - ゲームロジック・DOM操作
- **Supabase Auth** - ユーザー認証
- **GitHub Pages** - デプロイ・ホスティング

## プロジェクト構成

```text
Othello/
├── index.html          # ホームページ
├── othello.html        # ゲーム画面
├── developer.html      # 開発者紹介
├── howto.html          # 遊び方説明
├── favicon.ico         # サイトアイコン
├── css/                # スタイルシート
│   ├── index.css
│   ├── othello.css
│   ├── developer.css
│   ├── footer.css
│   ├── header.css
│   ├── howto.css
│   └── login.css
├── js/                 # JavaScript
│   ├── othello.js      # ゲームロジック
│   ├── auth.js         # 認証機能
│   └── supabase-config.js
├── components/         # 共通コンポーネント
│   ├── header.html
│   └── footer.html
└── auth/               # 認証関連ページ
    ├── login.html
    └── reset-password.html
```

## ゲームルール

オセロ（リバーシ）の基本ルールに従います：

1. 8×8のボードで黒と白の石を交互に置く
2. 相手の石を挟むように石を置く
3. 挟まれた石は自分の色に変わる
4. 置ける場所がない場合はパス
5. ボードが埋まるか両者パスでゲーム終了
6. 石の数が多い方が勝利！

## 開発チーム

情報工学部の3人の学生が開発しました。

### Fukita Hinato
[![GitHub](https://img.shields.io/badge/GitHub-fukichaan-181717?style=flat&logo=github)](https://github.com/fukichaan)

### Hochu Shunsuke
[![GitHub](https://img.shields.io/badge/GitHub-hochu--shunsuke-181717?style=flat&logo=github)](https://github.com/hochu-shunsuke)

### Matsui Riku
[![GitHub](https://img.shields.io/badge/GitHub-langue--de77-181717?style=flat&logo=github)](https://github.com/langue-de77)

## 開発期間

**約2週間** (2025年7月初旬〜中旬)

## 使い方

### ローカルでの実行

1. リポジトリをクローン

```bash
git clone https://github.com/RDLG3/Othello.git
cd Othello
```

2. ローカルサーバーで起動

```bash
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx serve .
```

3. ブラウザで `http://localhost:8000` にアクセス

### オンラインでプレイ

GitHub Pagesで公開中です！
[https://rdlg3.github.io/Othello/](https://rdlg3.github.io/Othello/)

## 課題について

この プロジェクトは**研究開発リテラシー**の最終課題として制作されました。

### 学習目標

- Git/GitHubを使ったチーム開発
- HTML/CSS/JavaScriptの実践的な学習
- レスポンシブWebデザインの習得
- 外部APIの連携（Supabase Auth）
- 静的サイトのデプロイ

### 工夫した点

- ユーザビリティを重視したUI/UXデザイン
- モバイルファーストなレスポンシブ対応
- モジュール化された保守しやすいコード構成
- CI/CDを活用した自動デプロイ

---

## 研究開発リテラシー最終課題

情報工学部 | 2025年

Made with ❤️ by Team RDLG3
