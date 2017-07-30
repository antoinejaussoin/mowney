import React, { PropTypes } from 'react';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import style from './Error.scss';

const Error = ({ message }) => (
  <Chip className={style.container}>
    <Avatar style={{ backgroundColor: 'red', float: 'left' }} icon="error" />
    <span>{ message }</span>
  </Chip>
);

Error.propTypes = {
  message: PropTypes.string
};

export default Error;
