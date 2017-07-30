import React from 'react';
import flow from 'lodash/flow';
import translate from 'i18n/Translate';
import { Card, CardTitle, CardText } from 'components/Card';
import AccountTable from './components/AccountTable';
import Savings from './components/Savings';
import Timeline from './components/Timeline';
import style from './index.scss';

const Main = () => (
    <div className={style.container}>
        <div className={style.header}>
            <Card>
                <CardTitle>Dashboard</CardTitle>
                <CardText>...</CardText>
            </Card>
        </div>
        <div className={style.summaries}>
            <div className={style.accounts}>
                <Card>
                    <CardTitle>Accounts</CardTitle>
                    <CardText>
                        <AccountTable />
                    </CardText>
                </Card>
            </div>
            <div className={style.savings}>
                <Card>
                    <CardTitle>Savings</CardTitle>
                    <CardText>
                        <Savings />
                    </CardText>
                </Card>
            </div>
        </div>
        <div className={style.charts}>
            <Card>
                <CardTitle>Balance</CardTitle>
                <CardText>
                    <Timeline />
                </CardText>
            </Card>
        </div>
    </div>
);

const decorators = flow([
    translate('Main')
]);

export default decorators(Main);
