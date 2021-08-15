import { useFormik } from "formik";
import { Loading } from "notiflix";
import { useRef } from "react";
import { useState } from "react";
import { Button, Modal, ModalActions, Grid, Form, Header, Divider, Image, Dropdown } from "semantic-ui-react";
import * as Yup from 'yup'; 
import { addRepartidor, updateRepartidor } from "../../../actions/repartidoresActions";

const ModalRepartidores = props => {

  const { setOpenModal, editarRepartidor, repartidor, reloadTable } = props;
  const [previewImg, setPreviewImg] = useState(null);
  const upload = useRef(null);

  const formik = useFormik({
    initialValues: editarRepartidor ? {...repartidor, nuevoPassword: ''} : initialValues(),
    validationSchema: Yup.object(validationSchema(editarRepartidor)),
    onSubmit: async values => {

      Loading.pulse();
      const formEmpleado = document.getElementById('formRepartidores');
      const formData = new FormData(formEmpleado);
      formData.append('idLicencia', values.idLicencia);

      let res = null;
      if(values.idRepartidor) {
        res = await updateRepartidor(values.idRepartidor, formData);
      } else {
        res = await addRepartidor(formData);
      }

      if(res) {
        reloadTable(true);
        setOpenModal(false);
      } else {
        Loading.remove();
      }
    }
  });

  const clickUpload = () => {
    upload.current.click();
  };

  const renderImagen = e => {
    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    formik.setFieldValue('nuevaImg', e.target.files)

    reader.onload = () => {
      
      setPreviewImg(reader.result);
    }
  }

  return ( 
    <>
      <Modal.Header>{editarRepartidor ? 'Editar Repartidor' : 'Nuevo Repartidor'}</Modal.Header>
      <Modal.Content>
      <Grid>
            <Grid.Column width={11}>
              <Form onSubmit={formik.handleSubmit} id="formRepartidores">
                <Form.Group>
                  <Form.Input 
                    label="Nombres" 
                    required 
                    width={5}
                    name="nombres"
                    value={formik.values.nombres}
                    onChange={formik.handleChange}
                    error={formik.errors.nombres}
                  />
                  <Form.Input 
                    label="Apellidos" 
                    required 
                    width={5}
                    name="apellidos"
                    value={formik.values.apellidos}
                    onChange={formik.handleChange}
                    error={formik.errors.apellidos}
                  />
                  <Form.Input 
                    label="DNI" 
                    type="text"
                    name="dni"
                    required 
                    width={5}
                    value={formik.values.dni}
                    onChange={formik.handleChange}
                    error={formik.errors.dni}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input 
                    label="Celular"
                    required 
                    width={7}
                    name="celular"
                    value={formik.values.celular}
                    onChange={formik.handleChange}
                    error={formik.errors.celular}
                  />
                  <Form.Input
                    label="Correo"
                    required
                    width={8}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input 
                    label="Dirección"
                    required 
                    width={10}
                    name="direccion"
                    value={formik.values.direccion}
                    onChange={formik.handleChange}
                    error={formik.errors.direccion}
                  />
                  <Form.Field>
                    <label>Licencia</label>
                    <Form.Input 
                      control={Dropdown}
                      options={[
                        {key: 0, value: '', text: 'Seleccione'},
                        {key: 1, value: '1', text: 'Licencia A'},
                        {key: 2, value: '2', text: 'Licencia B'}
                      ]}
                      name='idLicencia'
                      search selection
                      value={formik.values.idLicencia}
                      onChange={(_, data) => formik.setFieldValue('idLicencia', data.value)}
                      error={formik.errors.idLicencia}
                    />
                  </Form.Field>
                  <Form.Input 
                    label="Fecha nacimiento" 
                    type="date"
                    width={5}
                    name="fechaNacimiento"
                    value={formik.values.fechaNacimiento}
                    onChange={formik.handleChange}
                    error={formik.errors.fechaNacimiento}
                  />
                </Form.Group>
                <Header as="h3">Datos usuario</Header>
                <Divider />
                <Form.Group>
                  <Form.Input 
                    label="Usuario"
                    required 
                    width={7}
                    name="usuario"  
                    value={formik.values.usuario}
                    onChange={formik.handleChange}
                    error={formik.errors.usuario}
                  />
                  {
                    editarRepartidor ? (
                      <Form.Input
                        type="password"
                        label="Nueva contraseña"
                        required
                        name="nuevoPassword"
                        value={formik.values.nuevoPassword}
                        onChange={formik.handleChange}
                        width={8}
                      />
                    ) : (
                      <Form.Input
                        type="password"
                        label="Contraseña"
                        required
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.errors.password}
                        width={8}
                      />
                    )
                  }
                  </Form.Group>
                <input type="file" style={{ display: "none" }} ref={upload} name="imagenBin" onChange={renderImagen} />
              </Form>
            </Grid.Column>
            <Grid.Column width={5}>
              <Image
                className=""
                size="medium"
                src={`${!previewImg ? `${process.env.REACT_APP_HOST_URL}/${formik.values.imagen}` : previewImg}`}
                wrapped
              />
              <Button
                color="grey"
                style={{ marginTop: 10 }}
                onClick={clickUpload}
              >
                Click para seleccionar una imagen
              </Button>
            </Grid.Column>
          </Grid>
      </Modal.Content>
      <ModalActions>
        <Button
          onClick={() => setOpenModal(false)}
        >
          Cancelar
        </Button>
        <Button onClick={() => formik.submitForm()} primary>Guardar</Button>
      </ModalActions>
    </>
  );
}
 
export default ModalRepartidores;

const initialValues = () => {
  return {
    idOperador: '',
    nombres: "",
    apellidos: "",
    dni: "",
    celular: "",
    email: "",
    usuario: "",
    password: "",
    direccion: "",
    fechaNacimiento: "",
    nuevoPassword: "",
    imagen: '',
    idLicencia: ''
  }
}

const validationSchema = (editarRepartidor) => {

  const validation = {
    nombres: Yup
      .string()
      .required('Este campo es obligatorio'),
    apellidos: Yup
      .string()
      .required('Este campo es obligatorio'),
    dni: Yup
      .number()
      // .max(8, 'Como máximo 8 caracteres.')
      .positive("Solo números positivos")
      .required('Este campo es requerido')
      .typeError('Solo se permiten números'),
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
    password: Yup.string(),
    nuevoPassword: Yup.string(),
    idLicencia: Yup.string().required('Este campo es requerido.'),
    direccion: Yup
      .string()
      .required('Este campo es requerido.'),
    fechaNacimiento: Yup
      .date()
      .required('Este campo es requerido.'),
  }

  if(!editarRepartidor) {
    validation.password = Yup.string().required('Este campo es requerido');
  }
  return validation;
}
