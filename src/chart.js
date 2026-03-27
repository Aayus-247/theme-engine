import React from "react";

function Chart({ clicks, scroll }) {
  return (
    <div>
      <h3>Stats</h3>
      <p>Clicks: {clicks}</p>
      <p>Scroll: {scroll}</p>
    </div>
  );
}

export default Chart;