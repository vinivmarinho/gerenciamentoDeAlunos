import "./form.css";
import { useState, useEffect } from "react";

export default function Form({ createStudent, updateStudent, studentToUpdate,setShowForm, onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [studentShift, setStudentShift] = useState("");
    const [status, setStatus] = useState("ativo") // Status precisa ter valor inicial, senão o <select> fica sem opção selecionada

    async function handleSubmit(event) {
        event.preventDefault();
        const studentData = { name, email, monthlyFee, studentShift, status };

        let ok;
        if (studentToUpdate) {
            ok = await updateStudent(studentToUpdate.id, studentData);
            if (!ok) return;
            onClose();
        } else {
            const ok = await createStudent({
                name,
                email,
                monthlyFee: Number(monthlyFee),
                studentShift,
                status,
            });
            if (!ok) return;
    
            /* Reinicia os valores */
            setName("");
            setEmail("");
            setMonthlyFee("");
            setStudentShift("");
            setStatus("ativo");
            setShowForm(false);
            onClose();
        }
        
    }
    // É chamada sempre que "studentToUpdate" existir
    // "??" retorna o valor da direita caso o da esquerda seja null ou undefined
    useEffect(() => {
        if (!studentToUpdate) return;
        setName(studentToUpdate.name ?? "");
        setEmail(studentToUpdate.email ?? "");
        setMonthlyFee(studentToUpdate.monthlyFee ?? "");
        setStudentShift(studentToUpdate.studentShift ?? "");
        setStatus(studentToUpdate.status ?? "ativo");
    }, [studentToUpdate])

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

            <label htmlFor="studentShift">Turno</label>
            <select
                id="studentShift"
                name="studentShift"
                value={studentShift}
                onChange={(event) => setStudentShift(event.target.value)}
                required
            >
                <option value="">Seleciona o turno</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Noturno">Noturno</option>
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
