import { useState, useEffect } from "react";
import Icon from "./assets/file-icon.svg";
import card from './assets/person-vcard.svg';
import reload from './assets/reload.svg';
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
    })
    .catch((error) => {
      console.error(`Erro ao enviar comando ${command}:`, error);
    });
};

const sampleData = [
  { name: "VIT1NN VYSE CORE #411", time: "19:52" },
  { name: "VIT1NN VYSE CORE #412", time: "19:52" },
  { name: "VIT1NN VYSE CORE #413", time: "19:52" },
  { name: "VIT1NN VYSE CORE #414", time: "19:52" },
  { name: "VIT1NN VYSE CORE #415", time: "19:52" },
  { name: "VIT1NN VYSE CORE #416", time: "19:52" },
  { name: "VIT1NN VYSE CORE #417", time: "19:52" },
  { name: "VIT1NN VYSE CORE #4188", time: "19:52" },
  { name: "VIT1NN VYSE CORE #41854", time: "19:52" },
  { name: "VIT1NN VYSE CORE #41547", time: "19:52" },
  { name: "VIT1NN VYSE CORE #411", time: "19:52" },
  { name: "VIT1NN VYSE CORE #41457", time: "19:52" },
];

const itemsPerPage = 5;

function App() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [activeButton, setActiveButton] = useState<string>("tab1");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleButtonClick = (tab: string, buttonId: string) => {
    setActiveTab(tab);
    setActiveButton(buttonId);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedData = sampleData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <div className={`container ${isMenuVisible ? "" : "hidden"}`} id="admin-painel">
      <div className="left">
        <div className="container-infos">
          <div className="infos item">
            <div className="name">
              Vitinmatanurolamentogiratorio
            </div>
            <div className="player-id">#402</div>
            <div className="role">
              CARGO
            </div>
            <div className="container-info-buttons">
              <button id="card-icon"><img className="card-icon" src={card} alt="card" /></button>
              <button id="reload-icon"><img className="reload-icon" src={reload} alt="reload" /></button>
            </div>
          </div>
          <div className="item">
            <h1 className="item-title">ONLINE</h1>
            <p>1500</p>
          </div>
          <div className="item">
            <h1 className="item-title">BANIDOS</h1>
            <p>1500</p>
          </div>
          <div className="item">
            <h1>CHAMADOS</h1>
            <p>1500</p>
          </div>
        </div>
        <div className={activeTab === "tab1" ? "tab-content active" : "tab-content"}>
          <div className="container-last-calls">
            <div className="table-container">
              <div className="table-header">
                <span className="header-title">ÚLTIMOS CHAMADOS</span>
                <input className="search-bar" type="text" placeholder="Pesquisar" />
              </div>

              <div className="table">
                <div className="table-row header-row">
                  <div className="column">Nome & ID</div>
                  <div className="column">Horário</div>
                  <div className="column">Ações</div>
                </div>
                {paginatedData.map((entry, index) => (
                  <div className="table-row" key={index}>
                    <div className="column">{entry.name}</div>
                    <div className="column">{entry.time}</div>
                    <div className="column actions">
                      <button className="action-button">ABRIR MOTIVO</button>
                      <button className="action-button">PUXAR</button>
                      <button className="action-button">TELEPORTAR</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Paginator */}
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {Math.ceil(sampleData.length / itemsPerPage)}
              </span>
              <button
                className="pagination-button"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(sampleData.length / itemsPerPage)}
              >
                Próxima
              </button>
            </div>
          </div>
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
                  : index === 2 ? "Setagem"
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