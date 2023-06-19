import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CategoriesList from '../CategoriesList';
import {
  getCategories,
  getProductsFromCategory } from '../../services/api';
import Card from '../Card';
import Header from '../Header';
import Context from '../../Context/Context';

function Home({ addToCart }) {
  const { searchList, setSearchList } = useContext(Context);
  const [categories, setCategories] = useState([]);

  const categoriesAll = async () => {
    const categoriesShow = await getCategories();
    setCategories(categoriesShow);
  };

  useEffect(() => {
    categoriesAll();
  }, []);

  const apiGetCategory = async (categoriaId) => {
    const categoryApi = await getProductsFromCategory(categoriaId);
    setSearchList(categoryApi.results);
  };

  return (
    <section className="home">
      <Header />
      <div className="mainHome">
        <div className="categories">
          <CategoriesList
            apiGetCategory={ apiGetCategory }
            categories={ categories }
          />
        </div>
        <div>
          { searchList.length ? (
            <div className="cards">
              { searchList.map((list) => (
                <div
                  key={ list.id }
                  data-testid="product"
                  className="card"
                >
                  <Card
                    id={ list.id }
                    title={ list.title }
                    thumbnail={ list.thumbnail }
                    price={ list.price }
                  />
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    className="btnAddCart"
                    onClick={ () => addToCart(list) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))}
            </div>
          ) : null }
        </div>
      </div>
    </section>
  );
}

export default Home;

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
