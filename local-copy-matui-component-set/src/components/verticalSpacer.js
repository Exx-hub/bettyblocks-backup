(() => ({
  name: 'VerticalSpacer',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    // const { content } = options;
    return (
      <div className={classes.root}>
        <div className={env === 'dev' ? classes.clickSpace : ''} />
      </div>
    );
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        width: '100%',
        display: 'block',
      },
      clickSpace: {
        padding: '0.25rem 0',
      },
    };
  },
}))();
