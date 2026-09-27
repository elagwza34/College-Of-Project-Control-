import SectorPathwayChoice from '@/components/feature/SectorPathwayChoice';
import { sectorConfig } from '../sectorData';

export default function RoleToProgrammePathway() {
  return <SectorPathwayChoice backgroundImage={sectorConfig.hero.sectorImage} />;
}
