export default function Footer({ isDark }) {
  return (
    <>
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: isDark ? '1px solid #0f172a' : '1px solid #e2e8f0',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          fontSize: '0.75rem',
          color: isDark ? '#94a3b8' : '#64748b',
          transition: 'color 0.2s ease, border-color 0.2s ease'
        }}
      >
        <div className="footer-container">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Logic Ten Electrical Pty Ltd. All rights reserved.
          </p>
          <p style={{ margin: 0 }}>
            Licence: <span style={{ color: isDark ? '#facc15' : '#eab308', fontWeight: 700 }}>497422C</span> | ABN: <span style={{ color: isDark ? '#cbd5e1' : '#334155', fontWeight: 700 }}>28 613 872 183</span>
          </p>
        </div>
      </footer>

      {/* CSS-in-JS for Responsive Layout */}
      <style jsx global>{`
        .footer-container {
          max-width: 80rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .footer-container {
            flex-direction: row;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
    </>
  );
}