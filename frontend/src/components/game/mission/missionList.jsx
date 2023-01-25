import { Collapse } from 'antd'
const { Panel } = Collapse
const mission1 = `미션 1`
const mission2 = `미션 2`

const missionList = () => {
  return (
    <div>
      <Collapse style={{background:"silver"}}>
        <Panel header="미션 목록" key="1">
          <p>{mission1}</p>
          <p>{mission2}</p>        
        </Panel>
      </Collapse>
    </div>
  );
};

export default missionList;