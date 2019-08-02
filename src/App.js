import React from "react";
import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { UserList } from "./user";
import { PageList } from "./pages";
import { AlbumList, AlbumEdit } from "./albums";

const dataProvider = jsonServerProvider("http://localhost:3333");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
    <Resource name="files" list={ListGuesser} />
    <Resource name="albums" list={AlbumList} edit={EditGuesser} />
    <Resource name="pages" list={PageList} edit={EditGuesser} />
  </Admin>
);
export default App;
