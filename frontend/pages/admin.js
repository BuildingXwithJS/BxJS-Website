import buildHasuraProvider from 'ra-data-hasura';
import { useEffect, useState } from 'react';
import { Admin, Resource } from 'react-admin';

import {
  EpisodeCreate,
  EpisodeEdit,
  EpisodeList,
} from '../components/admin/episodes.js';
import { LinkCreate, LinkEdit, LinkList } from '../components/admin/links.js';

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const dataProvider = await buildHasuraProvider({
        clientOptions: { uri: 'http://localhost:8080/v1/graphql' },
      });
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="bxjsweekly_episodes"
        options={{ label: 'Episodes' }}
        list={EpisodeList}
        edit={EpisodeEdit}
        create={EpisodeCreate}
      />
      <Resource
        name="bxjsweekly_links"
        options={{ label: 'Links' }}
        list={LinkList}
        edit={LinkEdit}
        create={LinkCreate}
      />
    </Admin>
  );
};

export default App;
