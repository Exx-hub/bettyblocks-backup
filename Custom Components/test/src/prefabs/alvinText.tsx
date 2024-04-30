import { prefab, Icon } from '@betty-blocks/component-sdk';

import { AlvinText } from './structures/AlvinText';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TitleIcon,
  keywords: [''],
};

export default prefab('AlvinText', attributes, undefined, [AlvinText({})]);
