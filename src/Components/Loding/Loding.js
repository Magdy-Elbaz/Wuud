import "./loding.css";

export default function Loding({ action, color }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${!action && "spinner-countiner"}`}
    >
      <div
        className="spinner"
        style={{
          width: !action ? "50px" : "20px",
          height: !action ? "50px" : "20px",
          borderColor: color || "#e1b070",
        }}
      ></div>
    </div>
  );
}
