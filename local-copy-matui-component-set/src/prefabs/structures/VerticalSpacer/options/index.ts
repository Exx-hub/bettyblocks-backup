// import { variable } from '@betty-blocks/component-sdk';
import { sizes } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const verticalSpacerOptions = {
  outerSpacing: sizes('Outer space', {
    value: ['M', '0rem', 'M', '0rem'],
  }),

  ...advanced('VerticalSpacer'),
};
