import OptionMenu from './OptionMenu'

export default {
  title: 'Example/OptionMenu',
  component: OptionMenu,
  argTypes: { backgroundColor: { control: 'color' } },
}

const Template = (args) => <OptionMenu />

export const Menu = Template.bind({})
