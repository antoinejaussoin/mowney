import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import translate from 'i18n/Translate';
import { Card, CardTitle, CardText } from 'components/Card';
import ProgressBar from 'components/ProgressBar';
import Button from 'components/Button';
import { getAccounts } from 'modules/accounts/list/selectors';
import style from './index.scss';
import UploadItem from './components/UploadItem';
import { addFile, uploadAll } from './state';
import { getFiles, isUploading } from './selectors';

const stateToProps = state => ({
  accounts: getAccounts(state),
  files: getFiles(state),
  uploading: isUploading(state)
});

const actionsToProps = dispatch => ({
  onAddFile: (account, file) => dispatch(addFile({ account, file })),
  onUpload: () => dispatch(uploadAll())
});

const Main = ({ accounts, files, uploading, onAddFile, onUpload }) => (
  <div className={style.container}>
    <Card>
      <CardTitle>Upload a file</CardTitle>
      <CardText>
        <Button label="Upload" raised accent onClick={onUpload} disabled={uploading} />
        <div className={style.list}>
          { !uploading ?
            <div className={style.items}>
              { accounts.map(account =>
                <UploadItem account={account} file={files[account.id]} key={account.id} onFileAdded={onAddFile} />) }
            </div> :
            <ProgressBar mode="indeterminate" />
          }
        </div>
      </CardText>
    </Card>
  </div>
);

Main.propTypes = {
  accounts: PropTypes.array,
  files: PropTypes.array,
  uploading: PropTypes.bool,
  onAddFile: PropTypes.func,
  onUpload: PropTypes.func
};

const decorators = flow([
  translate('Upload'),
  connect(stateToProps, actionsToProps)
]);

export default decorators(Main);
