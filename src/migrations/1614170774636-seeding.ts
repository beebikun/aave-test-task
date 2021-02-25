import { MigrationInterface, QueryRunner } from 'typeorm';
import fetch from 'cross-fetch';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} from '@apollo/client/core';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph',
    fetch,
  }),
  cache: new InMemoryCache(),
});
const QUERY = gql`
  query tokens($skip: Int!, $size: Int!) {
    tokens(
      orderBy: tokenID
      orderDirection: desc
      where: { tokenURI_not: "" }
      first: $size
      skip: $skip
    ) {
      tokenURI
      tokenID
    }
  }
`;
const parseURI = (
  tokenURI: string,
): Promise<{
  image?: string;
  image_url?: string;
  image_data?: string;
  properties?: { image?: string; metadata?: string };
  isError?: boolean;
}> => {
  const jsonHeader = 'data:application/json,';
  try {
    if (tokenURI.startsWith(jsonHeader)) {
      return Promise.resolve(JSON.parse(tokenURI.substring(jsonHeader.length)));
    } else {
      return fetch(tokenURI, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .catch(() => {
          return { isError: true };
        });
    }
  } catch (e) {
    return Promise.resolve({ isError: true });
  }
};

export class seeding1614170774636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('\u001b[33mSEEDING: Start\u001b[39m');
    const N = 50;
    const size = 100;
    let compledtedPages = 0;

    const fetchTokens = async (page: number) => {
      const skip = size * page;
      const result = await client.query({
        query: QUERY,
        variables: { skip, size },
      });
      const tokens = result.data.tokens.map(async (token) => {
        const { tokenID, tokenURI } = token;
        const meta = await parseURI(tokenURI);
        // xkcd-14-standarts.jpg >_<
        const image =
          meta.properties?.image ||
          meta.properties?.metadata ||
          meta.image ||
          meta.image_url ||
          meta.image_data;
        if (typeof image === 'string') {
          const columns = `'${tokenID}', '${image.replace(/'/g, '"')}'`;
          await queryRunner.query(
            `INSERT INTO tokens (token_id, image) VALUES (${columns});`,
          );
          return true;
        }
      });
      return Promise.all(tokens).then(async (data) => {
        const values = data.filter(Boolean);
        compledtedPages += 1;
        console.log(
          `Page ${page} (${compledtedPages}/${N})`,
          `Inserted ${values.length} of ${size} tokens.`,
        );
      });
    };

    const promises = new Array(N).fill(null).map((_, i) => fetchTokens(i));
    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no down for seeding
  }
}
