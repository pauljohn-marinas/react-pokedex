import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pokemon from "./components/Pokemon/Pokemon";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  );
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    setLoading(true);
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
  }, [currentUrl]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(currentUrl)
      .then((res) => {
        setPrevUrl(res.data.previous);
        setNextUrl(res.data.next);
        setLoading(false);
        setFilteredPokemons(
          pokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(search.toLowerCase());
          })
        );
      })
      .catch((err) => console.log(err));
  }, [currentUrl, search, pokemons]);

  const gotoNextPage = () => setCurrentUrl(nextUrl);
  const gotoPrevPage = () => setCurrentUrl(prevUrl);

  return (
    <div className="content">
      <nav>
        <div className="container">
          <div className="logo-container">
            <img src="pokeball.png" alt="pokeball-logo" />
            <h1>Pokedex</h1>
          </div>
        </div>
      </nav>
      <Search search={search} setSearch={setSearch} />
      <div className="pokemon-container">
        {filteredPokemons.map((pokemon, id) => (
          <Pokemon key={id} url={pokemon.url} name={pokemon.name} />
        ))}
      </div>
      <Pagination gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
    </div>
  );
}

export default App;
