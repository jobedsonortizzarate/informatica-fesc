import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hideEmail' })
export class HideEmailPipe implements PipeTransform {
  transform(email: string): string {
    if (email) {
      const [username, domain] = email.split('@');
      const usernameLengthToShow = 3;

      let hiddenPart = '';
      for (let i = 0; i < username.length - usernameLengthToShow; i++) {
        hiddenPart += '*';
      }

      const visibleUsername =
        username.substring(0, usernameLengthToShow) + hiddenPart;
      return `${visibleUsername}@${domain}`;
    }
    return '';
  }
}
