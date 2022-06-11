/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
import { createRenderer } from 'fela'
import felaPluginCustomProperty from 'fela-plugin-custom-property'
import { RendererProvider } from 'react-fela'
import SimpleGradientColorPicker from '../components/style-new/SimpleGradientColorPicker'
import customProperties from '../styles/1.customProperties'

const renderer = createRenderer({
  devMode: true,
  plugins: [
    felaPluginCustomProperty(customProperties),
  ],
})
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/GradientColorPicker',
  component: SimpleGradientColorPicker,
  argTypes: {
    // backgroundColor: { control: 'color' },
    // size: { control: { type: 'range', min: 50, max: 200, step: 1 } },
  },
}
// const options = [
//   { label: 'Sunny', icn: '💢', value: 'sadf' },
//   { label: 'Cloudy', icn: <CheckBoxIcn w="18" />, value: 'sadf' },
//   { label: 'Rainy', icn: <EditIcn size="15" />, value: 'sadf' },
//   { label: 'Snow', icn: <FieldIcn w="18" />, value: 'sadf' },
// ]

const Template = (args) => (
  <RendererProvider renderer={renderer}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', background: 'white', padding: 50 }}><SimpleGradientColorPicker {...args} /></div>
  </RendererProvider>
)

export const Default = Template.bind({})
Default.args = {}
// export const Segment = Template.bind({})
