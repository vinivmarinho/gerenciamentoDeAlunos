import "./form.css";
export default function Form() {

    return(
        <form className="student-form">
            <h2>Cadastrar novo aluno</h2>

            <label htmlFor="nome">Nome</label>
            <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite o nome do aluno"
                // value={student.nome}
                // onChange={handleChange}
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite o email do aluno"
                // value={student.email}
                // onChange={handleChange}
                required
            />

            <label htmlFor="turma">Turma</label>
            <input
                type="text"
                id="turma"
                name="turma"
                placeholder="Ex: 3A"
                // value={student.turma}
                // onChange={handleChange}
                required
            />

            <label htmlFor="status">Status</label>
            <select
                id="status"
                name="status"
                // value={student.status}
                // onChange={handleChange}
                required
            >
                <option >Ativo</option>
                <option >Inativo</option>
            </select>

            <button type="submit">Cadastrar aluno</button>
        </form>
    )
}
