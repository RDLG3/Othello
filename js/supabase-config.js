// Supabase設定
// 注意: anon keyは公開されても安全だが、service role keyは絶対に公開しない
const SUPABASE_URL = 'https://jojqznjgpvaqihlnotna.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvanF6bmpncHZhcWlobG5vdG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNjg3NDcsImV4cCI6MjA2Njg0NDc0N30.9WYV2inDtv3wArxnSvMsdZBPlV28t5bqWp49GK8n_AU';
// Supabaseクライアントの初期化
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
