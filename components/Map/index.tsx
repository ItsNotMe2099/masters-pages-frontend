import GoogleMapReact from 'google-map-react';
import { ReactElement } from "react";
interface Props {
  children?: ReactElement[] | ReactElement
}

export default function Map(props) {
return ( <GoogleMapReact {...props}
  bootstrapURLKeys={{ key: 'AIzaSyC98uupkCH0cN_ukvBSUmPv6Gv1S3J13-4' }}
  defaultCenter={{lat: 43.907787, lng: -79.359741}}
  defaultZoom={4}
                         {...props}
>
  {props.children}
</GoogleMapReact>)
}
