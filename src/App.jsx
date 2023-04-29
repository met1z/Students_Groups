import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Students from '../src/Pages/Students/Students'
import Student from '../src/Pages/Student/Student'
import View from '../src/Pages/View/View'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Students />} />
        <Route path='/post/:id' element={<Student />} />
        <Route path='/view/:id' element={<View />} />
      </Routes>
    </div>
  )
}

export default App