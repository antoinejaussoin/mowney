import React, { PropTypes } from 'react';
import Drop from 'components/Drop';
import style from './UploadItem.scss';

const UploadItem = ({ account, file, onFileAdded }) => (
  <div className={style.container}>
    <p>{account.name}</p>
    <Drop onChange={f => onFileAdded(account, f)} value={file} className={style.drop} />
  </div>
);


UploadItem.propTypes = {
  account: PropTypes.object,
  file: PropTypes.object,
  onFileAdded: PropTypes.func
};

export default UploadItem;
