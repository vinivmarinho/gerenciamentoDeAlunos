import "./mobilenav.css"; 
export default function MobileNav({ activeSection, setActiveSection }) {
    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    return (
        <nav className="mobile-bottom-nav">
            <button
                type="button"
                className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
            >
                <i className="fa-solid fa-table-columns"></i>
                <span>Dashboard</span>
            </button>

            <button
                type="button"
                className={`nav-item ${activeSection === 'alunos' ? 'active' : ''}`}
                onClick={() => handleNavClick('alunos')}
            >
                <i className="fas fa-users"></i>
                <span>Alunos</span>
            </button>

            <button
                type="button"
                className={`nav-item ${activeSection === 'turmas' ? 'active' : ''}`}
                onClick={() => handleNavClick('turmas')}
            >
                <i className="fas fa-chalkboard-teacher"></i>
                <span>Turmas</span>
            </button>

            <button
                type="button"
                className={`nav-item ${activeSection === 'presenca' ? 'active' : ''}`}
                onClick={() => handleNavClick('presenca')}
            >
                <i className="fas fa-calendar-check"></i>
                <span>Presença</span>
            </button>
            
            <button
                type="button"
                className={`nav-item ${activeSection === 'financeiro' ? 'active' : ''}`}
                onClick={() => handleNavClick('financeiro')}
            >
                <i className="fas fa-money-bill-wave"></i>
                <span>Financeiro</span>
            </button>
        </nav>
    );
}