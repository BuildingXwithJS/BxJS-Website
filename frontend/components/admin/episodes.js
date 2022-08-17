import * as React from 'react';
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin';
import { MdBook } from 'react-icons/md';
export const EpisodeIcon = MdBook;

export const EpisodeList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="date" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

const EpisodeTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.name}"` : ''}</span>;
};

export const EpisodeEdit = () => (
  <Edit title={<EpisodeTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <DateInput source="date" />
      <DateInput disabled source="created_at" />
      <DateInput disabled source="updated_at" />
    </SimpleForm>
  </Edit>
);

export const EpisodeCreate = () => (
  <Create title="Create an Episode">
    <SimpleForm>
      <TextInput source="name" />
      <DateInput source="date" defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);
