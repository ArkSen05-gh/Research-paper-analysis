import { useNavigate } from "react-router-dom";

function FeatureCard({ title, description, route }) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate(route)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "250px",
        cursor: "pointer",
        boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
      }}
    >

      <h3>{title}</h3>

      <p>{description}</p>

    </div>

  );
}

export default FeatureCard;