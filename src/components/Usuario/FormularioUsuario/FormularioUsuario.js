import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateOperador } from "../../../actions/operadorActions";

const FormularioUsuario = ({ formRef, setOpen }) => {

  const { operador = {} } = useSelector(state => state.operadores);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: Object.keys(operador).length ? {
      ...operador,
      nuevoPassword: '',
      nuevoPasswordRepeat: ''
    } : initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async values => {
      const formData = new FormData();

      Object.keys(values).map(key => {
        formData.append(key, values[key]);
      })
      const res = await dispatch(updateOperador(values.idOperador, formData));
      if(res) {
        setOpen(false);
      }
    }
  })


  return ( 
    <div className="FormularioUsuario">
      <Form onSubmit={formik.handleSubmit} ref={formRef}>
        <Form.Group>
          <Form.Field
            id='form-input-control-first-name'
            control={Input}
            label='Usuario'
            name="usuario"
            value={formik.values.usuario}
            onChange={formik.handleChange}
            width={6}
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Contraseña'
            type='password'
            name='nuevoPassword'
            value={formik.values.nuevoPassword}
            error={formik.errors.nuevoPassword}
            onChange={formik.handleChange}
            width={6}
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Repetir contraseña'
            type='password'
            name='nuevoPasswordRepeat'
            value={formik.values.nuevoPasswordRepeat}
            onChange={formik.handleChange}
            error={formik.errors.nuevoPasswordRepeat}
            width={6}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default FormularioUsuario;

const initialValues = () => {
  return ({
    usuario: '',
    nuevoPassword: '',
    nuevoPasswordRepeat: ''
  })
}

const validationSchema = () => {
  return {
    usuario: Yup.string().required('Este campo es requerido.'),
    nuevoPassword: Yup.string().required('Este campo es requerido.').matches(
      "^[A-Za-z0-9]{8,12}$",
      "Ingrese como mínimo 8 caracteres."
    ),
    nuevoPasswordRepeat: Yup.string().required('Este campo es requerido.').oneOf([Yup.ref("nuevoPassword"), null], "Contraseñas no coinciden")   
  }
}
