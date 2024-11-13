import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sg-confirmar-modal',
  templateUrl: './confirmar-modal.component.html',
  styleUrls: ['./confirmar-modal.component.scss'],
})
export class ConfirmarModalComponent {
  @Input() textoPergunta: string = '';
  @Input() textoBotonAceptar: string = '';
  @Input() textoBotonRechazar: string = '';
  @Input() textoCuerpoHtml: string = '';

  textoHtml: SafeHtml | string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.setHTML(this.textoCuerpoHtml);
  }

  closeModal(result: boolean): void {
    this.activeModal.close(result);
  }

  setHTML(html: string): void {
    this.textoHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
