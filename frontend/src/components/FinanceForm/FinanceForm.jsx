export default function FinanceForm() {
    /* Criar um form simples primeiramente*/
    /* Não gerar opções. Fazer um input que vai buscar algum aluno específico. Fazer um botão de submit pra gerar a mensalidade (individual ou coletiva). Se o usuário tiver colocado algum aluno no input, a mensalidade será gerada apenas para aquele aluno */
    /* O "form-modal-backdrop" e "form-modal" irão para o componente "Finance" futuramente. Eles irão cobrir o componente "FinanceForm" que será chamado por lá*/
    return(
        <div className="form-modal-backdrop">
            <div className="form-modal">
                <button 
                    type="button"
                    className="form-modal-close"
                    aria-label="fechar formulário"
                >
                    X
                </button>

                <form className="student-form">
                <label htmlFor="escolha">Procure um aluno para gerar matrícula individual</label>
                    {/* Adicionar função que pesquisa os alunos disponíveis para enviar matrícula. Mostrar todos os alunos cadastrados*/}
                    <input
                    type="text"
                    id="escolha"
                    name="Vermelho"
                    placeholder="Nome do aluno"
                    >
                    </input>
                
                <button type="submit">Gerar mensalidade(s)</button>
                </form>
            </div>
        </div>
    )
}