import ColorPicker from "./ColorPicker"

export default {
  title: 'Example/ColorPicker',
  component: ColorPicker,
  argTypes: { backgroundColor: { control: 'color' } },

}

const Template = (args) => <ColorPicker />

export const Color = Template.bind({})