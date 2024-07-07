// constants.js
export const businessLimits = {
  free: 1,
  personal: 1,
  professional: 3,
  enterprise: 10,
};

export const postsPerDayLimits = {
  free: 1,
  personal: 3,
  professional: 3,
  enterprise: 5,
};

export const postsPerMonthLimits = {
  free: 10,
  personal: 200,
  professional: 800,
  enterprise: 9999,
};

export const socialAccountsLimits = {
  free: 1,
  personal: 3,
  professional: 8,
  enterprise: 8,
};

export type PlanName = keyof typeof businessLimits;
