import React from 'react';
import { Card, CardText, CardTitle } from 'components/Card';
import ListOfCategories from './list-of-categories';
import ListOfClues from './list-of-clues';

const Categories = () => (
  <div>
    <Card>
      <CardTitle>
        Categories
      </CardTitle>
      <CardText>
        <ListOfCategories />
      </CardText>
    </Card>
    <Card>
      <CardTitle>
        Clues
      </CardTitle>
      <CardText>
        <ListOfClues />
      </CardText>
    </Card>
  </div>
);

export default Categories;
