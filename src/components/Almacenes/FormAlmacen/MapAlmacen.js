import { FeatureGroup, MapContainer, Polygon, TileLayer } from "react-leaflet"
import { EditControl } from "react-leaflet-draw";



const MapAlamacen = ({ addGeozonas, positions }) => {

  const position = [51.505, -0.09]

  const handleCreate = e => {
    // console.log(e)

    const { layerType, layer } = e;

    if(layerType === 'polygon') {
      const { _leaflet_id } = layer;

      

      const puntos = layer.getLatLngs()[0];
      
      const polygonZona =  puntos.map(p => {
        return [p.lat, p.lng];
      });

      const nuevaGeoZona = {
        id: _leaflet_id,
        polygon: polygonZona
      }
      addGeozonas(nuevaGeoZona);
    }

  }

  const handleEdited = e => {
    console.log(e);
  }

  const handleDeleted = e => {
    console.log(e);
  }


  return ( 
    <MapContainer style={{ width: "100%", height: 300 }} center={position} zoom={13} scrollWheelZoom={false}>
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreate}
          onEdited={handleEdited}
          onDeleted={handleDeleted}
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false
          }}
        />
        {positions.map((zona, index) => (
          <Polygon key={index} positions={zona.polygon} />
        ))}
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MapAlamacen;