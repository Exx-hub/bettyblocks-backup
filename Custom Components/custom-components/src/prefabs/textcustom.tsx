import { prefab, Icon } from '@betty-blocks/component-sdk';

import { Textcustom } from './structures/Textcustom';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TitleIcon,
  keywords: [''],
};

export default prefab('Textcustom', attributes, undefined, [Textcustom({})]);
