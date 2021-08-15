import { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import { Button, Dropdown, Icon, Label, Modal } from "semantic-ui-react";
import HeaderPage from "../../components/Layout/HeaderPage"
import { ST_ACTIVO, ESTADOS_PEDIDOS, STATUS_OK } from "../../config/constants";
import useDimensionTable from "../../hooks/useDimensionTable";
import useLoaderTable from "../../hooks/useLoaderTable";
import * as moment from 'moment';
import { getPedidoById } from "../../actions/pedidosActions";
import { Loading } from "notiflix";
import FichaPedido from "../../components/Pedidos/FichaPedido";
import FichaDireccion from "../../components/Pedidos/FichaDireccion";
import { FaEye } from "react-icons/fa";

const Pedidos = () => {
  
  useDimensionTable();
  const [currentRange, setNewRange] = useState([]);
  const { dataResul, dataState, dataStateChange, requestDataIfNeeded } = useLoaderTable({ url: 'pedido' });
  // const onChange = (event, data) => setNewRange(data.value);
  const [showModal, setShowModal] = useState(false);
  const [showModalDireccion, setShowModalDireccion] = useState(false);
  const [detallePedido, setDetallePedido] = useState({});
  const [datosDireccion, setDatosDireccion] = useState({});

  const handleDetallePedido = async idPedido => {
    Loading.pulse();
    
    const res = await getPedidoById(idPedido);

    if(res) {
      if(res.status === STATUS_OK) {
        setDetallePedido(res.body);
        setShowModal(true);
      }
    }
    Loading.remove();
  }

  const handleExaminarDireccion = pedido => {

    setDatosDireccion({
      position: [parseFloat(pedido.longitudIniciado), parseFloat(pedido.latitudIniciado)],
      direccion: pedido.direccion
    })

    setShowModalDireccion(true);
  }

  return ( 
    <div className="Pedidos">
      <HeaderPage>
        <div class="item ui colhidden">
          <button class="ui icon button" onClick={() => requestDataIfNeeded(true)}>
            <i class="sync icon"></i>
          </button>
        </div>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <h2 className="section active">PEDIDOS</h2>
          </div>
        </div>
      </HeaderPage>
      <div className="Pedidos__body app__container_body">
        <Modal closeIcon open={showModal} size="large" onClose={() => setShowModal(false)}>
          <FichaPedido  
            setShowModal={setShowModal}
            detallePedido={detallePedido}
          />
        </Modal>
        <Modal closeIcon open={showModalDireccion} size="small" onClose={() => setShowModalDireccion(false)}>
          <FichaDireccion 
            setShowModal={setShowModalDireccion}
            datosDireccion={datosDireccion}
          />
        </Modal>
        {/* <div id="app_content_actions" className="navslide navwrap">
          <div className="ui form">
            <div className="fields" style={{margin: 0}}>
              <div className="field">
              <SemanticDatepicker locale="es-ES" onChange={onChange} type="range" />
              </div>
            </div>
          </div>
        </div> */}
        <div className="Productos__tabla">
          <Grid
              sortable={true}
              pageable={true}
              {...dataState}
              {...dataResul}
              onDataStateChange={dataStateChange}
              className="grid"
            >
              <Column
                width={60}
                cell={({ dataItem }) => (
                  <td style={{overflow: "inherit"}}>
                    <Dropdown
                      icon='ellipsis vertical'
                      floating
                      button
                      className='icon circular compact ui left pointing'
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          icon="eye"
                          className="blue"
                          text='Ver detalle del pedido'
                          onClick={() => handleDetallePedido(dataItem.idPedido)}
                        />
                        <Dropdown.Item
                          icon="delete"
                          className="red"
                          text='Eliminar'
                          // onClick={() => handleEliminar({...dataItem})}
                        />
                        {
                          parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                            <Dropdown.Item 
                              icon="lock"
                              text='Desabilitar'
                              // onClick={() => handleEditarEstado(dataItem.idCliente, ST_INACTIVO)}
                            />
                          ) : (
                            <Dropdown.Item 
                              icon="unlock"
                              text='Activar'
                              // onClick={() => handleEditarEstado(dataItem.idCliente, ST_ACTIVO)}
                            />
                          )
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              />
              <Column
                width={110}
                title='CÓDIGO'
                field="codigoPedido"
              />
              <Column 
                title="Cliente"
                width={250}
                field="nombreCliente"
              />
              <Column 
                title="ALMACEN"
                width={200}
                field="almacen"
              />
              <Column 
                width={300}
                title="DIRECCIÓN"
                cell={({ dataItem }) => (
                  <td>
                    {dataItem.direccion}&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button onClick={() => handleExaminarDireccion(dataItem)} size='tiny' style={{borderRadius: 8}} basic color='green' icon><FaEye /></Button>
                  </td>
                )}
              />
              <Column field="medioPago" width={140} title="TIPO PAGO" />
              <Column 
                title="FECHA PEDIDO"
                width={200}
                cell={({ dataItem }) => (
                  <td>
                    {moment(dataItem.fecha).format('DD/MM/YYYY')}
                  </td>
                )}
              />
              <Column 
                title="ESTADO"
                width={150}
                cell={({ dataItem }) => (
                  <td>
                     <Label style={{textTransform: 'uppercase'}} color={`${ESTADOS_PEDIDOS[dataItem.idEstadoPedido]['color']}`} basic size="medium">
                      {ESTADOS_PEDIDOS[dataItem.idEstadoPedido]['valor']}
                    </Label>
                  </td>
                )}
              />
              <Column 
                width={100}
                title="MONTO"
                cell={({ dataItem }) => (
                  <td>
                    S/ {dataItem.subtotal}
                  </td>
                )}
              />
              <Column 
                width={150}
                title="MONTO ENVIO"
                cell={({ dataItem }) => (
                  <td>
                    S/ {dataItem.cargo}
                  </td>
                )}
              />
              <Column 
                width={150}
                title="TOTAL"
                cell={({ dataItem }) => (
                  <td>
                    S/ {dataItem.total}
                  </td>
                )}
              />
              <Column 
                width={200}
                title="REPARTIDOR"
                field="nombreRepartidor"
              />
            </Grid>
        </div>
      </div>
    </div>
  );
}
 
export default Pedidos;