import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";

// http://localhost:3000/students (método POST)
export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [studentClass, setStudentClass] = useState("")


    async function createStudent(event) {
        // Impede que a página recarregue
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
                    studentClass: studentClass
                }),

                
            })
            setName("");
            setEmail("");
            setMonthlyFee("");
            setStudentClass("");

            toast.success("Aluno(a) cadastrado com sucesso✅")

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
            <input
                type="text"
                id="turma"
                name="turma"
                placeholder="Ex: 3A"
                value={studentClass}
                onChange={(event) => setStudentClass(event.target.value)}
                required
            />

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

        

            <button type="submit">Cadastrar aluno</button>
        </form>
    )
}
