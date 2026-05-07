import "./students.css";
export default function Students() {
    return(
        <section id="students" class="section">
            <div class="page-header">
                <h1><i class="fas fa-users"></i> Gerenciar Alunos</h1>
                <button class="btn-primary" id="novoAlunoBtn">
                    <i class="fas fa-plus"></i> Novo Aluno
                </button>
            </div>
            <div class="search-filter">
                <input type="text" id="searchAlunos" placeholder="Buscar aluno..."></input>
                <select id="filterStatus">
                    <option value="">Todos os Status</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Turma</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="alunosTable">
                        {/* Dados do banco de dados serão inseridos aqui*/  }
                    </tbody>
                </table>
            </div>
        </section>
    )
};