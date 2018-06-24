/* eslint react/prop-types:0 */

import React from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Input from 'components/Input';
import Drop from 'components/Drop';
import Switch from 'components/Switch';

const getMeta = props => ({
  error: props.meta.touched && props.meta.error ? props.meta.error.toString() : null
});
const getInput = props => pick(props.input,
  ['onBlur', 'onChange', 'onDrop', 'onFocus', 'onDragStart', 'value']);
const getRest = props => omit(props, ['input', 'meta']);
const getProps = props => ({
  ...getMeta(props),
  ...getInput(props),
  ...getRest(props)
});

export const TextInput = props => <Input type="text" {...getProps(props)} />;
export const PasswordInput = props => <Input type="password" {...getProps(props)} />;
export const NumberInput = props => <Input type="number" {...getProps(props)} />;
export const SwitchInput = props => <Switch {...getProps(props)} checked={props.input.value} />;
export const FileInput = props => <Drop {...getProps(props)} value={props.input.value === '' ? null : props.input.value} />;
