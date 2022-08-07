import WorkflowLogicSection from './WorkflowLogicSection'
import WorkflowActionSection from './WorkflowActionSection'

export default function WorkflowConditionSection({ lgcGrpInd, lgcGrp }) {
  console.log('lgcGrp', lgcGrp)
  return (
    <>
      {lgcGrp?.conditions?.map((condGrp, condGrpInd) => (
        <>
          {condGrp.cond_type !== 'else' && lgcGrp.action_behaviour === 'cond'
            && (
              <WorkflowLogicSection lgcGrp={lgcGrp} lgcGrpInd={lgcGrpInd} condGrp={condGrp} condGrpInd={condGrpInd} />
            )}
          <WorkflowActionSection lgcGrp={lgcGrp} lgcGrpInd={lgcGrpInd} condGrp={condGrp} condGrpInd={condGrpInd} />
        </>
      ))}
    </>
  )
}
