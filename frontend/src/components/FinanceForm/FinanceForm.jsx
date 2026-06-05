import "./financeForm.css";
import { useState } from "react";

export default function FinanceForm() {
    
    const [monthlyFeeType, setMonthlyFeeType] = useState("all");

    return(
        <form className="student-form">
            {/* Adicionar função que pesquisa os alunos disponíveis para enviar matrícula. Mostrar todos os alunos cadastrados*/}
            <h2>Gerar mensalidades</h2>
            <input
            className="monthly-fee-radio"
            type="radio"
            id="all-students"
            name="monthly-fee-type"
            checked={monthlyFeeType === "all"} 
            onChange={() => setMonthlyFeeType("all")}
            >
            </input>

            <label htmlFor="all-students">
                Todos os alunos ativos
            </label>

            <input
            className="monthly-fee-radio"
            type="radio"
            id="individual-student"
            name="monthly-fee-type"
            checked={monthlyFeeType === "individual"}
            onChange={() => setMonthlyFeeType("individual")}
            >
            </input>

            <label htmlFor="individual-student">
                Aluno específico
            </label>

            {monthlyFeeType === "individual" && (
                <input placeholder="Buscar aluno..."></input>
            )}
            
            <button type="submit">Gerar mensalidade(s)</button>
        </form>
    )
}