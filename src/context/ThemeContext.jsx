import { createContext, useContext, useState, useEffect } from 'react';

const getSystem = () =>
    (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark' : 'light';

// Saved choice wins; otherwise follow the visitor's system preference.
const readInitial = () => {
    try {
        const s = localStorage.getItem('theme');
        if (s === 'dark' || s === 'light') return s;
    } catch { /* ignore */ }
    return getSystem();
};

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(readInitial);

    // apply the class (don't auto-persist — persisting only happens on toggle,
    // so an un-toggled visitor keeps following their system setting).
    useEffect(() => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
    }, [theme]);

    // follow live system changes until the user has made an explicit choice
    useEffect(() => {
        let saved = null;
        try { saved = localStorage.getItem('theme'); } catch { /* ignore */ }
        if (saved === 'dark' || saved === 'light') return;
        if (!(window.matchMedia)) return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e) => setTheme(e.matches ? 'dark' : 'light');
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    const toggleTheme = () => setTheme(t => {
        const next = t === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', next); } catch { /* ignore */ }
        return next;
    });

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
