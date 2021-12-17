import { createSelector } from "reselect";
import { RootState } from "../app/store";
import { makeHealthKey } from "../utilities/make-key";

export const getSessionState = (state: RootState) => state.health;

export const selectHealth = (env: "nav1" | "nav2", type: "nsk" | "api") =>
  createSelector(getSessionState, (state) =>
    state.environmentHealth.find(
      (health) => health.key === makeHealthKey(env, type)
    )
  );
