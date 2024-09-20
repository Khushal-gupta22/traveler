'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage: React.FC = () => {
  const router = useRouter()

  // Dummy user credentials
  const DUMMY_USER = {
    username: 'dummyuser',
    password: 'password123', // Dummy password
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      // Save the login state in localStorage or session
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/itinerary') // Redirect to the itinerary page after login
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="mb-2 rounded border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4 rounded border p-2"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogin} className="rounded bg-blue-500 px-4 py-2 text-white">
        Login
      </button>
    </div>
  )
}

export default LoginPage
