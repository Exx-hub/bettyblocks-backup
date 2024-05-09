import * as Core from '@material-ui/core';
import * as Lab from '@material-ui/lab';
import * as Pickers from '@material-ui/pickers';
import * as Styles from '@material-ui/styles';
import * as Reveal from 'react-awesome-reveal';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import nlLocale from 'date-fns/locale/nl';
import { icons } from './icons';

window.Reveal = Reveal;

export default {
  Core,
  Icons: icons,
  Lab,
  Pickers,
  Styles,
  DateFnsUtils,
  DateLocales: { enLocale, nlLocale },
  Reveal,
};
