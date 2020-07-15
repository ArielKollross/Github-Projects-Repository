import React, { useState } from "react";
import api from './services/api';

import "./styles.css";


function App() {

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  async function handleSubmitNewRepository(event) {
    event.preventDefault();

    const techsSplit = techs.split(',');

    setTechs([techsSplit]);

    const dataForm = {
      title,
      url,
      techs,
    };

    try {
      await api.post('repositories', {
        title: dataForm.title,
        url: dataForm.url,
        techs: techsSplit,
      });

      alert('Neues Repository erstellt');
    } catch (error) {
      alert('Erro to submit data');
    }
  }

  return (
    <>
      <div id="pageContent">
        <div className="warp">
          <form onSubmit={handleSubmitNewRepository}>

            <h1>Registrierung von <strong>Repositories</strong></h1>
            <fieldset>
              <legend>
                <h2>Die informationen</h2>
              </legend>

              <div className="filedGroup">
                <div className="field">
                  <label htmlFor="name">Der Tiel</label>
                  <input
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="repositoryUrl">Verknüpfung</label>
                  <input type="url"
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="techs">Die Technologie</label>
                  <input type="text"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                  />
                </div>
                <button type="submit">senden</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
