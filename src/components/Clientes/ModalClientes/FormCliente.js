import { Form, Grid, Button, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

const FormCliente = () => {
  const upload = useRef(null);

  const clickUpload = () => {
    upload.current.click();
  };

  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      telefono: "",
      correo: "",
      usuario: "",
      password: "",
      departamento: "",
      provincia: "",
      distrito: "",
    },
  });

  return (
    <Grid>
      <Grid.Column width={11}>
        <Form>
          <Form.Group>
            <Form.Input
              label="Nombres"
              required
              width={5}
              value={formik.values.nombres}
              onChange={formik.handleChange}
            />
            <Form.Input label="Apellidos" required width={5} />
            <Form.Input label="DNI" required width={5} />
          </Form.Group>
          <Form.Group>
            <Form.Input label="Teléfono" required width={7} />
            <Form.Input label="Correo" required width={8} />
          </Form.Group>
          <Form.Group>
            <Form.Input label="Usuario" required width={7} />
            <Form.Input type="password" label="Contraseña" required width={8} />
          </Form.Group>
          <Form.Group>
            <Form.Input label="Departamento" required width={5} />
            <Form.Input label="Provincia" required width={5} />
            <Form.Input label="Distrito" required width={5} />
          </Form.Group>
        </Form>
      </Grid.Column>
      <Grid.Column width={5}>
        <Image
          className=""
          size="medium"
          src="/images/avatar/large/rachel.png"
          wrapped
        />
        <Button color="grey" style={{ marginTop: 10 }} onClick={clickUpload}>
          Click para seleccionar una imagen
        </Button>
        <input type="file" style={{ display: "none" }} ref={upload} />
      </Grid.Column>
    </Grid>
  );
};

export default FormCliente;
