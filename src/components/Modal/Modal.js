import React from "react";
import "./Modal.css";

function Modal({ pokemonInfo }) {
  return (
    <div className="modal">
      <div className="modal-header">
        <img src="times-solid.svg" alt="" />
      </div>
      <div className="modal-body">
        <div className="image-container">
          <h1>{pokemonInfo.name}</h1>
          <div
            className={`box ${
              pokemonInfo.types ? pokemonInfo.types[0].type.name : ""
            }`}
          ></div>
          <div className="text-lang">{pokemonInfo.language}</div>
          <img src={pokemonInfo.image} alt="" />
        </div>
        <div className="info-container">
          <h2>Profile</h2>
          <p>{pokemonInfo.description}</p>
          <div className="pokemon-info-container">
            <div className="info">
              <div className="base-stats">
                <span>Ht </span>
                {pokemonInfo.height}
              </div>
              <div className="base-stats">
                <span>Wt </span>
                {pokemonInfo.weight}
              </div>
              <div className="base-stats">
                <span>Exp </span>
                {pokemonInfo.experience}
              </div>
            </div>
            <div className="type">
              {pokemonInfo.types
                ? pokemonInfo.types.map((type, index) => (
                    <img
                      src={`types/${type.type.name.toLowerCase()}.png`}
                      alt=""
                      key={index}
                    />
                  ))
                : "Loading"}
            </div>
          </div>
          <div className="pokemon-stats">
            {pokemonInfo.stats
              ? pokemonInfo.stats.map((stat, index) => {
                  return (
                    <div className="progress-main-container" key={index}>
                      <h4>{stat.stat.name}</h4>
                      <div className="progress-bar-container">
                        <div className="progress">
                          <div
                            className={`progress-bar ${
                              pokemonInfo.types
                                ? pokemonInfo.types[0].type.name
                                : "Loading"
                            }`}
                            style={{ width: `${stat.base_stat / 2}%` }}
                          ></div>
                        </div>
                        <div className="percent">{stat.base_stat / 2}</div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
