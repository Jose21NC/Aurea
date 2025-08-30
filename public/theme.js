// public/theme.js
const root = document.documentElement;
const THEME_KEY = 'aurea_theme';


export function applyTheme(t){
root.setAttribute('data-theme', t);
localStorage.setItem(THEME_KEY, t);
}


export function initTheme(){
const saved = localStorage.getItem(THEME_KEY);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}


export function toggleTheme(){
const current = root.getAttribute('data-theme') || 'light';
applyTheme(current === 'light' ? 'dark' : 'light');
}