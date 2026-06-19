import "./finance.css";
import { useState } from "react";
import FinanceForm from "../FinanceForm/FinanceForm.jsx";

export default function Finance({ students = [], generateMonthlyFees, createPayment, payments }) {
    const [showForm, setShowForm] = useState(false);

    return(
        <section id="finance">

            <div className="page-header">
                <h1><i className="fas fa-money-bill-wave"></i> Financeiro</h1>
                <button className="btn-primary" id="newPaymentBtn" onClick={() => setShowForm(true)}>
                    <i className="fas fa-plus"></i> Gerar Mensalidade
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
                        {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="empty-search">
                                        Nenhuma mensalidade encontrada
                                    </td>
                                </tr>
                            ) : payments.map(payment => {
                                const paymentId = payment._id ?? payment.id;

                                return(
                                    <tr key={paymentId}>
                                        <td>Nome do aluno</td>
                                        <td>{payment.referenceMonth}</td>
                                        <td>{payment.amount}</td>
                                        <td>{payment.status}</td>
                                        <td>{payment.dueDate}</td>
                                    </tr>
                                )
                            }) 
                            
                            }
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
                            
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <div className="form-modal-backdrop" onClick={() => setShowForm(false)}>
                    {/* stopPropagation impede que ao clicar dentro do form ele desapareça */}
                    <div className="form-modal" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className="form-modal-close"
                            aria-label="fechar formulário"
                            onClick={() => setShowForm(false)} 
                        >    
                        X
                        </button>
                        <FinanceForm students={students} generateMonthlyFees={generateMonthlyFees} createPayment={createPayment} setShowForm={setShowForm} />
                    </div>
                </div>
            )}
        </section>
    )
}