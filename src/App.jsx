import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banList, setBanList] = useState([]);
  const [error, setError] = useState(null);
  const [allBreeds, setAllBreeds] = useState([]);

  const API_KEY = import.meta.env.VITE_CAT_API_KEY;

  // Fetch all cat breeds from The Cat API
  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': API_KEY
        }
      });
      const data = await response.json();

      setAllBreeds(data);
      console.log('Available cat breeds:', data.length);
    } catch (err) {
      console.error('Error fetching breeds:', err);
    }
  };

  // Fetch random cat image with breed info
  const fetchRandomCat = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get random breed that's not banned
      const availableBreeds = allBreeds.filter(breed =>
        !banList.includes(breed.name) &&
        !banList.includes(breed.origin) &&
        !banList.includes(breed.temperament)
      );

      if (availableBreeds.length === 0) {
        setError('All breeds are banned! Remove some from the ban list to continue.');
        setLoading(false);
        return;
      }

      const randomBreed = availableBreeds[Math.floor(Math.random() * availableBreeds.length)];

      console.log(`Fetching random ${randomBreed.name}...`);

      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&limit=1`,
        {
          headers: {
            'x-api-key': API_KEY
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const catItem = {
        name: randomBreed.name,
        imageUrl: data[0]?.url || 'https://via.placeholder.com/400?text=No+Image',
        origin: randomBreed.origin,
        temperament: randomBreed.temperament,
        lifeSpan: randomBreed.life_span,
        description: randomBreed.description,
        weight: randomBreed.weight.metric,
        date: new Date().toLocaleDateString(),
        id: Date.now()
      };

      console.log('Fetched cat:', catItem);
      setCurrentItem(catItem);

    } catch (err) {
      console.error('Cat API Error:', err);
      setError(`Failed to fetch cat: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add attribute to ban list
  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
      console.log('Added to ban list:', attribute);
    }
  };

  // Remove attribute from ban list
  const removeFromBanList = (attribute) => {
    setBanList(banList.filter(item => item !== attribute));
    console.log('Removed from ban list:', attribute);
  };

  // Initial load
  useEffect(() => {
    console.log('Cat API Key:', API_KEY ? 'Present' : 'Missing');
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (allBreeds.length > 0) {
      fetchRandomCat();
    }
  }, [allBreeds]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Pretty Cat Breed Discovery</h1>
        <p>Discover random cat breeds!
          If you dont want to see an attribute anymore, click on attributes to ban them.</p>
      </header>

      <main className="app-main">
        <button
          onClick={fetchRandomCat}
          disabled={loading}
          className="discover-button"
        >
          {loading ? 'Finding a cat...' : 'Discover New Cat'}
        </button>

        {error && (
          <div className="error-message">
            {error}
            <br />
            <button
              onClick={fetchRandomCat}
              style={{ marginTop: '10px', padding: '5px 10px' }}
            >
              Try Again
            </button>
          </div>
        )}

        {currentItem && (
          <div className="content-card">
            <div className="image-container">
              <img
                src={currentItem.imageUrl}
                alt={`A ${currentItem.name} cat`}
                className="space-image"
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Available';
                }}
              />
            </div>

            <div className="content-info">
              <h2
                className="clickable-attribute"
                onClick={() => addToBanList(currentItem.name)}
                title="Click to ban this breed"
              >
                Breed: {currentItem.name}
              </h2>

              <p
                className="clickable-attribute"
                onClick={() => addToBanList(currentItem.origin)}
                title="Click to ban this origin"
              >
                Origin: {currentItem.origin}
              </p>

              <p
                className="clickable-attribute"
                onClick={() => addToBanList(currentItem.temperament)}
                title="Click to ban this temperament"
              >
                Temperament: {currentItem.temperament}
              </p>

              <p className="info-text">
                Weight: {currentItem.weight} kg
              </p>

              <p className="info-text">
                Life Span: {currentItem.lifeSpan} years
              </p>

              <div className="explanation">
                <h3>About This Breed:</h3>
                <p>{currentItem.description}</p>
              </div>

              <p
                className="clickable-attribute"
                onClick={() => addToBanList(currentItem.date)}
                title="Click to ban this date"
              >
                Discovered: {currentItem.date}
              </p>
            </div>
          </div>
        )}

        {banList.length > 0 && (
          <div className="ban-list">
            <h3>Ban List ({banList.length} items)</h3>
            <div className="ban-items">
              {banList.map((item, index) => (
                <span
                  key={index}
                  className="ban-item"
                  onClick={() => removeFromBanList(item)}
                  title="Click to remove from ban list"
                >
                  {item} X
                </span>
              ))}
            </div>
            <p className="ban-hint">Click on banned items to remove them</p>
          </div>
        )}

        <div style={{ marginTop: '20px', opacity: 0.7, fontSize: '14px' }}>
          <p>Available breeds: {allBreeds.length} | Banned: {banList.length}</p>
        </div>
      </main>
    </div>
  );
}

export default App;