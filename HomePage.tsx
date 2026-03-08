import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="hero-section">
        <div className="badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z"/></svg>
          AI-Powered Academic Research Assistant Platform
        </div>
        <h1 className="hero-title">
          AI-Powered Academic Research <br /> Assistant and Grant <br /> Proposal Generator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          Literature Mining, Gap Identification, Methodology Design, and <br /> Grant Writing — effortlessly.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Get Started Free</Link>
          <Link to="/login" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Sign In</Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
