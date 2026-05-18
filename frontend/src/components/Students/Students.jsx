import "./students.css";
import { useState, useEffect } from "react";
import Form from "../Form/Form.jsx";
import { toast } from "react-toastify";

export default function Students() {
    const [showForm, setShowForm] = useState(false);
    const [students, setStudents] = useState([]);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [loading, setLoading] = useState(true);

   async function showStudents() {
        try{
            setLoading(true);
            const response = await fetch("https://gerenciamentodealunos.onrender.com/students");
            const data = await response.json();
            setStudents(data);
        } catch(error) {
            console.error(`Erro: ${error}`)
        } finally {
            setLoading(false);
        }
   }
   async function deleteStudent(id) {
        try {
            const response = await fetch(`https://gerenciamentodealunos.onrender.com/students/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Erro ao deletar o aluno");
            }

            await showStudents();
            setStudentToDelete(null);
            toast.success("Aluno(a) deletado com sucesso");
        } catch(error) {
            console.error(`Erro: ${error}`);
            toast.error("Não foi possível deletar o aluno");
        }
   }

   // Chama os dados ao abrir a página:
   useEffect(() => {
        async function loadStudents() {
            await showStudents();
        }

        loadStudents();
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
            {loading ? (
                <div className="loading-card">
                    <p>Carregando os alunos...</p>
                </div>
            ) : (
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Turma</th>
                            <th>Mensalidade</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="alunosTable">
                        {/* Dados do banco de dados serão inseridos aqui*/  }
                        
                        {students.map(student => {
                            // Usa "_id" (MongoDB). Se não existir, usa "id.""
                            const studentId = student._id ?? student.id;

                            return(
                                <tr key={studentId}>
                                    <td className="avatar">👤</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.studentClass}</td>
                                    <td>R$ {student.monthlyFee}</td>
                                    <td ><span className={`status-badge status-${student.status}`}>{student.status.toUpperCase()}</span></td>
                                    <td>
                                        <button className="action-btn action-edit" title="Editar">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="action-btn action-delete"
                                            title="Excluir"
                                            onClick={() => setStudentToDelete({ ...student, id: studentId })}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            )}
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
                        <Form showStudents={showStudents} setShowForm={setShowForm}/>
                    </div>
                </div>
            )}
            
            {studentToDelete && (
                <div className="confirm-modal-backdrop" onClick={() => setStudentToDelete(null)}>
                    <div className="confirm-delete-card" onClick={(event) => event.stopPropagation()}>
                        <h2>Excluir aluno</h2>
                        <p>
                            Tem certeza de que deseja excluir o(a) aluno(a) "{studentToDelete.name}"?
                        </p>
                        <div className="confirm-delete-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => setStudentToDelete(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn-danger"
                                onClick={() => deleteStudent(studentToDelete.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
};
