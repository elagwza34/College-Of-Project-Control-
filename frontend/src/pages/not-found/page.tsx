import { useLocation } from 'react-router-dom';
import PageNotFound from "./components/PageNotFound";
export default function NotFound() {
  const location = useLocation();
  return (<PageNotFound location={location} />);
}
