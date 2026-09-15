import RouteNavbar from '@/components/feature/RouteLanding/RouteNavbar';
import { navLinks } from "../routeData";

/** Section: RouteNavbar. */
export default function RouteNavbarSection() {
  return (
    <RouteNavbar pageLabel="Combined" navLinks={navLinks} />
  );
}
