import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Form({ showStudents, showForm, setShowForm }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [status, setStatus] = useState("")

    async function createStudent(event) {
        // Impede o reload da página
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/students", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    monthlyFee: monthlyFee,
                    studentClass: studentClass,
                    status: status
                }),

                
            })
            /* Lista de alunos vindo de Students.jsx. Mostra todos os cadastrados na tela */
            await showStudents();

            setName("");
            setEmail("");
            setMonthlyFee("");
            setStudentClass("");
            
            toast.success("Aluno(a) cadastrado com sucesso✅");
            
            setShowForm(false); // Form desaparece
        } catch(error) {
            toast.error("Não foi possível cadastrar o aluno")
        }   
    } 

    return(
        <form className="student-form" onSubmit={createStudent}>
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
