import { prefab, Icon } from '@betty-blocks/component-sdk';

import { VerticalSpacer } from './structures/VerticalSpacer';

const attributes = {
  category: 'CONTENT',
  icon: Icon.HiddenInputIcon,
  keywords: ['space', 'content separator'],
};

export default prefab('VerticalSpacer', attributes, undefined, [
  VerticalSpacer({}),
]);
