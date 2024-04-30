import { showIf, toggle, variable } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const hconditionalOptions = {
  visible: toggle('Initial visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
      condition: showIf('type', 'EQ', 'singleRule'),
    },
  }),

  left: variable('Left', {
    value: ['alvin'],
    configuration: {
      condition: showIf('type', 'EQ', 'singleRule'),
    },
  }),
  right: variable('Right', {
    value: ['alvin'],
    configuration: {
      condition: showIf('type', 'EQ', 'singleRule'),
    },
  }),

  ...advanced('Hconditional'),
};
