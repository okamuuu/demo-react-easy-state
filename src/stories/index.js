import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Game from '../components/Game';
import Game2 from '../components/Game2';

storiesOf('Game.js', module)
  .add('clickable', () => <Game />)
  .add('draggable', () => <Game2 />)


