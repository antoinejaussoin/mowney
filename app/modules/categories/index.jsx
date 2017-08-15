import React from 'react';
import { Card, CardText, CardTitle } from 'components/Card';
import ListOfCategories from './list-of-categories';

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
  </div>
);

export default Categories;
