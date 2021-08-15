import { FaSave, FaTrash } from "react-icons/fa";
import { Button, Card } from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom';
import HeaderPage from "../../../components/Layout/HeaderPage";
import FormAlmacen from "../../../components/Almacenes/FormAlmacen";
import { useRef } from "react";
import { useEffect } from "react";
import { getDataFichaAlmacen } from "../../../actions/almacenActions";
import { useState } from "react";
import { Loading } from "notiflix";

const FichaAlmacen = () => {

  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [almacen, setAlmacen] = useState({});
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const { id } = useParams();

  const handleForm = () => {
    formRef.current.handleSubmit();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      Loading.pulse();
      const res = await getDataFichaAlmacen(id);
      
      if(res) {
        setAlmacen(res.almacen);
        setDepartamentos(res.departamentos);
        setProvincias(res.provincias);
        setDistritos(res.distritos);
      }
      Loading.remove();
      setLoading(false);
    })()
  }, [])

  if (loading) return null;


  return ( 
    <div className="Fichas">
      <HeaderPage>
        <div className="item ui colhidden">
          <Button onClick={handleForm} primary className="ui button">
            <FaSave /> &nbsp;Guardar
          </Button>
        </div>
        <div className="item ui colhidden">
          <Link to="/almacenes" className="ui button">
            <FaTrash /> &nbsp;Cancelar
          </Link>
        </div>
      </HeaderPage>
      <div className="Ficha__body app__container_body">
        <div className="app_content__padded_view">
          <Card fluid>
            <Card.Content header='Datos del almacen' />
            <Card.Content>
              <FormAlmacen 
                formRef={formRef}
                almacen={almacen}
                departamentos={departamentos}
                provincias={provincias}
                setProvincias={setProvincias}
                distritos={distritos}
                setDistritos={setDistritos}
              />
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
 
export default FichaAlmacen;