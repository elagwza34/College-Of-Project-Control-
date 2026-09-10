import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const NotFound = lazy(() => import('../pages/NotFound'));
const Home = lazy(() => import('../pages/home/page'));
const EmployersPage = lazy(() => import('../pages/employers/page'));
const ApprenticesPage = lazy(() => import('../pages/apprentices/page'));
const ApmLevel4 = lazy(() => import('../pages/apm-level-4/page'));
const ApprenticeshipEligibilityCheckerPage = lazy(() => import('../pages/apprenticeship-eligibility-checker/page'));
const EmployerAgreementPage = lazy(() => import('../pages/employer-agreement/page'));
const GovernanceBoardPage = lazy(() => import('../pages/governance-board/page'));
const EventsPage = lazy(() => import('../pages/events/page'));
const EventDetailPage = lazy(() => import('../pages/events/detail'));
const ArticlesPage = lazy(() => import('../pages/articles/page'));
const ArticleDetailPage = lazy(() => import('../pages/articles/detail'));
const PcpMaster = lazy(() => import('../pages/pcp-master/page'));
const StrategicPcp = lazy(() => import('../pages/strategic-pcp/page'));
const OperationalPcp = lazy(() => import('../pages/operational-pcp/page'));
const StrategicOperationalPcp = lazy(() => import('../pages/strategic-operational-pcp/page'));
const PmoPcp = lazy(() => import('../pages/pmo-pcp/page'));
const CharteredPmoPathway = lazy(() => import('../pages/chartered-pmo-pathway/page'));
const OperationalPcpConstruction = lazy(() => import('../pages/operational-pcp-construction/page'));
const OperationalPcpEngineering = lazy(() => import('../pages/operational-pcp-engineering/page'));
const OperationalPcpPublicSector = lazy(() => import('../pages/operational-pcp-public-sector/page'));
const OperationalPcpEnergy = lazy(() => import('../pages/operational-pcp-energy/page'));
const ThankYouEligibility = lazy(() => import('../pages/thank-you/eligibility'));
const ThankYouConsultation = lazy(() => import('../pages/thank-you/consultation'));
const ThankYouEventbrite = lazy(() => import('../pages/thank-you/eventbrite'));
const ThankYouCommercial = lazy(() => import('../pages/thank-you/commercial'));
const ThankYouGuide = lazy(() => import('../pages/thank-you/guide'));
const CampaignHrEmployer = lazy(() => import('../pages/campaign/hr-employer/page'));
const CampaignHeadOfPmo = lazy(() => import('../pages/campaign/head-of-pmo/page'));
const CampaignConstruction = lazy(() => import('../pages/campaign/construction/page'));
const CampaignEnergy = lazy(() => import('../pages/campaign/energy/page'));
const CampaignPublicSector = lazy(() => import('../pages/campaign/public-sector/page'));
const CampaignCommercialRoute = lazy(() => import('../pages/campaign/commercial-route/page'));
const KnowledgeHub = lazy(() => import('../pages/knowledge-hub/page'));
const ArticleWhatIsPcp = lazy(() => import('../pages/knowledge-hub/what-is-pcp-apprenticeship'));
const ArticleFundedEmployerGuide = lazy(() => import('../pages/knowledge-hub/funded-pcp-employer-guide'));
const ArticlePcpVsPmp = lazy(() => import('../pages/knowledge-hub/pcp-vs-pmp'));
const ArticleChppReadiness = lazy(() => import('../pages/knowledge-hub/apm-chpp-readiness'));
const ArticleStrategicVsOperational = lazy(() => import('../pages/knowledge-hub/strategic-vs-operational'));
const ArticleConstructionTraining = lazy(() => import('../pages/knowledge-hub/construction-training'));
const ArticleEnergyTraining = lazy(() => import('../pages/knowledge-hub/energy-training'));
const ArticlePmoGovernance = lazy(() => import('../pages/knowledge-hub/pmo-governance-training'));
const ArticleEmployerFunding = lazy(() => import('../pages/knowledge-hub/employer-apprenticeship-funding'));
const ArticleCommercialRoutes = lazy(() => import('../pages/knowledge-hub/commercial-routes-explained'));
const TestimonialsPage = lazy(() => import('../pages/testimonials/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const BookASessionPage = lazy(() => import('../pages/book-a-session/page'));
const FaqPage = lazy(() => import('../pages/faq/page'));
const ProgrammesPage = lazy(() => import('../pages/programmes/page'));
const MentorDetailPage = lazy(() => import('../pages/mentors/detail'));
const AboutPage = lazy(() => import('../pages/about/page'));
const IpcPage = lazy(() => import('../pages/ipc/page'));
const LegalPage = lazy(() => import('../pages/legal/LegalPage'));

const routes: RouteObject[] = [
  { path: "/events/:slug", element: <EventDetailPage /> },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/programmes",
    element: <ProgrammesPage />,
  },
  {
    path: "/mentors/:id",
    element: <MentorDetailPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/institute-of-project-controls",
    element: <IpcPage />,
  },
  {
    path: "/ipc",
    element: <IpcPage />,
  },
  // Associate Project Manager Level 4
  {
    path: "/associate-project-manager-level-4",
    element: <ApmLevel4 />,
  },
  {
    path: "/employers",
    element: <EmployersPage />,
  },
  {
    path: "/employer-agreement",
    element: <EmployerAgreementPage />,
  },
  {
    path: "/governance-board",
    element: <GovernanceBoardPage />,
  },
  {
    path: "/events",
    element: <EventsPage />,
  },
  {
    path: "/articles",
    element: <ArticlesPage />,
  },
  {
    path: "/articles/:slug",
    element: <ArticleDetailPage />,
  },
  {
    path: "/apprentices",
    element: <ApprenticesPage />,
  },
  // Apprenticeship Eligibility Checker
  {
    path: "/apprenticeship-eligibility-checker",
    element: <ApprenticeshipEligibilityCheckerPage />,
  },
  // PCP Master Landing Page — canonical URL
  {
    path: "/project-controls-professional-level-6",
    element: <PcpMaster />,
  },
  // Legacy alias
  {
    path: "/pcp-master",
    element: <PcpMaster />,
  },
  // Strategic PCP Route
  {
    path: "/project-controls-professional/strategic-route",
    element: <StrategicPcp />,
  },
  {
    path: "/strategic-pcp",
    element: <StrategicPcp />,
  },
  // Operational PCP Route
  {
    path: "/project-controls-professional/operational-route",
    element: <OperationalPcp />,
  },
  {
    path: "/operational-pcp",
    element: <OperationalPcp />,
  },
  // Strategic + Operational Combined
  {
    path: "/project-controls-professional/strategic-operational-route",
    element: <StrategicOperationalPcp />,
  },
  {
    path: "/strategic-operational-pcp",
    element: <StrategicOperationalPcp />,
  },
  // PMO & Governance PCP Route
  {
    path: "/project-controls-professional/pmo-governance-route",
    element: <PmoPcp />,
  },
  {
    path: "/pmo-pcp",
    element: <PmoPcp />,
  },
  // Chartered PMO Pathway
  {
    path: "/project-controls-professional/chartered-pmo-pathway",
    element: <CharteredPmoPathway />,
  },
  {
    path: "/chartered-pmo-pathway",
    element: <CharteredPmoPathway />,
  },
  // Construction Route
  {
    path: "/project-controls-professional/construction-route",
    element: <OperationalPcpConstruction />,
  },
  {
    path: "/operational-pcp-construction",
    element: <OperationalPcpConstruction />,
  },
  // Engineering, Manufacturing & Aerospace Route
  {
    path: "/project-controls-professional/engineering-manufacturing-aerospace-route",
    element: <OperationalPcpEngineering />,
  },
  {
    path: "/operational-pcp-engineering",
    element: <OperationalPcpEngineering />,
  },
  // Public Sector & Councils Route
  {
    path: "/project-controls-professional/public-sector-councils-route",
    element: <OperationalPcpPublicSector />,
  },
  {
    path: "/operational-pcp-public-sector",
    element: <OperationalPcpPublicSector />,
  },
  // Energy, Oil, Gas, Utilities & Net Zero Route
  {
    path: "/project-controls-professional/energy-oil-gas-utilities-route",
    element: <OperationalPcpEnergy />,
  },
  {
    path: "/operational-pcp-energy",
    element: <OperationalPcpEnergy />,
  },
  // Commercial Route
  {
    path: "/commercial-project-controls-route",
    element: <CampaignCommercialRoute />,
  },
  // Campaign Landing Pages
  {
    path: "/campaign/hr-employer",
    element: <CampaignHrEmployer />,
  },
  {
    path: "/campaign/head-of-pmo",
    element: <CampaignHeadOfPmo />,
  },
  {
    path: "/campaign/construction",
    element: <CampaignConstruction />,
  },
  {
    path: "/campaign/energy",
    element: <CampaignEnergy />,
  },
  {
    path: "/campaign/public-sector",
    element: <CampaignPublicSector />,
  },
  {
    path: "/campaign/commercial-route",
    element: <CampaignCommercialRoute />,
  },
  // Thank-you Pages
  {
    path: "/thank-you/eligibility",
    element: <ThankYouEligibility />,
  },
  {
    path: "/thank-you/consultation",
    element: <ThankYouConsultation />,
  },
  {
    path: "/thank-you/eventbrite",
    element: <ThankYouEventbrite />,
  },
  {
    path: "/thank-you/commercial",
    element: <ThankYouCommercial />,
  },
  {
    path: "/thank-you/guide",
    element: <ThankYouGuide />,
  },
  // Knowledge Hub
  {
    path: "/knowledge-hub",
    element: <KnowledgeHub />,
  },
  {
    path: "/knowledge-hub/what-is-pcp-apprenticeship",
    element: <ArticleWhatIsPcp />,
  },
  {
    path: "/knowledge-hub/fully-funded-project-controls-apprenticeship",
    element: <ArticleFundedEmployerGuide />,
  },
  {
    path: "/knowledge-hub/funded-pcp-employer-guide",
    element: <ArticleFundedEmployerGuide />,
  },
  {
    path: "/knowledge-hub/project-controls-level-6-vs-pmp",
    element: <ArticlePcpVsPmp />,
  },
  {
    path: "/knowledge-hub/pcp-vs-pmp",
    element: <ArticlePcpVsPmp />,
  },
  {
    path: "/knowledge-hub/apm-chpp-readiness-support",
    element: <ArticleChppReadiness />,
  },
  {
    path: "/knowledge-hub/apm-chpp-readiness",
    element: <ArticleChppReadiness />,
  },
  {
    path: "/knowledge-hub/strategic-vs-operational",
    element: <ArticleStrategicVsOperational />,
  },
  {
    path: "/knowledge-hub/construction-training",
    element: <ArticleConstructionTraining />,
  },
  {
    path: "/knowledge-hub/energy-training",
    element: <ArticleEnergyTraining />,
  },
  {
    path: "/knowledge-hub/pmo-governance-training",
    element: <ArticlePmoGovernance />,
  },
  {
    path: "/knowledge-hub/employer-apprenticeship-funding",
    element: <ArticleEmployerFunding />,
  },
  {
    path: "/knowledge-hub/commercial-routes-explained",
    element: <ArticleCommercialRoutes />,
  },
  // Testimonials Page
  {
    path: "/testimonials",
    element: <TestimonialsPage />,
  },
  // Contact Page
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/book-a-session",
    element: <BookASessionPage />,
  },
  {
    path: "/faq",
    element: <FaqPage />,
  },
  {
    path: "/privacy",
    element: <LegalPage page="privacy" />,
  },
  {
    path: "/terms",
    element: <LegalPage page="terms" />,
  },
  {
    path: "/accessibility",
    element: <LegalPage page="accessibility" />,
  },
  {
    path: "/cookies",
    element: <LegalPage page="cookies" />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
