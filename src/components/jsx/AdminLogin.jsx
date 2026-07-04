import { useState } from 'react'
import '../css/AdminLogin.css'

function AdminLogin({ onLogin, error }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ id, password })
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Use admin / admin123 to log in.</p>
        {error && <div className="admin-login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Admin ID
            <input
              type="text"
              value={id}
              onChange={(event) => setId(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  )
}

export default AdminLogin
