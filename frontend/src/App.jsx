/* useCallBack => Memoriza a função para evitar recriações a cada renderização de um componente */
import { useState, useCallback, useEffect } from 'react'
import './App.css';
import SideBar from './components/SideBar/SideBar.jsx';
import MobileNav from './components/MobileNav/MobileNav.jsx';
import Dashboard from './components/DashBoard/DashBoard.jsx';
import Students from './components/Students/Students.jsx';
import Classes from './components/Classes/Classes.jsx';
import Attendance from './components/Attendance/Attendance.jsx';
import Finance from './components/Finance/Finance.jsx';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://gerenciamentodealunos.onrender.com/students";

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const showStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(`Erro: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudent = useCallback(async (studentData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o aluno");
      }

      await showStudents();
      toast.success("Aluno(a) cadastrado com sucesso✅");
      return true;
    } catch {
      toast.error("Não foi possível cadastrar o aluno");
      return false;
    }
  }, [showStudents]);


  const deleteStudent = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o aluno");
      }

      await showStudents();
      toast.success("Aluno(a) deletado com sucesso");
      return true;
    } catch (error) {
      console.error(`Erro: ${error}`);
      toast.error("Não foi possível deletar o aluno");
      return false;
    }
  }, [showStudents]);

  /* Sempre que a seção ativa for "alunos", a função "showStudents" é chamada  */
  useEffect(() => {
    if (activeSection === 'alunos') {
      showStudents();
    }
  }, [activeSection, showStudents]);

  // Função usa switch case para controlar o componente que irá aparecer na tela
  const renderComponent = () => {
    // Sempre que o state "activeSection" mudar, ele é chamado
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'alunos':
        return (
          <Students
            students={students}
            loading={loading}
            createStudent={createStudent}
            deleteStudent={deleteStudent}
          />
        );
      case 'turmas':
        return <Classes />;
      case 'presenca':
        return <Attendance />;
      case 'financeiro':
        return <Finance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
        <ToastContainer />
        {/* SideBar controla a mudança do state */}
       <SideBar activeSection={activeSection} setActiveSection={setActiveSection} />
       <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} />
       <main className="main-content">
          {renderComponent()}
       </main>
    </>
  )
}

export default App
