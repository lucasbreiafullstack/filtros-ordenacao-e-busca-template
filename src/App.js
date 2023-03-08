import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
import { useState } from "react";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {

  const [buscaId, setBuscaId] = useState('')
  const [ordenar, setOrdenar] = useState('')
  const [buscaName, setBuscaName] = useState('')
  
  const onChangeId = (event) =>{
    setBuscaId(event.target.value);
  }
  
  const onChangeOrdenar = (event) =>{
    setOrdenar(event.target.value);
  }

  const onChangeBuscaName = (event) =>{
    setBuscaName(event.target.value);
  }

  /* const pokemonsFiltrados = pokemons.filter((pokemon) => {
    return buscaId ? pokemon.id === buscaId : pokemon
  }); */

  return (
    <>
      <GlobalStyle />
      <Header 
        buscaId={buscaId} onChangeId={onChangeId} 
        ordenar={ordenar} onChangeOrdenar={onChangeOrdenar} 
        buscaName={buscaName} onChangeBuscaName={onChangeBuscaName}
      />
      <CardsContainer>
        {pokemons.filter((item) => {
          if(buscaId){
            return item.id === buscaId
          }else{
            return item 
          }
        }).filter((name) =>{
          if(buscaName){
            return name.name.english.toLowerCase().includes(buscaName)
            
          }else{
            return name
          }
        }).sort((a, b) =>{
          if(ordenar === 'crescente'){
            return a.id - b.id
          }else if(ordenar === 'decrescente'){
            return b.id - a.id
          }
        }).map((pokemon) => {
          return <PokemonCard
          cardColor={getColors(pokemon.type[0])}
          key={pokemon.id}
          pokemon={pokemon}
        />
        })}
      </CardsContainer>
    </>
  );
}

export default App;
