import RichTextInput from "ra-input-rich-text";
import React from "react";
import {
  Create,
  ArrayField,
  Datagrid,
  DisabledInput,
  Edit,
  EditButton,
  ImageField,
  TabbedForm,
  FormTab,
  List,
  RichTextField,
  SimpleForm,
  TextField,
  TextInput,
  ReferenceInput,
  SelectInput
} from "react-admin";

export const AlbumList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <RichTextField source="content" />
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
    <TabbedForm>
      <FormTab label="resumo">
        <DisabledInput label="Id" source="id" />
        <TextInput source="title" />
        <RichTextInput source="content" />
        <ReferenceInput
          label="Image Thumbnail"
          source="thumb"
          reference="files"
        >
          <SelectInput source="thumbImage.url" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="fotos">
        <ArrayField source="Files">
          <Datagrid>
            <ImageField source="url" />
          </Datagrid>
        </ArrayField>
      </FormTab>
    </TabbedForm>
  </Edit>
);
