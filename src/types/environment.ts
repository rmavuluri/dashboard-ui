export type EnvironmentType = 'DEV' | 'QA' | 'CAP' | 'PSP' | 'PROD';

export interface Environment {
  type: EnvironmentType;
  enabled: boolean;
}

export const ENVIRONMENTS: EnvironmentType[] = ['DEV', 'QA', 'CAP', 'PSP', 'PROD'];

export const ENVIRONMENT_GROUPS = {
  Innovation: ['DEV'],
  'Non-Production': ['QA', 'CAP'],
  Production: ['PSP', 'PROD']
} as const;