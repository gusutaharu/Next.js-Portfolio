import 'server-only';
import { MAX_CHART_COUNT } from '@/constants/skills';
import { Repository } from './definitions';

export type LanguageSkillDTO = {
  name: string;
  ratio: number;
};

export async function getTopLanguageSkills(): Promise<LanguageSkillDTO[]> {
  const query = `
    query {
      viewer {
        login
        repositories(first: 50, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            name
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              totalSize
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  if (!process.env.GITHUB_TOKEN) {
    console.error('GitHub Token is missing.');
    return [];
  }
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`GitHub API responded with status: ${res.status}`);
      return [];
    }
    const result = await res.json();
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return [];
    }
    const repositories = result?.data?.viewer?.repositories?.nodes as
      | Repository[]
      | undefined;
    if (!repositories || repositories.length === 0) {
      return [];
    }
    const languageTotals: Record<string, number> = {};
    let allSize = 0;

    repositories.forEach((repo) => {
      repo.languages?.edges?.forEach((edge) => {
        if (!edge?.node) return;
        const { name } = edge.node;
        const size = edge.size || 0;

        if (!languageTotals[name]) {
          languageTotals[name] = 0;
        }
        languageTotals[name] += size;
        allSize += size;
      });
    });

    if (allSize === 0) {
      return [];
    }

    const sortedLanguages: LanguageSkillDTO[] = Object.entries(languageTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_CHART_COUNT)
      .map(([name, size]) => ({
        name,
        ratio: size / allSize,
      }));

    return sortedLanguages;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return [];
  }
}
