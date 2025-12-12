export default function Loading() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Loading Countries...</h1>
      <p>please wait! while we fetch the list of countries</p>
      <div
        style={{
          border: "4px solid rgba(0,0,0,.1)",
          borderLeftColor: "#0070f3",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          animation: "spin is linear infinite",
          margin: "20px auto",
        }}
      ></div>
    </div>
  );
}
