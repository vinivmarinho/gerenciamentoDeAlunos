import "./students.css";
import { useState, useEffect } from "react";
import Form from "../Form/Form.jsx";
export default function Students() {
   const [showForm, setShowForm] = useState(false);
    const [students, setStudents] = useState([]);

   async function showStudents() {
        try{
            const response = await fetch("http://localhost:3000/students");
            const data = await response.json();
            setStudents(data);
        } catch(error) {
            console.error(`Erro: ${error}`)
        }
   }
   // Chama os dados ao abrir a página:
   useEffect(() => {
    showStudents();
   }, []);

    return(
        <section id="students">
            <div className="page-header">
                {/* O "onClick" aqui está Testando a manipulação dos dados vindo do backend */}
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
                        
                        {students.map(student => {
                            return(
                                <tr key={student.id}>
                                    <td className="avatar">👤</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.studentClass}</td>
                                    <td>R$ {student.monthlyFee}</td>
                                </tr>
                            )
                        })}

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
