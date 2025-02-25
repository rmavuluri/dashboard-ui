import Dashboard from '../pages/Dashboard';
import OnboardingForm from '../components/onboarding/OnboardingForm';
import DomainManagement from '../pages/DomainManagement';
import ProducersPage from '../pages/ProducersPage';
import ConsumersPage from '../pages/ConsumersPage';
import OnboardedAppsPage from '../pages/OnboardedAppsPage';
import RoadmapPage from '../pages/RoadmapPage';
import { Route } from 'react-router-dom';
export const AppRoutes = (
    
  <>
    <Route index element={<Dashboard />} />
    <Route path="onboard" element={<OnboardingForm />} />
    <Route path="onboard/:id" element={<OnboardingForm />} />
    <Route path="producers/new" element={<OnboardingForm />} />
    <Route path="consumers/new" element={<OnboardingForm />} />
    <Route path="domain" element={<DomainManagement />} />
    <Route path="producers" element={<ProducersPage />} />
    <Route path="consumers" element={<ConsumersPage />} />
    <Route path="onboarded-apps" element={<OnboardedAppsPage />} />
    <Route path="roadmap" element={<RoadmapPage />} />
  </>
);