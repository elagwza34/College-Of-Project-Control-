import { useLocation } from 'react-router-dom';
import TestimonialsSection from './TestimonialsSection';
import { programmeReviewRoutes } from '@/services/testimonialsApi';

export default function ProgrammeTestimonials() {
  const { pathname } = useLocation();
  const programme = programmeReviewRoutes[pathname.replace(/\/$/, '')];
  return programme ? <TestimonialsSection key={programme} programme={programme} id="testimonials" /> : null;
}
