const config = require('config');
const { Octokit } = require("@octokit/core");
const organization = config.get('server.organization');
const token = config.get('server.token');
const default_branch = config.get('server.default_branch');
const repository = config.get('server.repository');
const octokit = new Octokit({auth: token});
const start = async () => {
    await Promise.resolve(octokit.request('PUT /repos/ ' + organization +'/' + repository + '/branches/' + default_branch + '/protection', {
            owner: 'OWNER',
            repo: 'REPO',
            branch: 'BRANCH',
            required_status_checks: {
                strict: true,
                contexts: [
                    'continuous-integration/travis-ci'
                ]
            },
            enforce_admins: true,
            required_pull_request_reviews: {
                dismissal_restrictions: {
                    users: [
                        'octocat'
                    ],
                    teams: [
                        'justice-league'
                    ]
                },
                dismiss_stale_reviews: true,
                require_code_owner_reviews: true,
                required_approving_review_count: 2,
                require_last_push_approval: true,
                bypass_pull_request_allowances: {
                    users: [
                        'octocat'
                    ],
                    teams: [
                        'justice-league'
                    ]
                }
            },
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
start().then(r => console.log('Repository created'));
