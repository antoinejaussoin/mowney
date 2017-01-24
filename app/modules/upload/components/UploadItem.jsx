import React, { PropTypes } from 'react';
import Drop from 'components/Drop';
import style from './UploadItem.scss';

const UploadItem = ({ account, file, onFileAdded }) => (
    <div>
        {account.name}
        <Drop onChange={onFileAdded} value={file} className={style.drop} />
    </div>
);


UploadItem.propTypes = {
    account: PropTypes.object,
    file: PropTypes.object,
    onFileAdded: PropTypes.func
};

export default UploadItem;
