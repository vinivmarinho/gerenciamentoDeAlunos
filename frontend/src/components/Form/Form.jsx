import "./form.css";
import { useState } from "react";

export default function Form({ createStudent, setShowForm }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [status, setStatus] = useState("ativo") // Status precisa ter valor inicial, senão o <select> fica sem opção selecionada

    async function handleSubmit(event) {
        event.preventDefault();

        const ok = await createStudent({
            name,
            email,
            monthlyFee,
            studentClass,
            status,
        });
        if (!ok) return;

        /* Reinicia os valores */
        setName("");
        setEmail("");
        setMonthlyFee("");
        setStudentClass("");
        setStatus("ativo");
        setShowForm(false);
    }

    return(
        <form className="student-form" onSubmit={handleSubmit}>
            <h2>Cadastrar novo aluno</h2>

            <label htmlFor="nome">Nome</label>
            <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite o nome do aluno"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite o email do aluno"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <label htmlFor="turma">Turma</label>
            <select
                id="turma"
                name="turma"
                value={studentClass}
                onChange={(event) => setStudentClass(event.target.value)}
                required
            >
                <option value="">Seleciona uma turma</option>
                <option value="Turma A">Turma A</option>
                <option value="Turma B">Turma B</option>
            </select>


            <label htmlFor="monthlyFee">Mensalidade</label>
            <input
                type="Number"
                id="monthlyFee"
                name="MonthlyFee"
                value={monthlyFee}
                onChange={(event) => setMonthlyFee(event.target.value)}
                required
            >
            </input>

            <label htmlFor="status">Status</label>
            <select
                id="status"
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                required
            >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>

            </select>

            <button type="submit">Cadastrar aluno</button>
        </form>
    )
}
