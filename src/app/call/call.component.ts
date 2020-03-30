import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CallService} from '../services/call/call.service';
import {TokenService} from '../services/token/token.service';

@Component({
  selector: 'app-download',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
    getService;
    showSpinner;
    logs;
    access_token;
    tokenService;
    msgDelete = '';
    deleteOpen;
    statusApi = 0;
    logselecionado = {
        idLog: '',
        hubId: 0,
        callId: '',
        operacao: '',
        status: '',
        payload: '',
        log: '',
    }
    visualizacaoOpen;
    criaOrUpdateOpen;
    createOpen;
    confirmaDelete;
    p: number = 1;

    getTokenSession() {
        if (!localStorage.getItem('currentToken') || localStorage.getItem('currentToken') === '') {
            this.router.navigate(['']);
        }
    }

    constructor(private router: Router, service: CallService , private modalService: NgbModal, tokenService: TokenService) {
        this.getTokenSession();
        this.getService = service;
        this.tokenService = tokenService;
        this.visualizacaoOpen = true;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.confirmaDelete = false;
        this.getCall();
        this.showSpinner = true;
    }


    openLg(content, log) {
            console.log(log.nome)
            this.modalService.open(content, {size: 'lg'});
            this.msgDelete = log.nome;
    }


    ngOnInit() {
    }

    deleteClose() {
        this.statusApi = 0
        this.getCall();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.visualizacaoOpen = true;
    }

    openDelete(log) {
        this.logselecionado = log;
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        this.deleteOpen = true;
    }

    deletelog() {
        if (this.deleteOpen) {
            return true;
        } else {
            return false;
        }
    }

    visualizacao(){
        if(this.visualizacaoOpen) {
            return true;
        } else {
            return false;
        }
    }

    updatelog(){
        if(this.criaOrUpdateOpen) {
            return true;
        } else {
            return false;
        }
    }

    createlog(){
        if(this.createOpen) {
            return true;
        } else {
            return false;
        }
    }

    updateClose() {
        this.statusApi = 0;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.getCall();
    }

    createClose() {
        this.statusApi = 0;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.visualizacaoOpen = true;
        this.getCall();
    }


    openEditar(log) {
        this.logselecionado = log;
        this.criaOrUpdateOpen = true;
        this.visualizacaoOpen = false;
        this.createOpen = false;
    }

    openCreate() {
        this.logselecionado = {
            idLog: '',
            hubId: 0,
            callId: '',
            operacao: '',
            status: '',
            payload: '',
            log: '',
        };
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = true;
    }


    getCall() {
        // this.tokenService.getToken().subscribe(
        //     data => {
        //         console.log(data.access_token);
        //         this.access_token = data.access_token;
        this.showSpinner = true;
                this.getService.getCall(this.access_token).subscribe(
                    datain => {
                        console.log(datain.status);
                        if (datain.status === 200) {
                            console.log(datain);
                            this.logs = datain;
                        } else {
                            console.log(datain);
                            this.logs = datain;
                        }
                        this.showSpinner = false;
                    },
                    errorin => {
                        console.log(errorin);
                        this.showSpinner = false;
                    }
                );
        //     } ,
        //     error => {
        //         console.log(error);
        //     }
        // );
    }

    // updatelogAcao(log){
    //     // this.tokenService.getToken().subscribe(
    //     //     dataToken => {
    //     //         console.log(dataToken.access_token);
    //     //         this.access_token = dataToken.access_token;
    //     this.showSpinner = true;
    //             this.getService.updatelog(log, this.access_token).subscribe(
    //                 data => {
    //                     console.log(data.status);
    //                     this.logs = data;
    //                     this.statusApi = 1;
    //                     this.showSpinner = false
    //                 },
    //                 error => {
    //                     console.log(error);
    //                     this.statusApi = 2;
    //                     this.showSpinner = false
    //                 }
    //             );
    //     //     } ,
    //     //     errorToken => {
    //     //         console.log(errorToken);
    //     //     }
    //     // );
    // }
    //
    // createlogAcao(log){
    //     // this.tokenService.getToken().subscribe(
    //     //     dataToken => {
    //     //         console.log(dataToken.access_token);
    //     //         this.access_token = dataToken.access_token;
    //     this.showSpinner = true;
    //             this.getService.createlog(log, this.access_token).subscribe(
    //                 data => {
    //                     console.log(data.status);
    //                     this.logs = data;
    //                     this.statusApi = 1;
    //                     this.showSpinner = false;
    //                 },
    //                 error => {
    //                     console.log(error);
    //                     this.statusApi = 2;
    //                     this.showSpinner = false;
    //                 }
    //             );
    //     //     } ,
    //     //     errorToken => {
    //     //         console.log(errorToken);
    //     //     }
    //     // );
    // }
    //
    // deletelogAcao(log) {
    //     // this.tokenService.getToken().subscribe(
    //     //     dataToken => {
    //     //         console.log(dataToken.access_token);
    //     //         this.access_token = dataToken.access_token;
    //             this.getService.deletelog(log.id, this.access_token).subscribe(
    //                 data => {
    //                     this.getlogs();
    //                     this.deleteClose();
    //                 },
    //                 error => {
    //                     this.statusApi = 2;
    //                     }
    //             );
    //     //     } ,
    //     //     errorToken => {
    //     //         console.log(errorToken);
    //     //     }
    //     // );
    // }

    submitSucesso() {
        if (this.statusApi === 1) {
            return true;
        } else {
            return false;
        };
    }
    submitFalha() {
        if (this.statusApi === 2) {
            return true;
        } else {
            return false;
        };
    }


}
