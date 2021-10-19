/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
import { createRenderer } from 'fela'
import felaPluginCustomProperty from 'fela-plugin-custom-property'
import { RendererProvider } from 'react-fela'
import customProperties from '../styles/1.customProperties'

import Option from './Option'

const renderer = createRenderer({
  devMode: true,
  plugins: [
    felaPluginCustomProperty(customProperties),
  ],
})
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Example/Option',
  component: Option,
}
const options = [
  { lbl: 'Option 1', val: 'Option 1' },
  { lbl: 'Option 2', val: 'Option 2' },
  { lbl: 'Option 3', val: 'Option 3' },
]

const Template = (args) => (
  <RendererProvider renderer={renderer}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'white', width: '600' }}><Option {...args} /></div>
  </RendererProvider>
)

export const Default = Template.bind({})
Default.args = { options }
// export const Segment = Template.bind({})
