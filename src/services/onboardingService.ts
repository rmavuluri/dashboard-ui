import { OnboardingData } from './../types/onboarding';
import { addDomainWithSubdomain, removeDomainIfUnused } from './domainService';
import { StorageService } from '../services/storageService';
import { EnvironmentType, ENVIRONMENT_GROUPS } from '../types/environment';

export const getEnvironmentGroup = (environmentType: EnvironmentType): keyof typeof ENVIRONMENT_GROUPS | null => {
  for (const [group, environments] of Object.entries(ENVIRONMENT_GROUPS)) {
    if ([...environments].includes(environmentType)) {
      return group as keyof typeof ENVIRONMENT_GROUPS;
    }
  }
  return null;
};

export const getOnboardingById = (id: string): OnboardingData | null => {
  try {
    const { entries } = StorageService.getOnboarding();
    return entries.find((e: OnboardingData) => e.id === id) || null;
  } catch (error) {
    console.error('Error getting onboarding data:', error);
    return null;
  }
};

export const saveOnboardingData = (data: OnboardingData): boolean => {
  try {
    const onboardingData = StorageService.getOnboarding();
    const index = onboardingData.entries.findIndex((e: OnboardingData) => e.id === data.id);
    
    if (index >= 0) {
      onboardingData.entries[index] = data;
    } else {
      onboardingData.entries.push(data);
    }
    
    StorageService.setOnboarding(onboardingData);

    // Update domain tree when saving onboarding data
    if (data.domain) {
      addDomainWithSubdomain(data.domain, data.subDomain || '');
    }

    return true;
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return false;
  }
};

export const deleteOnboardingEntry = (id: string): boolean => {
  try {
    const onboardingData = StorageService.getOnboarding();
    const entry = onboardingData.entries.find((e: OnboardingData) => e.id === id);
    
    if (entry) {
      // Remove the entry
      onboardingData.entries = onboardingData.entries.filter((e: OnboardingData) => e.id !== id);
      StorageService.setOnboarding(onboardingData);
      
      // Check if domain/subdomain is still in use
      const isDomainInUse = onboardingData.entries.some(
        (e: OnboardingData) => e.domain === entry.domain
      );
      
      const isSubdomainInUse = onboardingData.entries.some(
        (e: OnboardingData) => e.domain === entry.domain && e.subDomain === entry.subDomain
      );

      // Remove domain/subdomain if no longer in use
      if (!isDomainInUse) {
        removeDomainIfUnused(entry.domain);
      } else if (!isSubdomainInUse && entry.subDomain) {
        removeDomainIfUnused(entry.domain, entry.subDomain);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting onboarding entry:', error);
    return false;
  }
};

export const getAllEntries = (type?: 'producer' | 'consumer'): OnboardingData[] => {
  try {
    const { entries } = StorageService.getOnboarding();
    if (!type) return entries || [];

    return (entries || []).filter((e: OnboardingData) => {
      const isProducer = e.onboardType === 'ECS_FARGATE_PRODUCER';
      return type === 'producer' ? isProducer : !isProducer;
    });
  } catch (error) {
    console.error('Error getting entries:', error);
    return [];
  }
};

export const getEntriesByEnvironmentGroup = (
  group: keyof typeof ENVIRONMENT_GROUPS,
  type?: 'producer' | 'consumer'
): OnboardingData[] => {
  const entries = getAllEntries(type);
  const environments = ENVIRONMENT_GROUPS[group];
  
  return entries.filter(entry => 
    entry.environments?.some(env => 
      [...environments].includes(env.type) && env.enabled
    )
  );
};