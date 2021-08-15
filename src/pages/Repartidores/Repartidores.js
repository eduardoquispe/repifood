import HeaderPage from '../../components/Layout/HeaderPage';
import TablaRepartidores from '../../components/Repartidores/TablaRepartidores';
import useDimensionTable from '../../hooks/useDimensionTable';
import useLoaderTable from '../../hooks/useLoaderTable';
import { Button, Input, Modal } from "semantic-ui-react";
import './Repartidores.scss';
import { useState } from 'react';
import ModalRepartidores from '../../components/Repartidores/ModalRepartidores/ModalRepartidores';
import { FaPlus } from 'react-icons/fa';
import { getRepartidorById } from '../../actions/repartidoresActions';
import { Loading } from 'notiflix';

const Repartidores = () => {

  useDimensionTable();
  const loadertable = useLoaderTable({ url: 'repartidor'});
  const [editarRepartidor, setEditarRepartidor] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [repartidor, setRepartidor] = useState({});

  const handleEditarModal = async (idRepartidor) => {
    Loading.pulse();
    const res = await getRepartidorById(idRepartidor);

    if(res) {
      setRepartidor(res);
      setEditarRepartidor(true);
      setOpenModal(true);
    }
    Loading.remove();
  }

  return ( 
    <div className="Repartidores">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">REPARTIDORES</h2>
          </div>
        </div>
        <div className="item ui colhidden">
          <Button icon onClick={async () => {
              setOpenModal(true);
              setEditarRepartidor(false);
          }}>
            <FaPlus /> Nuevo repartidor
          </Button>
        </div>
        <div className="right menu colhidden">
            <div className="item ui colhidden">
              <Input 
                icon='search'
                onKeyDown={loadertable.handleCustomSearch} 
                placeholder='Buscar repartidor...'
              />
            </div>
          </div>
      </HeaderPage>
      <div className="Operadores__body app__container_body">
          <Modal open={openModal}>
            <ModalRepartidores 
              editarRepartidor={editarRepartidor}
              setOpenModal={setOpenModal}
              reloadTable={loadertable.requestDataIfNeeded}
              repartidor={repartidor}
            />
          </Modal>
        <TablaRepartidores 
          {...loadertable}
          handleEditarModal={handleEditarModal}
        />
      </div>
    </div>
  );
}

export default Repartidores;