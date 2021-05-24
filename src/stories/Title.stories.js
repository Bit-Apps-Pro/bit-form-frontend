import Title from './Title'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/Title',
  component: Title,
  argTypes: {},
}

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Title {...args} />

export const Primary = Template.bind({})
Primary.args = { title: 'ok' }
