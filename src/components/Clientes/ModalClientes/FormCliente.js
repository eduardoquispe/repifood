import { Form, Grid, Button, Image, Header, Divider } from "semantic-ui-react";
import { useRef } from "react";
import { useState } from "react";

const FormCliente = ({ formik, editarCliente }) => {

  const [previewImg, setPreviewImg] = useState(null);
  const upload = useRef(null);

  const clickUpload = () => {
    upload.current.click();
  };

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
    <Grid>
      <Grid.Column width={11}>
        <Form id="form-cliente">
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
            <Form.Field
              label="Sexo"
              required
              control='select'
              width={5}
              name="idGenero"
              value={formik.values.idGenero}
              onChange={formik.handleChange}
              error={formik.errors.idGenero}
            >
              <option value='' disabled>--Seleccione--</option>
              <option value='1'>Masculino</option>
              <option value='2'>Femenino</option>
            </Form.Field>
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
              editarCliente ? (
                <Form.Input 
                  type="password"
                  label="Nueva contraseña"
                  required
                  width={8}
                  name="nuevoPassword"
                  value={formik.values.nuevoPassword}
                  onChange={formik.handleChange}
                  error={formik.errors.nuevoPassword}
                />
              ) : (
                <Form.Input 
                  type="password"
                  label="Contraseña"
                  required
                  width={8}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.errors.password}
                />
              )
            }
            
          </Form.Group>
          <input type="hidden" name="fechaNacimiento" value="2021-10-05" />
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
        <Button color="grey" style={{ marginTop: 10 }} onClick={clickUpload}>
          Click para seleccionar una imagen
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default FormCliente;


