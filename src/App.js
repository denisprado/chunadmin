import jsonServerProvider from "ra-data-json-server";
import React from "react";
import { Admin, fetchUtils, Resource } from "react-admin";
import { AlbumCreate, AlbumEdit, AlbumList } from "./albums";
import authProvider from './authProvider';
import { FileCreate, FileEdit, FileList } from "./files";
//import LoginWithTheme from './myLoginPage';
import MyLogoutButton from './MyLogoutButton';
import { PageCreate, PageEdit, PageList } from "./pages";
import { UserList } from "./user";


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}
const dataProvider = jsonServerProvider("http://localhost:3333", httpClient);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    //loginPage={LoginWithTheme}
    logoutButton={MyLogoutButton}
    authProvider={authProvider}>
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
