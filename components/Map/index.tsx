import GoogleMapReact from 'google-map-react';
interface Props {

}

export default function Map(props) {
return ( <GoogleMapReact
  bootstrapURLKeys={{ key: 'AIzaSyAdpwap4LRJ0jqP5SI3b6hcS0AJvMNuAII' }}
  defaultCenter={{lat: 43.907787, lng: -79.359741}}
  defaultZoom={4}
>
</GoogleMapReact>)
}
