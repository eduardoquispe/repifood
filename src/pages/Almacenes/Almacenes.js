import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { Button, Modal } from "semantic-ui-react";
import FormAlmacen from '../../components/Almacenes/FormAlmacen';
import HeaderPage from "../../components/Layout/HeaderPage";

const Almacenes = () => {

  const [openModal, setOpenModal] = useState(false);

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
            <Button icon onClick={() => setOpenModal(true)}>
              <FaPlus /> Nuevo Almacen
            </Button>
          </div>
      </HeaderPage>
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