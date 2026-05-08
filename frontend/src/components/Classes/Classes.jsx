import "./classes.css";
export default function Classes() {
    return(
        <section id="classes">
            <div className="page-header">
                <h1><i className="fas fa-chalkboard-teacher"></i> Gerenciar Turmas</h1>
                <button className="btn-primary" id="novaTurmaBtn">
                    <i className="fas fa-plus"></i> Nova Turma
                </button>
            </div>
            <div className="classes-grid" id="classesGrid">

                {/* Turmas ainda serão inseridas */}
                <div className="class-card">

                    <div className="class-header">
                        <div className="class-info">
                            <h3>Turma 1</h3>
                            <p><strong>Professor:</strong> Fulano</p>
                        </div>
                        
                        <div className="class-stats">
                            <span className="status-badge">2 alunos</span>
                        </div>
                    </div>

                    <p><strong>Horário:</strong> 13h</p>
                    <div className="manage-container">
                        <button className="btn-manage">
                            Gerenciar
                        </button>
                    
                    </div>
                </div>
            </div>
        </section>
    )
}