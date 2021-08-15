import { Dropdown, Form, Grid } from "semantic-ui-react"
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import MapAlmacen from "./MapAlmacen";
import { addAlmacen, getDistritosAsync, getProvinciasAsync, updateAlmacen } from "../../../actions/almacenActions";
import { useHistory } from "react-router-dom";
import './FormAlmacen.scss';
import { useEffect } from "react";
import { getErrorFields } from '../../../utils/functions';

const FormAlmacen = props => {
  
  const { 
    formRef,
    almacen: almacenData,
    departamentos,
    provincias,
    setProvincias,
    distritos,
    setDistritos
  } = props;

  const history = useHistory();

  const formik = useFormik({
    initialValues: Object.keys(almacenData).length > 0 ? almacenData :  initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async values => {
      
      const dataEnviar = {...values};
      
      let res = null;

      if(values.idAlmacen) {
        res = await updateAlmacen(dataEnviar.idAlmacen, dataEnviar);
      } else {
        res = await addAlmacen(dataEnviar);
      }
      if(res) {
        history.push('/almacenes');
      }
    } 
  });

  const { idDepartamento, idProvincia } = formik.values;

  const addGeozonas = (nuevaGeoZona) => {
    formik.setFieldValue('geozona', [...formik.values.geozona, nuevaGeoZona]);
  }

  const getOptionsSelect = (origin) => {
    
    let labelId = '';
    let labeltext = '';
    let labelValue = '';
    let arData = [];

    switch (origin) {
      case 'dep':
        labelId='idDepartamento';
        labeltext='departamento';
        labelValue='idDepartamento';
        arData= departamentos;
        break;
      case 'prov':
        labelId='idProvincia';
        labeltext='provincia';
        labelValue='idProvincia';
        arData=provincias;
        break;
      case 'dist':
        labelId='idDistrito';
        labeltext='distrito';
        labelValue='idDistrito';
        arData=distritos;
        break;
      default:
        break;
    }
    let list = [{ text: 'Seleccione', value:'0', key: 0 }];
    arData.forEach(dep => {
      list = [...list, {
        key: dep[labelId],
        text: dep[labeltext],
        value: dep[labelValue]
      }];
    })

    return list;
  }

  useEffect(() => {
    (async () => {
      const prov = await getProvinciasAsync(idDepartamento);
      
      if (prov.length > 0) {
        setProvincias(prov);
      }
      
    })()
  }, [idDepartamento, setProvincias])

  useEffect(() => {
    (async () => {
      const distr = await getDistritosAsync(idProvincia);
      if (distr.length > 0) {
        setDistritos(distr);
      }
    })()
  }, [idProvincia, setDistritos])

  return ( 
    <>
        <Form ref={formRef} onSubmit={formik.handleSubmit} className="FormAlmacen">
        <Grid>
          <Grid.Column width={7}>
            <Form.Group>
              <Form.Input
                label='Nombre'
                required
                width={14}
                name='almacen'
                value={formik.values.almacen}
                onChange={formik.handleChange}
                error={getErrorFields('almacen', formik)}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                  label='Dirección'
                  required
                  width={10}
                  name='direccion'
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  error={getErrorFields('direccion', formik)}
                  onBlur={formik.handleBlur}
                />
                <Form.Input
                  label='Cargo por delivery'
                  required
                  width={4}
                  name='cargo'
                  value={formik.values.cargo}
                  onChange={formik.handleChange}
                  error={getErrorFields('cargo', formik)}
                  onBlur={formik.handleBlur}
                />
              </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>Departamento</label>
                <Form.Input 
                  control={Dropdown}
                  options={getOptionsSelect('dep')}
                  name='idDepartamento'
                  search
                  selection
                  required
                  width={5}
                  value={formik.values.idDepartamento}
                  onChange={(_, data) => formik.setFieldValue('idDepartamento', data.value)}
                  error={getErrorFields('idDepartamento', formik)}
                  onBlur={formik.handleBlur}
                />
              </Form.Field>
              <Form.Field>
                <label>Provincia</label>
                <Form.Input 
                  control={Dropdown}
                  options={getOptionsSelect('prov')}
                  name='idProvincia'
                  search
                  selection
                  required
                  width={5}
                  value={formik.values.idProvincia}
                  onChange={(_, data) => formik.setFieldValue('idProvincia', data.value)}
                  error={getErrorFields('idProvincia', formik)}
                  onBlur={formik.handleBlur}
                />
              </Form.Field>
              <Form.Field>
                <label>Distrito</label>
                <Form.Input 
                  control={Dropdown}
                  options={getOptionsSelect('dist')}
                  name='idDistrito'
                  search
                  selection
                  required
                  width={5}
                  value={formik.values.idDistrito}
                  onChange={(_, data) => formik.setFieldValue('idDistrito', data.value)}
                  error={getErrorFields('idDistrito', formik)}
                  onBlur={formik.handleBlur}
                />
              </Form.Field>
            </Form.Group>
          </Grid.Column>
          <Grid.Column width={9}>
            <MapAlmacen addGeozonas={addGeozonas} positions={formik.values.geozona} />
          </Grid.Column>
        </Grid>
        </Form>
    </>
  );
}

export default FormAlmacen;

const initialValues = () => ({
  almacen: '',
  direccion: '',
  idDepartamento: '0',
  idProvincia: '0',
  cargo: '',
  idDistrito: '0',
  geozona: []
})

const validationSchema = () => ({
  almacen: Yup.string().required('Este campo es requerido.'),
  direccion: Yup.string().required('Este campo es requerido.'),
  cargo: Yup.number().positive('Solo cantidades positivas.').typeError('Solo se permiten números').required('Este campo es requerido.'),
  idDepartamento: Yup.number().positive('Este campo es requerido').required('Este campo es requerido.'),
  idProvincia: Yup.number().positive('Este campo es requerido').required('Este campo es requerido.'),
  idDistrito: Yup.number().positive('Este campo es requerido').required('Este campo es requerido.'),
  geozona: Yup.array().min(1, 'No hay geozonas en este alamacen.')
})