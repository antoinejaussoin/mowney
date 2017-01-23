import React from 'react';
import flow from 'lodash/flow';
import translate from 'i18n/Translate';
import { Card, CardTitle, CardText } from 'components/Card';
import style from './index.scss';

const Main = () => (
    <div className={style.container}>
        <Card>
            <CardTitle>Upload a file</CardTitle>
            <CardText>
                ...
            </CardText>
        </Card>
    </div>
);

const decorators = flow([
    translate('Upload')
]);

export default decorators(Main);
