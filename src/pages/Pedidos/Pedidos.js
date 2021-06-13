import { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import HeaderPage from "../../components/Layout/HeaderPage"

const Pedidos = () => {
  
  const [currentRange, setNewRange] = useState([]);
  const onChange = (event, data) => setNewRange(data.value);

  return ( 
    <div className="Pedidos">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">PEDIDOS</h2>
          </div>
        </div>
      </HeaderPage>
      <div className="Pedidos__body app__container_body">
        <SemanticDatepicker locale="es-ES" onChange={onChange} type="range" />
        <p>asc</p>
      </div>
    </div>
  );
}
 
export default Pedidos;