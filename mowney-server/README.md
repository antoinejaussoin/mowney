# mowney

A personal accounting open-source software

# Prerequisites

Set sql_mode to empty via SQL Workbench or else: `SET GLOBAL sql_mode = '';`

yarn gql-gen --schema http://localhost:3001/graphql --template graphql-codegen-typescript-template --out ./src/
gql2ts -o ./src/data/types.ts ./src/data/schema.graphql
