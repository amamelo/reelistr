import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import '../css/styles.css'

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
            <div className="mb-3" >
              <label htmlFor="username">Username</label>
              <input className="form-control" placeholder="username" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3" >
              <label htmlFor="password">Password</label>
              <input className="form-control" placeholder="password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-control" placeholder="email" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div>
          <ReactModal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Sign Up Failed"
            style={{
              overlay: {
                position: 'fixed',
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
              }, content: {
                position: 'absolute',
                background: '#7393B3',
                top: '300px',
                left: '300px',
                right: '300px',
                bottom: '300px',
                border: '1px solid #ccc',
                borderRadius: '10px'
              }
            }}>
            <h2>Uh-Oh! Sign Up Failed. </h2>
            <p>{error}</p>
            <button onClick={closeModal}>Close</button>
          </ReactModal>
        </div>
      </div>
    </div>
  )
}
