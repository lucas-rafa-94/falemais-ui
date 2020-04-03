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
    logs = [];
    searchLogs = [];
    filterLogs = [];
    access_token;
    tokenService;
    msgDelete = '';
    deleteOpen;
    statusApi = 0;
    filterLog = {
        max: '',
        min: ''
    };
    logselecionado = {
        idLog: '',
        hubId: 0,
        idPabx: '',
        telefone: '',
        callId: '',
        operacao: '',
        status: '',
        startDate: '',
        endDate: '',
        payloadRequest: '',
        payloadResponse: '',
        log: '',
    };
    search = {
        idHub: '',
        idPabx: '',
        telefone: ''
    };
    visualizacaoOpen;
    criaOrUpdateOpen;
    deleteLogOpen;
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
        this.deleteLogOpen = false;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.confirmaDelete = false;
        this.getCall();
        this.showSpinner = true;
    }

    excluirBtnLogs(){
        this.filterLog = {
            max: '',
            min: ''
        };
        this.statusApi = 0;
        this.visualizacaoOpen = false;
        this.deleteLogOpen = true;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.confirmaDelete = false;
    }

    deleteLogOpenClose(){
        this.visualizacaoOpen = true;
        this.deleteLogOpen = false;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.getCall();
        this.confirmaDelete = false;
    }


    ngOnInit() {
    }

    searchBtn(){
        if((this.search.idHub === '') === false && (this.search.idPabx === '') === false && (this.search.telefone === '') === false ){
            for(var i = 0; i < this.logs.length; i++){
                if(this.logs[i].hubId === this.search.idHub && this.logs[i].idPabx === this.search.idPabx &&
                    this.logs[i].telefone === this.search.telefone){
                    this.filterLogs.push(this.logs[i]);
                }
            }
        }

        if((this.search.idHub === '') === false && this.search.idPabx === '' && this.search.telefone === '' ){
            for(var i = 0; i < this.logs.length; i++){
                if(this.logs[i].hubId === this.search.idHub){
                    this.filterLogs.push(this.logs[i]);
                }
            }
        }

        if(this.search.idHub === '' && (this.search.idPabx === '') === false && this.search.telefone === '' ){
            for(var i = 0; i < this.logs.length; i++){
                if(this.logs[i].idPabx === this.search.idPabx){
                    this.filterLogs.push(this.logs[i]);
                }
            }
        }

        if(this.search.idPabx === '' && (this.search.telefone === '') === false && this.search.idHub === '' ){
            for(var i = 0; i < this.logs.length; i++){
                if(this.logs[i].telefone === this.search.telefone){
                    this.filterLogs.push(this.logs[i]);
                }
            }
        }

        this.logs = this.filterLogs;
    }

    excluirBtn(){
        console.log(this.searchLogs);
        this.search = {
            idHub: '',
            idPabx: '',
            telefone: ''
        };
        this.logs = this.searchLogs;
    }

    updateUsuario(){
        if(this.criaOrUpdateOpen) {
            return true;
        } else {
            return false;
        }
    }


    deleteLogs(){
        if(this.deleteLogOpen) {
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



    updateClose() {
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


    getCall() {
        this.showSpinner = true;
                this.getService.getCall(this.access_token).subscribe(
                    datain => {
                        console.log(datain.status);
                        if (datain.status === 200) {
                            console.log(datain);
                            this.searchLogs = datain;
                            this.logs = datain;
                        } else {
                            console.log(datain);
                            this.searchLogs = datain;
                            this.logs = datain;
                        }
                        this.showSpinner = false;
                    },
                    errorin => {
                        console.log(errorin);
                        this.showSpinner = false;
                    }
                );
    }

    deleteCall(filter) {
        this.showSpinner = true;
        this.getService.deleteLogs(filter).subscribe(
            data => {
                this.statusApi = 1;
                this.showSpinner = false;
            },
            error => {
                this.statusApi = 2;
                this.showSpinner = false;
            }
        );
    }

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
