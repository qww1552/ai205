import { Collapse } from 'antd'
import { addMyMissionList, selectMissionInfo } from 'app/missionInfo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
const { Panel } = Collapse
const mission1 = `미션 1`
const mission2 = `미션 2`
const MissionList = () => {
  const missionList = useSelector(selectMissionInfo).myMissionList
  const dummymission = {id:1, solved: true}
  const dispatch = useDispatch()
  return (
    
    <div>
      <Collapse style={{background:"silver"}}>
        <Panel header="미션 목록" key="1">
          {missionList.map((mission) => (
            <p className={mission.solve === true?'solved':'unsolved'}>{mission.id}</p>
          ))}
        </Panel>
      </Collapse>
      {/* 더미미션추가버튼 */}
      <button onClick={(e) => dispatch(addMyMissionList(dummymission)) }>더미미션추가버튼</button>

      <div>{missionList[0].id}</div>

    </div>
  );
};

export default MissionList;