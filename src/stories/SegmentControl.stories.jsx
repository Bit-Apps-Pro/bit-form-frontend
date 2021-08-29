/* eslint-disable react/jsx-props-no-spreading */
import { createRenderer } from 'fela'
import felaPluginCustomProperty from 'fela-plugin-custom-property'
import { RendererProvider } from 'react-fela'
import SegmentControl from '../components/Utilities/SecmentController/SegmentControl'
import customProperties from '../styles/1.customProperties'
import icon from '../resource/img/settings/dollar-sign .svg'

const renderer = createRenderer({
  plugins: [
    felaPluginCustomProperty(customProperties),
  ],
})
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/SegmentControl',
  component: SegmentControl,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'range', min: 50, max: 200, step: 1 } },
  },
}
const options = [
  { label: 'Sunny', icn: <img src={icon} /> },
  { label: 'Cloudy', icn: <img src={icon} /> },
  { label: 'Rainy', icn: <img src={icon} /> },
  { label: 'Snow', icn: <img src={icon} /> },
]

const Template = (args) => (
  <RendererProvider renderer={renderer}>
    <SegmentControl {...args} />
  </RendererProvider>
)

export const Default = Template.bind({})
Default.args = { options }
// export const Segment = Template.bind({})
