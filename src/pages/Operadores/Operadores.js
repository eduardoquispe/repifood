import HeaderPage from "../../components/Layout/HeaderPage";
import useLoaderTable from "../../hooks/useLoaderTable";
import { Button, Input, Modal } from "semantic-ui-react";
import { FaPlus } from "react-icons/fa";
import BusquedaCliente from "../../components/Clientes/BusquedaCliente";
import React, { useState } from "react";
import { Confirm, Loading } from "notiflix";
import ModalOperadores from "../../components/Operador/ModalOperadores";
import { useDispatch } from "react-redux";
import { deleteOperador, getDataEditarOperador, getPerfiles } from "../../actions/operadorActions";
import TableOperadores from './TableOperadores';
import useDimensionTable from '../../hooks/useDimensionTable';

const Operadores = () => {

  const dispatch = useDispatch();
  const { dataResul, dataState, dataStateChange, handleCustomSearch, requestDataIfNeeded } = useLoaderTable({ url: 'empleado' });
  const [editarOperador, setEditarOperador] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useDimensionTable();

  const handleEditar = async idEmpleado => {
    setEditarOperador(true)

    Loading.pulse();
    const res = await dispatch(getDataEditarOperador(idEmpleado));
    if(res) {
      setOpenModal(true);
    }
    Loading.remove();

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
          <Button icon onClick={async () => {
              setEditarOperador(false);
              Loading.pulse();
              await dispatch(getPerfiles());
              setOpenModal(true);              
              Loading.remove();
          }}>
            <FaPlus /> Nuevo operador
          </Button>
        </div>
        <div className="right menu colhidden">
          <div className="item ui colhidden">
              <Input 
                icon='search'
                onKeyDown={handleCustomSearch} 
                placeholder='Buscar operador...'
              />
          </div>
        </div>
      </HeaderPage>
      <div className="Operadores__body app__container_body">
        <div className="Operadores__tabla">
          <TableOperadores 
            dataStateChange={dataStateChange}
            dataState={dataState}
            dataResul={dataResul}
            handleEditar={handleEditar}
            handleEliminar={handleEliminar}
            requestDataIfNeeded={requestDataIfNeeded}
          />
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
