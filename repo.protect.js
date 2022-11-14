const config = require('config');
const { Octokit } = require("@octokit/core");
const organization = config.get('server.organization');
const token = config.get('server.token');
const default_branch = config.get('server.default_branch');
const repository = config.get('server.repository');
const octokit = new Octokit({auth: token});
const start = async () => {
    await Promise.resolve(octokit.request('PUT /repos/wabasoft/garuda4/branches/master/protection', {
        owner: 'wabasoft',
        repo: 'garuda4',
        branch: 'master',
        required_status_checks: {
            strict: true,
            private: true,
            contexts: [
                'continuous-integration/travis-ci'
            ]
        },
        enforce_admins: true,
        required_pull_request_reviews: {},
        restrictions: {
            users: [
                'octocat'
            ],
            teams: [
                'justice-league'
            ],
            apps: [
                'super-ci'
            ]
        },
        required_linear_history: true,
        allow_force_pushes: true,
        allow_deletions: true,
        block_creations: true,
        required_conversation_resolution: true,
        lock_branch: true,
        allow_fork_syncing: true
    }))
    };
console.log('Repository ' + repository + ' updated successfully.');
start().then(r => console.log('Repository updated'));
