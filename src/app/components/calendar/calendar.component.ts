import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events:any[];
  public options:any;
  constructor() { }

  ngOnInit():void {


    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate:new Date(),
      locale: esLocale, 
      header :{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable:false
    }

    this.events=[{
      title: "Evento1",
      start: new Date(),
      description: "Evento 1"
    },
    {
      title: "Evento 2",
      start: new Date().getDate()+ 86400000,
      description: "Evento 2"
    }]
  }

}
