import React, { useEffect, useState } from "react";
import "./Pokemon.css";
import axios from "axios";

function Pokemon({ name, url }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  useEffect(() => {
    const pokemonIndex = url.split("/")[6];
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
      .then((res) => {
        setPokemonDetails({
          name: res.data.species.name,
          image: res.data.sprites.front_default,
        });
      });
  }, []);
  return (
    <div
      className="pokemon-card"
      onClick={() => console.log(pokemonDetails.name)}
    >
      <div className="card-header">
        <img src={pokemonDetails.image} alt="" />
      </div>
      <div className="card-body">
        <p>{pokemonDetails.name}</p>
      </div>
    </div>
  );
}

export default Pokemon;
