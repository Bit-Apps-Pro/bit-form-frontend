/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import Loader from '../../Loaders/Loader';
import CreateNew from './CreateNew'
import { refreshPortals, refreshProjects, refreshMilestones, refreshTasklists, refreshTasks, regenerateMappedField } from './ZohoProjectsCommonFunc'

export default function ZohoProjectsIntegLayout({ formID, formFields, handleInput, projectsConf, setProjectsConf, isLoading, setisLoading, setSnackbar }) {
  const handleSubEventInput = (e) => {
    let newConf = { ...projectsConf }
    const subEventArr = []
    subEventArr[0] = e.target.getAttribute('event')

    if (subEventArr[0] === 'tasklist' && newConf.tasklistFlag) newConf.tasklistFlag = ''

    if (newConf?.event === 'subtask' && ['project', 'milestone', 'tasklist'].includes(subEventArr[0]) && !newConf.subEvent.includes('task')) {
      newConf.taskId = ''
      subEventArr.push('task')
    }

    newConf[`${subEventArr[0]}Id`] = ''
    subEventArr.map(subEvent => {
      if (!newConf.subEvent.includes(subEvent)) {
        newConf.actions[subEvent] = {}
        newConf.subEvent.push(subEvent)
        newConf = regenerateMappedField(formID, newConf, setProjectsConf, setisLoading, setSnackbar)

        if (subEvent === 'tasklist') newConf.tasklistFlag = ''
        // sort by sequence
        const subEventSeq = ['project', 'milestone', 'tasklist', 'task', 'subtask', 'issue']
        newConf.subEvent.sort((a, b) => subEventSeq.indexOf(a) - subEventSeq.indexOf(b))
      }
    })
    setProjectsConf({ ...newConf })
  }

  return (
    <>
      <br />
      <b className="wdt-150 d-in-b">Portal:</b>
      <select onChange={handleInput} name="portalId" value={projectsConf.portalId} className="btcd-paper-inp w-7">
        <option value="">Select Portal</option>
        {projectsConf?.default?.portals && Object.values(projectsConf.default.portals).map(organization => (
          <option key={organization.portalId} value={organization.portalId}>
            {organization.portalName}
          </option>
        ))}
      </select>
      <button onClick={() => refreshPortals(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Projects Portals"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <b className="wdt-150 d-in-b">Event:</b>
      <select onChange={handleInput} name="event" value={projectsConf.event} className="btcd-paper-inp w-7">
        <option value="">Select Event</option>
        {projectsConf?.portalId && (
          <>
            <option value="project">Create Project</option>
            <option value="milestone">Create Milestone</option>
            <option value="tasklist">Create Tasklist</option>
            <option value="task">Create Task</option>
            <option value="subtask">Create Sub Task</option>
            <option value="issue">Create Issue</option>
          </>
          )}
      </select>
      <br />
      <br />
      {(projectsConf?.event && projectsConf.event !== 'project') && (
        <>
          <b className="wdt-150 d-in-b">Project:</b>
          <select onChange={handleInput} name="projectId" value={projectsConf.projectId} className="btcd-paper-inp w-7">
            <option value="">Select Project</option>
            {projectsConf?.default?.projects?.[projectsConf.portalId] && Object.values(projectsConf.default.projects[projectsConf.portalId]).map((project, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={`${project.projectId}_${i}`} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>
          <button onClick={() => refreshProjects(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Projects"' }} type="button" disabled={isLoading}>&#x21BB;</button>
          <br />
          <br />
          <span className="btcd-link cp" style={{ marginLeft: 155 }} event="project" onClick={handleSubEventInput} onKeyDown={handleSubEventInput} role="button" tabIndex="0">create a new project</span>
          <br />
          <br />
        </>
      )}

      {(projectsConf?.projectId || projectsConf?.subEvent?.includes('project')) && !['project', 'milestone'].includes(projectsConf?.event) && (
        <>
          <b className="wdt-150 d-in-b">Milestone:</b>
          {!projectsConf.subEvent.includes('project') && (
            <>
              <select onChange={handleInput} name="milestoneId" value={projectsConf.milestoneId} className="btcd-paper-inp w-7">
                <option value="">Select Milestone</option>
                {projectsConf?.default?.milestones?.[projectsConf.projectId] && Object.values(projectsConf.default.milestones[projectsConf.projectId]).map((milestone, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={`${milestone.milestoneId}_${i}`} value={milestone.milestoneId}>
                    {milestone.milestoneName}
                  </option>
                ))}
              </select>
              <button onClick={() => refreshMilestones(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Milestones"' }} type="button" disabled={isLoading}>&#x21BB;</button>
              <br />
              <br />
            </>
          )}
          {/* {`${ 'margin-left: 155px'}`} */}
          <span
            className="btcd-link cp"
            style={{ marginLeft: !projectsConf.subEvent.includes('project') ? 155 : 5 }}
            event="milestone"
            onClick={handleSubEventInput}
            onKeyDown={handleSubEventInput}
            role="button"
            tabIndex="0"
          >
            create a new milestone
          </span>
          <br />
          <br />
        </>
      )}

      {(projectsConf?.projectId || projectsConf?.subEvent?.includes('project')) && ['task', 'subtask'].includes(projectsConf?.event) && (
        <>
          <b className="wdt-150 d-in-b">{!(projectsConf.subEvent.includes('project') || projectsConf.subEvent.includes('milestone')) ? 'Tasklist Flag:' : 'Tasklist:'}</b>
          {!projectsConf.subEvent.includes('project') && !projectsConf.subEvent.includes('milestone') && (
            <>
              <select onChange={handleInput} name="tasklistFlag" value={projectsConf.tasklistFlag} className="btcd-paper-inp w-7">
                <option value="">Select Tasklist Flag</option>
                {!projectsConf?.subEvent.includes('milestone') && (
                <>
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                </>
                )}
              </select>
              <br />
              <br />
              {(projectsConf?.tasklistFlag && !projectsConf?.subEvent.includes('milestone'))
                && (
                  <>
                    <b className="wdt-150 d-in-b">Tasklist:</b>
                    <select onChange={handleInput} name="tasklistId" value={projectsConf.tasklistId} className="btcd-paper-inp w-7">
                      <option value="">Select Tasklist</option>
                      {projectsConf?.milestoneId
                        ? projectsConf?.default?.tasklists?.[projectsConf.portalId]?.[projectsConf.milestoneId]?.[projectsConf.tasklistFlag]
                        && Object.values(projectsConf.default.tasklists[projectsConf.portalId][projectsConf.milestoneId][projectsConf.tasklistFlag]).map((tasklist, i) => tasklist.tasklistId && (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={`${tasklist.tasklistId}_${i}`} value={tasklist.tasklistId}>
                            {tasklist.tasklistName}
                          </option>
                        ))
                        : projectsConf?.default?.tasklists?.[projectsConf.portalId]?.[projectsConf.tasklistFlag]
                        && Object.values(projectsConf.default.tasklists[projectsConf.portalId][projectsConf.tasklistFlag]).map((tasklist, i) => tasklist.tasklistId && (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={`${tasklist.tasklistId}_${i}`} value={tasklist.tasklistId}>
                            {tasklist.tasklistName}
                          </option>
                        ))}
                    </select>
                    <button onClick={() => refreshTasklists(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Milestones"' }} type="button" disabled={isLoading}>&#x21BB;</button>
                    <br />
                    <br />
                  </>
                )}
            </>
          )}
          <span className="btcd-link cp" style={{ marginLeft: !(projectsConf.subEvent.includes('project') || projectsConf.subEvent.includes('milestone')) ? 155 : 5 }} event="tasklist" onClick={handleSubEventInput} onKeyDown={handleSubEventInput} role="button" tabIndex="0">create a new tasklist</span>
          <br />
          <br />
        </>
      )}

      {projectsConf?.event === 'subtask' && (projectsConf?.projectId || projectsConf.subEvent.includes('project')) && (
        <>
          <b className="wdt-150 d-in-b">Task:</b>
          {(!projectsConf.subEvent.includes('project') && !projectsConf.subEvent.includes('milestone') && !projectsConf.subEvent.includes('tasklist')) && (
            <>
              <select onChange={handleInput} name="taskId" value={projectsConf.taskId} className="btcd-paper-inp w-7">
                <option value="">Select Task</option>
                {projectsConf?.milestoneId
                  ? projectsConf?.tasklistId
                    ? projectsConf?.default?.tasks?.[projectsConf.portalId]?.[projectsConf.milestoneId]?.[projectsConf.tasklistId]
                    && Object.values(projectsConf.default.tasks[projectsConf.portalId][projectsConf.milestoneId][projectsConf.tasklistId])
                      .map((task, i) => task.taskId && (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={`${task.taskId}_${i}`} value={task.taskId}>
                          {task.taskName}
                        </option>
                      ))
                    : projectsConf?.default?.tasks?.[projectsConf.portalId]?.[projectsConf.milestoneId]
                    && Object.values(projectsConf.default.tasks[projectsConf.portalId][projectsConf.milestoneId])
                      .map((task, i) => task.taskId && (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={`${task.taskId}_${i}`} value={task.taskId}>
                          {task.taskName}
                        </option>
                      ))
                  : projectsConf?.tasklistId
                    ? projectsConf?.default?.tasks?.[projectsConf.portalId]?.[projectsConf.tasklistId]
                   && Object.values(projectsConf.default.tasks[projectsConf.portalId][projectsConf.tasklistId])
                     .map((task, i) => task.taskId && (
                       // eslint-disable-next-line react/no-array-index-key
                       <option key={`${task.taskId}_${i}`} value={task.taskId}>
                         {task.taskName}
                       </option>
                     ))
                    : projectsConf?.default?.tasks?.[projectsConf.portalId] && Object.values(projectsConf.default.tasks[projectsConf.portalId]).map((task, i) => task.taskId && (
                    // eslint-disable-next-line react/no-array-index-key
                    <option key={`${task.taskId}_${i}`} value={task.taskId}>
                      {task.taskName}
                    </option>
                    ))}
              </select>
              <button onClick={() => refreshTasks(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Tasks"' }} type="button" disabled={isLoading}>&#x21BB;</button>
              <br />
              <br />
            </>
          )}
          <span className="btcd-link cp" style={{ marginLeft: (!projectsConf.subEvent.includes('project') && !projectsConf.subEvent.includes('milestone') && !projectsConf.subEvent.includes('tasklist')) ? 155 : 5 }} event="task" onClick={handleSubEventInput} onKeyDown={handleSubEventInput} role="button" tabIndex="0">create a new task</span>
          <br />
          <br />
        </>
      )}

      {isLoading && (
        <Loader style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          transform: 'scale(0.7)',
        }}
        />
      )}

      {projectsConf?.event
        && projectsConf?.subEvent
        && (projectsConf.event === 'project'
          || (projectsConf.projectId
            ? (projectsConf.event !== 'subtask' || (projectsConf.event === 'subtask' && (projectsConf?.taskId || projectsConf?.subEvent.includes('task'))))
            : projectsConf.subEvent.includes('project')))
        && projectsConf.subEvent.map(event => (
          <CreateNew
            key={`subEvent-${event}`}
            event={event}
            projectsConf={projectsConf}
            setProjectsConf={setProjectsConf}
            formID={formID}
            formFields={formFields}
            isLoading={isLoading}
            setisLoading={setisLoading}
            setSnackbar={setSnackbar}
          />
        ))}

    </>
  )
}
