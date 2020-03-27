import {Calendar} from '@fullcalendar/core';
//import dayGridPlugin from '@fullcalendar/daygrid';
//import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
//import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import '@fullcalendar/core/main.css';
//import '@fullcalendar/daygrid/main.css';
//import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/timeline/main.css';
import '@fullcalendar/resource-timeline/main.css';

document.addEventListener('DOMContentLoaded', function() {
  const calendar = new Calendar(document.querySelector('#calendar'), {
    plugins: [
      resourceTimelinePlugin,
    ],
    defaultView: 'resourceTimeline',
    resources: [
      {
        title: "A",
        id: 1,
      },
      {
        title: "B",
        id: 2,
      },
    ],
    events: [
      {
        title: "ABC",
        id: 1,
        resourceId: 1,
        start: "2020-03-26T21:00:00",
        end: "2020-03-26T23:00:00",
      },
      {
        title: "DEF",
        id: 2,
        resourceId: 2,
        start: "2020-03-26T21:00:00",
        end: "2020-03-26T23:00:00",
      },
    ],
  });
  calendar.render();
});
