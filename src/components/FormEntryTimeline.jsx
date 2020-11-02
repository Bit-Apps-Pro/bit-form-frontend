import { useState, useEffect } from 'react';
import Modal from './Modal';
import bitsFetch from '../Utils/bitsFetch';

export default function FormEntryTimeline(props) {
  const { formID, entryID } = props;
  const [log, setLog] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    bitsFetch({ formID, entryID }, 'bitforms_form_log_history').then((res) => {
      if (res !== undefined && res.success) {
        setLog(res.data);
      }
    });
  }, [entryID, formID]);

  const replaceFieldWithLabel = str => {
    const pattern = /\${\w[^ ${}]*}/g
    const subKey = str.match(pattern)[0]
    const key = subKey.substr(2, subKey.length - 3)
    const fieldName = props.allLabels.find(label => label.key === key).name
    return str.replace(pattern, fieldName)
  }

  return (
    <Modal lg show setModal={props.close} title="Time Line">
      {log.map((data) => (
        <div key={data.id}>
          <br />
          <span>
            {new Date(data.created_at).toDateString()}
            {' '}
            {new Date(data.created_at).toLocaleTimeString()}
          </span>
          <p>
            {' '}
            {(() => {
              if (data.meta_key === null && data.log_type === 'update') {
                return 'No field data change';
              } if (data.meta_key === null && data.log_type === 'Create') {
                return 'Form Submitted';
              }
              return data.meta_key.split(';').map((str) => (
                <p>
                  {' '}
                  <span
                    className="btcd-icn icn-document-edit"
                    style={{ fontSize: 16 }}
                  />
                  {replaceFieldWithLabel(str)}
                </p>
              ));
            })()}
          </p>
        </div>
      ))}
    </Modal>
  );
}
