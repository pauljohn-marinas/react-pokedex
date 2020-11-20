import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pokemon from "./components/Pokemon/Pokemon";
import Search from "./components/Search/Search";
import Pagination from "./components/Pagination/Pagination";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=52"
  );
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataAttribute, setDataAttribute] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const handleModal = (e) => {
    setShowModal(!showModal);
    if (!showModal) {
      setDataAttribute(
        e.target.closest(".pokemon-card").attributes.getNamedItem("data-key")
          .value
      );
    }
  };
  useEffect(() => {
    if (dataAttribute !== "") {
      axios
        .all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${dataAttribute}`),
          axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${dataAttribute}`
          ),
        ])
        .then((res) => {
          setPokemonInfo({
            name: res[0].data.species.name,
            image: res[0].data.sprites.other["official-artwork"].front_default,
            stats: res[0].data.stats,
            types: res[0].data.types,
            experience: res[0].data.base_experience,
            weight: res[0].data.weight,
            height: res[0].data.height,
            language: res[1].data.names[0].name,
          });
        });
    }
  }, [showModal]);

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
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentUrl]);

  useEffect(() => {
    axios
      .get(currentUrl)
      .then((res) => {
        setPrevUrl(res.data.previous);
        setNextUrl(res.data.next);
        setFilteredPokemons(
          pokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(search.toLowerCase());
          })
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentUrl, search, pokemons]);

  const gotoNextPage = () => {
    setCurrentUrl(nextUrl);
  };
  const gotoPrevPage = () => setCurrentUrl(prevUrl);

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  return (
    <div className="content">
      <div
        className={`modal-overlay ${showModal ? "show" : ""}`}
        onClick={handleModal}
      >
        <div className="modal">
          <div className="modal-header">
            <img src="times-solid.svg" alt="" />
          </div>
          <div className="modal-body">
            <div className="image-container">
              <img src={pokemonInfo.image} alt="" />
            </div>
            <div className="info-container">{pokemonInfo.language}</div>
          </div>
        </div>
      </div>
      <nav>
        <div className="container">
          <div className="logo-container">
            <img src="pokeball.png" alt="pokeball-logo" />
            <h1>Pokedex</h1>
          </div>
        </div>
      </nav>
      <div className="container">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="pokemon-container">
        {loading && (
          <Loader
            type="Rings"
            color="#001d93"
            height={100}
            width={100}
            timeout={0}
          />
        )}
        {filteredPokemons.map((pokemon, id) => (
          <Pokemon
            key={id}
            url={pokemon.url}
            showModal={showModal}
            setShowModal={setShowModal}
            handleModal={handleModal}
          />
        ))}
      </div>
      <div className="container">
        <Pagination gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
      </div>
      <footer>
        <p>Developed and Designed by Paul John Marinas</p>
      </footer>
    </div>
  );
}

export default App;
