import "./finance.css";
export default function Finance() {
    return(
        <section id="finance" className="section">

            <div className="page-header">
                <h1><i className="fas fa-money-bill-wave"></i> Financeiro</h1>
                <button className="btn-primary" id="newPaymentBtn">
                    <i className="fas fa-plus"></i> Novo Pagamento
                </button>
            </div>

            <div className="finance-tabs">
                <button className="tab-btn active" data-tab="monthlyFees">Mensalidades</button>
                <button className="tab-btn" data-tab="historico">Histórico</button>
            </div>

            <div className="tab-content">

                <div id="monthlyFees" className="tab-pane active">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Aluno</th>
                                <th>Mês/Ano</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Vencimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="monthlyFeesTable">
                           {/* Dados Futuros */}
                        </tbody>
                    </table>
                </div>

                <div id="history" className="tab-pane">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Aluno</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody id="historicoTable">
                            {/* Dados futuros */}
                        </tbody>
                    </table>
                </div>

            </div>

        </section>
    )
}