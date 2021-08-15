import { Table } from "semantic-ui-react"

const DireccionesCliente = ({ direcciones = [] }) => {
  return ( 
    <div className="DireccionesCliente">
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>DIRECCION</Table.HeaderCell>
            <Table.HeaderCell>REFERENCIA</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {direcciones.map((direccion, index) => (
            <FilaDirecciones 
              key={index}
              {...direccion}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DireccionesCliente;

const FilaDirecciones = ({ idDireccion, direccion, referencia }) => {
  return (
    <Table.Row>
      <Table.Cell>{idDireccion}</Table.Cell>
      <Table.Cell>{direccion}</Table.Cell>
      <Table.Cell>{referencia}</Table.Cell>
    </Table.Row>
  );
}