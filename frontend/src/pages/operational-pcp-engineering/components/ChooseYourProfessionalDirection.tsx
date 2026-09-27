import SectorPathwayChoice from '@/components/feature/SectorPathwayChoice';
import { sectorConfig } from '../sectorData';

/** Section: Choose your professional direction. */
export default function ChooseYourProfessionalDirection() {
  return (
    <SectorPathwayChoice backgroundImage={sectorConfig.hero.sectorImage} />
  );
}
