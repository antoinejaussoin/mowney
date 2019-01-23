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

const getLabel = (range: GQL.Range) => {
  switch (range) {
    case "currentMonth":
      return "Current Month";
    case "inception":
      return "Inception";
    case "lastMonth":
      return "Last Month";
    case "oneYear":
      return "One Year";
    case "sixMonth":
      return "Six Months";
    case "threeYears":
      return "Three Years";
    default:
      return "<?>";
  }
};

const SavingItem: SFC<ISavingItemProps> = ({ saving }) => (
  <Container positive={(saving.amountPerMonth || 0) >= 0}>
    <Header positive={(saving.amountPerMonth || 0) >= 0}>
      <h4>{getLabel(saving.range)}</h4>
      <div>{moment(saving.from!).format("DD/MM/YYYY")}</div>
      <div>{moment(saving.to!).format("DD/MM/YYYY")}</div>
    </Header>
    <Content positive={(saving.amountPerMonth || 0) >= 0}>
      {numeral(saving.amountPerMonth).format("0,0.00")}
    </Content>
  </Container>
);

interface IPositiveProps {
  positive: boolean;
}

const Container = styled<IPositiveProps, "div">("div")`
  min-width: 200px;
  border: 1px solid ${props => (props.positive ? colorPositive : colorNegative)};
  text-align: center;
  margin: 5px;
`;

const Header = styled<IPositiveProps, "div">("div")`
  border-bottom: 1px solid
    ${props => (props.positive ? colorPositive : colorNegative)};

  h4 {
    font-size: 1.5em;
    margin: 5px;
  }
`;

const Content = styled<IPositiveProps, "div">("div")`
  background-color: ${props =>
    props.positive ? colorPositiveLight : colorNegativeLight};
  color: ${props => (props.positive ? colorPositive : colorNegative)};
  height: 2em;
  font-size: 2em;
  line-height: 2em;
`;

export default SavingItem;
