import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";

export const PageList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <EmailField source="content" />
    </Datagrid>
  </List>
);
