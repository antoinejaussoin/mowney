import React from 'react';
import { Link } from 'react-router';
import { IconButton } from 'components/Button';
import style from './Menu.scss';

const Menu = () => (
  <div className={style.container}>
    <Link to={'/search'}><IconButton icon="search" /></Link>
    <Link to={'/upload'}><IconButton icon="file_upload" /></Link>
  </div>
);

export default Menu;
