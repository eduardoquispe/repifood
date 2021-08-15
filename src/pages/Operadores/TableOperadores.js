import React from "react";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import { Dropdown, Label } from "semantic-ui-react";
import { ST_ACTIVO, ST_INACTIVO } from "../../config/constants";
import { updateEstadoOperador } from "../../actions/operadorActions";
import { Loading } from "notiflix";

const TableOperadores = (props) => {

  const { dataStateChange, dataState, dataResul,requestDataIfNeeded, handleEliminar, handleEditar } = props;

  const handleEditarEstado = async (idOperador, nuevoEstado) => {
    Loading.pulse();
    const res = await updateEstadoOperador(idOperador, nuevoEstado);
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
                  onClick={() => handleEditar(dataItem.idOperador)}
                />
                <Dropdown.Item
                  icon="delete"
                  className="red"
                  text='Eliminar'
                  onClick={() => handleEliminar(dataItem.idOperador)}
                />
                {
                  parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                    <Dropdown.Item 
                      icon="lock"
                      text='Deshabilitar'
                      onClick={() => handleEditarEstado(dataItem.idOperador, ST_INACTIVO)}
                    />
                  ) : (
                    <Dropdown.Item 
                      icon="unlock"
                      text='Activar'
                      onClick={() => handleEditarEstado(dataItem.idOperador, ST_ACTIVO)}
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
        field="idOperador"
      />
      <Column field="nombres" title="NOMBRES" />
      <Column field="apellidos" title="APELLIDOS" />
      <Column field='perfil' title="PERFIL" />
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
  )
}

export default React.memo(TableOperadores);