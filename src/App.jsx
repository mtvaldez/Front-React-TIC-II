import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Menu from './pages/Menu'
import { SidebarProvider } from './components/ui/sidebar'
import Settings from './pages/Settings'
import Stats from './pages/Stats'
import HistoricData from './pages/HistoricData'

  function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/menu'
          element={
            <SidebarProvider>
              <Menu />
            </SidebarProvider>
          }
        />
        <Route
          path='/historic'
          element={
            <SidebarProvider>
              <HistoricData />
            </SidebarProvider>
          }
        />
        <Route
          path='/stats'
          element={
            <SidebarProvider>
              <Stats />
            </SidebarProvider>
          }
        />
        <Route
          path='/settings'
          element={
            <SidebarProvider>
              <Settings />
            </SidebarProvider>
          }
        />
      </Routes>
    </BrowserRouter>
    )
  }

  export default App

