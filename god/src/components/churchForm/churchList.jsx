import React, { useEffect, useState } from "react";
import axios from "axios";

const ChurchList = () => {
  const [churches, setChurches] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/churches").then((res) => {
      setChurches(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Churches</h2>
      <ul>
        {churches.map((church) => (
          <li key={church.id}>
            <h3>{church.name}</h3>
            <p>{church.location}</p>
            <p>{church.address}</p>
            {church.website && <a href={church.website} target="_blank" rel="noopener noreferrer">Website</a>}
            <p>{church.description}</p>
            {church.image && <img src={church.image} alt={church.name} width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChurchList;
