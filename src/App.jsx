import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Menu from './pages/Menu'
import { SidebarProvider } from './components/ui/sidebar'
import Settings from './pages/Settings'
import Stats from './pages/Stats'
import HistoricData from './pages/HistoricData'
import UsersList from './pages/UsersList'
import Doors from './pages/Doors'

  function App() {
    localStorage.setItem("url", "http://localhost:8080");
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
        <Route
          path='/users'
          element={
            <SidebarProvider>
              <UsersList />
            </SidebarProvider>
          }
        />
        <Route
          path='/doors'
          element={
            <SidebarProvider>
              <Doors />
            </SidebarProvider>
          }
        />
      </Routes>
    </BrowserRouter>
    )
  }

  export default App

