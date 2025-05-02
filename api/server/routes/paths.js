const SUBPATH = process.env.DOMAIN_SUBPATH || '';

const withBase = (p) => `${SUBPATH}${p.startsWith('/') ? '' : '/'}${p}`;

const paths = {
    login: 'login',
    login2fa: 'login/2fa',
    register: 'register',
    forgotPassword: 'forgot-password',
    resetPassword: 'reset-password',
    verifyEmail: 'verify',
    oauthError: 'oauth/error',
    dashboard: 'd',
    dashboardPrompts: 'd/prompts',
    dashboardPromptsNew: 'd/prompts/new',
    dashboardPromptsGroup: 'd/prompts/:groupId',
    dashboardFiles: 'd/files',
    dashboardVectorStores: 'd/vector-stores',
    newConversation: 'c/new',
    conversation: 'c/:conversationId?',
    search: 'search',
    share: 'share/:shareId',
};

const basePath = SUBPATH.endsWith('/') ? SUBPATH.slice(0, -1) : SUBPATH;

const fullPaths = Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [key, withBase(value)])
);

module.exports = {
    basePath,
    paths,
    fullPaths,
};