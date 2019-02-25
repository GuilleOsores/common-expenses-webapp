import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  @Output() sidenavClose = new EventEmitter();
  private opened: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  naviagte (url: string) {
    this.router.navigateByUrl('/buildings')
    .then(console.dir)
    .catch(console.dir);
  }
  
}
