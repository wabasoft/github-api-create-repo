const config = require('config');
const { Octokit } = require("@octokit/core");
const organization = config.get('server.organization');
const token = config.get('server.token');
const repository = config.get('server.repository');
const octokit = new Octokit({auth: token});
const start = async (x, y) => {
    await Promise.resolve(octokit.request('POST/orgs/' + organization + '/repos', {
        org: organization,
        name: repository,
        description: 'This is your first repository',
        homepage: 'https://github.com',
        'private': false,
        has_issues: true,
        has_projects: true,
        has_wiki: true
    }));
    console.log('Repository ' + repository + ' created successfully.');
};
const a = 1;
const b = 2;
start(a, b,).then(r => console.log('then'));