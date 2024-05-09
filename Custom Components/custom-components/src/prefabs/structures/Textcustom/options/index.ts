import { toggle, variable } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const textcustomOptions = {
  content: variable('Content', {
    value: ['Hello world'],
    configuration: { as: 'MULTILINE' },
  }),

  visible: toggle('Initial visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),

  ...advanced('Textcustom'),
};
