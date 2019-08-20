import React from "react";
import {
  List,
  required,
  Datagrid,
  TextField,
  RichTextField,
  ImageField,
  EditButton,
  SimpleForm,
  Create,
  TextInput,
  ImageInput,
  Edit,
  DisabledInput,
  SelectInput,
  ReferenceInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const PageTitle = ({ record }) => {
  return <span>Page {record ? `"${record.title}"` : ""}</span>;
};

const isRequired = [required()];

export const PageList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <RichTextField source="content" />
      <ImageField source="image.url" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={isRequired} />
      <RichTextInput source="content" validate={isRequired} />
      <ReferenceInput label="Image" source="image_id" reference="files">
        <SelectInput source="thumbImage.url" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const PageEdit = props => (
  <Edit title={<PageTitle />} {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <TextInput source="title" validate={isRequired} />
      <RichTextInput source="content" validate={isRequired} />
      <ReferenceInput label="Image" source="image_id" reference="files">
        <SelectInput source="thumbImage.url" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
