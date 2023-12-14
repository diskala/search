import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './unpays.css'
const PaysDetails = () => {
  const { id } = useParams();
  const [unpays, setUnpays] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then(res => res.json())
      .then(data => {
        setUnpays(data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête à l\'API', error);
      });
  }, [id]);

  if (!unpays) {
    return <div>Chargement en cours...</div>;
  }

  // Vérifier si unpays est un tableau avant d'utiliser .map()
  if (Array.isArray(unpays)) {
    return (
      <div>
        {unpays.map((pays) => (
          <div key={pays.ccn3}>
            <table>

              <th>
                <td class="th">Pays</td>
                <td class="th">Nom de la devise</td>
                <td class="th">Symbole de la devise</td>
                <td class="th">La langue officiel</td>
                <td class="th">Pays voisins</td>
                <td class="th">Lien google maps</td>
                
                <tr>
                  <td>
                    {pays.translations.fra.common}
                  </td>

                  <td> 
                    
                    {Object.keys(pays.currencies).map((currencyCode) => (
                      <div key={currencyCode}>
                            {pays.currencies[currencyCode].name}
                 
                  </div>
                       ))}
                  </td>


                  <td> 
                    
                    {Object.keys(pays.currencies).map((currencyCode) => (
                      <div key={currencyCode}>
                            {pays.currencies[currencyCode].symbol}
                 
                  </div>
                       ))}
                  </td>



                  <td>
                  {Object.keys(pays.languages).map((currencyCode) => (
              <div key={currencyCode}>
                {pays.languages[currencyCode]}

              </div>
            ))}

                  </td>
                  <td>
                  {pays.landlocked === undefined && (
              <p>{pays.landlocked ? 'Oui' : 'pas de pays voisin'}</p>
            )}
            {pays.borders && pays.borders.length > 0 && (
              <div>
              
                <ul>
                  {pays.borders.map((borderCode) => (
                    <li key={borderCode}>{borderCode}</li>
                  ))}
                </ul>
              </div>
            )}


                  </td>
                  <td class="lien">

                  <Link to={pays.maps.googleMaps}><span>Lien google maps</span></Link>
                  </td>
                  
                </tr>
             
                </th>

            </table>
          </div>
        ))}
      </div>
    );
  } else {
    // Gérer le cas où unpays n'est pas un tableau
    return <div>Les données du pays ne sont pas au format attendu.</div>;
  }
};

export default PaysDetails;