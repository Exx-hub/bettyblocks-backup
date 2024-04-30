(() => ({
  name: 'Conditional',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      type,
      left,
      right,
      compare,
      visible: initVisibility, // renamed to initVisibility, to be able to use visible as state
      dataComponentAttribute,
      displayLogic,
    } = options; // coming from structures/Conditional/options/index.ts
    const { useText, env, useLogic } = B; // coming from B object
    const isDev = env === 'dev'; // if development more or production i guess?
    const isPristine = isDev && children.length === 0; // if conditional is empty
    const isSingleRule = type === 'singleRule'; // if singleRule nor multiple

    // checks if value can be a number, like a string or a number
    const canBeNumber = (value) => {
      return (
        value !== '' &&
        (typeof value === 'string' || typeof value === 'number') &&
        !isNaN(value)
      );
    };

    const mounted = useRef(false); // created a ref
    const leftText = useText(left); // access variable from options, stores the left value
    const rightText = useText(right); // access variable from options, stores the right value
    const [leftValue, setLeftValue] = useState(leftText); // saves in state
    const [rightValue, setRightValue] = useState(rightText);
    const [visible, setVisible] = useState(); // visible state
    const logic = useLogic(displayLogic); // saves logic?

    // checks if conditional is true or false based on the comparison options
    // this will basically return true or false, and will then display or not display children
    const evalCondition = () => {
      // if not visible is toggled, or empty left or right values, return false
      if (!initVisibility && leftValue === '' && rightValue === '') {
        return false;
      }

      // returns an array, saved into leftParsed and rightParsed
      // checks if both can be numbers, if yes both will be parsed into numbers.
      // if not, will be stored as strings
      const [leftParsed, rightParsed] =
        canBeNumber(leftValue) && canBeNumber(rightValue)
          ? [parseFloat(leftValue), parseFloat(rightValue)]
          : [leftValue.toString(), rightValue.toString()];

      switch (compare) {
        case 'neq':
          return leftParsed !== rightParsed;
        case 'contains':
          return leftParsed !== '' && rightParsed !== ''
            ? leftParsed.toString().indexOf(rightParsed.toString()) > -1
            : false;
        case 'notcontains':
          return leftParsed.toString().indexOf(rightParsed.toString()) < 0;
        case 'gt':
          return leftParsed > rightParsed;
        case 'lt':
          return leftParsed < rightParsed;
        case 'gteq':
          return leftParsed >= rightParsed;
        case 'lteq':
          return leftParsed <= rightParsed;
        default:
          return leftParsed === rightParsed;
      }
    };

    // calls evalcondition to check if comparison is true or false
    const checkCondition = evalCondition();

    // why are useEffects needed in the page builder? hmm
    useEffect(() => {
      setLeftValue(leftText);
      setRightValue(rightText);
    }, [leftText, rightText, setLeftValue, setRightValue]);

    useEffect(() => {
      setVisible(checkCondition);
    }, [checkCondition]);

    useEffect(() => {
      if (visible) {
        B.triggerEvent('isTrue', true);
      } else {
        B.triggerEvent('isFalse', false);
      }
      if (mounted.current) {
        B.triggerEvent('onChange', visible);
      }
    }, [visible]);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    // custom interactions?
    B.defineFunction('Hide', () => setVisible(false));
    B.defineFunction('Show', () => setVisible(true));
    B.defineFunction('Show/Hide', () => setVisible((s) => !s));
    B.defineFunction('Set Visibility', (value) => {
      if (typeof value === 'boolean') setVisible(value);
    });

    const getValue = (evt) => {
      const value = (evt && evt.target && evt.target.value) || evt;
      return `${value}`;
    };
    B.defineFunction('Set Left Value', (evt) => setLeftValue(getValue(evt)));
    B.defineFunction('Set Right Value', (evt) => setRightValue(getValue(evt)));

    // return nothing if single rule, not developing or not visible
    if (isSingleRule && !isDev && !visible) {
      return <></>;
    }

    // return nothing if single rule, not developing or no logic
    if (!isSingleRule && !isDev && !logic) {
      return <></>;
    }

    return (
      <div
        className={includeStyling(
          children.length === 0 ? classes.empty : undefined,
        )}
        data-component={useText(dataComponentAttribute) || 'Conditional'}
      >
        {isPristine ? 'This is an empty conditional' : children}
        {/* if conditional is empty display this, or render children */}
      </div>
    );
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
