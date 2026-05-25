import "../Form/form.css";
import "./classPanel.css";
import { useState, useEffect, useRef } from "react";

function getId(item) {
    if (!item) return null;
    if (typeof item === "string") return item;
    return item._id ?? item.id ?? null;
}

/* Pega a lista de alunos e transforma em um array só com IDs*/
function getInitialEnrolledIds(studentsList) {
    if (!Array.isArray(studentsList)) return []; // Se não for um array, retorna
    return studentsList.map(getId).filter(Boolean); // Executa função "getId" em cada aluno. filter remove os IDs inválidos
}

export default function ClassPanel({
    classGroup,
    students,
    onClose,
    updateClass,
    deleteClass,
}) {
    const classId = classGroup._id ?? classGroup.id;

    const [name, setName] = useState(classGroup.name ?? "");
    const [teacher, setTeacher] = useState(classGroup.teacher ?? "");
    const [enrolledIds, setEnrolledIds] = useState(() =>
        getInitialEnrolledIds(classGroup.students)
    );
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [saving, setSaving] = useState(false);

    const [addQuery, setAddQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const addStudentRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (addStudentRef.current && !addStudentRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* Lista de alunos que estão em uma turma*/
    const enrolledStudents = students.filter((student) =>
        enrolledIds.includes(getId(student))
    );
    /* Lista de alunos que ainda não estão em uma turma*/
    const availableStudents = students.filter(
        (student) => !enrolledIds.includes(getId(student))
    );

    const normalizedQuery = addQuery.trim().toLowerCase();
    
    /* Somente os alunos que ainda não estão em uma turma (availableStudents*/
    const suggestions = normalizedQuery
        ? availableStudents.filter((student) =>
              student.name.toLowerCase().includes(normalizedQuery)
          )
        : [];
    
    /* Remove aluno da lista de matrículados */
    function handleRemoveStudent(studentId) {
        setEnrolledIds((prev) => prev.filter((id) => id !== studentId));
    }

    function handleAddStudent(student) {
        const studentId = getId(student);
        if (!studentId || enrolledIds.includes(studentId)) return;

        setEnrolledIds((prev) => [...prev, studentId]);
        setAddQuery("");
        setShowSuggestions(false);
    }

    async function handleSave(event) {
        event.preventDefault();
        setSaving(true);

        const ok = await updateClass(classId, {
            name: name.trim(),
            teacher: teacher.trim(),
            students: enrolledIds,
        });

        setSaving(false);
        if (ok) onClose();
    }

    async function handleDeleteClass() {
        const ok = await deleteClass(classId);
        if (ok) {
            setShowDeleteConfirm(false);
            onClose();
        }
    }

    return (
        <>
            <div className="form-modal-backdrop" onClick={onClose}>
                <div
                    className="form-modal class-panel-modal"
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        className="form-modal-close"
                        onClick={onClose}
                    >
                        X
                    </button>

                    <form className="class-panel" onSubmit={handleSave}>
                        <div>
                            <h2>Painel da turma</h2>
                            <p className="class-panel-subtitle">
                                Gerencie alunos, nome e professor desta turma.
                            </p>
                        </div>

                        <section className="class-panel-section">
                            <h3>Dados da turma</h3>
                            <div className="class-panel-fields">
                                <label htmlFor="panelClassName">Nome da turma</label>
                                <input
                                    type="text"
                                    id="panelClassName"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />

                                <label htmlFor="panelTeacher">Professor</label>
                                <input
                                    type="text"
                                    id="panelTeacher"
                                    value={teacher}
                                    onChange={(event) => setTeacher(event.target.value)}
                                    required
                                />
                            </div>
                        </section>

                        <section className="class-panel-section">
                            <h3>Alunos matriculados ({enrolledStudents.length})</h3>
                            <div className="class-panel-students">
                                {enrolledStudents.length === 0 ? (
                                    <p className="class-panel-empty">
                                        Nenhum aluno nesta turma. Adicione abaixo.
                                    </p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th>Status</th>
                                                <th aria-label="Ações">Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {enrolledStudents.map((student) => {
                                                const studentId = getId(student);
                                                return (
                                                    <tr key={studentId}>
                                                        <td>{student.name}</td>
                                                        <td>{student.email}</td>
                                                        <td>
                                                            <span
                                                                className={`status-badge status-${student.status}`}
                                                            >
                                                                {student.status?.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="class-panel-remove-btn"
                                                                title="Remover da turma"
                                                                onClick={() =>
                                                                    handleRemoveStudent(studentId)
                                                                }
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </section>

                        <section className="class-panel-section">
                            <h3>Adicionar aluno</h3>
                            <div className="class-panel-add search-autocomplete" ref={addStudentRef}>
                                <input
                                    type="text"
                                    placeholder="Buscar aluno para adicionar..."
                                    value={addQuery}
                                    onChange={(event) => {
                                        setAddQuery(event.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    autoComplete="off"
                                    
                                />

                                {showSuggestions && suggestions.length > 0 && (
                                    <ul className="autocomplete-list" role="listbox">
                                        {suggestions.map((student) => {
                                            const studentId = getId(student);
                                            return (
                                                <li key={studentId} role="option">
                                                    <button
                                                        type="button"
                                                        className="autocomplete-item"
                                                        onClick={() => handleAddStudent(student)}
                                                    >
                                                        <span className="autocomplete-name">
                                                            {student.name}
                                                        </span>
                                                        <span className="autocomplete-meta">
                                                            {student.email}
                                                        </span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </section>

                        <div className="class-panel-actions">
                            <button
                                type="button"
                                className="class-panel-btn-delete"
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                Excluir turma
                            </button>

                            <div className="class-panel-actions-primary">
                                <button type="button" className="btn-cancel" onClick={onClose}>
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="class-panel-btn-save"
                                    disabled={saving}
                                >
                                    {saving ? "Salvando..." : "Salvar alterações"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {showDeleteConfirm && (
                <div
                    className="form-modal-backdrop"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <div
                        className="confirm-delete-card"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2>Excluir turma</h2>
                        <p>
                            Tem certeza de que deseja excluir a turma &quot;{name}&quot;?
                            Esta ação não pode ser desfeita.
                        </p>

                        <div className="confirm-delete-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn-danger"
                                onClick={handleDeleteClass}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
