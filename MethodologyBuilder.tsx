import React, { useState } from "react";
import { buildMethodology, uploadPaper } from "../services/api";
import Navbar from "../components/Navbar";

const MethodologyBuilder: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateMethodology = async () => {
    setLoading(true);
    try {
      let data;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await uploadPaper(formData);
        data = uploadRes.data.methodology;
      } else {
        if (!topic) {
          alert("Please enter a research topic or upload a file");
          setLoading(false);
          return;
        }
        const res = await buildMethodology({ topic });
        data = res.data;
      }
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Error generating methodology");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="gradient-text">Methodology Design</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            Generate structured experimental designs, identification of baselines, and evaluation metrics for your research project.
          </p>

          <div className="input-group">
            <label className="input-label" style={{ color: '#cbd5e1' }}>Research Topic or Problem Statement</label>
            <textarea
              placeholder="Describe your research area..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="text-input"
              disabled={!!file}
              style={{ 
                minHeight: '100px', 
                background: 'rgba(255,255,255,0.05)', 
                color: 'white', 
                borderColor: 'var(--border)',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>OR Upload Manuscript (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ color: '#94a3b8' }}
            />
          </div>

          <button 
            onClick={generateMethodology} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? "Generating Blueprint..." : "Generate Methodology Blueprint"}
          </button>

          {result && (
            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#a855f7' }}>Recommended Datasets</h3>
                <ul style={{ color: '#e2e8f0' }}>
                  {result.datasets?.map((d: string, i: number) => <li key={i}>{d}</li>)}
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#a855f7' }}>SOTA Models & Baselines</h3>
                <ul style={{ color: '#e2e8f0' }}>
                  {result.baselines?.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#a855f7' }}>Evaluation Metrics</h3>
                <ul style={{ color: '#e2e8f0' }}>
                  {result.metrics?.map((m: string, i: number) => <li key={i}>{m}</li>)}
                </ul>
              </div>

              <div>
                <h3 style={{ color: '#a855f7' }}>Proposed Workflow</h3>
                <p style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>{result.workflow}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MethodologyBuilder;