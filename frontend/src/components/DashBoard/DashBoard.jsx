import "./dashboard.css";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default function Dashboard() {
    // useRef => Hook usado para criar uma referência que guarda um valor entre renderizações
    // Obs: Alterar o valor da ref não faz o componente re-renderizar, diferente do useState
    // Obs: Referência ao elemento canvas onde o Chart.js desenha o gráfico
    const revenueChartRef = useRef(null);
    const studentsChartRef = useRef(null);

    // Obs: Armazenam as instâncias dos gráficos criados pelo Chart.js
    const revenueChartInstance = useRef(null);
    const studentsChartInstance = useRef(null);

    // Inicializa os gráficos
    const initCharts = () => {
        // Se canvas (área de desenho do HTML) existir
        if (revenueChartRef.current) {
            // destrói gráfico antigo pelo track local
            if (revenueChartInstance.current) {
                revenueChartInstance.current.destroy();
                revenueChartInstance.current = null;
            }

            // destrói gráfico antigo anexado ao canvas, se existir
            const existingRevenueChart = Chart.getChart(revenueChartRef.current);
            if (existingRevenueChart) {
                existingRevenueChart.destroy();
            }

            const ctx1 = revenueChartRef.current.getContext("2d"); // Permite usar o canvas em 2 dimensões
            // Criando o gráfico

            revenueChartInstance.current = new Chart(ctx1, {
                type: "line",
                data:{
                    labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
                    datasets: [{
                        label: "Receita Mensal",
                        data: [2500, 3200, 2800, 3800, 4200],
                        borderColor: "rgb(34, 197, 94)",
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        tension: 0.4
                    }]
                },

                options: {
                    responsive: true,
                    plugins: {legend: { display: false} },
                    scales: {
                        y:{ beginAtZero: true }
                    }
                }
            });
        }

        if (studentsChartRef.current) {
            const ctx2 = studentsChartRef.current.getContext("2d");
            // destrói gráfico antigo
            if (studentsChartInstance.current) {
                studentsChartInstance.current.destroy();
                studentsChartInstance.current = null;
            }

            const existingStudentsChart = Chart.getChart(studentsChartRef.current);
            if (existingStudentsChart) {
                existingStudentsChart.destroy();
            }

            studentsChartInstance.current = new Chart(ctx2, {
                type: "doughnut",
                data: {
                    labels: ['Turma A', "Turma B"],
                    datasets: [{
                        data: [25, 30],
                        backgroundColor: ['#3b82f6', '#10b981']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: "bottom" }}
                }
            });
        }
    }

    // Executa quando o componente é criado
    useEffect(() => {
        initCharts();

        return () => {
            if (revenueChartInstance.current) {
                revenueChartInstance.current.destroy();
                revenueChartInstance.current = null;
            }
            if (studentsChartInstance.current) {
                studentsChartInstance.current.destroy();
                studentsChartInstance.current = null;
            }
        };
    }, []);


    return(
         <section id="dashboard">
            <div className="page-header">
                <h1><i className="fas fa-chart-dashboard"></i> Dashboard</h1>
            </div>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total-alunos">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3 id="totalAlunos">2</h3>
                        <p>Total de Alunos</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon receita-mensal">
                        <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="stat-info">
                        <h3 id="receitaMensal">R$ 2500</h3>
                        <p>Receita Mensal</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon turmas">
                        <i className="fas fa-chalkboard"></i>
                    </div>
                    <div className="stat-info">
                        <h3 id="totalTurmas">0</h3>
                        <p>Total de Turmas</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon presencas">
                        <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="stat-info">
                        <h3 id="totalPresencas">0%</h3>
                        <p>Presença Média</p>
                    </div>
                </div>
            </div>
            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Receita Mensal</h3>
                    <canvas ref={revenueChartRef} id="revenueChart"></canvas>
                </div>
                <div className="chart-card">
                    <h3>Alunos por Turma</h3>
                    <canvas ref={studentsChartRef} id="alunosChart"></canvas>
                </div>
            </div>
        </section>
    )
}