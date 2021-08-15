import { Form, Grid, Image, Button, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { addPlato, updatePlato } from "../../../actions/productosActions";

const FormPlato = ({ categorias = [], formRef, plato }) => {
  
  const params = useParams();
  const history = useHistory();
  const [previewImg, setPreviewImg] = useState(null);
  const upload = useRef(null);
  const { id } = params;

  const formik = useFormik({
    initialValues: id ? plato : initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (values) => {

      const formEmpleado = document.getElementById('formPlato');
      const formData = new FormData(formEmpleado);
      formData.append('idCategoria', values.idCategoria);
      let res = null;
      if(values.idProducto) {
        res = await updatePlato(values.idProducto, formData);
      } else {
        res = await addPlato(formData);
      }
      if(res) {
        history.push('/productos');
      }
    },
  });

  const clickUpload = () => {
    upload.current.click();
  };

  const renderImagen = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    formik.setFieldValue("nuevaImg", e.target.files);
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
  };

  const getCategoriasOptions = () => {
    let listCategoria = [{ text: 'Seleccione', value:'0', key: 0 }];

    categorias.forEach(categoria => {
      listCategoria = [...listCategoria, {
        key: categoria.idCategoria,
        text: categoria.categoria,
        value: categoria.idCategoria
      }];
    })

    return listCategoria;
  }

  return (
    <Form onSubmit={formik.handleSubmit} id="formPlato" ref={formRef}>
      <Grid>
        <Grid.Column width={10}>
          <Form.Group>
            <Form.Input
              label="Nombre"
              required
              width={8}
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.errors.nombre}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Descripcion"
              required
              width={12}
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              error={formik.errors.descripcion}
            />
          </Form.Group>
          <Form.Group >
            
            <Form.Field width={6}>
              <label>Tipo</label>
              <Form.Input 
                control={Dropdown}
                options={getCategoriasOptions()}
                name='idCategoria'
                search selection
                value={formik.values.idCategoria}
                onChange={(_, data) => formik.setFieldValue('idCategoria', data.value)}
                error={formik.errors.idCategoria}
              />
            </Form.Field>
            <Form.Input
              label="Precio"
              required
              width={6}
              name="precio"
              value={formik.values.precio}
              onChange={formik.handleChange}
              error={formik.errors.precio}
            />
          </Form.Group>
        </Grid.Column>
        <Grid.Column width={5}>
          <Image
            className=""
            size="medium"
            src={`${
              !previewImg
                ? `${process.env.REACT_APP_HOST_URL}/${formik.values.imagen}`
                : previewImg
            }`}
            wrapped
          />
         
            <Button
              color="grey"
              style={{ marginTop: 10 }}
              onClick={clickUpload}
              type="button"
            >
              Click para seleccionar una imagen
            </Button>
        </Grid.Column>
      </Grid>
      <input
        type="file"
        style={{ display: "none" }}
        ref={upload}
        name="imagenBin"
        onChange={renderImagen}
      />
    </Form>
  );
};

export default FormPlato;

const initialValues = () => {
  return {
    nombre: "",
    descripcion: "",
    precio: "",
    idCategoria: "0",
    imagenBin: "",
  };
};

const validationSchema = () => {
  const validation = {
    nombre: Yup.string().required("Este campo es obligatorio"),
    descripcion: Yup.string().required("Este campo es obligatorio"),
    precio: Yup.number()
      .positive("Solo números positivos")
      .required("Este campo es requerido")
      .typeError("Solo se permiten números"),
    idCategoria: Yup.number().positive('Este campo es requerido').required('Este campo es requerido.')
  };
  return validation;
};
