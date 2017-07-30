import React from 'react';
import { Link } from 'react-router';
import style from './Menu.scss';

const Menu = () => (
  <div className={style.container}>
    <Link to={'/upload'}>Upload</Link>
  </div>
);

export default Menu;
