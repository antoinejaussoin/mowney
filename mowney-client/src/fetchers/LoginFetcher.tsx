import gql from "graphql-tag";
import build from "./mutation";

const QUERY = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default build<
  {
    email: string;
    password: string;
  },
  {
    login: string;
  },
  string
>(QUERY, "login");
