import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsCart2 } from 'react-icons/bs';
import Context from '../../Context/Context';
import { getProductsFromQuery } from '../../services/api';
// import userIcon from '../../assets/user-icon.png';
// import Loading from '../pages/Loading';
// import '../css/header.css';
function Header() {
  const { query, setQuery, setSearchList } = useContext(Context);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername('');
  }, []);
  // componentDidMount = async () => {
  //   this.setState({ loading: true });
  //   const { name, image } = await getUser();
  //   this.setState({
  //     userName: name,
  //     image,
  //   }, () => this.setState({ loading: false }));
  // }
  const inputOnChange = ({ target }) => {
    const { value } = target;
    setQuery(value);
  };

  const handleSearch = async () => {
    const results = await getProductsFromQuery(query);
    setSearchList(results.results);
  };

  return (
    <header className="header">
      <img src="https://www.amigoconstrutor.com.br/on/demandware.static/Sites-amigoConstrutor-Site/-/default/dwab647cb6/images/logo/logo_preferential.svg" alt="logo" className="imgLogo" />
      <section>
        <label
          htmlFor="home"
        >
          <input
            id="home"
            type="text"
            name="home"
            placeholder="Pesquise seu produto"
            value={ query }
            onChange={ inputOnChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => handleSearch() }
        >
          <BsSearch />
        </button>
      </section>
      <div>
        <section>
          <div>
            {/* <img className="header-user-image" src={ userIcon } alt="userImage" /> */}
            <h4>{ username }</h4>
          </div>
        </section>
        <Link to="/search">Você está em Feira de Santana</Link>
        <Link to="/profile">Entrar</Link>
        <Link to="/favorites">Lista de Compras</Link>
        <Link to="/cart" className="btnCart">
          <BsCart2 />
        </Link>
      </div>
    </header>
  );
}

export default Header;
