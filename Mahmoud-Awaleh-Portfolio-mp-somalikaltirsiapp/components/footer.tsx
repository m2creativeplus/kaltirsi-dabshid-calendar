const Footer = () => {
  return (
    <footer
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        color: "#888",
        padding: "15px 10px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        backgroundColor: "transparent",
      }}
    >
      <span>Eng. Mahmoud Mohamed Awaleh · Strategic Architect ·</span>
      <a
        href="https://m2awaleh.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1E90FF", textDecoration: "none", margin: "0 4px" }}
      >
        Bogga Shaqada
      </a>
      <a
        href="https://linkedin.com/in/mahmoudawaleh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        style={{ color: "#1E90FF", fontSize: 16, margin: "0 4px" }}
      >
        🔗
      </a>
      <a
        href="https://behance.net/mahmoudawaleh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Behance"
        style={{ color: "#1E90FF", fontSize: 16, margin: "0 4px" }}
      >
        🎨
      </a>
      <a
        href="https://instagram.com/m2awaleh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        style={{ color: "#1E90FF", fontSize: 16, margin: "0 4px" }}
      >
        📷
      </a>
      <a
        href="https://facebook.com/mahmoud.awaleh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        style={{ color: "#1E90FF", fontSize: 16, margin: "0 4px" }}
      >
        📘
      </a>
    </footer>
  )
}

export default Footer
