import React, { SFC } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

// class App extends Component {
//   public render() {
//     return (
//       <div>
//         <DashboardQuery>
//           {({ data, loading }) => {
//             if (loading) {
//               return "Loading...";
//             }
//             console.log("data: ", data);
//             return (
//               <>
//                 <Savings>
//                   {data!.savingsAllRanges.map((s, i) => (
//                     <SavingBox key={i} saving={s} />
//                   ))}
//                 </Savings>
//                 <SavingsPerYear />
//               </>
//             );
//           }}
//         </DashboardQuery>
//       </div>
//     );
//   }
// }

const SAVINGS_QUERY = gql`
  {
    savingsAllRanges(currency: "GBP") {
      amount
      from
      to
      range
      months
      amountPerMonth
    }
  }
`;

// const Savings = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// `;

interface IData {
  savingsAllRanges: [GQL.ISavingPerRange];
}

class SavingsQuery extends Query<IData, {}> {}

const SavingsPerRangeFetcher: SFC<{
  children: (result: [GQL.ISavingPerRange]) => React.ReactNode;
}> = ({ children }) => (
  <SavingsQuery query={SAVINGS_QUERY}>
    {({ data, loading }) => {
      if (loading) {
        return "Loading...";
      }
      console.log("data: ", data);
      return children(data!.savingsAllRanges);
    }}
  </SavingsQuery>
);

export default SavingsPerRangeFetcher;
