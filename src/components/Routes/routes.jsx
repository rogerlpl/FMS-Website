import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import appRoutes from "routes/app.jsx";

const SwitchRoutes = (props) => (
    <Switch>
      {appRoutes.map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
          if(prop.private && !props.isLogged){ 
            return <Redirect to={{ pathname: '/itrack/caribetrack/app/login', state: { from: props.location } } } key={key}/>
          }else{
          return <Route path={prop.path} component={prop.component} key={key} />;
          }
      })}
    </Switch>
  );

  export default SwitchRoutes