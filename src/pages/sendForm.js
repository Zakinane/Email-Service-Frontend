import { useState } from "react";
import "./sendForm.css";

function SendForm() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const [anim, setAnim] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendForm = async (e) => {
    e.preventDefault();
    try {
      setAnim(true); // déclenche animation
      const res = await fetch(`${process.env.REACT_APP_API_URI}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Erreur : " + err.message);
    } finally {
      setTimeout(() => setAnim(false), 1500); // 1.5s
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div className="sendform-container">
        {/* Animation d'enveloppe */}
        <div className={`mail-animation ${anim ? "mail-fly" : ""}`}>📧</div>

        <h2>Envoyer un Mail</h2>
        <form onSubmit={handleSendForm}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Sujet"
          />
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Contenu"
          />
          <button type="submit">Envoyer</button>
        </form>
        {message && (
          <p style={{ color: message.includes("Erreur") ? "red" : "green" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default SendForm;
