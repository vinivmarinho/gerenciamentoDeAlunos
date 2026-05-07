import "./classes.css";
export default function Classes() {
    return(
        <section id="turmas" class="section">
            <div class="page-header">
                <h1><i class="fas fa-chalkboard-teacher"></i> Gerenciar Turmas</h1>
                <button class="btn-primary" id="novaTurmaBtn">
                    <i class="fas fa-plus"></i> Nova Turma
                </button>
            </div>
            <div class="classes-grid" id="classesGrid">
                {/* Turmas ainda serão inseridas */}
            </div>
        </section>
    )
}