import type { AssistantsEndpoint } from './schemas';
import * as q from './types/queries';

const SUBPATH = process.env.DOMAIN_SUBPATH || '';
const basePath = SUBPATH.endsWith('/') ? SUBPATH.slice(0, -1) : SUBPATH;

// Testing this buildQuery function
const buildQuery = (params: Record<string, unknown>): string => {
  const query = Object.entries(params)
    .filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&');
      }
      return `${key}=${encodeURIComponent(String(value))}`;
    })
    .join('&');
  return query ? `?${query}` : '';
};

export const health = () => `${basePath}/health`;
export const user = () => `${basePath}/api/user`;

export const balance = () => `${basePath}/api/balance`;

export const userPlugins = () => `${basePath}/api/user/plugins`;

export const deleteUser = () => `${basePath}/api/user/delete`;

export const messages = (params: q.MessagesListParams) => {
  const { conversationId, messageId, ...rest } = params;

  if (conversationId && messageId) {
    return `${basePath}/api/messages/${conversationId}/${messageId}`;
  }

  if (conversationId) {
    return `${basePath}/api/messages/${conversationId}`;
  }

  return `${basePath}/api/messages${buildQuery(rest)}`;
};

const shareRoot = `${basePath}/api/share`;
export const shareMessages = (shareId: string) => `${shareRoot}/${shareId}`;
export const getSharedLink = (conversationId: string) => `${shareRoot}/link/${conversationId}`;
export const getSharedLinks = (
  pageSize: number,
  isPublic: boolean,
  sortBy: 'title' | 'createdAt',
  sortDirection: 'asc' | 'desc',
  search?: string,
  cursor?: string,
) =>
  `${shareRoot}?pageSize=${pageSize}&isPublic=${isPublic}&sortBy=${sortBy}&sortDirection=${sortDirection}${
      search ? `&search=${search}` : ''
  }${cursor ? `&cursor=${cursor}` : ''}`;
export const createSharedLink = (conversationId: string) => `${shareRoot}/${conversationId}`;
export const updateSharedLink = (shareId: string) => `${shareRoot}/${shareId}`;

const keysEndpoint = `${basePath}/api/keys`;

export const keys = () => keysEndpoint;

export const userKeyQuery = (name: string) => `${keysEndpoint}?name=${name}`;

export const revokeUserKey = (name: string) => `${keysEndpoint}/${name}`;

export const revokeAllUserKeys = () => `${keysEndpoint}?all=true`;

export const abortRequest = (endpoint: string) => `${basePath}/api/ask/${endpoint}/abort`;

export const conversationsRoot = `${basePath}/api/convos`;

export const conversations = (params: q.ConversationListParams) => {
  return `${conversationsRoot}${buildQuery(params)}`;
};

export const conversationById = (id: string) => `${conversationsRoot}/${id}`;

export const genTitle = () => `${conversationsRoot}/gen_title`;

export const updateConversation = () => `${conversationsRoot}/update`;

export const deleteConversation = () => `${conversationsRoot}`;

export const deleteAllConversation = () => `${conversationsRoot}/all`;

export const importConversation = () => `${conversationsRoot}/import`;

export const forkConversation = () => `${conversationsRoot}/fork`;

export const duplicateConversation = () => `${conversationsRoot}/duplicate`;

export const search = (q: string, cursor?: string | null) =>
  `${basePath}/api/search?q=${q}${cursor ? `&cursor=${cursor}` : ''}`;

export const searchEnabled = () => `${basePath}/api/search/enable`;

export const presets = () => `${basePath}/api/presets`;

export const deletePreset = () => `${basePath}/api/presets/delete`;

export const aiEndpoints = () => `${basePath}/api/endpoints`;

export const endpointsConfigOverride = () => `${basePath}/api/endpoints/config/override`;

export const models = () => `${basePath}/api/models`;

export const tokenizer = () => `${basePath}/api/tokenizer`;

export const login = () => `${basePath}/api/auth/login`;

export const logout = () => `${basePath}/api/auth/logout`;

export const register = () => `${basePath}/api/auth/register`;

export const loginFacebook = () => `${basePath}/api/auth/facebook`;

export const loginGoogle = () => `${basePath}/api/auth/google`;

export const refreshToken = (retry?: boolean) =>
  `${basePath}/api/auth/refresh${retry === true ? '?retry=true' : ''}`;

export const requestPasswordReset = () => `${basePath}/api/auth/requestPasswordReset`;

export const resetPassword = () => `${basePath}/api/auth/resetPassword`;

export const verifyEmail = () => `${basePath}/api/user/verify`;

export const resendVerificationEmail = () => `${basePath}/api/user/verify/resend`;

export const plugins = () => `${basePath}/api/plugins`;

export const config = () => `${basePath}/api/config`;

