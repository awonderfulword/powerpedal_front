import MyLayout from './components/MyLayout'
import {Routes, Route} from 'react-router-dom'
import StudentType from './pages/StudentType'
import StudentList from './pages/StudentList'
import ClassType from './pages/ClassType'
import ClassList from './pages/ClassList'
import CourseMenu from './pages/CourseMenu'

function App() {

  return (
    <>
     <MyLayout>
      <Routes>
        <Route path='student_menu/student_type' element={<StudentType />}/>
        <Route path='student_menu/student_list' element={<StudentList />}/>
        <Route path='class_menu/class_type' element={<ClassType />}/>
        <Route path='class_menu/class_list' element={<ClassList />}/>
        <Route path='course_menu' element={<CourseMenu />}/>
      </Routes>
     </MyLayout>
    </>
  )
}

export default App
