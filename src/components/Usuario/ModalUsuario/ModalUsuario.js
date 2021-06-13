import { useSelector } from "react-redux";
import { Button, Divider, Modal, Grid } from "semantic-ui-react";
import FormularioUsuario from "../FormularioUsuario";
import './ModalUsuario.scss';

const ModalUsuario = ({ open, setOpen }) => {

  const { operador } = useSelector(state => state.operadores);

  return ( 
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      className="ModalUsuario"
    >
      <Modal.Header>Operador</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Grid columns={3}>
            <Grid.Column>
              <b>Nombre: {operador.nombres}</b>
            </Grid.Column>
            <Grid.Column>
              <b>Apellidos: {operador.apellidos}</b>
            </Grid.Column>
            <Grid.Column>
              <b>DNI: {operador.dni}</b>
            </Grid.Column>
          </Grid>
          <h4>Acceso al sistema</h4>
          <Divider />
          <FormularioUsuario />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button primary onClick={() => setOpen(false)}>
          Guardar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
 
export default ModalUsuario;