export const prompts = () => `${basePath}/api/prompts`;

export const assistants = ({
  path = '',
  options,
  version,
  endpoint,
  isAvatar,
}: {
  path?: string;
  options?: object;
  endpoint?: AssistantsEndpoint;
  version: number | string;
  isAvatar?: boolean;
}) => {
  let url = isAvatar === true ? `${images()}/assistants` : `${basePath}/api/assistants/v${version}`;

  if (path && path !== '') {
    url += `/${path}`;
  }

  if (endpoint) {
    options = {
      ...(options ?? {}),
      endpoint,
    };
  }

  if (options && Object.keys(options).length > 0) {
    const queryParams = new URLSearchParams(options as Record<string, string>).toString();
    url += `?${queryParams}`;
  }

  return url;
};

export const agents = ({ path = '', options }: { path?: string; options?: object }) => {
  let url = `${basePath}/api/agents`;

  if (path && path !== '') {
    url += `/${path}`;
  }

  if (options && Object.keys(options).length > 0) {
    const queryParams = new URLSearchParams(options as Record<string, string>).toString();
    url += `?${queryParams}`;
  }

  return url;
};

export const files = () => `${basePath}/api/files`;

export const images = () => `${files()}/images`;

export const avatar = () => `${images()}/avatar`;

export const speech = () => `${files()}/speech`;

export const speechToText = () => `${speech()}/stt`;

export const textToSpeech = () => `${speech()}/tts`;

export const textToSpeechManual = () => `${textToSpeech()}/manual`;

export const textToSpeechVoices = () => `${textToSpeech()}/voices`;

export const getCustomConfigSpeech = () => `${speech()}/config/get`;

export const getPromptGroup = (_id: string) => `${prompts()}/groups/${_id}`;

export const getPromptGroupsWithFilters = (filter: object) => {
  let url = `${prompts()}/groups`;
  if (Object.keys(filter).length > 0) {
    const queryParams = new URLSearchParams(filter as Record<string, string>).toString();
    url += `?${queryParams}`;
  }
  return url;
};

export const getPromptsWithFilters = (filter: object) => {
  let url = prompts();
  if (Object.keys(filter).length > 0) {
    const queryParams = new URLSearchParams(filter as Record<string, string>).toString();
    url += `?${queryParams}`;
  }
  return url;
};

export const getPrompt = (_id: string) => `${prompts()}/${_id}`;

export const getRandomPrompts = (limit: number, skip: number) =>
  `${prompts()}/random?limit=${limit}&skip=${skip}`;

export const postPrompt = prompts;

export const updatePromptGroup = getPromptGroup;

export const updatePromptLabels = (_id: string) => `${getPrompt(_id)}/labels`;

export const updatePromptTag = (_id: string) => `${getPrompt(_id)}/tags/production`;

export const deletePromptGroup = getPromptGroup;

export const deletePrompt = ({ _id, groupId }: { _id: string; groupId: string }) => {
  return `${prompts()}/${_id}?groupId=${groupId}`;
};

export const getCategories = () => `${basePath}/api/categories`;

export const getAllPromptGroups = () => `${prompts()}/all`;

/* Roles */
export const roles = () => `${basePath}/api/roles`;
export const getRole = (roleName: string) => `${roles()}/${roleName.toLowerCase()}`;
export const updatePromptPermissions = (roleName: string) => `${getRole(roleName)}/prompts`;
export const updateAgentPermissions = (roleName: string) => `${getRole(roleName)}/agents`;

/* Conversation Tags */
export const conversationTags = (tag?: string) =>
  `${basePath}/api/tags${tag != null && tag ? `/${encodeURIComponent(tag)}` : ''}`;

export const conversationTagsList = (pageNumber: string, sort?: string, order?: string) =>
  `${conversationTags()}/list?pageNumber=${pageNumber}${sort ? `&sort=${sort}` : ''}${
      order ? `&order=${order}` : ''
  }`;

export const addTagToConversation = (conversationId: string) =>
  `${conversationTags()}/convo/${conversationId}`;

export const userTerms = () => `${basePath}/api/user/terms`;
export const acceptUserTerms = () => `${basePath}/api/user/terms/accept`;
export const banner = () => `${basePath}/api/banner`;

// Two-Factor Endpoints
export const enableTwoFactor = () => `${basePath}/api/auth/2fa/enable`;
export const verifyTwoFactor = () => `${basePath}/api/auth/2fa/verify`;
export const confirmTwoFactor = () => `${basePath}/api/auth/2fa/confirm`;
export const disableTwoFactor = () => `${basePath}/api/auth/2fa/disable`;
export const regenerateBackupCodes = () => `${basePath}/api/auth/2fa/backup/regenerate`;
export const verifyTwoFactorTemp = () => `${basePath}/api/auth/2fa/verify-temp`;

