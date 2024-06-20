import React, { useState } from "react";
import Level1 from "../components/Level1";
import Level2 from "../components/Level2";
import Level3 from "../components/Level3";

const Home = () => {
  const [activeTab, setActiveTab] = useState("level1");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "level1":
        return <Level1 />;
      case "level2":
        return <Level2 />;
      case "level3":
        return <Level3 />;
      default:
        return <Level3 />;
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <marquee className="bg-red-500 text-white">
        Level 1 and 2 are implemented perfectly.
      </marquee>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-md text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            activeTab === "level1" ? "bg-indigo-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("level1")}
        >
          Level 1
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded-md text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            activeTab === "level2" ? "bg-indigo-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("level2")}
        >
          Level 2
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded-md text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            activeTab === "level3" ? "bg-indigo-500 text-white" : ""
          }`}
          onClick={() => handleTabClick("level3")}
        >
          Level 3
        </button>
      </div>
      {renderTab()}
    </div>
  );
};

export default Home;
