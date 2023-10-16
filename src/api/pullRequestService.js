import axios from 'axios';

const private_github_api_key = process.env.REACT_APP_GITHUB_API_KEY;
const repo_name = process.env.REACT_APP_REPO_NAME;
const repo_owner = process.env.REACT_APP_REPO_OWNER;
const apiUrl = process.env.REACT_APP_GRAPHQL_BASE_URL

const headers = {
    Authorization: `Bearer ${private_github_api_key}`,
    'X-GitHub-Api-Version': '2022-11-28'
};

export const getAllPullRequests = (perPage, cursor) => {
    const query = `
      query GetPullRequests($owner: String!, $repo: String!, $perPage: Int!, $cursor: String) {
        repository(owner: $owner, name: $repo) {
          pullRequests(first: $perPage, after: $cursor, states: OPEN , orderBy: { field: CREATED_AT, direction: DESC }) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              number
              title
              createdAt
              updatedAt
            }
          }
        }
      }
    `;

    const variables = { owner: repo_owner, repo: repo_name, perPage, cursor };

    return axios.post(apiUrl, { query, variables }, {
        headers: headers
    })
        .then(response => {
            return response.data.data.repository.pullRequests;
        })
        .catch(error => {
            throw new Error('error in getting pull request', error);
        });

}
export const fetchPullRequestData = (pullRequestNumber) => {
    const query = `
      {
        repository(owner: "${repo_owner}", name: "${repo_name}") {
          pullRequest(number: ${pullRequestNumber}) {
            author{
                login
            }
            reviews(first: 1) {
              totalCount
            }
            comments(first: 1) {
                totalCount
              }
          }
        }
      }
    `;
    return axios.post(apiUrl, { query }, {
        headers: headers
    })
        .then(response => {
            return response?.data?.data?.repository?.pullRequest
        })
        .catch(error => {
            throw new Error(`Error fetching comments: ${error}`);
        });
};
