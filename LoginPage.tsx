import React, { useState, useContext, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  if (!authContext) return null;
  const { login } = authContext;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email: form.email, name: 'Faculty Member' });
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
      <div className="auth-hero" style={{ padding: '6rem' }}>
        <h1 style={{ fontSize: '4.5rem', lineHeight: 1, marginBottom: '2rem' }}>Welcome <br /> Back</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '500px' }}>
          Accelerate your research workflow with our multi-agent intelligence framework.
        </p>
      </div>
      
      <div className="auth-form-container">
        <div style={{ width: '100%', maxWidth: '360px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ background: 'black', color: 'white', padding: '8px', borderRadius: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'black' }}>Research Assistant</span>
          </div>

          <h2 style={{ color: 'black', fontSize: '1.75rem', marginBottom: '2rem' }}>Sign In</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input 
                required 
                className="text-input" 
                type="email" 
                placeholder="you@university.edu" 
                style={{ color: 'black' }}
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>
            
            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label className="input-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" style={{ fontSize: '0.75rem', color: '#6366f1' }}>Forgot password?</a>
              </div>
              <input 
                required 
                className="text-input" 
                type="password" 
                placeholder="••••••••" 
                style={{ color: 'black' }}
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', background: 'black', marginTop: '1rem' }}>
              Sign In
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b', fontSize: '0.875rem' }}>
            Don't have an account? <Link to="/register" style={{ color: '#6366f1', fontWeight: '600' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;