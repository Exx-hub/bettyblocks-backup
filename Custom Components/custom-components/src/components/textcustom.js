(() => ({
  name: 'Textcustom',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { useText } = B;
    const { content, visibility } = options;
    return <div className={classes.root}>{useText(content)}</div>;
  })(),
  styles: () => () => ({
    root: {},
  }),
}))();
