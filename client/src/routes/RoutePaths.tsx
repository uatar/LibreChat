const SUBPATH = import.meta.env.VITE_DOMAIN_SUBPATH || '';

const withBase = (p: string) => `${basePath}${p.startsWith('/') ? '' : '/'}${p}`;

export const paths = {
    login: 'login',
    login2fa: 'login/2fa',
    register: 'register',
    forgotPassword: 'forgot-password',
    resetPassword: 'reset-password',
    verifyEmail: 'verify',
    oauthError: 'oauth/error',
    dashboardPrompts: 'd/prompts',
    dashboardFiles: 'd/files',
    newConversation: 'c/new',
    conversation: 'c/:conversationId?',
    search: 'search',
    share: 'share/:shareId',
} as const;

export const basePath = SUBPATH.endsWith('/') ? SUBPATH.slice(0, -1) : SUBPATH;

export const fullPaths = Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [key, withBase(value)]),
) as Record<keyof typeof paths, string>;