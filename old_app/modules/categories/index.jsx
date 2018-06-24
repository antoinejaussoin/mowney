import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle } from 'components/Card';
import ListOfCategories from './list-of-categories';
import ListOfClues from './list-of-clues';
import { canDisplayClues } from './selectors';

const Categories = ({ displayClues }) => (
  <div>
    <Card>
      <CardTitle>
        Categories
      </CardTitle>
      <CardText>
        <ListOfCategories />
      </CardText>
    </Card>
    { displayClues && (
      <Card>
        <CardTitle>
          Clues
        </CardTitle>
        <CardText>
          <ListOfClues />
        </CardText>
      </Card>
    )}
  </div>
);

Categories.propTypes = {
  displayClues: PropTypes.bool
};

const mapStateToProps = (state) => ({
  displayClues: canDisplayClues(state)
});

export default connect(mapStateToProps)(Categories);
