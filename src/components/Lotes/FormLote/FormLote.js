import { useFormik } from "formik";
import { Loading } from "notiflix";
import { useEffect } from "react";
import { Dropdown, Form } from "semantic-ui-react"
import * as Yup from 'yup';
import { addLote, updateLote } from "../../../actions/lotesActions";
import { getErrorFields, getOptionsSelect } from "../../../utils/functions";

const FormLote = props => {

  const { formRef, almacenes, productos, loteData, setOpenModal, requestDataIfNeeded } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async values => {
      Loading.pulse();
      let res = null;
      if(values.idLote) {
        res = await updateLote(values.idLote, values);
      } else {
        res = await addLote(values);
      }
      if(res) {
        requestDataIfNeeded(true);
        setOpenModal(false);
        return;
      }
      Loading.remove();
    }
  });

  useEffect(() => {
    if (loteData.idLote) {
      formik.setValues(loteData);
    }
  }, [loteData])

  return ( 
    <Form onSubmit={formik.handleSubmit} ref={formRef}>
      <Form.Group>
        <Form.Field>
          <label>Almacen</label>
          <Form.Input 
            control={Dropdown}
            options={getOptionsSelect({
              labelId: 'idAlmacen',
              labeltext: 'almacen',
              labelValue: 'idAlmacen',
              data: almacenes
            })}
            name='idAlmacen'
            search
            selection
            required
            width={5}
            value={formik.values.idAlmacen}
            onChange={(_, data) => formik.setFieldValue('idAlmacen', data.value)}
            error={getErrorFields('idAlmacen', formik)}
            onBlur={formik.handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <label>Producto</label>
          <Form.Input 
            control={Dropdown}
            options={getOptionsSelect({
              labelId: 'idProducto',
              labeltext: 'nombre',
              labelValue: 'idProducto',
              data: productos
            })}
            name='idProducto'
            search
            selection
            required
            width={5}
            value={formik.values.idProducto}
            onChange={(_, data) => formik.setFieldValue('idProducto', data.value)}
            error={getErrorFields('idProducto', formik)}
            onBlur={formik.handleBlur}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Input
          label='Cantidad'
          width={8}
          required
          name='cantidadInicial'
          value={formik.values.cantidadInicial}
          onChange={formik.handleChange}
          error={getErrorFields('cantidadInicial', formik)}
          onBlur={formik.handleBlur}
        />
        <Form.Input
          label='Fecha'
          type="date"
          width={8}
          required
          name='fecha'
          value={formik.values.fecha}
          onChange={formik.handleChange}
          error={getErrorFields('fecha', formik)}
          onBlur={formik.handleBlur}
        />
      </Form.Group>
    </Form>
  );
}
 
export default FormLote;

const initialValues = () => ({
  fecha: '',
  idAlmacen: '0',
  idProducto: '0',
  cantidadInicial: ''
})

const validationSchema = () => ({
  fecha: Yup.string().required('Este campo es requerido'),
  idAlmacen: Yup.number().positive('Este campo es requerido').required('Este campo es requerido'),
  idProducto:  Yup.number().positive('Este campo es requerido').required('Este campo es requerido'),
  cantidadInicial:  Yup.number()
    .positive('Números mayores a 0')
    .required('Este campo es requerido')
    .typeError('Solo números')
})
