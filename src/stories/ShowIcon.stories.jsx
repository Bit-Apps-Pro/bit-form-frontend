import ShowIcon from './ShowIcon'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/ShowIcon',
  component: ShowIcon,
  argTypes: { backgroundColor: { control: 'color' } },
}
const Template = (args) => <ShowIcon />

export const Icons = Template.bind({})
