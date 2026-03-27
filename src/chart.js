import React from "react";

function Chart({ clicks, scroll }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Behavior Stats</h3>
      <p>Clicks: {clicks}</p>
      <p>Scroll: {scroll}px</p>

      {/* Simple visual bars */}
      <div style={{ background: "#ccc", height: "10px", width: "100%" }}>
        <div
          style={{
            background: "blue",
            width: `${clicks * 5}px`,
            height: "10px"
          }}
        ></div>
      </div>

      <div style={{ background: "#ccc", height: "10px", width: "100%", marginTop: "5px" }}>
        <div
          style={{
            background: "green",
            width: `${scroll / 5}px`,
            height: "10px"
          }}
        ></div>
      </div>
    </div>
  );
}

export default Chart;