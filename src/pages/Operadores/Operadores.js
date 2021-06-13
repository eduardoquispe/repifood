import HeaderPage from "../../components/Layout/HeaderPage";
import useLoaderTable from "../../hooks/useLoaderTable";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import { Button, Dropdown, Label, Modal } from "semantic-ui-react";
import { FaPlus } from "react-icons/fa";
import BusquedaCliente from "../../components/Clientes/BusquedaCliente";
import { useState } from "react";
import { Confirm } from "notiflix";
import useDimensionTable from "../../hooks/useDimensionTable";
import ModalOperadores from "../../components/Operador/ModalOperadores";
import { useDispatch } from "react-redux";
import { deleteOperador, getOperadorById, updateEstadoOperador } from "../../actions/operadorActions";
import { ST_ACTIVO, ST_INACTIVO } from "../../config/constants";

const Operadores = () => {

  const { dataResul, dataState, dataStateChange, requestDataIfNeeded } = useLoaderTable({ url: 'empleado' });
  const dispatch = useDispatch();
  const [editarOperador, setEditarOperador] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { height: heightGrid } = useDimensionTable();

  const handleEditar = idEmpleado => {
    setEditarOperador(true)
    dispatch(getOperadorById(idEmpleado, setOpenModal));
  }

  const handleEditarEstado = (idEmpleado, idEstado) => {
    Confirm.show(
      'OPERADORES',
      '¿Desea cambiar el estado del empleado?',
      'Continuar',
      'Cancelar',
      async function() {
        const res = await dispatch(updateEstadoOperador(idEmpleado, idEstado));
        
        if(res) {

        } else {

        }
      }
    );
  }

  const handleEliminar = (idOperador) => {
    Confirm.show(
      'OPERADORES',
      `¿Desea eliminar al operador ${idOperador}?`,
      'Aceptar',
      'Cancelar',
      function(){
        dispatch(deleteOperador(idOperador, requestDataIfNeeded));
      }
    );
  }

  return ( 
    <div className="Operadores">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">OPERADORES</h2>
          </div>
        </div>
        <div className="item ui colhidden">
            <Button icon onClick={() => {
                setEditarOperador(false); 
                setOpenModal(true);
            }}>
              <FaPlus /> Nuevo operador
            </Button>
          </div>
          <div className="right menu colhidden">
            <div className="item ui colhidden">
              <BusquedaCliente />
            </div>
          </div>
      </HeaderPage>
      <div className="Operadores__body app__container_body">
        <div className="Operadores__tabla">
          <Grid
              sortable={true}
              pageable={true}
              style={{ height: heightGrid }}
              {...dataState}
              {...dataResul}
              onDataStateChange={dataStateChange}
              className="grid"
            >
              <Column
                width={50}
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
                          onClick={() => handleEditar(dataItem.idEmpleado)}
                        />
                        <Dropdown.Item
                          icon="delete"
                          className="red"
                          text='Eliminar'
                          onClick={() => handleEliminar(dataItem.idEmpleado)}
                        />
                        {
                          parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                            <Dropdown.Item 
                              icon="lock"
                              text='Inactivar'
                              onClick={() => handleEditarEstado(dataItem.idEmpleado, ST_INACTIVO)}
                            />
                          ) : (
                            <Dropdown.Item 
                              icon="unlock"
                              text='Activar'
                              onClick={() => handleEditarEstado(dataItem.idEmpleado, ST_ACTIVO)}
                            />
                          )
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              />
              <Column
                width={50}
                title='ID'
                field="idEmpleado"
              />
              <Column field="nombres" title="NOMBRES" />
              <Column field="apellidos" title="APELLIDOS" />
              <Column field="email" title="EMAIL" />
              <Column field="celular" title="CELULAR" />
              <Column 
                title="ESTADO"
                cell={({ dataItem }) => (
                  <td>
                    {
                        parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                          <Label color="green" size="tiny">{dataItem['tipoEstado ']}</Label>
                      ) : (
                        <Label color="red" size="tiny">{dataItem['tipoEstado '] }</Label>
                      )
                    }
                  </td>
                )}
              />
            </Grid>
        </div>
      </div>
      <Modal open={openModal}>
        {
          openModal ? <ModalOperadores 
              setOpenModal={setOpenModal}
              editarOperador={editarOperador}
              reloadTable={requestDataIfNeeded}
              open={openModal}
            /> : null
        }
      </Modal>
    </div>
  );
}

export default Operadores;