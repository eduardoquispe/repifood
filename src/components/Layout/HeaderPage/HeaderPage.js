import './HeaderPage.scss';

const HeaderPage = ({ children }) => {
  return ( 
    <div className="navslide navwrap" id="app_content_toolbar" >
      <div className="ui menu icon borderless" data-color="inverted white" style={{height:40}}>
        { children }
      </div>
    </div>
  );
}

export default HeaderPage;