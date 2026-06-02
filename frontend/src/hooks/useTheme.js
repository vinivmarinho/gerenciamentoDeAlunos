import { useState, useEffect } from "react";

function getInitialTheme() {
    // Busca o tema inicial da página em localStorage
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
        return stored;
    }
    // Verifica preferência do usuário 
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
}

export default function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        /* Coloco o atributo na tag <html> inteira e salva no localStorage*/
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prevTheme) => 
            prevTheme === "light" ? "dark" : "light"
        );
    }

    return { theme, toggleTheme };
}
