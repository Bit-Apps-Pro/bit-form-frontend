/* eslint-disable react/jsx-props-no-spreading */
import { createRenderer } from 'fela'
import felaPluginCustomProperty from 'fela-plugin-custom-property'
import { RendererProvider } from 'react-fela'
import SegmentControl from '../components/Utilities/SecmentController/SegmentControl'
import customProperties from '../styles/1.customProperties'

const renderer = createRenderer({
  plugins: [
    felaPluginCustomProperty(customProperties),
  ],
})
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/SegmentControl',
  component: SegmentControl,
  argTypes: { backgroundColor: { control: 'color' } },
}
const options = [
  { label: 'Sunny', icn: '' },
  { label: 'Cloudy', icn: '' },
  { label: 'Rainy', icn: '' },
  { label: 'Snow', icn: '' },
]

const Template = (args) => (
  <RendererProvider renderer={renderer}>
    <SegmentControl {...args} />
  </RendererProvider>
)

export const Default = Template.bind({})
Default.args = { options }
// export const Segment = Template.bind({})
