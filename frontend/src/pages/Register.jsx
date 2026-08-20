import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register } from '../JS/feature/authSlice';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error, loading } = useSelector((state) => state.auth || {});
  const [formData, setFormData] = useState({
    name: '',
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
    const resultAction = await dispatch(register(formData));

    if (register.fulfilled.match(resultAction)) {
      navigate('/profile');
    }
    
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="app-auth-wrapper">
      <div className="app-auth-card">
        <p className="app-auth-kicker">Join ClearSpace</p>
        <h2 className="app-brand">Create account</h2>
        <Form className="app-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="app-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
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
              Use a valid email so you can sign in later.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3 app-checkbox">
            <Form.Check type="checkbox" label="Agree to terms" />
          </Form.Group>

          <Button className="app-button" variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>

          {error && <div className="text-danger mt-2">{error}</div>}
          {success && <div className="text-success mt-2">{success}</div>}

          <div className="app-signup-note">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;