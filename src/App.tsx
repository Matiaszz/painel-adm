import { useState, useEffect } from "react";
import Icon from "./assets/file-icon.svg";
import card from "./assets/person-vcard.svg";
import reload from "./assets/reload.svg";
import "./App.css";

const postCommand = (command: string): void => {
  fetch(`https://${GetParentResourceName()}/${command}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).catch((error) => {
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

function App(): JSX.Element {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [activeButton, setActiveButton] = useState<string>("tab1");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleButtonClick = (tab: string, buttonId: string): void => {
    setActiveTab(tab);
    setActiveButton(buttonId);
  };

  const handleNextPage = (): void =>
    setCurrentPage((prevPage) => prevPage + 1);

  const handlePreviousPage = (): void =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const paginatedData = sampleData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      if (event.data && event.data.action === "toggleMenu") {
        setMenuVisible((prev) => !prev);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isMenuVisible) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuVisible]);

  return (
    <div className={`container ${isMenuVisible ? "" : "hidden"}`} id="admin-painel">
      <div className="left">
        <Infos />
        {activeTab === "tab1" && (
          <LastCallsTable
            data={paginatedData}
            currentPage={currentPage}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            totalPages={Math.ceil(sampleData.length / itemsPerPage)}
          />
        )}
        {activeTab === "tab2" && <CommandButtons />}
        {activeTab === "tab3" && <Sets />}
        {activeTab === "tab4" && <ComingSoon />}
      </div>
      <Sidebar activeButton={activeButton} onButtonClick={handleButtonClick} />
    </div>
  );
}

function Infos(): JSX.Element {
  return (
    <div className="container-infos">
      <div className="infos item">
        <div className="name">Vitinmatanurolamentogiratorio</div>
        <div className="player-id">#402</div>
        <div className="role">CARGO</div>
        <div className="container-info-buttons">
          <button id="card-icon">
            <img className="card-icon" src={card} alt="card" />
          </button>
          <button id="reload-icon">
            <img className="reload-icon" src={reload} alt="reload" />
          </button>
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
  );
}

interface LastCallsTableProps {
  data: { name: string; time: string }[];
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  totalPages: number;
}

function LastCallsTable({
  data,
  currentPage,
  onPreviousPage,
  onNextPage,
  totalPages,
}: LastCallsTableProps): JSX.Element {
  return (
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
          {data.map((entry, index) => (
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
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

function CommandButtons(): JSX.Element {
  const commands = [
    "tptome",
    "tpto",
    "godarea",
    "godall",
    "kick",
    "ban",
    "unban",
    "mute",
    "mutevoice",
    "desmute",
    "addmoney",
    "remmoney",
    "addcar",
    "remcar",
  ];

  return (
    <div>
      {commands.map((cmd) => (
        <button className="button1" onClick={() => postCommand(cmd)} key={cmd}>
          {cmd}
        </button>
      ))}
    </div>
  );
}

interface SidebarProps {
  activeButton: string;
  onButtonClick: (tab: string, buttonId: string) => void;
}

function Sidebar({ activeButton, onButtonClick }: SidebarProps): JSX.Element {
  const tabs = ["tab1", "tab2", "tab3", "tab4"];
  const tooltips = ["Últimos chamados", "Comandos", "Setagem", "Coming soon"];
  return (
    <div className="right">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`aside-btn ${activeButton === tab ? "active" : ""}`}
          onClick={() => onButtonClick(tab, tab)}
        >
          <span className="tooltip">{tooltips[index]}</span>
          <img className="aside-img" src={Icon} alt="Icon" />
        </button>
      ))}
    </div>
  );
}

function Sets(): JSX.Element {
  return <div>Setagem</div>;
}

function ComingSoon(): JSX.Element {
  return <div>Coming soon</div>;
}

export default App;
