import L from 'leaflet';

export const makeIcon = (selected: boolean) =>
  L.divIcon({
    className: '',
    html: `<div style="
    width:18px;
    height:18px;
    border-radius:50%;
    background:${selected ? '#005bff' : '#0ec261'};
    border:3px solid #fff;
    box-shadow:0 2px 4px rgba(0,0,0,0.16);
    transition:background .15s;
  "></div>`,
    iconAnchor: [9, 9],
  });
