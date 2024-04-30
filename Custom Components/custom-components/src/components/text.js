(() => ({
  name: 'text',
  type: 'BODY_COMPONENT', // decide where you can drag this component
  allowedTypes: [], // if other can components can be dragged into this component.
  orientation: 'HORIZONTAL',
  jsx: <div className={classes.root}>First custom component!</div>,
  styles: (B) => (theme) => {
    const style = new B.Styling(theme);
    return {
      root: {
        color: '#E9004E',
      },
    };
  },
}))();
