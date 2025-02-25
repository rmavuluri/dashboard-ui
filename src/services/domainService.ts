import { DomainTree } from '../types/domain';
import { StorageService } from '../services/storageService';

const DOMAIN_STORAGE_KEY = 'domainTree';

export const getDomainTree = (): DomainTree => {
  try {
    const data = StorageService.getItem<DomainTree>(DOMAIN_STORAGE_KEY);
    return data || { domains: [] };
  } catch (error) {
    console.error('Error getting domain tree:', error);
    return { domains: [] };
  }
};

export const saveDomainTree = (tree: DomainTree): boolean => {
  try {
    StorageService.setItem(DOMAIN_STORAGE_KEY, tree);
    return true;
  } catch (error) {
    console.error('Error saving domain tree:', error);
    return false;
  }
};

export const addDomainWithSubdomain = (domain: string, subdomain: string): boolean => {
  try {
    const tree = getDomainTree();
    let domainNode = tree.domains.find(d => d.name === domain);

    if (!domainNode) {
      domainNode = {
        id: Date.now().toString(),
        name: domain,
        subDomains: []
      };
      tree.domains.push(domainNode);
    }

    if (subdomain && !domainNode.subDomains.find(sd => sd.name === subdomain)) {
      domainNode.subDomains.push({
        id: Date.now().toString(),
        name: subdomain,
        subDomains: []
      });
    }

    return saveDomainTree(tree);
  } catch (error) {
    console.error('Error adding domain with subdomain:', error);
    return false;
  }
};

export const removeDomainIfUnused = (domain: string, subdomain?: string): boolean => {
  try {
    const tree = getDomainTree();
    const domainIndex = tree.domains.findIndex(d => d.name === domain);
    
    if (domainIndex === -1) return true;

    if (subdomain) {
      // Remove only the subdomain
      const domainNode = tree.domains[domainIndex];
      const subdomainIndex = domainNode.subDomains.findIndex(sd => sd.name === subdomain);
      if (subdomainIndex !== -1) {
        domainNode.subDomains.splice(subdomainIndex, 1);
        // If no more subdomains and no entries reference this domain, remove the domain
        if (domainNode.subDomains.length === 0) {
          tree.domains.splice(domainIndex, 1);
        }
      }
    } else {
      // Remove the entire domain
      tree.domains.splice(domainIndex, 1);
    }

    return saveDomainTree(tree);
  } catch (error) {
    console.error('Error removing domain:', error);
    return false;
  }
};