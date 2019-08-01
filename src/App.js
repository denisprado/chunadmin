import React from "react";
import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource } from "react-admin";
import { UserList } from "./user";
import { PageList } from "./pages";
const dataProvider = jsonServerProvider("http://localhost:3333");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
    <Resource name="pages" list={PageList} />
  </Admin>
);
export default App;
