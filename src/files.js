import React from "react";
import {
  Create,
  Datagrid,
  DisabledInput,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField
} from "react-admin";

const FileTitle = ({ record }) => {
  return <span>File {record ? `"${record.title}"` : ""}</span>;
};

export const FileList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField label="Album" source="AlbumId" reference="albums">
        <TextField source="title" />
      </ReferenceField>
      <ImageField source="url" />
      <EditButton />
    </Datagrid>
  </List>
);

export const FileCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Album" source="AlbumId" reference="albums">
        <SelectInput optionText="title" />
      </ReferenceInput>

      <ImageInput
        source="files"
        label="Related pictures"
        accept="image/*"
        placeholder={<p>Drop your file here</p>}
        multiple
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const FileEdit = props => (
  <Edit title={<FileTitle />} {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <ReferenceInput label="Album" source="AlbumId" reference="albums">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <ImageField source="url" />
    </SimpleForm>
  </Edit>
);
