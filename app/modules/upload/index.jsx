import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import translate from 'i18n/Translate';
import { Card, CardTitle, CardText } from 'components/Card';
import { getAccounts } from 'modules/accounts/selectors';
import style from './index.scss';
import UploadItem from './components/UploadItem';
import { addFile } from '../state';

const stateToProps = state => ({
    accounts: getAccounts(state)
});

const actionsToProps = dispatch => ({
    onAddFile: (account, file) => dispatch(addFile({ account, file }))
});

const Main = ({ accounts, onAddFile }) => (
    <div className={style.container}>
        <Card>
            <CardTitle>Upload a file</CardTitle>
            <CardText>
                <div className={style.items}>
                    { accounts.map(account => <UploadItem account={account} key={account.id} onFileAdded={onAddFile} />) }
                </div>
            </CardText>
        </Card>
    </div>
);

Main.propTypes = {
    accounts: PropTypes.array,
    onAddFile: PropTypes.func
};

const decorators = flow([
    translate('Upload'),
    connect(stateToProps, actionsToProps)
]);

export default decorators(Main);
