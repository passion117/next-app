import { useLoadScript, GoogleMap, MarkerF, Marker } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/router';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import PinSetting from '../../pages/home/pinSetting';
import styles from '../../styles/home.module.css';
import Image from 'next/image';
const Map: NextPage = () => {
  
  const router = useRouter()
  const isPinSettingView = useSelector(state => state.isPinSettingView);
  const [places, setPlaces] = useState<any[]>([]);
  const [settingView, setSettingView] = useState(isPinSettingView);
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = { lat: 35.6895, lng: 139.6917 };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  const mapClicked = (info: any) => {
    if (places.length === 3) return
    const updatedPosition = [...places, { id: `map-${places.length}`, pos: { lat: info.lat, lng: info.lng } }];
    geocodeLatLng(geocoder, map, infowindow, updatedPosition);
    setSettingView(true);
  }
  const time = moment().format('h:mm');
  const MyPin = () => (
    <div>
      <Image src="/Pin.svg" alt="Custom Pin" />
    </div>
  );
  
  let map : google.maps.Map;
  let infowindow = new google.maps.InfoWindow();
  let geocoder= new google.maps.Geocoder();

  const geocodeLatLng = (geocoder: any, map: any, infowindow : any, updatedPosition: any) => {
    console.log('here=>', geocoder, map, infowindow, updatedPosition);
    setPlaces(updatedPosition);

    geocoder
    .geocode({ location: updatedPosition[0].pos })
    .then((response: any) => {
      console.log('here=>', infowindow)
      if (response.results[0]) {
        map.setZoom(11);
        
        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
        });
        
        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
        console.log('here=>', infowindow)
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }

  return (
    <>
      <div className={styles.Map}>
        <div className={styles.Topbtn}>
          <div>
            <div className={styles.floatBtn}>
              <span>鹿児島</span>
              <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
              <span>ユーザー数 :</span>
              <span>1234人</span>
            </div>
          </div>
        </div>
        <p className={styles.notice}>長押しでピンを立てる</p>
        <GoogleMap
          onClick={(e: any) => mapClicked(e.latLng.toJSON())}
          options={mapOptions}
          zoom={14}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={() => console.log('Map Component Loaded...')}
        >
          <p>{time}</p>
          {places.map((place: any) => (
            <Marker
              title={time}
              key={place.id}
              map={map}
              position={place.pos}
              icon={<MyPin />}
            />
            ))
          }
        </GoogleMap>
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log('Marker Loaded')}
        />
        { settingView ? (

        <PinSetting open={settingView} position={places[0].pos}>
          
        </PinSetting>

        ): null }
      </div>
    </>
  );
};

export default Map;