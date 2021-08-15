import { Button, Modal, Tab } from "semantic-ui-react"
import FormCliente from "./FormCliente";
import DireccionesCliente from "./DireccionesCliente";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCliente, updateCliente } from "../../../actions/clientesActions";
import { useDispatch, useSelector } from "react-redux";


const ModalClientes = ({ setOpenModal, requestDataIfNeeded, editarCliente }) => {

  const dispatch = useDispatch(); 
  const { cliente } = useSelector(state => state.clientes); 
  
  const formik = useFormik({
    initialValues: editarCliente ? {...cliente.datos, nuevoPassword: ''} : initialValues(),
    validationSchema: Yup.object(validationSchema(editarCliente)),
    onSubmit: async (values) => {
      const form = document.getElementById('form-cliente');
      const formData = new FormData(form);

      let res = null;

      if(!values.idCliente) {
        res = await dispatch(addCliente(formData));
      } else {
        res = await dispatch(updateCliente(values.idCliente, formData));
      }

      if(res) {
        setOpenModal(false);
        requestDataIfNeeded(true);
      }
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    formik.submitForm();
  }

  const panes = [
    { menuItem:'Datos cliente', render: () => <Tab.Pane><FormCliente formik={formik} editarCliente={editarCliente} /></Tab.Pane> },
    { menuItem: 'Direcciones', render: () => <Tab.Pane><DireccionesCliente direcciones={cliente.direcciones} /></Tab.Pane> }
  ];

  if(!editarCliente) panes.splice(1, 1);

  return (
    <>
      <Modal.Header>
        {editarCliente ? 'Inspeccionar Cliente' : 'Nuevo Cliente'}
      </Modal.Header>
      <Modal.Content>
        <Tab panes={panes} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModal(false)}>
          Cancelar
        </Button>
        <Button primary onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Actions>
    </>
  );
}

export default ModalClientes;

const initialValues = (editarCliente) => {
  return {
    "nombres": "",
    "apellidos": "",
    "email": "",
    "sexo": "",
    "usuario": "",
    "password": "",
    "idGenero": "",
    "celular": "",
    "fechaNacimiento": "2020-05-11",
    "nuevoPassword": ""
  }
}

const validationSchema = (editarCliente) => {
  const validation = {
    nombres: Yup
    .string()
    .required('Este campo es obligatorio'),
    apellidos: Yup
      .string()
      .required('Este campo es obligatorio'),
    idGenero: Yup
      .string()
      .required('Este campo es requerido'),
    celular: Yup
      .number()
      // .max(9, 'Como máximo 8 caracteres.')
      .positive("Solo números positivos")
      .required('Este campo es requerido')
      .typeError('Solo se permiten números'),
    email: Yup
      .string().email('Formato no correcto')
      .required('Este campo es requerido.'),
    usuario: Yup
      .string()
      .required('Este campo es requerido.'),
    password: Yup.string().required('Este campo es requerido'),
    nuevoPassword: Yup.string()
    }

  if(editarCliente) {
    validation.password = Yup.string();
  }
  return validation;
}
