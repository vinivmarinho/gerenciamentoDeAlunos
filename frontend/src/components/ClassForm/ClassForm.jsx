import "../Form/form.css";
import { useState } from "react";

export default function ClassForm({ createClass, setShowForm, onClose }) {
    const [name, setName] = useState("");
    const [teacher, setTeacher] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const ok = await createClass({
            name,
            teacher,
            students: [],
        });

        if (!ok) return;

        setName("");
        setTeacher("");
        setShowForm(false);
        onClose();
    }

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <h2>Cadastrar nova turma</h2>

            <label htmlFor="className">Nome da turma</label>
            <input
                type="text"
                id="className"
                name="className"
                placeholder="Ex: Turma de Inglês"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
            />

            <label htmlFor="teacher">Professor</label>
            <input
                type="text"
                id="teacher"
                name="teacher"
                placeholder="Digite o nome do professor"
                value={teacher}
                onChange={(event) => setTeacher(event.target.value)}
                required
            />

            <button type="submit">Cadastrar turma</button>
        </form>
    );
}
