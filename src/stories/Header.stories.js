import { Header } from './Header'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/Header',
  component: Header,
}

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Header {...args} />

export const LoggedIn = Template.bind({})
LoggedIn.args = { user: {} }

export const LoggedOut = Template.bind({})
LoggedOut.args = {}
