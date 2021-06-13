import { Button, Modal, Tab } from "semantic-ui-react"
import FormCliente from "./FormCliente";
import DireccionesCliente from "./DireccionesCliente";

const ModalClientes = ({ open, setOpenModal }) => {

  const handleSubmit = e => {
    e.preventDefault();
    console.log('sumit')
  }

  return ( 
    <div className="ModalClientes">
      <Modal open={open}>
        <Modal.Header>
          Nuevo Cliente
        </Modal.Header>
        <Modal.Content>
          <Tab panes={[
            { menuItem:'Formulario', render: () => <Tab.Pane><FormCliente /></Tab.Pane> },
            { menuItem: 'Direcciones', render: () => <Tab.Pane><DireccionesCliente /></Tab.Pane> }
          ]} />
          
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenModal(false)}>
            Cancelar
          </Button>
          <Button primary onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
 
export default ModalClientes;