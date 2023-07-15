import { useState } from "react";
import "./switchtab.scss";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);

    onTabChange(tab, index);
  };

  return (
    <div className="switching-tabs">
      <div className="tab-items">
        {data.map((tab, i) => (
          <span
            key={i}
            className={`tab-item ${selectedTab === i ? "active" : ""}`}
            onClick={() => activeTab(tab, i)}
          >
            {tab}
          </span>
        ))}
        <span className="moving-bg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTab;
