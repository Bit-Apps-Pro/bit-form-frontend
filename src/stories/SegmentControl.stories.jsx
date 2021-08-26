import SegmentControl from '../components/Utilities/SecmentController/SegmentControl'

export default {
  title: 'Example/SegmentControl',
  component: SegmentControl,
  argTypes: { backgroundColor: { control: 'color' } },
}

const Template = (args) => <SegmentControl />

export const Segment = Template.bind({})