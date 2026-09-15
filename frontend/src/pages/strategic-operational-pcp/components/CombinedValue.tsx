import RouteStats from '@/components/feature/RouteLanding/RouteStats';
import { statsData } from "../routeData";

/** Section: Combined Value. */
export default function CombinedValue() {
  return (
    <RouteStats {...statsData} />
  );
}
