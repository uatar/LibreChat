const SUBPATH = import.meta.env.DOMAIN_SUBPATH || '';

const withBase = (p: string) => `${basePath}${p.startsWith('/') ? '' : '/'}${p}`;

export const paths = {
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
} as const;

export const basePath = SUBPATH.endsWith('/') ? SUBPATH.slice(0, -1) : SUBPATH;

// Used in general by navigate() router methods (in the client)
// Router already contains vite->base = basePath(subpath or /)
export const relativePaths = Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [key, `/${value}`])
) as Record<keyof typeof paths, string>;

// Used in general by redirects (from the server)
// Also used by href, to,
export const fullPaths = Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [key, withBase(value)]),
) as Record<keyof typeof paths, string>;