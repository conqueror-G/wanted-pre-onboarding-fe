const flexCenterSet = (just = "center", align = "center") => {
  return `display: flex;
  justify-content: ${just};
  align-items: ${align};`;
};

const theme = {
  flexCenterSet,
};

export default theme;
