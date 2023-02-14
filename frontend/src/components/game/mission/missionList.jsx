import { Collapse } from 'antd'
import { selectMe } from 'app/me'
import { useSelector } from 'react-redux'
const { Panel } = Collapse
const mission1 = `미션 1`
const mission2 = `미션 2`

const MissionList = () => {
  const job = useSelector(selectMe).player.role
  return (
    <div>
      <Collapse style={{background:"silver", zIndex: 200}}>
        {/* Todo: 지금은 직업이 undefined라뜸 초기화되면 지울것 */}
        <Panel header={`${job}:미션 목록`} key="1" >
          <p>{mission1}</p>
          <p>{mission2}</p>        
        </Panel>
      </Collapse>
    </div>
  );
};

export default MissionList;