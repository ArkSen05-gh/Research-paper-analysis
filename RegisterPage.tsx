import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const features = [
    "Literature Mining Agent",
    "Trend Analysis Agent",
    "Gap Identification Agent",
    "Methodology Design Agent",
    "Grant Writing Agent",
    "Plagiarism & Novelty Scoring Agent"
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simplified logic for UI showcase
    localStorage.setItem("user", JSON.stringify({ name: form.username }));
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-hero">
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Start Your <br /> Research Journey</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '3rem' }}>
          Join researchers worldwide who are accelerating <br /> discovery using AI
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#22c55e', borderRadius: '50%', padding: '2px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{ fontWeight: '500' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="auth-form-container">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ background: 'black', color: 'white', padding: '8px', borderRadius: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'black' }}>Research Assistant</span>
          </div>
          
          <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Join us and accelerate your research</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input required className="text-input" placeholder="James Williams" style={{ paddingLeft: '2.5rem', color: 'black' }} value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input required className="text-input" type="email" placeholder="you@example.com" style={{ paddingLeft: '2.5rem', color: 'black' }} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Role</label>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                 <span style={{ color: 'black' }}>Faculty</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input required className="text-input" type="password" placeholder="Minimum 6 characters" style={{ paddingLeft: '2.5rem', color: 'black' }} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', background: 'black', display: 'flex', gap: '0.5rem' }}>
              Create Account
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
            Already have an account? <Link to="/login" style={{ color: 'black', fontWeight: '600' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;