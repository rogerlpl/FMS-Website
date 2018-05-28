import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, withStyles } from "material-ui";
// import Button from 'material-ui/Button';
import footerStyle from "variables/styles/footerStyle";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="itrack/caribetrack/app/dashboard" className={classes.block}>
                Pagina Principal
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://imecap.com.do/itrack/caribetrack/" className={classes.block}>
                Compañia
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="http://imecap.com.do/itrack/caribetrack/" className={classes.a}>
              IMECAP
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
