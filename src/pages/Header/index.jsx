import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsCart2 } from 'react-icons/bs';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import Context from '../../Context/Context';
import { getProductsFromQuery } from '../../services/api';
import './Header.scss';

function Header() {
  const { query, setQuery, setSearchList } = useContext(Context);

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
      <section className="header-logo">
        <img src="https://cdn.shopify.com/s/files/1/2316/0905/files/logo_basico.com_2015_preto_1_160x.png?v=1628806076" alt="logo" className="imgLogo" />
      </section>
      <section className="header-search">
        <label htmlFor="home" className="header-search-label">
          <input
            className="header-search-label-input"
            id="home"
            type="text"
            name="home"
            placeholder="Pesquise seu produto (nome, marca ou descrição)"
            value={ query }
            onChange={ inputOnChange }
          />
          <button
            className="header-search-label-btn"
            type="button"
            onClick={ () => handleSearch() }
          >
            <BsSearch className="icons-little" />
          </button>
        </label>
      </section>
      <section className="header-optionsUser">
        <div className="header-optionsUser-location">
          <CiLocationOn className="icons" />
          <Link
            to="/search"
            className="header-optionsUser-location-link"
          >
            Você está em:
            <span>Feira de Santana</span>
          </Link>
        </div>
        <div className="header-optionsUser-user">
          <IoPersonCircleOutline className="icons" />
          <Link to="/profile" className="header-optionsUser-user-link">
            Entre ou
            <span>crie sua conta</span>
          </Link>
        </div>
        <Link to="/favorites"><AiOutlineHeart className="icons" /></Link>
        <Link to="/cart" className="icons">
          <BsCart2 />
        </Link>
      </section>
    </header>
  );
}

export default Header;
