import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemon(res.data);
      } catch (error) {
        console.error('포켓몬 정보를 불러오는 데 실패했습니다.', error);
      }
    };
  
    fetchData();
  }, [name]);

  if (!pokemon) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to='/'>← 목록으로</Link>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} width={150} />
      <p>
        <strong>Type:</strong>
        {pokemon.types.map((t) => t.type.name).join(', ')}
      </p>
    </div>
  );
};

export default PokemonDetail;