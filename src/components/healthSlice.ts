import { EnvironmentHealth } from "@navitaire-digital/nsk-api-4.5.0";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HealthState {
  environmentHealth: {
    key: string;
    health: EnvironmentHealth | null;
    status: "LOADING" | "ERROR" | "SUCCESS";
  }[];
}

const initialState: HealthState = {
  environmentHealth: [],
};

export const healthSlice = createSlice({
  name: "state.health",
  initialState,
  reducers: {
    SetHealth: (
      state,
      action: PayloadAction<{ key: string; health: EnvironmentHealth }>
    ) => {
      const foundHealth = state.environmentHealth.find(
        (health) => health.key === action.payload.key
      );
      if (!foundHealth) {
        state.environmentHealth.push({
          key: action.payload.key,
          health: action.payload.health,
          status: "SUCCESS",
        });
      } else {
        foundHealth.health = action.payload.health;
        foundHealth.status = "SUCCESS";
      }
    },
    SetHealthStatus: (
      state,
      action: PayloadAction<{
        key: string;
        status: "LOADING" | "ERROR" | "SUCCESS";
      }>
    ) => {
      const foundHealth = state.environmentHealth.find(
        (health) => health.key === action.payload.key
      );
      if (!foundHealth) {
        state.environmentHealth.push({
          key: action.payload.key,
          health: null,
          status: action.payload.status,
        });
      } else {
        foundHealth.status = action.payload.status;
      }
    },
  },
});

export const { SetHealth, SetHealthStatus } = healthSlice.actions;

export default healthSlice.reducer;
