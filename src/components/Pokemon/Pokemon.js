import React, { useEffect, useState } from "react";
import "./Pokemon.css";
import axios from "axios";
import { motion } from "framer-motion";

function Pokemon({ url, handleModal }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const pokemonIndex = url.split("/")[6];

  var pokemonNumber = "" + pokemonIndex;
  while (pokemonNumber.length < 3) {
    pokemonNumber = "0" + pokemonNumber;
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
      .then((res) => {
        setPokemonDetails({
          name: res.data.species.name,
          image: res.data.sprites.other.dream_world.front_default,
          types: res.data.types,
          height: res.data.height,
          weight: res.data.weight,
          experience: res.data.base_experience,
        });
      });
  }, [url]);
  return (
    <motion.div
      layout
      className="pokemon-card"
      onClick={handleModal}
      data-key={pokemonIndex}
    >
      <div className="card-header">
        <span>{pokemonNumber}</span>
        <img src={pokemonDetails.image} alt="" />
      </div>
      <div className="card-body">
        <span>#{pokemonNumber}</span>
        <h3>{pokemonDetails.name}</h3>
        <div className="type-container mb-1">
          {pokemonDetails.types
            ? pokemonDetails.types.map((type, index) => (
                <div
                  className={`pokemon-type ${type.type.name.toLowerCase()}`}
                  key={index}
                >
                  {type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)}
                </div>
              ))
            : "Loading"}
        </div>
        <div className="mb-1 pokemon-details">
          <span>Base Experience:</span> {pokemonDetails.experience}
        </div>
        <div className="type-container">
          <div className="pokemon-details">
            <span>Ht:</span> {pokemonDetails.height}
          </div>
          <div className="pokemon-details">
            <span>Wt:</span> {pokemonDetails.weight}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Pokemon;
