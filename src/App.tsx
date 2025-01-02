import { useState, useEffect } from "react";
import Icon from "./assets/file-icon.svg";
import './App.css'

function App() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [activeButton, setActiveButton] = useState<string>("tab1");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.action === "toggleMenu") {
        setMenuVisible((prev) => !prev);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuVisible) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuVisible]);

  const handleButtonClick = (tab: string, buttonId: string) => {
    setActiveTab(tab);
    setActiveButton(buttonId);
  };

  return (
    <div className={`container ${isMenuVisible ? "" : "hidden"}`} id="admin-painel">
      <div className="left">
        <div className={activeTab === "tab1" ? "tab-content active" : "tab-content"}>
          Últimos chamados
        </div>
        <div className={activeTab === "tab2" ? "tab-content active" : "tab-content"}>
          Comandos
        </div>
        <div className={activeTab === "tab3" ? "tab-content active" : "tab-content"}>
          Setagem
        </div>
        <div className={activeTab === "tab4" ? "tab-content active" : "tab-content"}>
          Coming soon
        </div>
      </div>

      <div className="right">
        {["tab1", "tab2", "tab3", "tab4"].map((tab, index) => (
          <button
            key={tab}
            className={`aside-btn ${activeButton === tab ? "active" : ""}`}
            onClick={() => handleButtonClick(tab, tab)}
          >
            <span className="tooltip">
              {index === 0
                ? "Últimos chamados"
                : index === 1
                  ? "Comandos"
                  : index === 2
                    ? "Setagem"
                    : "Coming soon"}
            </span>
            <img className="aside-img" src={Icon} alt="Icon" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
