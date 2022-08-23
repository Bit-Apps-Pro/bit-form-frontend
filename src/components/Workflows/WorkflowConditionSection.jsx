import WorkflowActionSection from './WorkflowActionSection'
import WorkflowAccordion from './WorkflowAccordion'
import { firstCharCap } from '../../Utils/Helpers'

export default function WorkflowConditionSection({ lgcGrpInd, lgcGrp }) {
  const generateAccrTtl = title => title.replace(/-/g, ' ').split(' ').map(word => firstCharCap(word)).join(' ')

  return (
    <>
      {lgcGrp?.conditions?.map((condGrp, condGrpInd) => (
        <>
          {(lgcGrp.action_behaviour === 'cond' && condGrp.cond_type !== 'else') && (
            <WorkflowAccordion
              title={generateAccrTtl(condGrp.cond_type)}
              lgcGrp={lgcGrp}
              lgcGrpInd={lgcGrpInd}
              condGrp={condGrp}
              condGrpInd={condGrpInd}
            />
          // <WorkflowLogicSection
          //   lgcGrp={lgcGrp}
          //   lgcGrpInd={lgcGrpInd}
          //   condGrp={condGrp}
          //   condGrpInd={condGrpInd}
          // />
          )}
          <WorkflowActionSection lgcGrp={lgcGrp} lgcGrpInd={lgcGrpInd} condGrp={condGrp} condGrpInd={condGrpInd} />
        </>
      ))}
    </>
  )
}
