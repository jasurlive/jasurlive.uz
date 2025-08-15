function Blogs() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <iframe
        src="https://jasurlive.blogspot.com/"
        title="Blogs"
        style={{
          width: "100%",
          height: "calc(100% - 60px)",
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></iframe>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60px",
          backgroundColor: "#fff",
          zIndex: 1,
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </div>
  );
}

export default Blogs;
