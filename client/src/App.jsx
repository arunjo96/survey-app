import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { SocketProvider } from './context/SocketProvider.jsx'
import { Toaster } from "react-hot-toast";
import Register from './pages/Register.jsx'

function App() {

  return (
    <>
      <SocketProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </SocketProvider>
    </>
  );
}

export default App
