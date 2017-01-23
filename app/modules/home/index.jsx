import React from 'react';
import flow from 'lodash/flow';
import translate from 'i18n/Translate';
import Container from 'components/Container';
import AccountTable from './components/AccountTable';
import Savings from './components/Savings';
import Timeline from './components/Timeline';
import style from './index.scss';

const Main = () => (
    <Container>
        <h3>Dashboard</h3>
        <div className={style.summaries}>
            <div className={style.accounts}>
                <AccountTable />
            </div>
            <div className={style.savings}>
                <Savings />
            </div>
        </div>
        <div className={style.charts}>
            <Timeline />
        </div>
    </Container>
);

const decorators = flow([
    translate('Main')
]);

export default decorators(Main);
