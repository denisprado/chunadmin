import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  ImageField,
  EditButton
} from "react-admin";

export const PageList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <EmailField source="content" />
      <ImageField source="image.url" />
      <EditButton />
    </Datagrid>
  </List>
);
