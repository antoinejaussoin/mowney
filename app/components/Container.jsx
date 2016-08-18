import React, { PropTypes } from 'react';
import { Card, CardText } from 'react-toolbox/lib/card';

const Container = ({ children, className }) => (
    <Card className={ className }>
        <CardText>
            { children }
        </CardText>
    </Card>
);

Container.propTypes = {
    children: PropTypes.array,
    className: PropTypes.string
};

export default Container;
