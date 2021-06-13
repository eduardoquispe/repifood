import { Divider, Form, Header } from "semantic-ui-react";
import MapAlamacen from "./MapAlmacen";

const FormNuevo = ({ formik, addGeozonas, positions=[] }) => {
  return ( 
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
          <MapAlamacen addGeozonas={addGeozonas} positions={positions} />
        </Form>
  );
}
 
export default FormNuevo;