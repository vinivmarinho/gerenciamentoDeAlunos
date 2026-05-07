import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import SideBar from './components/SideBar/SideBar.jsx';
import Dashboard from './components/DashBoard/DashBoard.jsx';
import Students from './components/Students/Students.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <SideBar />
       <main className="main-content">
          <Students/>
       </main>
    </>
  )
}

export default App
