import "../Form/form.css";

export default function PaymentEditForm() {
    return(
        <form className="student-form">
            <h2>Editar pagamento</h2>
            <label htmlFor="paymentStatus">Status da mensalidade</label>
            <select
                id="paymentStatus"
                name="paymentStatus"
                required
            >
                <option value="">Pendente</option>
                <option value="">Pago</option>
                <option value="">Atrasado</option>
            </select>
            <label htmlFor="dueDate">Data de vencimento</label>
            <input
                id="dueDate"
                type="number"
                min="1"
                max="31"
            >
            </input>

            <button type="submit">Confirmar</button>
        </form>
    )
}