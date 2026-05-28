import elantraImg from '@/assets/images/cars/elantra.png';
import i30nImg from '@/assets/images/cars/i30n.png';
import cretaImg from '@/assets/images/cars/creta.png';
import sonataImg from '@/assets/images/cars/sonata.png';
import solarisImg from '@/assets/images/cars/solaris.png';
import tucsonImg from '@/assets/images/cars/tucson.png';

export function pickCarImage(name: string | null | undefined): string {
  const n = (name || '').toLowerCase();
  if (n.includes('elantra')) return elantraImg;
  if (n.includes('creta')) return cretaImg;
  if (n.includes('sonata')) return sonataImg;
  if (n.includes('solaris')) return solarisImg;
  if (n.includes('tucson')) return tucsonImg;
  return i30nImg;
}
