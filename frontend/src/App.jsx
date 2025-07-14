import React from 'react'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
const App = () => {
  return (
    <div>
      <Dashboard />
      <Toaster/>
    </div>
  )
}

export default App