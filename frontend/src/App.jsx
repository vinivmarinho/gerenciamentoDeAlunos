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
import { getTotalMonthlyFees, getActiveStudentsPercentage, getActiveStudents, getStudentsCountByShift } from './utils/students.js';
import useTheme from './hooks/useTheme.js';

const API_URL = "https://gerenciamentodealunos.onrender.com/students";
const API_URL_classes = "https://gerenciamentodealunos.onrender.com/classes";
const API_URL_payments = "https://gerenciamentodealunos.onrender.com/payments";

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalMonthlyFees = getTotalMonthlyFees(students);
  const activeStudentsPercentage = getActiveStudentsPercentage(students);
  const activeStudents = getActiveStudents(students);
  const shifts = getStudentsCountByShift(students);
  const { theme, toggleTheme } = useTheme();

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

  const updateStudent = useCallback(async (id, studentData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar o aluno");
      }

      await showStudents();
      toast.success("Aluno(a) atualizado com sucesso");
      return true;
    } catch {
      toast.error("Não foi possível atualizar o aluno");
      return false;
    }
  }, [showStudents]);

  /* Carrega alunos no dashboard, alunos, turmas e financeiro */
  useEffect(() => {
    if (activeSection === 'alunos' || activeSection === 'dashboard' || activeSection === 'financeiro') {
      showStudents();
    }
  }, [activeSection, showStudents]);


  // Estados de "turma"
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  

  const showClasses = useCallback(async () => {
    try {
      setLoadingClasses(true);
      const response = await fetch(API_URL_classes);
      const data = await response.json();
      setClasses(data);
    } catch(error) {
      console.error(`Erro: ${error}`);
    } finally {
      setLoadingClasses(false);
    }
  }, []);

  const createClass = useCallback(async (classData) => {
    try{
      const response = await fetch(API_URL_classes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(classData),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar a turma");
      }

      await showClasses();
      toast.success("Turma cadastrada com sucesso✅");
      return true;
    } catch(error) {
      toast.error("Não foi possível cadastrar a turma");
      return false;
    }
  }, [showClasses]);

  const updateClass = useCallback(async (id, classData) => {
    try {
      const response = await fetch(`${API_URL_classes}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar a turma");
      }

      await showClasses();
      toast.success("Turma atualizada com sucesso");
      return true;
    } catch (error) {
      console.error(`Erro: ${error}`);
      toast.error("Não foi possível atualizar a turma");
      return false;
    }
  }, [showClasses]);

  const deleteClass = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL_classes}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar a turma");
      }

      await showClasses();
      toast.success("Turma excluída com sucesso");
      return true;
    } catch (error) {
      console.error(`Erro: ${error}`);
      toast.error("Não foi possível excluir a turma");
      return false;
    }
  }, [showClasses]);

  // Quando entrar na seção "Turmas"
  useEffect(() => {
    if (activeSection === "turmas") {
      showClasses();
      showStudents();
    }
  }, [activeSection, showClasses, showStudents]);
  
  const generateMonthlyFees = useCallback(async () => {
      try {
        const response = await fetch(`${API_URL_payments}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            dueDay: 10,
          }),
        });
        const data = await response.json();
        toast.success("Mensalidades geradas com sucesso✅");
        return true;
      } catch(error) {
          toast.error("Não foi possível gerar as mensalidades");
          return false;
      }
  }, []) 

  const createPayment = useCallback(async (paymentData) => {
    try {
      const response = await fetch(API_URL_payments, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) {
        throw new Error("Erro ao gerar mensalidade");
      }
      await response.json();
      toast.success("Mensalidade gerada com sucesso✅");
      return true;
    } catch(error) {
      toast.error("Não foi possível gerar a mensalidade");
      return false;
    }
  }, [])
  // Função usa switch case para controlar o componente que irá aparecer na tela
  const renderComponent = () => {
    // Sempre que o state "activeSection" mudar, ele é chamado
    switch(activeSection) {
      case 'dashboard':
        return (
          <Dashboard
            totalMonthlyFees={totalMonthlyFees}
            studentsCount={students.length}
            activeStudentsPercentage={activeStudentsPercentage}
            activeStudents={activeStudents}
            shifts={shifts}
          />
        );
      case 'alunos':
        return (
          <Students
            students={students}
            loading={loading}
            createStudent={createStudent}
            deleteStudent={deleteStudent}
            updateStudent={updateStudent}
          />
        );
      case 'turmas':
        return (
          <Classes
            classes={classes}
            loading={loadingClasses}
            students={students}
            loadingStudents={loading}
            createClass={createClass}
            updateClass={updateClass}
            deleteClass={deleteClass}
          />
        );
      case 'presenca':
        return <Attendance />;
      case 'financeiro':
        return <Finance students={students} generateMonthlyFees={generateMonthlyFees} createPayment={createPayment} />;
      default:
        return (
          <Dashboard
            totalMonthlyFees={totalMonthlyFees}
            studentsCount={students.length}
            activeStudentsPercentage={activeStudentsPercentage}
            activeStudents={activeStudents}
            shifts={shifts}
          />
        );
    }
  };


  return (
    <>
        <ToastContainer theme={theme} />
        {/* SideBar controla a mudança do state */}
       <SideBar
         activeSection={activeSection}
         setActiveSection={setActiveSection}
         theme={theme}
         toggleTheme={toggleTheme}
       />
       <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} />
       <main className="main-content">
          {renderComponent()}
       </main>
    </>
  )
}

export default App
