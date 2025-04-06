import React, { useState } from 'react';
import './Home.css';
import Slideshow from '../../components/HomePageComponents/Slideshow';
import ChurchCard from '../../components/worshipCard/ChurchCard';
import maryChurchImg from '../../ChurchImages/StMaryChurch.png';
import masjidChurchImg from '../../ChurchImages/Masjid.png';
import bethelChurchImg from '../../ChurchImages/BethEl.png';

const mockChurches = [
  {
    id: '1',
    name: "St. Mary's Church",
    description: 'Assumption of the Blessed Virgin Mary',
    location: 'Lancaster, PA',
    image: maryChurchImg,
    isSaved: false,
  },
  {
    id: '2',
    name: 'Masjid Al-Falah',
    description: 'A welcoming mosque in the community',
    location: 'Philadelphia, PA',
    image: masjidChurchImg,
    isSaved: true,
  },
  {
    id: '3',
    name: 'Beth El Synagogue',
    description: 'Reform Jewish synagogue with deep roots',
    location: 'New York, NY',
    image: bethelChurchImg,
    isSaved: false,
  },
];

const Home = () => {
  const [churches, setChurches] = useState(mockChurches);

  const handleSave = (id) => {
    setChurches((prev) =>
      prev.map((church) =>
        church.id === id ? { ...church, isSaved: !church.isSaved } : church
      )
    );
  };

  return (
    <div className="homeContainer">
      {/* Hero Section */}
      <div className="heroSection">
        <Slideshow />
      </div>

      {/* Featured Places of Worship */}
      <div className="featuredSection">
        <h1>Featured Places of Worship</h1>
        <div id="flexRow">
          {churches.map((church) => (
            <ChurchCard
              key={church.id}
              {...church}
              onSave={handleSave}
            />
          ))}
        </div>
      </div>

      {/* Saved Places of Worship */}
      <div className="savedSection">
        <h1>Saved Places of Worship</h1>
        <div id="flexRow">
          {churches
            .filter((c) => c.isSaved)
            .map((church) => (
              <ChurchCard
                key={church.id}
                {...church}
                onSave={handleSave}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
