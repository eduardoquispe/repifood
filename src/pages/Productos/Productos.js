import HeaderPage from "../../components/Layout/HeaderPage";
import { Link, useHistory } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import useDimensionTable from "../../hooks/useDimensionTable";
import useLoaderTable from "../../hooks/useLoaderTable";
import { Dropdown, Label, Image } from "semantic-ui-react";
import { ST_ACTIVO } from "../../config/constants";
import { deleteProducto } from "../../actions/productosActions";
import { Confirm, Loading } from "notiflix";

const Productos = () => {

  useDimensionTable();
  const history = useHistory();
  const { dataResul, dataState, dataStateChange, requestDataIfNeeded } = useLoaderTable({ url: 'producto' });

  const handleEditar = (idProducto) => {
    history.push(`/productos/ficha/${idProducto}`);
  }


  const handleEliminar = async ({ idProducto, nombre }) => {
    Confirm.show(
      'PRODUCTOS',
      `¿Desea eliminar al producto ${nombre}?`,
      'Aceptar',
      'Cancelar',
      async function(){
        Loading.pulse();
        const res = await deleteProducto(idProducto);

        if(res) {
          requestDataIfNeeded(true);
        } else {
          Loading.remove();
        }
      }
    )
    }

  return ( 
    <div className="Productos">
       <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">PRODUCTOS</h2>
          </div>
        </div>
        <div className="item ui colhidden">
          <Link to="/productos/ficha" className="ui button">
            <FaPlus /> Nuevo producto
          </Link>
        </div>
      </HeaderPage>
      <div className="Productos__body app__container_body">
        <div className="Productos__tabla">
          <Grid
              sortable={true}
              pageable={true}
              {...dataState}
              {...dataResul}
              onDataStateChange={dataStateChange}
              className="grid"
            >
              <Column
                width={100}
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
                          onClick={() => handleEditar(dataItem.idProducto)}
                        />
                        <Dropdown.Item
                          icon="delete"
                          className="red"
                          text='Eliminar'
                          onClick={() => handleEliminar({...dataItem})}
                        />
                        {
                          parseInt(dataItem.idTipoEstado) === ST_ACTIVO ? (
                            <Dropdown.Item 
                              icon="lock"
                              text='Desabilitar'
                              // onClick={() => handleEditarEstado(dataItem.idCliente, ST_INACTIVO)}
                            />
                          ) : (
                            <Dropdown.Item 
                              icon="unlock"
                              text='Activar'
                              // onClick={() => handleEditarEstado(dataItem.idCliente, ST_ACTIVO)}
                            />
                          )
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              />
              <Column
                width={150}
                title='CÓDIGO'
                field="codigo"
              />
              <Column 
                title="IMAGEN"
                width={250}
                cell={({ dataItem }) => (
                  <td>
                    <Image width={60} src={`${process.env.REACT_APP_HOST_URL}/${dataItem.imagen}`} />
                  </td>
                )}
              />
              <Column field="nombre" width={350} title="PRODUCTO" />
              <Column 
                title="TIPO"
                cell={({ dataItem }) => (
                  <td>
                    <Label color="purple" size="tiny">{dataItem.categoria}</Label>
                  </td>
                )}
              />
              <Column field="precio" width={200} title="PRECIO" />
              <Column 
                title="ESTADO"
                cell={({ dataItem }) => (
                  <td>
                    {
                      parseInt(dataItem.idEstado) === ST_ACTIVO ? (
                          <Label color="green" size="tiny">{dataItem.estado}</Label>
                      ) : (
                        <Label color="red" size="tiny">{dataItem.estado}</Label>
                      )
                    }
                  </td>
                )}
              />
            </Grid>
        </div>
      </div>
    </div>
  );
}
 
export default Productos;