import GoogleMapReact from 'google-map-react';
import { ReactElement } from "react";
interface Props {
  children?: ReactElement[] | ReactElement
}

export default function Map(props) {
return ( <GoogleMapReact {...props}
  bootstrapURLKeys={{ key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` }}
  defaultCenter={{lat: 43.907787, lng: -79.359741}}
  defaultZoom={4}
                         {...props}
>
  {props.children}
</GoogleMapReact>)
}
