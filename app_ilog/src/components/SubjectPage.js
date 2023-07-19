import React from 'react';

const SubjectPage = ({ handlePageChange }) => {
  // Construct the file path for the document to be downloaded
  const currentURL = window.location.href;
  const baseURL = currentURL.substring(0, currentURL.lastIndexOf('/') + 1);
  const filePath = `${baseURL}../file/2023 - Rattrapage Projet Ingénierie du logiciel ETUDIANT.docx`;

  // Function to handle the download of the document
  const handleDownload = () => {
    fetch(filePath)
      .then(response => response.blob())
      .then(blob => {
        const downloadURL = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'Sujet ILOG - Rattrapage.docx';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(downloadURL);
      })
      .catch(error => {
        console.error('An error occurred while downloading the file:', error);
      });
  };
  
  return (
    <div>
      <header className="header">
        <h1>Exam subject</h1>
      </header>
      <nav>
        <div className="button-container">
          <button onClick={() => handlePageChange('first')}>Stock</button>
          <button onClick={() => handlePageChange('third')}>Grid</button>
        </div>
      </nav>
      <div className="subject-container">
        <h2>Projet individuel</h2>
        <p>
          Il n’y a pas de projet cadrant, le but de ce rattrapage sera de laisser la latitude nécessaire à l’étudiant afin de démontrer ses compétences en ingénierie logicielle. Dans ce cadre, l’étudiant doit construire son propre projet avec le projet de son choix permettant de montrer les compétences avec quelques contraintes. Le projet doit être réalisé en langage JAVA avec l’IDE de votre choix, un dépôt git devra être exploité dans le cadre de ce projet.
        </p>
        <p>
          Eléments attendus dans ce projet :
        </p>
        <ul>
          <li>Programmation en JAVA avec l’IDE de votre choix</li>
          <li>Gestion des versions avec git</li>
          <li>Modularité</li>
          <li>Automatisation</li>
          <li>Tests unitaires</li>
          <li>Génération de documentation automatique</li>
          <li>Architecture logicielle propre</li>
          <li>Mise en place de quelques design pattern pertinents</li>
          <li>Exploitation de threads</li>
          <li>Mise en place d’une programmation fonctionnelle</li>
          <li>Résumé des bonnes pratiques de programmation adoptées</li>
        </ul>
        <p>
          Eléments évaluables :
        </p>
        <ul>
          <li>Présentation orale de 15 minutes incluant une démonstration de la solution proposée ;</li>
          <li>Document synthétique d’environ 15 à 20 pages expliquant le projet choisi et comment sa construction témoigne des éléments attendus, l’architecture de la solution, le déploiement des éléments attendus.</li>
        </ul>
        <p>
          Modalités de passage : remise document la veille de l’oral, date de l’oral à convenir avec l’étudiant
        </p>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default SubjectPage;
