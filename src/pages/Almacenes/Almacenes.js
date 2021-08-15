import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { Modal, Dropdown } from "semantic-ui-react";
import FormAlmacen from '../../components/Almacenes/FormAlmacen';
import HeaderPage from "../../components/Layout/HeaderPage";
import { ST_ACTIVO } from '../../config/constants';
import useLoaderTable from '../../hooks/useLoaderTable';
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import useDimensionTable from '../../hooks/useDimensionTable';
import { Link, useHistory } from 'react-router-dom';
import { deleteAlmacen } from '../../actions/almacenActions';
import { Loading, Confirm } from 'notiflix';

const Almacenes = () => {

  useDimensionTable();
  const { dataResul, dataState, dataStateChange, requestDataIfNeeded } = useLoaderTable({ url: 'almacen' });
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  const handleEditar = (idAlmacen) => {
    history.push(`/almacenes/ficha/${idAlmacen}`);
  }

  const handleEliminar = async ({idAlmacen, almacen}) => {
    Confirm.show(
      'ALMACENES',
      `¿Desea eliminar al almacen ${almacen}?`,
      'Aceptar',
      'Cancelar',
      async function(){
        Loading.pulse();
        const res = await deleteAlmacen(idAlmacen);
        if(res) {
          requestDataIfNeeded(true);
        } else {
          Loading.remove();
        }
      }
    )
  }

  return ( 
    <div className="Almacenes">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">ALMACENES</h2>
          </div>
        </div>
        <div className="item ui colhidden">
            <Link className="ui button" to="/almacenes/ficha">
              <FaPlus /> Nuevo Almacen
            </Link>
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
                          onClick={() => handleEditar(dataItem.idAlmacen)}
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
                field="idAlmacen"
              />
              <Column field="almacen" width={230} title="ALMACÉN" />
              <Column field="telefono" width={200} title="TELÉFONO" />
              <Column field="direccion" width={250} title="DIRECCIÓN" />
              <Column field="departamento" width={200} title="DEPARTAMENTO" />
              <Column field="provincia" width={200} title="PROVINCIA" />
              <Column field="distrito" width={200} title="DISTRITO" />
            </Grid>
        </div>
      </div>
      <Modal open={openModal}>
        {
          openModal && <FormAlmacen
            setOpenModal={setOpenModal}

          />
        }
      </Modal>
    </div>
  );
}
 
export default Almacenes;