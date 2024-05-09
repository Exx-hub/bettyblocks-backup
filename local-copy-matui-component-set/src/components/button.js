(() => ({
  name: 'Button',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  styleType: 'BUTTON', // enables Styles tab -- but what are other options?
  jsx: (() => {
    const { CircularProgress, Tooltip, Link, Badge } = window.MaterialUI.Core;
    const {
      disabled,
      size,
      type,
      icon,
      iconPosition,
      buttonText,
      visible,
      addTooltip,
      hasVisibleTooltip,
      tooltipContent,
      tooltipPlacement,
      dataComponentAttribute,
      linkType, // open page button option
      linkTo, // open page button option
      linkToExternal, // open page button option
      linkTarget, // open page button option
      actionId, // action button option
      actionModels, // action button option? where is this coming from? I think not used anymore?
    } = options;
    const {
      env,
      getModel,
      getIdProperty,
      useText,
      useAction,
      useProperty,
      useEndpoint,
      Icon,
    } = B;
    const isDev = env === 'dev'; // if on page builder or compiled window
    const isAction = linkType === 'action' || !!actionId; // if button is an action button? // if linkType is action or if there is an actionId
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || ''; // if open page button, link to an external address
    const linkToInternalVariable =
      linkTo && linkTo.id !== '' && useEndpoint(linkTo); // if internal, if with id like page detail need record id
    const hasInteralLink =
      linkType === 'internal' && linkTo && linkTo.id !== ''; // hasInternalLink boolean
    const buttonContent = useText(buttonText); // button text
    const tooltipText = useText(tooltipContent); // tooltip text
    const [isVisible, setIsVisible] = useState(visible); // button visibility
    const [isLoading, setIsLoading] = useState(false); // button loading state
    const [isOpen, setIsOpen] = useState(hasVisibleTooltip); // tooltip visibility
    const [, setOptions] = useOptions(); // set options after page load?
    const [isDisabled, setIsDisabled] = useState(disabled); // disabled state of button

    // convert camel case to snake case
    const camelToSnakeCase = (str) =>
      str[0].toLowerCase() +
      str
        .slice(1, str.length)
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    // ACTION BUTTON input variable? passed to action - --- I think this is no longer used. esp -> actionModels
    const input =
      !isDev && actionModels
        ? actionModels.reduce((acc, value) => {
            const propertyUuid = getIdProperty(value);
            const model = getModel(value);
            const recordId = propertyUuid && useProperty(propertyUuid);

            if (recordId !== undefined) {
              acc[camelToSnakeCase(model.name)] = {
                variable_id: recordId,
              };
            }
            return acc;
          }, {})
        : {};

    // ACTION BUTTON TRIGGER ACTION --- I think this is no longer used.
    const [actionCallback, { loading }] = (isAction &&
      useAction(actionId, {
        variables: {
          input,
        },
        onCompleted(data) {
          B.triggerEvent('onActionSuccess', data.actionb5);
        },
        onError(error) {
          B.triggerEvent('onActionError', error);
        },
      })) || [() => {}, { loading: false }];

    // SETS VISIBILITY OF BUTTON and of TOOLTIP IF IT EXISTS
    useEffect(() => {
      setIsVisible(visible);
      setIsOpen(hasVisibleTooltip);
    }, [visible, hasVisibleTooltip]);

    // disabled state of button
    useEffect(
      () =>
        setOptions({
          disabled: isDisabled,
        }),
      [isDisabled],
    );

    // custom interactions. must be an older version because wrapped in useEffect
    useEffect(() => {
      B.defineFunction('Show', () => setIsVisible(true));
      B.defineFunction('Hide', () => setIsVisible(false));
      B.defineFunction('Show/Hide', () => setIsVisible((s) => !s));
      B.defineFunction('Toggle loading state', () => {
        setIsLoading((s) => !s);
      });
      B.defineFunction('Enable', () => setIsDisabled(false));
      B.defineFunction('Disable', () => setIsDisabled(true));

      if (loading) {
        B.triggerEvent('onActionLoad', loading);
      }
    }, [loading]);

    // OPEN PAGE BUTTON - external hfef
    const getExternalHref = (config) => {
      if (config.disabled) {
        return undefined;
      }
      if (config.linkToExternal && config.linkToExternal.id !== '') {
        return config.linkToExternalVariable;
      }
      return undefined;
    };

    // OPEN PAGE BUTTON - internal hfef
    const getInternalHref = (config) => {
      if (config.disabled) {
        return undefined;
      }
      if (config.linkTo && config.linkTo.id !== '') {
        return config.linkToInternalVariable;
      }
      return undefined;
    };

    // loading indicator, for action button
    const showIndicator = isLoading || loading;

    // checks button content if empty or without icon
    const emptySpace = () => {
      if (icon === 'None') {
        return '\xA0';
      }
      return null;
    };

    // BUTTON PROPS...will be spread
    const buttonProps = {
      disabled: disabled || isLoading || loading,
      tabIndex: isDev ? -1 : undefined,
      onClick: (event) => {
        event.stopPropagation();
        actionCallback();
      },
      role: 'button',
      type: isDev ? 'button' : type,
      endpoint:
        linkType === 'internal' && linkTo && linkTo.id ? linkTo : undefined,
      'data-component': useText(dataComponentAttribute) || 'Button',
    };

    // TARGET PROPS, used for open page button
    const targetProps = {
      target: linkTarget,
      rel: linkTarget === '_blank' ? 'noopener' : '',
      'data-component': useText(dataComponentAttribute) || 'Button',
    };

    // ANCHOR PROPS for open page button
    const anchorProps = {
      ...targetProps,
      href: getExternalHref({
        disabled,
        linkToExternal,
        linkToExternalVariable,
      }),
      tabIndex: isDev ? -1 : undefined,
      type: isDev ? 'button' : type,
      endpoint:
        linkType === 'internal' && linkTo && linkTo.id ? linkTo : undefined,
      onClick: (event) => {
        event.stopPropagation();
        actionCallback();
      },
    };

    // LINK PROPS for open page button
    const linkProps = {
      ...targetProps,
      href: getInternalHref({ linkTo, linkToInternalVariable, disabled }),
      component: hasInteralLink && !disabled ? B.Link : undefined,
      endpoint: hasInteralLink && !disabled ? linkTo : undefined,
    };

    // actual BUTTON CONTENT
    const ButtonContent = (
      <div
        className={[classes.root, disabled ? classes.disabled : ''].join(' ')}
      >
        <span className={classes.innerRoot}>
          &#8203;
          {icon !== 'None' && iconPosition === 'start' && (
            <span
              style={{
                marginRight: buttonContent ? '5px' : 0,
                display: 'flex',
              }}
            >
              <Icon name={icon} fontSize={size} />
            </span>
          )}
          {buttonContent !== '' ? buttonContent : emptySpace}
          {icon !== 'None' && iconPosition === 'end' && (
            <span
              style={{
                marginLeft: buttonContent ? '5px' : 0,
                display: 'flex',
              }}
            >
              <Icon name={icon} fontSize={size} />
            </span>
          )}
          {showIndicator && (
            <CircularProgress size={16} className={classes.loader} />
          )}
        </span>
      </div>
    );

    // actual BUTTON
    const ButtonElement = (
      <button type="button" className={classes.button} {...buttonProps}>
        {ButtonContent}
      </button>
    );

    // to stop propagating the click event
    const handleClick = (e) => {
      e.stopPropagation();
    };

    // OPEN PAGE BUTTON - link component or anchor tag, Link if internal, must be from REACT ROUTER
    // if external just a plain ANCHOR TAG
    const LinkComponent =
      linkType === 'internal' ? (
        <Link
          className={classes.linkComponent}
          {...linkProps}
          underline="none"
          onClick={handleClick}
        >
          {ButtonContent}
        </Link>
      ) : (
        <a
          className={classes.linkComponent}
          {...anchorProps}
          onClick={handleClick}
          onKeyUp={handleClick}
          role="button"
          tabIndex="0"
        >
          {ButtonContent}
        </a>
      );

    // if  ACTION button or normal BUtton display ButtonElement, if OPEN page button display LinkComponent,
    const ButtonComponent =
      type === 'submit' || isAction ? ButtonElement : LinkComponent;

    // TOOLTIP props
    let tooltipProps = {
      title: tooltipText,
      placement: tooltipPlacement,
      arrow: true,
      classes: {
        tooltip: classes.tooltip,
        arrow: classes.arrow,
      },
    };

    // display tooltip options if on page builder
    if (isDev) {
      tooltipProps = {
        ...tooltipProps,
        open: isOpen,
      };
    }

    // Button if tooltip is enabled, wrap ButtonComponent with tooltip wrapper
    const ButtonWithTooltip = (
      <div style={{ width: 'fit-content' }}>
        <Tooltip {...tooltipProps}>
          <div>{ButtonComponent}</div>
        </Tooltip>
      </div>
    );
    const Button = addTooltip ? ButtonWithTooltip : ButtonComponent;

    if (!isDev) {
      if (!isVisible) {
        return <></>;
      }
      return Button;
    }

    return <div className={classes.wrapper}>{Button}</div>;
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const newStyling = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : newStyling.getSpacing(idx, device);
    return {
      // this is the selected box
      wrapper: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'flex' : 'inline-block',
        minHeight: '1rem',
        '& > *': {
          pointerEvents: 'none',
        },
        width: ({ options: { fullWidth } }) => (fullWidth ? '100%' : 'auto'),
      },
      linkComponent: {
        '&, &.MuiTypography-root': {
          textDecoration: 'none',
          display: ({ options: { fullWidth } }) =>
            fullWidth ? 'inline-flex' : 'inline-block',
          width: ({ options: { fullWidth, outerSpacing } }) =>
            !fullWidth
              ? 'auto'
              : `calc(100% - ${getSpacing(outerSpacing[1])} - ${getSpacing(
                  outerSpacing[3],
                )})`,
          marginTop: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[0]),
          marginRight: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[1]),
          marginBottom: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[2]),
          marginLeft: ({ options: { outerSpacing } }) =>
            '' && getSpacing(outerSpacing[3]),
          [`@media ${mediaMinWidth(600)}`]: {
            width: ({ options: { fullWidth, outerSpacing } }) => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Portrait');
              const marginLeft = getSpacing(outerSpacing[3], 'Portrait');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Portrait'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Portrait'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Portrait'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            width: ({ options: { fullWidth, outerSpacing } }) => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Landscape');
              const marginLeft = getSpacing(outerSpacing[3], 'Landscape');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Landscape'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Landscape'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Landscape'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            width: ({ options: { fullWidth, outerSpacing } }) => {
              if (!fullWidth) return 'auto';
              const marginRight = getSpacing(outerSpacing[1], 'Desktop');
              const marginLeft = getSpacing(outerSpacing[3], 'Desktop');
              return `calc(100% - ${marginRight} - ${marginLeft})`;
            },
            marginTop: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[0], 'Desktop'),
            marginRight: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[1], 'Desktop'),
            marginBottom: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[2], 'Desktop'),
            marginLeft: ({ options: { outerSpacing } }) =>
              getSpacing(outerSpacing[3], 'Desktop'),
          },
        },
      },
      button: {
        border: 'none',
        background: 'transparent',
        padding: 0,
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          width: ({ options: { fullWidth, outerSpacing } }) => {
            if (!fullWidth) return 'auto';
            const marginRight = getSpacing(outerSpacing[1], 'Portrait');
            const marginLeft = getSpacing(outerSpacing[3], 'Portrait');
            return `calc(100% - ${marginRight} - ${marginLeft})`;
          },
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          width: ({ options: { fullWidth, outerSpacing } }) => {
            if (!fullWidth) return 'auto';
            const marginRight = getSpacing(outerSpacing[1], 'Landscape');
            const marginLeft = getSpacing(outerSpacing[3], 'Landscape');
            return `calc(100% - ${marginRight} - ${marginLeft})`;
          },
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          width: ({ options: { fullWidth, outerSpacing } }) => {
            if (!fullWidth) return 'auto';
            const marginRight = getSpacing(outerSpacing[1], 'Desktop');
            const marginLeft = getSpacing(outerSpacing[3], 'Desktop');
            return `calc(100% - ${marginRight} - ${marginLeft})`;
          },
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
      root: ({ style }) => ({
        ...style,
        boxSizing: 'border-box',
        display: 'flex',
        width: '100%',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',

        '&:hover': {
          filter: 'brightness(90%)',
        },
        '&:active, &:focus': {
          filter: 'brightness(85%)',
          outline: 'none',
        },
      }),
      innerRoot: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '1.25rem',
      },
      disabled: {
        opacity: '50%',
        boxShadow: 'none',
        filter: 'grayscale(100%)',
        pointerEvents: 'none',
      },
      loader: {
        color: 'inherit!important',
        marginLeft: '0.25rem',
      },
      empty: {
        '&::before': {
          content: '"\xA0"',
        },
      },
      tooltip: {
        backgroundColor: ({ options: { tooltipBackground } }) => [
          newStyling.getColor(tooltipBackground),
          '!important',
        ],
        color: ({ options: { tooltipText } }) => [
          newStyling.getColor(tooltipText),
          '!important',
        ],
      },
      arrow: {
        color: ({ options: { tooltipBackground } }) => [
          newStyling.getColor(tooltipBackground),
          '!important',
        ],
      },
    };
  },
}))();
