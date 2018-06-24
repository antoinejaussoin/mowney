export const getToken = state => state.user.token;
export const getError = state => state.user.error;
export const isPending = state => state.user.pending;
export const getCurrentUser = state => state.user.email;
export const getCurrentLanguage = state => state.user.lang;
export const selectIsLoggedIn = state => !!state.user.id;
