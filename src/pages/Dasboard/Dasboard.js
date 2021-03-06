import HeaderPage from "../../components/Layout/HeaderPage";

const Dashboard = () => {
  return ( 
    <HeaderPage>
      <div className="item ui colhidden">
        <div className="ui big breadcrumb">
          <i className="right chevron icon divider"></i>
          <h2 className="section active">DASHBOARD</h2>
        </div>
      </div>
    </HeaderPage>
  );
}

export default Dashboard;