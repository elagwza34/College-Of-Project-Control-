import RouteWhoFor from '@/components/feature/RouteLanding/RouteWhoFor';
import { whoForData } from "../routeData";

/** Section: Who Should Choose the Strategic + Operational Route?. */
export default function WhoShouldChooseTheStrategicOperationalRoute() {
  return (
    <RouteWhoFor {...whoForData} />
  );
}
