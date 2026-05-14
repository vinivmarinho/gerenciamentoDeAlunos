import "./students.css";
import { useState } from "react";
import Form from "../Form/Form.jsx";
export default function Students() {
   const [showForm, setShowForm] = useState(false);

    return(
        <section id="students">
            <div className="page-header">
                <h1><i className="fas fa-users"></i> Gerenciar Alunos</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                    id="novoAlunoBtn"
                >
                    <i className="fas fa-plus"></i> Novo Aluno
                </button>
            </div>
            <div className="search-filter">
                <input type="text" id="searchAlunos" placeholder="Buscar aluno..."></input>
                <select id="filterStatus">
                    <option value="">Todos os Status</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Turma</th>
                            <th>Mensalidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="alunosTable">
                        {/* Dados do banco de dados serão inseridos aqui*/  }
                        
                    </tbody>
                </table>
            </div>
            {showForm && (
                /* Ao clicar fora do form, ele desaparece*/
                <div className="form-modal-backdrop" onClick={() => setShowForm(false)}>
                    {/* stopPropagation impede que ao clicar dentro do form ele desapareça */}
                    <div className="form-modal" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className="form-modal-close"
                            onClick={() => setShowForm(false)}
                            aria-label="Fechar formulario"
                        >
                            X
                        </button>
                        <Form />
                    </div>
                </div>
            )}
        </section>
    )
};
