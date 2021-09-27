/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
import { createRenderer } from 'fela'
import felaPluginCustomProperty from 'fela-plugin-custom-property'
import { RendererProvider } from 'react-fela'
import CoolCopy from '../components/Utilities/CoolCopy'
import customProperties from '../styles/1.customProperties'

const renderer = createRenderer({
  plugins: [
    felaPluginCustomProperty(customProperties),
  ],
})
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/CoolCopy',
  component: CoolCopy,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'range', min: 50, max: 200, step: 1 } },
  },
}

const Template = (args) => (
  <RendererProvider renderer={renderer}>
    <CoolCopy {...args} />
  </RendererProvider>
)

export const Default = Template.bind({})
Default.args = { value: 'user name', readOnly: true }
// export const Segment = Template.bind({})
