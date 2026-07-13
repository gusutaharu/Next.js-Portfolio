import { getTopLanguageSkills } from './github';

jest.mock('server-only', () => ({}));

jest.mock('../constants/skills', () => ({
  MAX_CHART_COUNT: 2,
}));

describe('getTopLanguageSkills', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.GITHUB_TOKEN = 'mock-token';
    global.fetch = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it('正常系: GitHub APIからデータを取得し、正しい割合と件数でソートされた配列を返すこと', async () => {
    const mockGraphQLResponse = {
      data: {
        viewer: {
          repositories: {
            nodes: [
              {
                name: 'repo-1',
                languages: {
                  edges: [
                    { size: 600, node: { name: 'TypeScript' } },
                    { size: 300, node: { name: 'JavaScript' } },
                  ],
                },
              },
              {
                name: 'repo-2',
                languages: {
                  edges: [
                    { size: 100, node: { name: 'TypeScript' } },
                    { size: 200, node: { name: 'HTML' } },
                  ],
                },
              },
            ],
          },
        },
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockGraphQLResponse,
    });

    const result = await getTopLanguageSkills();

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      name: 'TypeScript',
      ratio: 700 / 1200,
    });
    expect(result[1]).toEqual({
      name: 'JavaScript',
      ratio: 300 / 1200,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/graphql',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer mock-token',
          'Content-Type': 'application/json',
        },
      }),
    );
  });

  it('異常系: GITHUB_TOKEN が存在しない場合、空配列を返すこと', async () => {
    delete process.env.GITHUB_TOKEN;

    const result = await getTopLanguageSkills();

    expect(result).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('GitHub Token is missing.');
  });

  it('異常系: HTTPステータスが200以外（res.ok === false）の場合、空配列を返すこと', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await getTopLanguageSkills();

    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'GitHub API responded with status: 500',
    );
  });

  it('異常系: GraphQLのエラー（result.errors）が含まれる場合、空配列を返すこと', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        errors: [{ message: 'Bad credentials' }],
      }),
    });

    const result = await getTopLanguageSkills();

    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('GraphQL Errors:', [
      { message: 'Bad credentials' },
    ]);
  });

  it('境界値: リポジトリが空、または言語データが一切ない場合、空配列を返すこと', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { viewer: { repositories: { nodes: [] } } },
      }),
    });

    const result = await getTopLanguageSkills();
    expect(result).toEqual([]);
  });

  it('異常系: fetch自体がネットワークエラーなどで例外をスローした場合、空配列を返すこと', async () => {
    const networkError = new Error('Network timeout');
    (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

    const result = await getTopLanguageSkills();

    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching GitHub profile:',
      networkError,
    );
  });
});
