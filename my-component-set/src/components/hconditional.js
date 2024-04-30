(() => ({
  name: 'Hconditional',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { left, right, visible: initVisibility } = options;
    const { useText } = B;
    const isEmpty = children.length === 0;

    const [visible, setVisible] = useState();
    const leftText = useText(left);
    const rightText = useText(right);

    // hardcoded condition value - true
    const evalCondition = () => leftText === rightText;

    const checkCondition = evalCondition();

    useEffect(() => {
      setVisible(checkCondition);
    }, [checkCondition]);

    if (!visible) {
      return <></>;
    }

    return (
      <div
        className={includeStyling(
          children.length === 0 ? classes.root : undefined,
        )}
      >
        {isEmpty ? 'This is an empty conditional' : children}
      </div>
    );
  })(),
  styles: () => () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem',
      fontSize: '0.75rem',
      color: 'black',
      textTransform: 'uppercase',
      borderWidth: '0.0625rem',
      borderColor: 'lightgray',
      borderStyle: 'dashed',
      backgroundColor: 'beige',
    },
  }),
}))();
