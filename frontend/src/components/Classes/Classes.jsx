import "./classes.css";
import { useState } from "react";
import ClassForm from "../ClassForm/ClassForm.jsx";

export default function Classes({ classes, loading, createClass }) {
    const [showForm, setShowForm] = useState(false);

    function onClose() {
        setShowForm(false);
    }

    return (
        <section id="classes">
            <div className="page-header">
                <h1><i className="fas fa-chalkboard-teacher"></i> Gerenciar Turmas</h1>
                <button
                    className="btn-primary"
                    id="novaTurmaBtn"
                    onClick={() => setShowForm(true)}
                >
                    <i className="fas fa-plus"></i> Nova Turma
                </button>
            </div>

            {loading ? (
                <div className="loading-card">
                    <p>Carregando as turmas... Aguarde alguns segundos.</p>
                </div>
            ) : (
                <div className="classes-grid" id="classesGrid">
                    {classes.length === 0 ? (
                        <p className="empty-classes">Nenhuma turma cadastrada.</p>
                    ) : (
                        classes.map((classGroup) => {
                            const classId = classGroup._id ?? classGroup.id;
                            const studentsCount = classGroup.students?.length ?? 0;

                            return (
                                <div className="class-card" key={classId}>
                                    <div className="class-header">
                                        <div className="class-info">
                                            <h3>{classGroup.name}</h3>
                                            <p><strong>Professor:</strong> {classGroup.teacher}</p>
                                        </div>

                                        <div className="class-stats">
                                            <span className="status-badge">
                                                {studentsCount} {studentsCount === 1 ? "aluno" : "alunos"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="manage-container">
                                        <button className="btn-manage" type="button">
                                            Gerenciar
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {showForm && (
                <div className="form-modal-backdrop" onClick={onClose}>
                    <div className="form-modal" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className="form-modal-close"
                            onClick={onClose}
                            aria-label="Fechar formulário"
                        >
                            X
                        </button>

                        <ClassForm
                            createClass={createClass}
                            setShowForm={setShowForm}
                            onClose={onClose}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
