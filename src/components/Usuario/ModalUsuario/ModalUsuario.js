import { Button, Divider, Form, Input, Modal } from "semantic-ui-react";

const ModalUsuario = ({ open, setOpen }) => {
  return ( 
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Operador</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="ui form">
            <Form.Group>
              <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='Nombres'
                placeholder='First name'
                disabled
                width={6}
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Apellidos'
                placeholder='Last name'
                disabled
                width={6}
              />
            </Form.Group>
          </div>
          <h4>Acceso al sistema</h4>
          <Divider />
          <Form>
            <Form.Group>
              <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='Usuario'
                width={6}
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Contraseña'
                width={6}
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Repetir contraseña'
                width={6}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          content="Guardar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
 
export default ModalUsuario;