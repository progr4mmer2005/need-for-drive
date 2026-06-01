export interface ILeafletMapPoint {
  id: string;
  name: string;
  address: string;
}

export interface IGeoPoint extends ILeafletMapPoint {
  coords: [number, number];
}

export interface ILeafletMapProps {
  cityName: string;
  points: ILeafletMapPoint[];
  selectedId?: string;
  onPointSelect: (id: string) => void;
}
