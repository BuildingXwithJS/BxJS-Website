import { Box, Card, CardContent } from '@mui/material';
import * as React from 'react';
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  FilterList,
  FilterListItem,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  SearchInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin';
import { MdLink } from 'react-icons/md';
import { useQuery } from 'urql';
import { WEEKLY_LINK_CATEGORIES } from '../graphql/queries/weekly.js';
export const LinkIcon = MdLink;

const FilterSidebar = () => {
  const [result] = useQuery({
    query: WEEKLY_LINK_CATEGORIES,
  });
  const categories = React.useMemo(
    () =>
      result?.data?.bxjsweekly_links
        ?.map((it) => it.category)
        ?.sort((a, b) => a.localeCompare(b)) ?? [],
    [result]
  );
  return (
    <Box
      sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
        order: -1, // display on the left rather than on the right of the list
        width: '15em',
        marginRight: '1em',
      }}
    >
      <Card>
        <CardContent>
          <FilterList label="Category">
            {categories.map((category) => (
              <FilterListItem
                key={category}
                label={category}
                value={{ category }}
              />
            ))}
          </FilterList>
        </CardContent>
      </Card>
    </Box>
  );
};

const listFilters = [<SearchInput source="title" alwaysOn />];

export const LinkList = () => (
  <List filters={listFilters} aside={<FilterSidebar />}>
    <Datagrid>
      <TextField source="id" />
      <FunctionField
        label="Title"
        render={(record) => (
          <a href={record.url} style={{ textDecoration: 'underline' }}>
            {record.title}
          </a>
        )}
      />
      <TextField source="category" />
      <ReferenceField source="episode" reference="bxjsweekly_episodes">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

const LinkTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const LinkEdit = () => (
  <Edit title={<LinkTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="category" />
      <TextInput source="url" />
      <ReferenceInput source="episode" reference="bxjsweekly_episodes">
        <SelectInput label="Episode" optionText="name" />
      </ReferenceInput>
      <DateInput disabled source="created_at" />
      <DateInput disabled source="updated_at" />
    </SimpleForm>
  </Edit>
);

export const LinkCreate = () => (
  <Create title="Create a Link">
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="category" />
      <TextInput source="url" />
      <ReferenceInput source="episode" reference="bxjsweekly_episodes">
        <SelectInput label="Episode" optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
