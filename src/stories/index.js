import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Counter from './Counter';
import Game from '../components/Game';
import Game2 from '../components/Game2';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Counter', module)
  .add('counter1', () => <Counter />)

storiesOf('Game', module)
  .add('game1', () => <Game />)
  .add('game2', () => <Game2 />)

