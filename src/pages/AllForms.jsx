import React from 'react'
import { Link } from '@reach/router'
import Table from './Table'
import SingleToggle2 from '../components/ElmSettings/Childs/SingleToggle2'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import MenuBtn from '../components/ElmSettings/Childs/MenuBtn'
import Modal from '../components/Modal'


export default function AllFroms(props) {

  const handleStatus = (e) => {
    console.log(e.target.checked)
  }

  const cols = [
    { Header: '#', accessor: 'sl', Cell: value => <>{Number(value.row.id) + 1}</> },
    { Header: 'Status', accessor: 'status', Cell: value => <SingleToggle2 action={(e, id) => handleStatus(e, id)} /> },
    { Header: 'Form Name', accessor: 'formName' },
    { Header: 'Short Code', accessor: 'shortcode', Cell: val => <CopyText value={val.row.values.shortcode} /> },
    { Header: 'Views', accessor: 'views' },
    { Header: 'Completion Rate', accessor: 'conversion', Cell: val => <Progressbar value={val.row.values.conversion} /> },
    { Header: 'Responses', accessor: 'entries' },
    { Header: 'Created', accessor: 'created_at' },
    { Header: 'Actions', accessor: 'actions', Cell: <MenuBtn /> },
  ]

  const data = [
    { formName: 'member', shortcode: 'test', entries: 23, views: 79, conversion: 96, created_at: '2 Dec' },
    { formName: 'lace', shortcode: 'guitar', entries: 5, views: 38, conversion: 57, created_at: '2 Dec' },
    { formName: 'toys', shortcode: 'camp', entries: 12, views: 75, conversion: 28, created_at: '2 Dec' },
    { formName: 'girlfriend', shortcode: 'yard', entries: 0, views: 89, conversion: 89, created_at: '2 Dec' },
    { formName: 'environment', shortcode: 'love', entries: 20, views: 65, conversion: 67, created_at: '2 Dec' },
    { formName: 'bread', shortcode: 'bait', entries: 21, views: 26, conversion: 47, created_at: '2 Dec' },
    { formName: 'farm', shortcode: 'bone', entries: 8, views: 85, conversion: 80, created_at: '2 Dec' },
    { formName: 'location', shortcode: 'string', entries: 19, views: 3, conversion: 14, created_at: '2 Dec' },
    { formName: 'conclusion', shortcode: 'story', entries: 16, views: 84, conversion: 18, created_at: '2 Dec' },
    { formName: 'shirt', shortcode: 'rain', entries: 20, views: 66, conversion: 3, created_at: '2 Dec' },
    { formName: 'singer', shortcode: 'leader', entries: 10, views: 75, conversion: 82, created_at: '2 Dec' },
    { formName: 'year', shortcode: 'recording', entries: 26, views: 81, conversion: 82, created_at: '2 Dec' },
    { formName: 'point', shortcode: 'ear', entries: 5, views: 35, conversion: 88, created_at: '2 Dec' },
    { formName: 'attack', shortcode: 'rail', entries: 25, views: 46, conversion: 85, created_at: '2 Dec' },
    { formName: 'development', shortcode: 'carriage', entries: 6, views: 45, conversion: 83, created_at: '2 Dec' },
    { formName: 'fog', shortcode: 'letter', entries: 6, views: 43, conversion: 59, created_at: '2 Dec' },
    { formName: 'boot', shortcode: 'yam', entries: 16, views: 20, conversion: 9, created_at: '2 Dec' },
    { formName: 'governor', shortcode: 'difficulty', entries: 1, views: 51, conversion: 5, created_at: '2 Dec' },
    { formName: 'worker', shortcode: 'wilderness', entries: 4, views: 92, conversion: 11, created_at: '2 Dec' },
    { formName: 'emphasis', shortcode: 'stream', entries: 7, views: 5, conversion: 51, created_at: '2 Dec' },
    { formName: 'currency', shortcode: 'pain', entries: 15, views: 7, conversion: 85, created_at: '2 Dec' },
  ]
  const [modal, setModal] = React.useState(false)
  return (
    <div id="all-forms">
      <Modal
        show={modal}
        setModal={setModal}
        title="Create Form"
        subTitle="Choose a Template"
      >
        <div className="btcd-tem-lay">
          <div className="btcd-tem">
            <span className="btcd-icn icn-file-empty" style={{ fontSize: 90 }} />
            <div>Blank</div>
            <div className="btcd-hid-btn">
              <Link to="builder/0" className="btn btn-white sh-sm" type="button">Create</Link>
            </div>
          </div>
          <div className="btcd-tem">
            <span className="btcd-icn icn-file-empty" style={{ fontSize: 90 }} />
            <div>Contact Form</div>
            <div className="btcd-hid-btn">
              <Link to="builder/1" className="btn btn-white sh-sm" type="button">Create</Link>
            </div>
          </div>
        </div>
      </Modal>
      <div className="af-header">
        <h2>Forms</h2>
        <button onClick={() => setModal(true)} type="button" className="btn round btn-lg blue blue-sh">Create From</button>
      </div>
      <div className="forms">
        <Table columns={cols} data={data} />
      </div>
    </div>
  )
}
