// components/LoginModal.tsx
'use client'
import { useState } from 'react'

interface LoginModalProps {
  onClose: () => void
  onLoginSuccess: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Dummy user credentials
  const DUMMY_USER = {
    username: 'dummyuser',
    password: 'password123',
  }

  const handleLogin = () => {
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      // Save login status in localStorage or session
      localStorage.setItem('isLoggedIn', 'true')
      onLoginSuccess()
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6">
        <div className="flex">
          <h2 className="mb-4 text-xl font-bold">Login</h2>
          <button onClick={onClose} className="ml-auto text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* display dummy username credentials */}
        <p className="text-sm text-gray-600">
          Username: {DUMMY_USER.username}, Password: {DUMMY_USER.password}
        </p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-2"
        />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="flex justify-between">
          <button onClick={handleLogin} className="rounded bg-blue-500 px-4 py-2 text-white">
            Login
          </button>
          <button onClick={onClose} className="rounded bg-gray-500 px-4 py-2 text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
