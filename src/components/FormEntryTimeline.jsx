import React, { useState, useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars";
import Modal from "./Modal";
import bitsFetch from "../Utils/bitsFetch";
import Bitforms from "../user-frontend/Bitforms";

export default function FormEntryTimeline(props) {
  const { formID, entryID } = props;
  const [log, setLog] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    bitsFetch({ formID, entryID }, "bitforms_form_log_history").then((res) => {
      if (res !== undefined && res.success) {
        console.log("test", res.data);
        setLog(res.data);
      }
    });
  }, [entryID, formID]);

  return (
    <Modal lg show setModal={props.close} title="Time Line">
      {log.map((data) => (
        <div key={data.id}>
          <br></br>
          <span>
            {new Date(data.created_at).toDateString()}{" "}
            {new Date(data.created_at)
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
          </span>
          <p>
            <span
              className="btcd-icn icn-document-edit"
              style={{ fontSize: 16 }}
            />{" "}
            {(() => {
              if (data.meta_key === null && data.log_type === "update") {
                return "No field data change";
              } else if (data.meta_key === null && data.log_type === "Create") {
                return "Form Submitted";
              } else {
                return data.meta_key;
              }
            })()}
          </p>
        </div>
      ))}
    </Modal>
  );
}
