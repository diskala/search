import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'

const TousLesPays = () => {
  const [motCle, setMotCle] = useState('');
  const [resultats, setResultats] = useState([]);

  const formulaire = (e) => {
    
    setMotCle(e.target.value);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        
        if (response.status === 200) {
          const data = response.data;
          
          // Filtrer les pays qui contiennent le mot-clé dans leur nom ou leurs informations
          const resultatsFiltres = data.filter(
            (pays) =>
             
            pays.translations.fra.common.toLowerCase().includes(motCle.toLowerCase()) 
             
           
          );

          setResultats(resultatsFiltres);
         
        } else {
          console.error(`Erreur lors de la requête à l'API: ${response.status}`);
        }
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API', error);
      }
    };

    // Appeler fetchData lorsque le mot-clé change
    fetchData();
  }, [motCle]); // Déclencher l'effet lorsque motCle change

  return (
    <div id="container_tousPays">
        <form action="" >
          <fieldset>
            <legend>Formulaire de Recherche</legend>
          <input
        type="text"
        value={motCle}
        
        onChange={formulaire}
        placeholder="Recherche par mot-clé"
      />
        <button type="submit">Search</button>

          </fieldset>
       
        </form>
      

      {/* {resultats.length > 0 && motCle.length > 0(
        <div>
          <h2>Résultats de la recherche pour '{motCle}':</h2>
          <ul>
            {resultats.map((pays) => (
                
              <li key={pays.translations.fra.official}>{pays.translations.fra.official}</li>
            ))}


          </ul>
        </div>
      )} */}
      {motCle.length === null && resultats.length > 0 && (
        <div>
          <h2>Résultats de la recherche pour '{motCle}':</h2>
          <ul>
            <li></li>
          </ul>
        </div>
      )}

{motCle.length >0 && resultats.length > 0 &&  (
        <div>
          <h2>Résultats de la recherche pour '{motCle}':</h2>
          <ul id="result">
          {resultats.map((pays) => (
                
                <li  className="tousPays" key={pays.translations.fra.common}>{pays.translations.fra.common}
                 
                 <Link to= {"/unpays/" + pays.ccn3}> <h1>{pays.translations.fra.common}</h1></Link>
                <h1>Continent: {pays.region}</h1>
                <h1>Capitale: {pays.capital}</h1>
                {pays.flags &&  < Link to= {"/unpays/" + pays.ccn3}><img src={pays.flags.svg} alt={`Drapeau de ${pays.name.common}`} style={{ width: '30rem', height: '15rem' }} /></Link>}
                
                </li>
                
               
                      
              ))}
    
          </ul>
        
        </div>
       
      )}
    </div>
  );
};

export default TousLesPays;