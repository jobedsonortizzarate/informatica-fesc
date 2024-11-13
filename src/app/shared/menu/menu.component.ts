import { Component } from '@angular/core';

@Component({
  selector: 'sg-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isDropdownSalir: boolean = false;
  isDropdownAdmin: boolean = false;
  isDropdownRegistrar: boolean = false;

  isDropdownToggler: boolean = false;

  constructor() {}

  logout() {
    //this.prolongaSesionService.logout();
  }

  showDropdownToggler() {
    this.isDropdownToggler = this.isDropdownToggler ? false : true;
  }

  showDropdownSalir() {
    this.isDropdownSalir = this.isDropdownSalir ? false : true;
  }

  hideDropdownSalir() {
    this.isDropdownSalir = false;
  }

  showDropdownAdmin() {
    this.isDropdownAdmin = this.isDropdownAdmin ? false : true;
  }

  hideDropdownAdmin() {
    this.isDropdownAdmin = false;
  }

  showDropdownRegistrar() {
    this.isDropdownRegistrar = this.isDropdownRegistrar ? false : true;
  }

  hideDropdownRegistrar() {
    this.isDropdownRegistrar = false;
  }
}
