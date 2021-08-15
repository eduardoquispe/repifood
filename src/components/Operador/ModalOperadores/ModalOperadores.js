import { Form, Grid, Button, Image, Modal, Header, Divider, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOperador, updateOperador } from "../../../actions/operadorActions";

const ModalOperadores = ({ setOpenModal, editarOperador, reloadTable }) => {
  
  const { operador, perfiles } = useSelector(state => state.operadores);
  const dispatch = useDispatch();
  const upload = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);

  const clickUpload = () => {
    upload.current.click();
  };

  const formik = useFormik({
    initialValues: editarOperador ? {...operador, nuevoPassword: ''} : initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async values => {
      const formEmpleado = document.getElementById('formEmpleado');
      const formData = new FormData(formEmpleado);
      formData.append('idPerfil', values.idPerfil);

      let res = null;
      if(values.idOperador) {
        res = await dispatch(updateOperador(values.idOperador, formData));
      } else {
        res = await dispatch(addOperador(formData));
      }

      if(res) {
        reloadTable(true);
        setOpenModal(false);
      }
    }
  });
  
  const getOptions = () => {
    
    let listPerfil = [{ text: 'Seleccione', value:'0', key: 0 }];
    perfiles.forEach(perfil => {
      listPerfil = [...listPerfil, {
        key: perfil.idPerfil,
        text: perfil.perfil,
        value: perfil.idPerfil
      }];
    })

    return listPerfil;
  }

  const renderImagen = e => {
    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    formik.setFieldValue('nuevaImg', e.target.files)

    reader.onload = () => {
      // formik.setFieldValue('imagen', reader.result);
      setPreviewImg(reader.result);
    }
  }

  return (
    <>
        <Modal.Header>{editarOperador ? 'Editar' : 'Nuevo'} Operador</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={11}>
              <Form onSubmit={formik.handleSubmit} id="formEmpleado">
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
                    editarOperador ? (
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
                        width={8}
                      />
                    )
                  }
                  <Form.Field>
                    <label>Perfil</label>
                    <Form.Input 
                      control={Dropdown}
                      options={getOptions()}
                      name='idPerfil'
                      search selection
                      value={formik.values.idPerfil}
                      onChange={(_, data) => formik.setFieldValue('idPerfil', data.value)}
                      error={formik.errors.idPerfil}
                    />
                  </Form.Field>
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
        <Modal.Actions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button primary type="submit" onClick={() => formik.handleSubmit()}>Guardar</Button>
        </Modal.Actions>
    </>
  );
};

export default ModalOperadores;

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
    idPerfil: '0'
  }
}

const validationSchema = () => {
  return {
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
    // password: Yup.string().min(6, 'Mínimo 6 caracteres'),
    direccion: Yup
      .string()
      .required('Este campo es requerido.'),
    fechaNacimiento: Yup
      .date()
      .required('Este campo es requerido.'),
    idPerfil: Yup
      .number()
      .positive('Este campo es requerido.')
      .required('Este campo es requerido.')
  }
}