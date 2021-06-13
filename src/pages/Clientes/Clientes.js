import HeaderPage from "../../components/Layout/HeaderPage";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import { Button, Dropdown, Label } from "semantic-ui-react";
import { FaPlus } from "react-icons/fa";
import BusquedaCliente from "../../components/Clientes/BusquedaCliente";
import useLoaderTable from "../../hooks/useLoaderTable";
import ModalClientes from '../../components/Clientes/ModalClientes';
import { useState } from "react";
import Notiflix from "notiflix";
import useDimensionTable from "../../hooks/useDimensionTable";

const Clientes = () => {

  const { dataResul, dataState, dataStateChange, requestDataIfNeeded } = useLoaderTable({ url: 'empleado' });
  const [openModal, setOpenModal] = useState(false);
  const { height: heightGrid } = useDimensionTable();

  // const handleClick = () => {
  //   requestDataIfNeeded(true);
  // }

  const handleEditar = () => {
    Notiflix.Loading.pulse();

    setTimeout(() => {
      setOpenModal(true);
      Notiflix.Loading.remove();
    }, 2000);
  }

  

  return (
    <div className="Clientes">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">CLIENTES</h2>
          </div>
        </div>
        <div className="item ui colhidden">
            <Button icon onClick={() => setOpenModal(true)}>
              <FaPlus /> Nuevo Cliente
            </Button>
          </div>
          <div className="right menu colhidden">
            <div className="item ui colhidden">
              <BusquedaCliente />
            </div>
          </div>
      </HeaderPage>
      <div className="Cliente__body app__container_body">
        <div className="Clientes__tabla">
          <Grid
              sortable={true}
              pageable={true}
              style={{ height: heightGrid }}
              {...dataState}
              {...dataResul}
              onDataStateChange={dataStateChange}
              className="grid"
            >
              <Column
                width={50}
                cell={() => (
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
                          onClick={handleEditar}
                        />
                        <Dropdown.Item
                          icon="delete"
                          className="red"
                          text='Eliminar'
                        />
                        <Dropdown.Item 
                          icon="unlock"
                          text="Activar"
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              />
              <Column
                width={50}
                title='ID'
                field="idEmpleado"
              />
              <Column field="nombres" title="NOMBRES" />
              <Column field="apellidos" title="APELLIDOS" />
              <Column field="email" title="EMAIL" />
              <Column field="celular" title="CELULAR" />
              <Column 
                title="ESTADO"
                cell={() => (
                  <td>
                    <Label color="green">Activo</Label>
                  </td>
                )}
              />
            </Grid>
        </div>
      </div>
        <ModalClientes 
          setOpenModal={setOpenModal}
          open={openModal}
        />
    </div>
  );
}

export default Clientes;