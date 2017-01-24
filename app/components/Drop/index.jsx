import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Icon from 'components/FontIcon';
import style from './index.scss';

const onDrop = onChange => e => {
    if (e.length === 1) {
        const file = e[0];
        onChange(file);
    }
};

const Drop = ({ label, value, onChange }) => (
    <Dropzone
      onDrop={onDrop(onChange)}
      multiple={false}
      className={style.container}
    >
        { value ?
            <img src={value.preview} className={style.preview} /> :
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
    label: PropTypes.string
};

Drop.defaultProps = {
    onChange: () => {},
    value: null,
    label: 'Click to upload'
};

export default Drop;
