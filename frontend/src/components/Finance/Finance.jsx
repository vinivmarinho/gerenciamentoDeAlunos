import "./finance.css";
import { useState } from "react";
import FinanceForm from "../FinanceForm/FinanceForm.jsx";

export default function Finance({ students = [], generateMonthlyFees, createPayment, payments, deletePayment }) {
    const [showForm, setShowForm] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);

    async function handleDeletePayment(id) {
        const ok = await deletePayment(id);
        if (ok) {
            setPaymentToDelete(null)
        };
    };

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
                                // Id do aluno relacionado ao pagamento
                                const studentId = payment.student?._id ?? payment.student;
                                //  Procura no array de alunos um aluno que tenha esse mesmo ID
                                const student = students.find(
                                    (s) => (s._id ?? s.id) === studentId
                                );
                                // Se aluno existir, pega o nome. Senão, mostra "Aluno não encontrado"
                                const studentName = student?.name ?? "Aluno não encontrado";

                                return(
                                    <tr key={paymentId}>
                                        <td>{studentName}</td>
                                        <td>{payment.referenceMonth}</td>
                                        <td>R$ {payment.amount}</td>
                                        <td>{payment.status}</td>
                                        <td>Dia {new Date(payment.dueDate).getDate() + 1 }</td>
                                        <td>
                                            <button className="action-btn action-edit" title="Editar"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="action-btn action-delete" title="excluir"
                                            /* O spread (...) copia todos os dados de payment*/
                                            onClick={() => setPaymentToDelete({ ...payment, id:paymentId})}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
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
                        <FinanceForm students={students} generateMonthlyFees={generateMonthlyFees} createPayment={createPayment} setShowForm={setShowForm} deletePayment={deletePayment} />
                    </div>
                </div>
            )}

            {paymentToDelete && (
                <div className="confirm-modal-backdrop" onClick={() => setPaymentToDelete(null)}>
                    <div className="confirm-delete-card" onClick={(event) => event.stopPropagation()}>
                        <h2>Excluir pagamento</h2>
                        <p>
                            Tem certeza de que deseja excluir este pagamento?
                        </p>

                        <div className="confirm-delete-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => setPaymentToDelete(null)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn-danger"
                                onClick={() => handleDeletePayment(paymentToDelete.id)}
                            >
                                Excluir
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}