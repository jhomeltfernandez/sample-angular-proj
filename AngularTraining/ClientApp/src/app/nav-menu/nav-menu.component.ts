import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isAuthenticated = false;

  constructor(public accountService: AccountService, private router: Router) {
    this.isAuthenticated = this.accountService.isUserAuthenticated()
  }

  ngOnInit() {
    
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.accountService.logOut();
    this.router.navigate(['/login']).then(() => { window.location.reload(); });
  }
}
