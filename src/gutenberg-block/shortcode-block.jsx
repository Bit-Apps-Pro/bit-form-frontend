/* eslint-disable react/react-in-jsx-scope */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { SelectControl } = wp.components; // Import SelectControl() from wp.components

const blockStyle = {
  backgroundColor: '#900',
  color: '#fff',
  padding: '20px',
};

registerBlockType('bitapps/form-shortcode', {
  title: __('Bitapps', 'bitapps'),
  icon: 'universal-access-alt',
  category: 'layout',
  attributes: {
    formID: { type: 'Integer', default: 0 },
    formName: { type: 'string', default: '' },
  },
  example: {
    attributes: {
      formName: __('Hello world'),
    },
  },
  edit: props => {
    const AllForms = [{ value: 0, label: '--select a form--', disabled: true }]
    bitappsBlock.forms.map(form => {
      AllForms.push({ label: form.form_name, value: form.id })
    })
    const { attributes, setAttributes, className } = props;
    const onChangeContent = formID => {
      setAttributes({ formID });
    };
    return (
      <div className={className}>
        <SelectControl
          label={__('Select a form ', 'bitapps')}
          value={attributes.formID}
          options={AllForms}
          onChange={onChangeContent}
        />
      </div>
    );
  },
  save: props => {
    const formID = parseInt(props.attributes.formID)
    return `[bitapps id='${formID}']`;
  },
});
