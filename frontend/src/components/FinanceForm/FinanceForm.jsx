import "./financeForm.css";
import { useState, useEffect, useRef } from "react";

export default function FinanceForm({ students = [] }) {
    const [monthlyFeeType, setMonthlyFeeType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const autoCompleteRef = useRef(null);

    const activeStudents = students.filter((student) => student.status === "ativo");

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
        setSelectedStudentId(student._id ?? student.id);
        setShowSuggestions(false);
    }

    function handleMonthlyFeeTypeChange(type) {
        setMonthlyFeeType(type);
        if (type === "all") {
            setSearchQuery("");
            setSelectedStudentId(null);
            setShowSuggestions(false);
        }
    }

    return(
        <form className="student-form">
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
                <div className="search-autocomplete" ref={autoCompleteRef}>
                    <input
                        type="text"
                        id="searchFinanceStudent"
                        placeholder="Buscar aluno..."
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setSelectedStudentId(null);
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
