import { Collapse } from 'antd'
import { selectMe } from 'app/me'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const { Panel } = Collapse
const mission1 = `미션 1`
const mission2 = `미션 2`

const MissionList = () => {

  
  const job = useSelector(selectMe).player.role
  const missions = useSelector(selectMe).player.missions
  const [role, setRole] = useState('')
  useEffect(() => {
    if (job === 'MAFIA') {
      setRole('MimicBot')
    }else{
      setRole('Human')
    }
  }, [job])
  return (
    <div>
      <Collapse style={{background:"silver", zIndex: 200}}>
        {/* Todo: 지금은 직업이 undefined라뜸 초기화되면 지울것 */}
        <Panel header={`${role}:미션 목록`} key="1" >
          {missions.map((mission)=>{
            return(<p className={mission.isComplete === true?'isComplted':'isUncompleted'}>{job === 'MAFIA' ? "(가짜)" : ""}{mission.title}</p>)
          })}    
        </Panel>
      </Collapse>
    </div>
  );
};

export default MissionList;