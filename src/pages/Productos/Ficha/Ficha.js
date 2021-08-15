import { FaSave, FaTrash } from "react-icons/fa";
import { Button, Card } from "semantic-ui-react";
import HeaderPage from "../../../components/Layout/HeaderPage";
import { Link, useParams } from 'react-router-dom';
import FormPlato from '../../../components/Platos/FormPlato';
import { useEffect, useState } from "react";
import { getCategorasAll, getDataEditPlato } from "../../../actions/productosActions";
import { Loading } from "notiflix";
import { useRef } from "react";

const Ficha = () => {

  const [categorias, setCategorias] = useState([]);
  const [plato, setPlato] = useState({});
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      Loading.pulse();
      const { id } = params;

      if(id) {
        const res = await getDataEditPlato(id);
        
        if(res) {
          setPlato(res.plato);
          setCategorias(res.categorias);
        }
      } else {
        const res = await getCategorasAll();
        if(res) {
          setCategorias(res);
        }
      }

      Loading.remove();
      setLoading(false);
    })()
  }, [])

  if(loading) return null;

  const handleForm = () => {
    formRef.current.handleSubmit();
  }

  return ( 
    <div className="Fichas">
      <HeaderPage>
        <div className="item ui colhidden">
          <Button onClick={handleForm} primary className="ui button">
            <FaSave /> &nbsp;Guardar
          </Button>
        </div>
        <div className="item ui colhidden">
          <Link to="/productos" className="ui button">
            <FaTrash /> &nbsp;Cancelar
          </Link>
        </div>
      </HeaderPage>
      <div className="Ficha__body app__container_body">
        <div className="app_content__padded_view">
          <Card fluid>
            <Card.Content header='Datos del plato' />
            <Card.Content>
              <FormPlato 
                categorias={categorias}
                formRef={formRef}
                plato={plato}
              />
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
 
export default Ficha;