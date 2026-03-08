import React, { useState } from "react";
import { analyzeTrends, uploadPaper } from "../services/api";
import Navbar from "../components/Navbar";

const TrendAnalysis: React.FC = () => {

    const [topic, setTopic] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        if (!topic && !file) {
            alert("Please enter a research topic or upload a PDF");
            return;
        }

        setLoading(true);

        try {

            let trendText = "";

            if (file) {

                const formData = new FormData();
                formData.append("file", file);

                const uploadRes = await uploadPaper(formData);

                trendText =
                    uploadRes?.data?.trend_analysis ||
                    uploadRes?.data?.trends ||
                    "No trend analysis returned.";

            } else {

                const res = await analyzeTrends({ topic });

                trendText =
                    res?.data?.trends ||
                    res?.data ||
                    "No trend analysis returned.";
            }

            setResult(trendText);

        } catch (error) {

            console.error("Trend analysis error:", error);
            setResult("Error analyzing research trends.");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="app-container">

            <Navbar />

            <main className="main-content">

                <div className="glass-card" style={{ maxWidth: "800px", margin: "0 auto" }}>

                    <h1 className="gradient-text">Trend Analysis</h1>

                    <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
                        Discover emerging research topics and future directions.
                    </p>

                    <div className="input-group">

                        <label style={{ color: "#cbd5e1" }}>Research Topic</label>

                        <input
                            type="text"
                            placeholder="Example: Sustainable Energy"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={!!file}
                            className="text-input"
                        />

                    </div>

                    <div style={{ marginBottom: "2rem" }}>

                        <label style={{ color: "#cbd5e1" }}>
                            OR Upload Manuscript (PDF)
                        </label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />

                        {file && (
                            <p style={{ color: "#4ade80", marginTop: "0.5rem" }}>
                                Selected: {file.name}
                            </p>
                        )}

                    </div>

                    <button
                        onClick={handleAnalyze}
                        className="btn btn-primary"
                        style={{ width: "100%", padding: "1rem" }}
                        disabled={loading}
                    >

                        {loading ? "Analyzing Trends..." : "Analyze Trends"}

                    </button>

                    {result && (

                        <div
                            className="glass-card"
                            style={{
                                marginTop: "2rem",
                                background: "rgba(59,130,246,0.05)"
                            }}
                        >

                            <h3 style={{ color: "#3b82f6" }}>
                                AI Trend Report
                            </h3>

                            <div
                                style={{
                                    whiteSpace: "pre-wrap",
                                    color: "#e2e8f0",
                                    lineHeight: "1.7"
                                }}
                            >

                                {result}

                            </div>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
};

export default TrendAnalysis;