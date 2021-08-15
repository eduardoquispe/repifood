import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Confirm, Loading } from 'notiflix';
import { Dropdown, Label } from "semantic-ui-react";
import { deleteRepartidor, updateEstadoRepartidor } from '../../../actions/repartidoresActions';
import { ST_ACTIVO, ST_INACTIVO } from '../../../config/constants';

const TablaRepartidores = (props) => {

  const { dataState, dataResul, handleEditarModal, requestDataIfNeeded, dataStateChange } = props;

  const handleEliminar = async (idRepartidor) => {
    Confirm.show(
      'REPARTIDORES',
      `¿Desea eliminar al repartidor ${idRepartidor}?`,
      'Aceptar',
      'Cancelar',
      async function(){
        Loading.pulse();
        const res = await deleteRepartidor(idRepartidor);

        if(res) {
          requestDataIfNeeded(true);
        } else {
          Loading.remove();
        }
      }
    );
  }

  const handleEditarEstado = async (idRepartidor, nuevoEstado) => {
    Loading.pulse();
    const res = await updateEstadoRepartidor(idRepartidor, nuevoEstado);

    if(res) {
      requestDataIfNeeded(true);
    } else {
      Loading.remove();
    }

  }

  return ( 
    <Grid
      sortable={true}
      pageable={true}
      {...dataState}
      {...dataResul}
      onDataStateChange={dataStateChange}
      className="grid"
    >
      <Column
        width={50}
        cell={({ dataItem }) => (
          <td style={{overflow: "inherit"}}>
            <Dropdown
              icon='ellipsis vertical'
              floating
              button
              className='icon circular compact ui left pointing'
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="edit"
                  className="blue"
                  text='Editar'
                  onClick={() => handleEditarModal(dataItem.idRepartidor)}
                />
                <Dropdown.Item
                  icon="delete"
                  className="red"
                  text='Eliminar'
                  onClick={() => handleEliminar(dataItem.idRepartidor)}
                />
                {
                  parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                    <Dropdown.Item 
                      icon="lock"
                      text='Deshabilitar'
                      onClick={() => handleEditarEstado(dataItem.idRepartidor, ST_INACTIVO)}
                    />
                  ) : (
                    <Dropdown.Item 
                      icon="unlock"
                      text='Activar'
                      onClick={() => handleEditarEstado(dataItem.idRepartidor, ST_ACTIVO)}
                    />
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
          </td>
        )}
      />
      <Column
        width={50}
        title='ID'
        field="idRepartidor"
      />
      <Column field="nombres" title="NOMBRES" />
      <Column field="apellidos" title="APELLIDOS" />
      <Column field="email" title="EMAIL" />
      <Column field="celular" title="CELULAR" />
      <Column 
        title="ESTADO"
        cell={({ dataItem }) => (
          <td>
            {
                parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                  <Label color="green" size="tiny">{dataItem.tipoEstado}</Label>
              ) : (
                <Label color="red" size="tiny">{dataItem.tipoEstado}</Label>
              )
            }
          </td>
        )}
      />
    </Grid>
  );
}
 
export default TablaRepartidores;