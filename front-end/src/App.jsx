import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import AuthForm from './pages/AuthForm/AuthForm'
import ProfilePage from './pages/ProfilePage/ProfilePage'

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  )
}