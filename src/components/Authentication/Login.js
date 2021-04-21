import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const history = useHistory()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [loggedIn, setLogging] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      setIsLogging(true)
      setLogging("You are logged In")
      history.push("/")
    } catch (e) {
      setError('Failed to sign in!')
      setIsLogging(false)
      setLogging("Failure, retry!!!")
    }
    setLoading(false)
  }

  return (
    <>
    <br></br>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {isLogging && <Alert variant="success">{loggedIn}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
        <br></br>
            <Button disabled={loading} className="w-100" type="submit">
             Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Do not have an account? <Link to="/signup">Sign Up!</Link>
      </div>
    </>
  )
}