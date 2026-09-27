import { useLocation } from 'react-router-dom';
import TestimonialsSection from './TestimonialsSection';
import { programmeReviewRoutes } from '@/services/testimonialsApi';

const hiddenOnRoutes = new Set([
  '/operational-pcp-energy',
  '/project-controls-professional/energy-oil-gas-utilities-route',
  '/operational-pcp-public-sector',
  '/project-controls-professional/public-sector-councils-route',
  '/operational-pcp-engineering',
  '/project-controls-professional/engineering-manufacturing-aerospace-route',
]);

export default function ProgrammeTestimonials() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/$/, '');
  if (hiddenOnRoutes.has(normalizedPath)) return null;
  const programme = programmeReviewRoutes[normalizedPath];
  return programme ? <TestimonialsSection key={programme} programme={programme} id="testimonials" /> : null;
}
