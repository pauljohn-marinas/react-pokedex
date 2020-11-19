import React, { useEffect, useState } from "react";
import "./Pokemon.css";
import axios from "axios";
import { motion } from "framer-motion";

function Pokemon({ url }) {
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
        });
      });
  }, [url]);
  return (
    <motion.div
      layout
      className="pokemon-card"
      onClick={() => console.log(pokemonDetails.name)}
    >
      <div className="card-header">
        <span>{pokemonNumber}</span>
        <img src={pokemonDetails.image} alt="" />
      </div>
      <div className="card-body">
        <span>#{pokemonNumber}</span>
        <h3>{pokemonDetails.name}</h3>
        {console.log(pokemonDetails)}
      </div>
      {/* {pokemonDetails.types.map((type) => type.type.name).join(", ")} */}
    </motion.div>
  );
}

export default Pokemon;
