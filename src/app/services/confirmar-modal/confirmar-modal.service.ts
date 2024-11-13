import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { ConfirmarModalComponent } from 'src/app/shared/confirmar-modal/confirmar-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmarModalService {
  constructor(
    private modal: NgbModal,
    private config: NgbModalConfig,
  ) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
  }

  abriraModal(
    textoPergunta: string = '¿Estas seguro?',
    textoBotonAceptar: string = 'Sí',
    textoBotonRechazar: string = 'No',
    texto_html: string = '',
  ): Observable<boolean> {
    const modalRef = this.modal.open(ConfirmarModalComponent);
    modalRef.componentInstance.textoPergunta = textoPergunta;
    modalRef.componentInstance.textoBotonAceptar = textoBotonAceptar;
    modalRef.componentInstance.textoBotonRechazar = textoBotonRechazar;
    modalRef.componentInstance.textoCuerpoHtml = texto_html;

    const resultSubject = new Subject<boolean>();

    modalRef.result.then(
      (result) => {
        resultSubject.next(result);
        resultSubject.complete();
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (reason) => {
        resultSubject.next(false);
        resultSubject.complete();
      },
    );

    return resultSubject.asObservable();
  }
}
