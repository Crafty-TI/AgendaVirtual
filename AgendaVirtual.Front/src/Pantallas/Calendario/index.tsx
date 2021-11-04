import React from 'react'
import Gantt from 'react-gantt-antd-tokrak'
//const Gantt = require('react-gantt-antd-tokrak')
export const Calendario: React.FC = () => {

    const tasks_a = [
        {
          id: "task0",
          index: 0,
          title: "任务名称1",
          start: new Date('2020-06-01'),
          end: new Date('2020-08-02'),
          tooltip: "任务全称1",
        }
      ]
    
      const tasks_b = [
        {
          id: "task1",
          index: 1,
          title: "任务名称2",
          start: new Date('2020-07-01'),
          end: new Date('2020-09-02'),
        }
      ]
    
      const sub_projects = [
        {
          id: "sub_project1",
          index: 1,
          title: "子项目",
          tasks: tasks_b,
        }
      ]
    
      const projects = [
        {
          id: "project1",
          index: 0,
          title: "项目1",
          tasks: tasks_a,
          projects: sub_projects,
          isOpen: false,
        }
      ]
    
      const clickTask = (e:any) => {
        console.log(e);
      };
    
      const clickProject = (e:any) => {
        console.log(e);
      };
    
      return (
        <Gantt
          start={new Date('2020-06-01')}
          end={new Date('2020-10-01')}
          now={new Date('2020-7-01')}
          zoom={1}
          sidebarWidth={240}
          minWidth={800}
          projects={projects}
          enableSticky={true}
          scrollToNow={true}
          clickTask={clickTask}
          clickProject={clickProject}
        />
      )
}
