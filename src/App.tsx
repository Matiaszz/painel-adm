import { useState } from 'react';
import Icon from './assets/file-icon.svg';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [activeButton, setActiveButton] = useState('tab1');

  const handleButtonClick = (tab, buttonId) => {
    setActiveTab(tab);
    setActiveButton(buttonId);
  };

  return (
    <div className="container">

      <div className="left">

        <div className={activeTab === 'tab1' ? 'tab-content active' : 'tab-content'}>
          Ultimos chamados
        </div>

        <div className={activeTab === 'tab2' ? 'tab-content active' : 'tab-content'}>
          Comandos
        </div>

        <div className={activeTab === 'tab3' ? 'tab-content active' : 'tab-content'}>
          Setagem
        </div>

        <div className={activeTab === 'tab4' ? 'tab-content active' : 'tab-content'}>
          Coming soon
        </div>

      </div>


      <div className="right">
        <button
          className={`aside-btn ${activeButton === 'tab1' ? 'active' : ''}`}
          onClick={() => handleButtonClick('tab1', 'tab1')}
        >
          <span className='tooltip'>Últimos chamados</span>
          <img className='aside-img' src={Icon} alt="Icon" />
        </button>

        <button
          className={`aside-btn ${activeButton === 'tab2' ? 'active' : ''}`}
          onClick={() => handleButtonClick('tab2', 'tab2')}
        >
          <span className='tooltip'>Comandos</span>
          <img className='aside-img' src={Icon} alt="Icon" />
        </button>

        <button
          className={`aside-btn ${activeButton === 'tab3' ? 'active' : ''}`}
          onClick={() => handleButtonClick('tab3', 'tab3')}
        >
          <span className='tooltip'>Setagem</span>
          <img className='aside-img' src={Icon} alt="Icon" />
        </button>

        <button
          className={`aside-btn ${activeButton === 'tab4' ? 'active' : ''}`}
          onClick={() => handleButtonClick('tab4', 'tab4')}
        >
          <span className='tooltip'>Coming soon</span>
          <img className='aside-img' src={Icon} alt="Icon" />
        </button>
      </div>
    </div>
  );
}

export default App;
