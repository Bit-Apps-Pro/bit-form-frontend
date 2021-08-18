import OptionMenu from '../components/Utilities/OptionMenu'

export default {
  title: 'Example/OptionMenu',
  component: OptionMenu,
  argTypes: { backgroundColor: { control: 'color' } },

}

const Template = (args) => <OptionMenu />

export const Option = Template.bind({})