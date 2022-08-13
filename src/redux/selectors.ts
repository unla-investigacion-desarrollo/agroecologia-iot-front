import { IProfile } from "../api/auth/models";
import { IGlobalState } from "./store";

export const getAuthUser = (state: IGlobalState): IProfile | undefined =>
  state.auth.profile;

export const getAuthToken = (state: IGlobalState): string | undefined =>
  state.auth.token;

export const getTokenExpire = (state: IGlobalState): string | undefined =>
  state.auth.expire;

export const isLoggedIn = (state: IGlobalState): boolean | undefined =>
  !!getAuthToken(state);
