import "./financeForm.css";
export default function FinanceForm() {
    /* O "form-modal-backdrop" e "form-modal" irão para o componente "Finance" futuramente. Eles irão cobrir o componente "FinanceForm" que será chamado por lá*/
    return(
        <form className="student-form">
            {/* Adicionar função que pesquisa os alunos disponíveis para enviar matrícula. Mostrar todos os alunos cadastrados*/}
            <input
            className="monthly-fee-radio"
            type="radio"
            id="all-students"
            name="monthly-fee-type"
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
            >
            </input>

            <label htmlFor="individual-student">
                Aluno específico
            </label>

            <button type="submit">Gerar mensalidade(s)</button>
        </form>
    )
}