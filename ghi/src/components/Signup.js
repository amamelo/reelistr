import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e, baseUrl) => {
    e.preventDefault()
    try {
      const response = await fetch(`${baseUrl}/api/accounts`, {
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
    <div className='container mt-5 pt-5'>
      <div className="row my-5">
        {error && <p>{error}</p>}
        <div className="offset-3 col-6">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="form-floating mb-3" >
              <input className="form-control" placeholder="username" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3" >
              <input className="form-control" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
            </div>
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
            <h2>Uh-Oh! Sign Up Failed. </h2>
            <p>{error}</p>
            <button onClick={closeModal}>Close</button>
          </ReactModal>
        </div>
      </div>
    </div>
  )
}
