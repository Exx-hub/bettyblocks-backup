(() => ({
  name: 'Input',
  //   type: 'INPUT', cannot be dragged? need to add to container component?
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (
    <label htmlFor={options.name}>
      <span>{options.label}</span>
      <input
        type="text"
        readOnly={B.env === 'dev'}
        placeholder={options.placeholder}
        name={options.label}
        id={options.label}
      />
    </label>
  ),
  styles: (B) => (theme) => {
    const style = new B.Styling(theme);
    return {
      root: {
        color: '#333',
      },
    };
  },
}))();
