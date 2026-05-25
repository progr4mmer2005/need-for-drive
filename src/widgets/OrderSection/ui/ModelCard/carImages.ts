export const CAR_IMAGES: Record<string, string> = {
  elantra: new URL('../../../../assets/images/cars/elantra.png', import.meta.url).href,
  i30: new URL('../../../../assets/images/cars/i30n.png', import.meta.url).href,
  creta: new URL('../../../../assets/images/cars/creta.png', import.meta.url).href,
  sonata: new URL('../../../../assets/images/cars/sonata.png', import.meta.url).href,
  solaris: new URL('../../../../assets/images/cars/solaris.png', import.meta.url).href,
  tucson: new URL('../../../../assets/images/cars/tucson.png', import.meta.url).href,
};

export function getCarImage(car: { id?: string; name?: string; image?: string } | null | undefined) {
  const source = `${car?.id || ''} ${car?.name || ''} ${car?.image || ''}`.toLowerCase();

  if (source.includes('elantra')) return CAR_IMAGES.elantra;
  if (source.includes('creta')) return CAR_IMAGES.creta;
  if (source.includes('sonata')) return CAR_IMAGES.sonata;
  if (source.includes('solaris')) return CAR_IMAGES.solaris;
  if (source.includes('tucson')) return CAR_IMAGES.tucson;
  return CAR_IMAGES.i30;
}


