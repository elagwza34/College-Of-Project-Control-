import RouteProblems from '@/components/feature/RouteLanding/RouteProblems';
import { problemsData } from "../routeData";

/** Section: Why This Route. */
export default function WhyThisRoute() {
  return (
    <RouteProblems {...problemsData} />
  );
}
