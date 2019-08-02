import React from "react";
import {
  Create,
  Edit,
  List,
  SimpleForm,
  DisabledInput,
  TextInput,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  EmailField,
  ImageField
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

export const AlbumList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <EmailField source="content" />
      <ImageField source="thumbImage.url" />
      <EditButton />
    </Datagrid>
  </List>
);

const AlbumTitle = ({ record }) => {
  return <span>Album {record ? `"${record.title}"` : ""}</span>;
};

export const AlbumCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <RichTextInput source="content" />
    </SimpleForm>
  </Create>
);

export const AlbumEdit = props => (
  <Edit title={<AlbumTitle />} {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <TextInput source="title" />
      <RichTextInput source="content" />
      <ReferenceManyField label="Files" reference="files" target="album_id">
        <Datagrid>
          <TextField source="content" />
          <DateField source="created_at" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  </Edit>
);
