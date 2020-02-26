import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];

  headerObject = {
    left: 'prev,next,today',
    center: 'title',
    right: 'dayGridDay,dayGridWeek,dayGridMonth'
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.headerObject = {
            left: '',
            center: 'title',
            right: ''
          };
        } else {
          this.headerObject = {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridDay,dayGridWeek,dayGridMonth'
          };
        }
      });
  }

  eventDataTransform(eventRenderInfo: any) {
    console.log(eventRenderInfo);
    const eventData = eventRenderInfo.event;
    const eventHtml =
      '<div><div class= "eventTitle">' +
      eventData.extendedProps.room.name +
      ', ' +
      eventData.extendedProps.room.location.name +
      '</div></div>';
    eventRenderInfo.el.innerHTML = eventHtml;
    // eventRenderInfo.el.text = 'New Event';
  }
}
