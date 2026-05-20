import "./students.css";
// useRef: guarda referência ao DOM do campo de busca (usado para detectar clique fora)
import { useState, useEffect, useRef } from "react";
import Form from "../Form/Form.jsx";
export default function Students({ students, loading, createStudent, deleteStudent }) {

    const [showForm, setShowForm] = useState(false);

    const [studentToDelete, setStudentToDelete] = useState(null);

    // Texto de "Buscar aluno"
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    // Controla se a lista de sugestões (dropdown) está visível
    const [showSuggestions, setShowSuggestions] = useState(false);
    // Aponta para o div que envolve input + dropdown (para fechar ao clicar fora)
    const autoCompleteRef = useRef(null);

   async function handleDeleteStudent(id) {
        const ok = await deleteStudent(id);
        if (ok) {
            setStudentToDelete(null);
        }
   }

   // Fecha o dropdown de sugestões quando o usuário clica em qualquer lugar fora do campo de busca
   useEffect(() => {
        function handleClickOutside(event) {
            /* Se o elemento "autoComplete" existir e o clique acontece fora dele */
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        /* Quando houver cliques do mouse, executa "handleClickOutside" */
        document.addEventListener("mousedown", handleClickOutside);
        /* Remove o listener quando o componente desmontar */
        return () => document.removeEventListener("mousedown", handleClickOutside);

   }, []);

   // Normaliza o texto da busca (sem espaços extras, tudo minúsculo) para comparar nomes sem erro de maiúscula
   const normalizedQuery = searchQuery.trim().toLowerCase();
   
   // Lista exibida no autocomplete: alunos cujo nome contém o que foi digitado
   const suggestions = normalizedQuery ? students.filter((student) => student.name.toLowerCase().includes(normalizedQuery)) : [];

   // Alunos que aparecem na tabela: filtrados por nome digitado E por status selecionado
   const filteredStudents = students.filter((student) => {
        const matchesName = normalizedQuery === "" ? true : student.name.toLowerCase().includes(normalizedQuery);
        const matchesStatus = statusFilter === "" ? true : student.status === statusFilter;
        return matchesName && matchesStatus;
   });

   // Ao clicar em uma sugestão, preenche o input com o nome completo e esconde o dropdown
   function handleSelectSuggestion(name) {
        setSearchQuery(name);
        setShowSuggestions(false);
   }

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
                {/* Container do input + dropdown; ref permite detectar clique fora */}
                <div className="search-autocomplete" ref={autoCompleteRef}>
                    {/* Input controlado: value vem do React (searchQuery), não do DOM sozinho */}
                    <input
                        type="text"
                        id="searchAlunos"
                        placeholder="Buscar aluno..."
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setShowSuggestions(true); // mostra sugestões enquanto digita
                        }}

                        onFocus={() => setShowSuggestions(true)} // reabre sugestões ao focar de novo
                        autoComplete="off" // evita sugestões nativas do navegador sobrepondo as nossas
                        aria-autocomplete="list"
                        aria-expanded={showSuggestions && suggestions.length > 0}
                        aria-controls="searchAlunosSuggestions"
                    />

                    {/* Dropdown: só aparece se há texto na busca e existem alunos correspondentes */}
                    {showSuggestions && suggestions.length > 0 && (

                        <ul
                            id="searchAlunosSuggestions"
                            className="autocomplete-list"
                            role="listbox"
                        >
                        {suggestions.map((student) => {
                            const studentId = student._id ?? student.id;
                            return (
                                <li key={studentId} role="option">
                                    <button
                                        type="button"
                                        className="autocomplete-item"
                                        onClick={() => handleSelectSuggestion(student.name)}
                                    >
                                        <span className="autocomplete-name">{student.name}</span>
                                        <span className="autocomplete-meta">{student.email}</span>
                                    </button>
                                </li>

                            );
                            })}
                        </ul>
                    )}
                </div>

                {/* Select controlado: value ligado ao statusFilter para filtrar a tabela junto com a busca */}

                <select
                    id="filterStatus"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <option value="">Todos os Status</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            
            
            {loading ? (
                <div className="loading-card">
                    <p>Carregando os alunos... Aguarde alguns segundos.</p>
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

                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="empty-search">
                                    Nenhum aluno encontrado.
                                </td>
                            </tr>
                        ) : filteredStudents.map(student => {
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
        
                        <Form createStudent={createStudent} setShowForm={setShowForm}/>
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
                                onClick={() => handleDeleteStudent(studentToDelete.id)}
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

