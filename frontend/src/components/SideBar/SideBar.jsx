import "./sidebar.css"
import { useState } from "react";

export default function SideBar({ activeSection, setActiveSection, theme, toggleTheme }) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleMenuClick = (section) => {
        setActiveSection(section);
        // Fecha o menu no mobile após clicar
        setMenuIsOpen(false);
    };

    return(
        <>
            {/* Se menuIsOpen = true, aplica classe "sidebar", senão, aplica as classes "sidebar" e "mobile-open" */}
            <div className={menuIsOpen ? "sidebar mobile-open" : "sidebar"} id="sidebar">
                <div className="sidebar-header">
                    <h2><i className="fas fa-graduation-cap"></i> Gestão Alunos</h2>
                </div>

                <nav className="sidebar-nav">
                    <button 
                        type="button"
                        className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('dashboard')}
                    >
                        <i className="fa-solid fa-table-columns"></i> Dashboard
                    </button>

                    <button 
                        type="button"
                        className={`nav-item ${activeSection === 'alunos' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('alunos')}
                    >
                        <i className="fas fa-users"></i> Alunos
                    </button>

                    <button 
                        type="button"
                        className={`nav-item ${activeSection === 'turmas' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('turmas')}
                    >
                        <i className="fas fa-chalkboard-teacher"></i> Turmas
                    </button>


                    <button 
                        type="button"
                        className={`nav-item ${activeSection === 'financeiro' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('financeiro')}
                    >
                        <i className="fas fa-money-bill-wave"></i> Financeiro
                    </button>

                </nav>

                <button
                    type="button"
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
                >
                    <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
                    {theme === "dark" ? "Modo claro" : "Modo escuro"}
                </button>

            </div>
            
            <button onClick={() => setMenuIsOpen(!menuIsOpen)} className="mobile-menu-btn" id="mobileMenuBtn">
                <i className="fas fa-bars"></i>
            </button>
        </>
    )
};