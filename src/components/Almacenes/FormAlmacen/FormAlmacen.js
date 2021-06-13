import { Button, Divider, Form, Header, Input, Modal } from "semantic-ui-react"
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import MapAlmacen from "./MapAlmacen";
import { useState } from "react";

const FormAlmacen = ({ setOpenModal }) => {

  const [zonas, setZonas] = useState([]);
  
  const formik = useFormik({
    initialValues: {
      nombre: '',
      direccion: '',
      departamento: '',
      provincia: '',
      distrito: '',
      geozona: []
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Este campo es requerido.'),
      direccion: Yup.string().required('Este campo es requerido.'),
      departamento: Yup.string().required('Este campo es requerido.'),
      provincia: Yup.string().required('Este campo es requerido.'),
      distrito: Yup.string().required('Este campo es requerido.'),
      geozona: Yup.array().length(1, 'No hay geozonas en este alamacen.')
    }),
    onSubmit: values => {
      console.log(values)
    } 
  });

  const addGeozonas = (nuevaGeoZona) => {
    // setZonas(zonas => { 
    //   return [...zonas, nuevaGeoZona];
    // });
    formik.setFieldValue('geozona', [...formik.values.geozona, nuevaGeoZona]);
  }

  return ( 
    <>
      <Modal.Header>Nuevo almacen</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input
              label='Nombre'
              required
              width={6}
              name='nombre'
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.errors.nombre}
            />
            <Form.Input
              label='Dirección'
              required
              width={9}
              name='direccion'
              value={formik.values.direccion}
              onChange={formik.handleChange}
              error={formik.errors.direccion}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Departamento'
              required
              width={5}
              name='departamento'
              value={formik.values.departamento}
              onChange={formik.handleChange}
              error={formik.errors.departamento}
            />
            <Form.Input
              label='Provincia'
              required
              width={5}
              name='provincia'
              value={formik.values.provincia}
              onChange={formik.handleChange}
              error={formik.errors.provincia}
            />
            <Form.Input
              label='Distrito'
              required
              width={5}
              name='distrito'
              value={formik.values.distrito}
              onChange={formik.handleChange}
              error={formik.errors.distrito}
            />
          </Form.Group>
          <Header as='h3'>Geozona</Header>
          <Divider />
          <MapAlmacen addGeozonas={addGeozonas} positions={zonas} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModal(false)}>
          Cancelar
        </Button>
        <Button primary onClick={() => formik.submitForm()}>
          Guardar
        </Button>
      </Modal.Actions>
    </>
  );
}

export default FormAlmacen;