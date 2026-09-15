import RouteChoose from '@/components/feature/RouteLanding/RouteChoose';
import { chooseData } from "../routeData";

/** Section: Choose the Right Access Route. */
export default function ChooseTheRightAccessRoute() {
  return (
    <RouteChoose {...chooseData} />
  );
}
