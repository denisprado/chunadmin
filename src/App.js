import React from "react";
import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { UserList } from "./user";
import { PageList, PageEdit, PageCreate } from "./pages";
import { AlbumList, AlbumEdit, AlbumCreate } from "./albums";
import { FileList, FileEdit, FileCreate } from "./files";

const dataProvider = jsonServerProvider("http://localhost:3333");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
    <Resource
      name="files"
      list={FileList}
      edit={FileEdit}
      create={FileCreate}
    />
    <Resource
      name="albums"
      list={AlbumList}
      edit={AlbumEdit}
      create={AlbumCreate}
    />
    <Resource
      name="pages"
      list={PageList}
      edit={PageEdit}
      create={PageCreate}
    />
  </Admin>
);
export default App;
