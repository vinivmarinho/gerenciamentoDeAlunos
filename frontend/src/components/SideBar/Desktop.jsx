import "./desktop.css"
export default function SideBar() {
    return(
        <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
            <h2><i className="fas fa-graduation-cap"></i> Gestão Alunos</h2>
        </div>
        <nav className="sidebar-nav">
            <a href="#dashboard" className="nav-item active" data-section="dashboard">
                <i className="fa-solid fa-table-columns"></i> Dashboard
            </a>
            <a href="#alunos" className="nav-item" data-section="alunos">
                <i className="fas fa-users"></i> Alunos
            </a>
            <a href="#turmas" className="nav-item" data-section="turmas">
                <i className="fas fa-chalkboard-teacher"></i> Turmas
            </a>
            <a href="#presenca" className="nav-item" data-section="presenca">
                <i className="fas fa-calendar-check"></i> Presença
            </a>
            <a href="#financeiro" className="nav-item" data-section="financeiro">
                <i className="fas fa-money-bill-wave"></i> Financeiro
            </a>
        </nav>
    </div>
    )
};