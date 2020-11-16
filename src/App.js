import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pokemon from "./components/Pokemon/Pokemon";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"
  );
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  useEffect(() => {
    axios
      .get(currentUrl)
      .then((res) => {
        setNextUrl(res.next);
        setPrevUrl(res.previous);
        setPokemons(
          res.data.results.map((value) => ({
            name: value.name,
            url: value.url,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Search />
      {pokemons.map((pokemon, id) => (
        <Pokemon key={id} url={pokemon.url} name={pokemon.name} />
      ))}
      <Pagination />
    </div>
  );
}

export default App;
