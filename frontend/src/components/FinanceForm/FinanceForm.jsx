import "./financeForm.css";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function FinanceForm({ students = [], generateMonthlyFees, createPayment, setShowForm, deletePayment }) {
    const [monthlyFeeType, setMonthlyFeeType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const autoCompleteRef = useRef(null);

    const activeStudents = students.filter((student) => student.status === "ativo");

    /* Verifica clique fora do formulário */
    useEffect(() => {
        function handleClickOutside(event) {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const suggestions = normalizedQuery
        ? activeStudents.filter((student) => student.name.toLowerCase().includes(normalizedQuery))
        : [];
    
    function handleSelectSuggestion(student) {
        setSearchQuery(student.name);
        setSelectedStudent(student);
        setShowSuggestions(false);
    }

    function handleMonthlyFeeTypeChange(type) {
        setMonthlyFeeType(type);
        if (type === "all") {
            setSearchQuery("");
            setSelectedStudent(null);
            setShowSuggestions(false);
        }
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        if (monthlyFeeType === "all") {
            const ok = await generateMonthlyFees();
            if (!ok) return;
        } else if (monthlyFeeType === "individual") {
            if (!selectedStudent) {
                toast.error("Selecione um aluno da lista");
                return;
            }

            const paymentData = {
                student: selectedStudent._id ?? selectedStudent.id,
                amount: Number(selectedStudent.monthlyFee),
                dueDay: 10,
                status: "Pendente",
            };

            const ok = await createPayment(paymentData);
            if (!ok) return;
        }
        setShowForm(false);
    };
    
    return(
        <form className="student-form" onSubmit={handleSubmit}>
            <h2>Gerar mensalidades</h2>
            <input
            className="monthly-fee-radio"
            type="radio"
            id="all-students"
            name="monthly-fee-type"
            checked={monthlyFeeType === "all"}
            onChange={() => handleMonthlyFeeTypeChange("all")}
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
            onChange={() => handleMonthlyFeeTypeChange("individual")}
            >
            </input>

            <label htmlFor="individual-student">
                Aluno específico
            </label>

            {monthlyFeeType === "individual" && (
                <div className="search-autocomplete finance-autocomplete" ref={autoCompleteRef}>
                    <input
                        type="text"
                        id="searchFinanceStudent"
                        placeholder="Buscar aluno..."
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setSelectedStudent(null);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        autoComplete="off"
                        aria-autocomplete="list"
                        aria-expanded={showSuggestions && suggestions.length > 0}
                        aria-controls="searchFinanceStudentSuggestions"
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <ul
                            id="searchFinanceStudentSuggestions"
                            className="autocomplete-list"
                            role="listbox"
                        >
                            {suggestions.map((student) => {
                                const studentId = student._id ?? student.id;
                                return (
                                    <li key={studentId} role="option">
                                        <button
                                            type="button"
                                            className="autocomplete-item"
                                            onClick={() => handleSelectSuggestion(student)}
                                        >
                                            <span className="autocomplete-name">{student.name}</span>
                                            <span className="autocomplete-meta">{student.email}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}

            <button type="submit">Gerar mensalidade(s)</button>
        </form>
    )
}

