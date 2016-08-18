import React, { PropTypes } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import style from './SavingItem.scss';

const SavingItem = ({ saving }) => (
    <div className={style.item}>
        <div className={style.header}>
            <h4>{saving.name}</h4>
            <p>{moment(saving.from).format('DD/MM/YYYY')}</p>
            <p>{moment(saving.to).format('DD/MM/YYYY')}</p>
        </div>
        <div className={style.content}>
            <p>{numeral(saving.savingPerMonth).format('0,0.00')}</p>
        </div>
    </div>
);

SavingItem.propTypes = {
    saving: PropTypes.object
};

export default SavingItem;
