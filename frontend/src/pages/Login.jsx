import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../JS/feature/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error, loading } = useSelector((state) => state.auth || {});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      navigate('/profile');
    }
  };

  return (
    <div className="app-auth-wrapper">
      <div className="app-auth-card">
        <p className="app-auth-kicker">ClearSpace access</p>
        <h2 className="app-brand">Sign in</h2>
        <Form className="app-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="app-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              Use the email connected to your account.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="app-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3 app-checkbox" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button className="app-button" variant="primary" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : 'Log In'}
          </Button>
          {error && <div className="text-danger mt-2">{error}</div>}
          {success && <div className="text-success mt-2">{success}</div>}
          <div className="app-signup-note">Don't have an account? <a href="/register">Sign up</a></div>
        </Form>
      </div>
    </div>
  );
}

export default Login;