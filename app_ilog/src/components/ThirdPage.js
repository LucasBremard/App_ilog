import React, { useState } from 'react';

const ThirdPage = ({ handlePageChange }) => {
  // État pour stocker les valeurs sélectionnées
  const [selectedValues, setSelectedValues] = useState({
    architecture: 0,
    evolutivity: 0,
    unitTests: 0,
    programmingTechniques: 0,
    projectRelevance: 0,
    presentationQuality: 0,
  });

  // État pour stocker l'état des cases à cocher
  const [checkboxStates, setCheckboxStates] = useState({
    architecture: false,
    evolutivity: false,
    unitTests: false,
    programmingTechniques: false,
    projectRelevance: false,
    presentationQuality: false,
  });

  // Fonction de gestion du changement de sélection
  const handleSelectChange = (fieldName, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: parseInt(value, 10),
    }));
  };

  // Fonction de gestion du changement des cases à cocher
  const handleCheckboxChange = (fieldName) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [fieldName]: !prevStates[fieldName],
    }));
  };

  // Calcul de la note finale en additionnant toutes les valeurs sélectionnées
  const finalNote = Object.values(selectedValues).reduce((sum, value) => sum + value, 0);

  return (
    <div style={{ textAlign: 'center' }}>
    <header className="header">
      <h1>Scoring grid</h1>
      </header>
      <nav>
      <div className="button-container">
        <button onClick={() => handlePageChange('first')}>Stock</button>
        <button onClick={() => handlePageChange('second')}>Subject</button>
        </div>
      </nav>
      <div className="table-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <table style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Eléments de notation</th>
              <th>Note</th>
              <th>Validé</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Architecture logicielle et Design Pattern (4 points)</td>
              <td>
                <select
                  value={selectedValues.architecture}
                  onChange={(e) => handleSelectChange('architecture', e.target.value)}
                  disabled={checkboxStates.architecture}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates.architecture}
                  onChange={() => handleCheckboxChange('architecture')}
                />
              </td>
            </tr>
            <tr>
              <td>Evolutivité du logiciel (git) (3 points)</td>
              <td>
                <select
                  value={selectedValues.evolutivity}
                  onChange={(e) => handleSelectChange('evolutivity', e.target.value)}
                  disabled={checkboxStates.evolutivity}
                >
                  {Array.from({ length: 4 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates.evolutivity}
                  onChange={() => handleCheckboxChange('evolutivity')}
                />
              </td>
            </tr>
            <tr>
              <td>Tests unitaires (3 points)</td>
              <td>
                <select
                  value={selectedValues.unitTests}
                  onChange={(e) => handleSelectChange('unitTests', e.target.value)}
                  disabled={checkboxStates.unitTests}
                >
                  {Array.from({ length: 4 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates.unitTests}
                  onChange={() => handleCheckboxChange('unitTests')}
                />
              </td>
            </tr>
            <tr>
              <td>Mise en place de techniques de programmation avancée (4 points)</td>
              <td>
                <select
                  value={selectedValues.programmingTechniques}
                  onChange={(e) => handleSelectChange('programmingTechniques', e.target.value)}
                  disabled={checkboxStates.programmingTechniques}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates.programmingTechniques}
                  onChange={() => handleCheckboxChange('programmingTechniques')}
                />
              </td>
            </tr>
            <tr>
              <td>Pertinence du projet choisi (2 points)</td>
              <td>
                <select
                  value={selectedValues.projectRelevance}
                  onChange={(e) => handleSelectChange('projectRelevance', e.target.value)}
                  disabled={checkboxStates.projectRelevance}
                >
                  {Array.from({ length: 3 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates.projectRelevance}
                  onChange={() => handleCheckboxChange('projectRelevance')}
                />
              </td>
            </tr>
            <tr>
              <td>Qualité de la présentation et démonstration (4 points)</td>
              <td>
                <select
                  value={selectedValues.presentationQuality}
                  onChange={(e) => handleSelectChange('presentationQuality', e.target.value)}
                  disabled={checkboxStates.presentationQuality}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates.presentationQuality}
                  onChange={() => handleCheckboxChange('presentationQuality')}
                />
              </td>
            </tr>
            <tr>
              <td>Note finale</td>
              <td>
                <select value={finalNote} disabled>
                  {Array.from({ length: 21 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </td>
              <td>/ 20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThirdPage;
