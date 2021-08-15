import HeaderPage from "../../components/Layout/HeaderPage"
import { Modal, Dropdown, Label, Image, Button } from "semantic-ui-react";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import useLoaderTable from '../../hooks/useLoaderTable';
import useDimensionTable from '../../hooks/useDimensionTable';
import { ST_ACTIVO } from "../../config/constants";
import { useState } from "react";
import * as moment from 'moment';
import { FaPlus } from "react-icons/fa";
import FichaLote from "../../components/Lotes/FichaLote";
import { loadFichaLote, deleteLote } from "../../actions/lotesActions";
import { Confirm, Loading } from "notiflix";
import DefaultImagenProduct from '../../assets/img/productos/producto_default.png';

const Lotes = () => {

  useDimensionTable();
  const { dataResul, dataState, dataStateChange, requestDataIfNeeded } = useLoaderTable({ url: 'lote' });
  const [openModal, setOpenModal] = useState(false);
  const [resultLoadFicha, setResultLoadFicha] = useState({});

  const handleFichaLote = async (idLote = null) => {
    Loading.pulse();
    const res = await loadFichaLote(idLote);
    if(res) {
      setResultLoadFicha(res);
      setOpenModal(true);
    }
    Loading.remove();
  }

  const handleEliminar = async ({idLote}) => {
    Confirm.show(
      'LOTES',
      `¿Desea eliminar este lote?`,
      'Aceptar',
      'Cancelar',
      async function(){
        Loading.pulse();
        const res = await deleteLote(idLote);
        if(res) {
          requestDataIfNeeded(true);
        } else {
          Loading.remove();
        }
      }
    )
  }

  return ( 
    <div className="Lotes">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">LOTES</h2>
          </div>
        </div>
        <div className="item ui colhidden">
            <Button onClick={() => handleFichaLote(null)}>
              <FaPlus /> Nuevo Lote
            </Button>
          </div>
      </HeaderPage>
      <div className="Almacenes__body app__container_body">
        <div className="Almacenes__tabla">
          <Grid
              sortable={true}
              pageable={true}
              {...dataState}
              {...dataResul}
              onDataStateChange={dataStateChange}
              className="grid"
            >
              <Column
                width={100}
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
                          icon="edit"
                          className="blue"
                          text='Editar'
                          onClick={() => handleFichaLote(dataItem.idLote)}
                        />
                        <Dropdown.Item
                          icon="delete"
                          className="red"
                          text='Eliminar'
                          onClick={() => handleEliminar({...dataItem})}
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
                width={100}
                title='ID'
                field="idLote"
              />
              <Column 
                title="IMAGEN"
                width={150}
                cell={({ dataItem }) => (
                  <td>
                    {
                      dataItem.imagen ? (
                        <Image width={50} src={`${process.env.REACT_APP_HOST_URL}/${dataItem.imagen}`} />
                      ) : (
                        <Image width={50} src={DefaultImagenProduct} />
                      )
                    }
                  </td>
                )}
              />
              <Column  field="producto" title="PRODUCTO" />
              <Column 
                title="TIPO"
                cell={({ dataItem }) => (
                  <td>
                    <Label color="purple" size="tiny">{dataItem.categoria}</Label>
                  </td>
                )}
              />
              <Column field="almacen" title="ALMACÉN" />
              <Column 
                title="FECHA"
                cell={({ dataItem }) => (
                  <td>
                    {moment(dataItem.fecha).format('DD MMM YYYY')}
                  </td>
                )}
              />
              <Column field="cantidadInicial" title="LOTE INICIAL" />
              <Column field="cantidadDisponible" title="LOTE DISPONIBLE" />
            </Grid>
        </div>
      </div>
      <Modal open={openModal} size='tiny'>
        {
          openModal && <FichaLote
            setOpenModal={setOpenModal}
            resultLoadFicha={resultLoadFicha}
            requestDataIfNeeded={requestDataIfNeeded}
          />
        }
      </Modal>
    </div>
  );
}

export default Lotes;