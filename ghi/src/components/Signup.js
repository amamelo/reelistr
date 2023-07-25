import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Sign-up Successful!', data)
        navigate('/')
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setIsModalOpen(true);
      }

    } catch (error) {
      console.error('Error signing up:', error)
    }

  }
  const closeModal = () => {
    setIsModalOpen(false)
    setError('')
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <h1>Sign Up</h1>
      <br />
      <br />
      <br />

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Sign Up Failed"
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          }, content: {
            background: '#FF5F05',
            top: '300px',
            left: '150px',
            right: '150px',
            bottom: '300px',
            border: '1px solid #ccc',
          }
        }}
      >
        <h2>Sign Up Failed, IDIOT</h2>
        <p>{error}</p>
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  )
}
