export async function getGitHubProfile() {
  const query = `
    query {
      viewer {
        login
        name
        avatarUrl
        repositories(first: 5, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            name
            url
          }
        }
      }
    }
  `;

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
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  return result.data.viewer;
}
