// ##############################
// // // HeaderLinks styles
// #############################

import {
  defaultFont,
  dangerColor,
  primaryBoxShadow
} from "variables/styles";

const headerLinksStyle = theme => ({
  popperClose: {
    pointerEvents: "none"
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "10px 15px",
      width: "auto",
      marginTop: "40px"
    }
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px"
  },
  buttonLink: {
    top: "-6px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      marginLeft: "30px",
      width: "auto"
    }
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right",

    }
  },
  top: {
    top: "-6px",
    zIndex: "4",
    color: "white"
  },
  searchIcon: {
    width: "60px",
    height: '30px',
    zIndex: "4",
    [theme.breakpoints.down("sm")]:{
      padding:"0px 0px 15px 40px"
    }

  },
  links: {
    width: "60px",
   height:'30px',
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "30px",
      height: "30px",
      color: "#a9afbb",
      marginRight: "15px"
    }
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "5px",
      border: "1px solid #FFF",
      right: "10px",
      fontSize: "14px",
      background: dangerColor,
      color: "#FFFFFF",
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block"
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "14px",
      marginRight: "8px"
    }
  },
  dropdown: {
    borderRadius: "10px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
    top: "100%",
    zIndex: "1000",
    minWidth: "200px",
    maxHeight: "300px",
    overflow:'auto',
    padding: "5px 0",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: "#fff",
    backgroundClip: "padding-box"
  },
  pooperResponsive: {
    [theme.breakpoints.down("sm")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "auto",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      boxShadow: "none",
      color: "black"
    }
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: "16px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: "#333",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: '#F44336',
      color: "#FFFFFF",
      ...primaryBoxShadow
    }
  }
});

export default headerLinksStyle;
