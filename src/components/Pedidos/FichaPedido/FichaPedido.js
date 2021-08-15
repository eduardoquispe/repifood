import { Button, Divider, Grid, Image, Modal } from "semantic-ui-react";
import * as moment from 'moment';
import { ESTADOS_PEDIDOS } from "../../../config/constants";
import {
  Grid as GridTable,
  GridColumn as Column
} from "@progress/kendo-react-grid";

const FichaPedido = ({ detallePedido = {}, setShowModal }) => {

  const { detalles = [] } = detallePedido;

  return (
    <>
      <Modal.Header>Pedido N° {detallePedido.codigo}</Modal.Header>
      <Modal.Content scrolling>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <div className="ui fluid card">
                <div className="content">
                  <a className="header">Datos del Cliente</a>
                </div>
                <div className="content">
                  <h4 className="ui sub header">Nombres y Apellidos</h4>
                  <div className="description">{detallePedido.nombreCliente}</div>

                  <h4 className="ui sub header">Correo Electrónico</h4>
                  <div className="description">{detallePedido.email}</div>

                  <h4 className="ui sub header">Contacto</h4>
                  <div className="description">{detallePedido.celular}</div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="ui fluid card">
                <div className="content">
                  <a className="header">Datos de Envio</a>
                </div>
                <div className="content">

                  <h4 className="ui sub header">Repartidor</h4>
                  <div className="description">{detallePedido.nombreRepartidor}</div>
                  <h4 className="ui sub header">Dirección de Envio</h4>
                  <div className="description">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&amp;origin=-12.1245015,-77.0284429&amp;destination=-12.1241043,-77.029077"
                      target="_blank"
                    >
                      {detallePedido.direccion}
                    </a>
                  </div>
                  <h4 className="ui sub header">Referencia</h4>
                  <div className="description">{detallePedido.referencia}</div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <h3 className="ui header">Detalle de Pedido</h3>
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <div className="ui small message blue" id="forma-pedido">
                <div className="header">Fecha de Pedido</div>
                <p>{moment(detallePedido.fecha).format('DD/MM/YYYY HH:mm:s')}</p>
              </div>
              <div className="ui small message warning " id="forma-pedido">
                <div className="header">{ESTADOS_PEDIDOS[detallePedido.idEstadoPedido]['valor']}</div>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <div className="row">
                <div className="ui horizontal list">
                <div className="item">
                    <div className="content">
                      <div className="header">Monto Sub Total</div>S/ {detallePedido.subtotal}{" "}
                    </div>
                  </div>
                  <div className="item">
                    <div className="content">
                      <div className="header">Monto Envío</div>S/ {detallePedido.cargo}{" "}
                    </div>
                  </div>

                  <div className="item">
                    <div className="content">
                      <div className="header">Monto Total</div>S/ {detallePedido.total}{" "}
                    </div>
                  </div>
                  <div className="item">
                    <div className="content">
                      <div className="header">Método Pago</div>
                      {detallePedido.medioPago}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <GridTable
                  data={detalles}
                >
                  <Column
                    title='CODIGO'
                    field='codigo'
                    width={100}
                  />
                  <Column 
                    title="IMAGEN"
                    width={150}
                    cell={({ dataItem }) => (
                      <td>
                        <Image width={50} src={`${process.env.REACT_APP_HOST_URL}/${dataItem.imagen}`} />
                      </td>
                    )}
                  />
                  <Column
                    title='PRODUCTO'
                    field='nombre'
                    width={200}
                  />
                  <Column
                    title='PRECIO'
                    width={100}
                    cell={({ dataItem }) => (
                      <td>S/ {dataItem.precio}</td>
                    )}
                  />
                  <Column
                    title='CANTIDAD'
                    width={100}
                    field='cantidad'
                  />
                  <Column
                    title='SUB TOTAL'
                    width={100}
                    cell={({ dataItem }) => (
                      <td>S/ {dataItem.subtotal}</td>
                    )}
                  />
                </GridTable>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => setShowModal(false)}>
          Cerrar
        </Button>
      </Modal.Actions>
    </>
  );
};

export default FichaPedido;
