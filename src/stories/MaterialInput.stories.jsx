/* eslint-disable import/no-anonymous-default-export */

import { MaterialInput } from './MaterialInput'

export default {
  title: 'Material Input',
  component: MaterialInput,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'range', min: 50, max: 500, step: 1 } },
  },
}

const Template = (args) => <MaterialInput {...args} />

export const Outlined = Template.bind({})
Outlined.args = {
  primary: true,
  label: 'Material Input',
}

export const Filled = Template.bind({})
Filled.args = { label: 'Material Input' }
