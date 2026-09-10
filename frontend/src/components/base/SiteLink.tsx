import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { resolveDestination } from '@/router/navigation';
const SiteLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function SiteLink({ href = '/contact', children, ...props }, ref) {
  const { pathname } = useLocation();
  let destination = resolveDestination(href);
  if (destination === '/book-a-session' && pathname !== destination) destination += `?context=${encodeURIComponent(pathname)}`;
  const internal = (destination.startsWith('/') && !destination.startsWith('//')) || destination.startsWith('#');
  if (internal && !props.download && !/\.[a-z0-9]{2,5}(?:[?#]|$)/i.test(destination.split('#')[0])) {
    return <Link ref={ref} to={destination} {...props}>{children}</Link>;
  }
  return <a ref={ref} href={destination} {...props}>{children}</a>;
});
export default SiteLink;
