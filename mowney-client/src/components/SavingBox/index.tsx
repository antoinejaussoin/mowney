import React, { SFC } from "react";
import moment from "moment";
import numeral from "numeral";
import styled from "styled-components";
import {
  colorPositive,
  colorNegative,
  colorNegativeLight,
  colorPositiveLight,
} from "../../colors";

interface ISavingItemProps {
  saving: GQL.ISavingPerRange;
}

const SavingItem: SFC<ISavingItemProps> = ({ saving }) => (
  <Container positive={(saving.amountPerMonth || 0) >= 0}>
    <Header positive={(saving.amountPerMonth || 0) >= 0}>
      <h4>{saving.range}</h4>
      <div>{moment(saving.from!).format("DD/MM/YYYY")}</div>
      <div>{moment(saving.to!).format("DD/MM/YYYY")}</div>
    </Header>
    <Content positive={(saving.amountPerMonth || 0) >= 0}>
      {numeral(saving.amountPerMonth).format("0,0.00")}
    </Content>
  </Container>
);

const Container = styled<{ positive: boolean }, "div">("div")`
  min-width: 200px;
  border: 1px solid ${props => (props.positive ? colorPositive : colorNegative)};
  text-align: center;
  margin: 5px;
`;

const Header = styled<{ positive: boolean }, "div">("div")`
  border-bottom: 1px solid
    ${props => (props.positive ? colorPositive : colorNegative)};

  h4 {
    font-size: 1.5em;
  }
`;

const Content = styled<{ positive: boolean }, "div">("div")`
  background-color: ${props =>
    props.positive ? colorPositiveLight : colorNegativeLight};
  color: ${props => (props.positive ? colorPositive : colorNegative)};
  height: 2em;
  font-size: 2em;
  line-height: 2em;
`;

export default SavingItem;
