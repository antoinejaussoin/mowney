import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import Icon from 'components/FontIcon';
import classNames from 'classnames';
import style from './index.scss';

const onDrop = onChange => e => {
  if (e.length === 1) {
    const file = e[0];
    onChange(file);
  }
};

const Drop = ({ label, value, className, onChange }) => (
  <Dropzone
    onDrop={onDrop(onChange)}
    multiple={false}
    className={classNames(style.container, className)}
  >
    { value ?
      <img src={value.preview} className={style.preview} alt="Preview" /> :
      <div className={style.add}>
        <Icon value="file_upload" />
        <p>{label}</p>
      </div>
    }
  </Dropzone>
);

Drop.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  label: PropTypes.string,
  className: PropTypes.string
};

Drop.defaultProps = {
  onChange: () => {},
  value: null,
  label: 'Click to upload',
  className: ''
};

export default Drop;
