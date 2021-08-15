import HeaderPage from "../../components/Layout/HeaderPage";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import { Button, Dropdown, Input, Label, Modal } from "semantic-ui-react";
import { FaPlus } from "react-icons/fa";
import useLoaderTable from "../../hooks/useLoaderTable";
import ModalClientes from '../../components/Clientes/ModalClientes';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCliente, getClienteById, updateEstadoCliente } from "../../actions/clientesActions";
import { Confirm } from "notiflix";
import useDimensionTable from "../../hooks/useDimensionTable";
import { ST_ACTIVO, ST_INACTIVO } from "../../config/constants";

const Clientes = () => {

  const { dataResul, dataState, dataStateChange, requestDataIfNeeded, handleCustomSearch } = useLoaderTable({ url: 'cliente' });
  const [editarCliente, setEditarCliente] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  useDimensionTable();

  const handleEditar = async (idCliente) => {
    const res = await dispatch(getClienteById(idCliente));
  
    if(res) {
      setEditarCliente(true);
      setOpenModal(true);
    }
  }

  const handleEditarEstado = async (idCliente, estadoNuevo) => {
    const res = await updateEstadoCliente(idCliente, estadoNuevo);
    if(res) {
      requestDataIfNeeded(true);
    }
  }

  const handleEliminar = (idCliente) => {
    Confirm.show(
      'OPERADORES',
      `¿Desea eliminar al operador ${idCliente}?`,
      'Aceptar',
      'Cancelar',
      async function(){
        const res = await dispatch(deleteCliente(idCliente));
        if(res) {
          requestDataIfNeeded(true);
        }
      }
    );
  }

  return (
    <div className="Clientes">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">CLIENTES</h2>
          </div>
        </div>
        <div className="item ui colhidden">
            <Button icon onClick={() => {
              setOpenModal(true);
              setEditarCliente(false);
            }}>
              <FaPlus /> Nuevo Cliente
            </Button>
          </div>
          <div className="right menu colhidden">
            <div className="item ui colhidden">
              <Input icon='search' onKeyDown={handleCustomSearch} placeholder='Buscar cliente...' />
            </div>
          </div>
      </HeaderPage>
      <div className="Cliente__body app__container_body">
        <div className="Clientes__tabla">
          <Grid
              sortable={true}
              pageable={true}
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
                          onClick={() => handleEditar(dataItem.idCliente)}
                        />
                        <Dropdown.Item
                          icon="delete"
                          className="red"
                          text='Eliminar'
                          onClick={() => handleEliminar(dataItem.idCliente)}
                        />
                        {
                          parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                            <Dropdown.Item 
                              icon="lock"
                              text='Desabilitar'
                              onClick={() => handleEditarEstado(dataItem.idCliente, ST_INACTIVO)}
                            />
                          ) : (
                            <Dropdown.Item 
                              icon="unlock"
                              text='Activar'
                              onClick={() => handleEditarEstado(dataItem.idCliente, ST_ACTIVO)}
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
                field="idCliente"
              />
              <Column field="nombres" title="NOMBRES" />
              <Column field="apellidos" title="APELLIDOS" />
              <Column field="email" title="CORREO" />
              <Column field="celular" title="CELULAR" />
              <Column 
                title="ESTADO"
                cell={({ dataItem }) => (
                  <td>
                    {
                        parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                          <Label color="green" size="tiny">{dataItem['tipoEstado ']}</Label>
                      ) : (
                        <Label color="red" size="tiny">{dataItem['tipoEstado ']}</Label>
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
            openModal && <ModalClientes 
              setOpenModal={setOpenModal}
              requestDataIfNeeded={requestDataIfNeeded}
              editarCliente={editarCliente}
            />
          }
        </Modal>
    </div>
  );
}

export default Clientes;