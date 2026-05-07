import "./attendance.css";
export default function Attendance() {
    return(
        <section id="attendance" className="section">

            <div className="page-header">
                <h1><i className="fas fa-calendar-check"></i> Controle de Presença</h1>
            </div>

            <div className="attendance-filters">
                <select id="classAttendance">
                    <option value="">Selecione uma turma</option>
                </select>
                <input type="date" id="attendanceDate"></input>
                <button className="btn-primary" id="gerarPresenca">Gerar Presença</button>
            </div>

            <div className="attendance-table" id="attendanceTable">
                {/* Presenças ainda serão inseridas */ }
            </div>

        </section>
    )
};