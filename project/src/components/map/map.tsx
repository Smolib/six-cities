import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../consts';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';

type MapProps = {
  city: City;
  offers: Offer[];
  cssClassOfMap: string;
  mainOffer?: Offer;
};

function Map({
  city,
  offers,
  cssClassOfMap,
  mainOffer,
}: MapProps): JSX.Element {
  const selectedOffer = useAppSelector((state) => state.OFFERS.activeCard);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
        { animate: true, duration: 2 }
      );
    }
  }, [map, city]);

  useEffect(() => {
    const markers = leaflet.layerGroup();
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                (mainOffer || selectedOffer)?.id === offer.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(markers);
      });
      markers.addTo(map);
    }
    return () => {
      markers.clearLayers();
    };
  }, [
    currentCustomIcon,
    defaultCustomIcon,
    mainOffer,
    map,
    offers,
    selectedOffer,
  ]);

  return (
    <section className={`${cssClassOfMap} map`}>
      <div style={{ height: '100%' }} ref={mapRef} />
    </section>
  );
}

export default Map;
