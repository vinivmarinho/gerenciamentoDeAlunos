import { useState } from 'react'
import './App.css';
import SideBar from './components/SideBar/SideBar.jsx';
import Dashboard from './components/DashBoard/DashBoard.jsx';
import Students from './components/Students/Students.jsx';
import Classes from './components/Classes/Classes.jsx';
import Attendance from './components/Attendance/Attendance.jsx';
import Finance from './components/Finance/Finance.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderComponent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'alunos':
        return <Students />;
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
       <SideBar activeSection={activeSection} setActiveSection={setActiveSection} />
       <main className="main-content">
          {renderComponent()}
       </main>
    </>
  )
}

export default App
