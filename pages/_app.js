import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
        padding: "20px",
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}
