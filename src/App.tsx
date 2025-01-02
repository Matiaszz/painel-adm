import { useState, useEffect } from "react";
import Icon from "./assets/file-icon.svg";
import "./App.css";

const postCommand = (command: string) => {
  fetch(`https://${GetParentResourceName()}/${command}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      console.log(`${command} enviado com sucesso`);
    })
    .catch((error) => {
      console.error(`Erro ao enviar comando ${command}:`, error);
    });
};

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
          <div>
            <button className="button1" onClick={() => postCommand("tptome")}>Teleport to Me</button>
            <button className="button1" onClick={() => postCommand("tpto")}>Teleport To</button>
            <button className="button1" onClick={() => postCommand("godarea")}>God Mode (Area)</button>
            <button className="button1" onClick={() => postCommand("godall")}>God Mode (All)</button>
            <button className="button1" onClick={() => postCommand("kick")}>Kick Player</button>
            <button className="button1" onClick={() => postCommand("ban")}>Ban Player</button>
            <button className="button1" onClick={() => postCommand("unban")}>Unban Player</button>
            <button className="button1" onClick={() => postCommand("mute")}>Mute Player</button>
            <button className="button1" onClick={() => postCommand("mutevoice")}>Mute Voice</button>
            <button className="button1" onClick={() => postCommand("desmute")}>Unmute</button>
            <button className="button1" onClick={() => postCommand("addmoney")}>Add Money</button>
            <button className="button1" onClick={() => postCommand("remmoney")}>Remove Money</button>
            <button className="button1" onClick={() => postCommand("addcar")}>Add Car</button>
            <button className="button1" onClick={() => postCommand("remcar")}>Remove Car</button>
          </div>
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
