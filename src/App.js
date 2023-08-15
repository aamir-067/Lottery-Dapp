import React, { useState } from 'react';
import './App.css';

function App() {
  const [managerView, setManagerView] = useState(false);
  const [winner, setWinner] = useState('');

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Lottery Application</h1>
        </header>

        <section className="section">
          <h2>Participants' View</h2>
          <p className="paragraph">Current Participants: 999</p>
          <p className="paragraph">Lottery Prize: 99</p>
          {winner && <p className="winner">Winner: 0x000</p>}
          <button className="button" onClick={() => setManagerView(!managerView)} >
            Toggle Manager View
          </button>
        </section>

        {!managerView && !winner && (
          <section className="section">
            <h2>Join the Lottery</h2>
            <input
              className="input"
              type="text"
              placeholder="Your Name"
            />
            <button className="button" >
              Participate
            </button>
          </section>
        )}

        {managerView && (
          <section className="section manager-view">
            <h2>Manager's View</h2>
            <p className="paragraph">Lottery Prize: 999</p>
            <button className="button" >Declare Winner</button>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
