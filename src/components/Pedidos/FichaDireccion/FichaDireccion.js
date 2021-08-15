import { Modal, Button, Label } from "semantic-ui-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const duckIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconAnchor: new L.Point(0, 0),
  popupAnchor: new L.Point(16, 0),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(32, 45),
  // className: 'leaflet-div-icon'
});

const FichaDireccion = ({ datosDireccion, setShowModal }) => {
  
  const { position = [], direccion } = datosDireccion;

  return ( 
    <>
      <Modal.Header>Examinar Dirección</Modal.Header>
      <Modal.Content>
      <div className="ui form" style={{marginBottom: 10}}>
        <div className="field">
          <label>Dirección</label>
          <input type="text" defaultValue={direccion} readOnly />
        </div>
      </div>
      <MapContainer style={{ width: "100%", height: 400, zIndex: 1 }} center={position} zoom={15} scrollWheelZoom={false}>
         <Marker position={position} icon={duckIcon}>
          <Popup>
            {direccion}
          </Popup>
        </Marker>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => setShowModal(false)}>
          Cerrar
        </Button>
      </Modal.Actions>
    </>
  );
}
 
export default FichaDireccion;