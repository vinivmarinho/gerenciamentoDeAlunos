import "./dashboard.css";
export default function Dashboard() {
    return(
         <section id="dashboard">
            <div class="page-header">
                <h1><i class="fas fa-chart-dashboard"></i> Dashboard</h1>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon total-alunos">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="totalAlunos">0</h3>
                        <p>Total de Alunos</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon receita-mensal">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="receitaMensal">R$ 0,00</h3>
                        <p>Receita Mensal</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon turmas">
                        <i class="fas fa-chalkboard"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="totalTurmas">0</h3>
                        <p>Total de Turmas</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon presencas">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="totalPresencas">0%</h3>
                        <p>Presença Média</p>
                    </div>
                </div>
            </div>
            <div class="charts-grid">
                <div class="chart-card">
                    <h3>Receita Mensal</h3>
                    <canvas id="receitaChart"></canvas>
                </div>
                <div class="chart-card">
                    <h3>Alunos por Turma</h3>
                    <canvas id="alunosChart"></canvas>
                </div>
            </div>
        </section>
    )
}