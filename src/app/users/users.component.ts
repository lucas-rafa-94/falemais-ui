import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '../services/users/users.service';
import {TokenService} from '../services/token/token.service';

@Component({
  selector: 'app-download',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    getService;
    showSpinner;
    usuarios;
    access_token;
    tokenService;
    deleteOpen;
    statusApi = 0;
    usuarioSelecionado = {
        hubId: '',
        idPabx: '',
        faleMaisToken: '',
        ramal: '',
        urlPabx: '',
        email: ''
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

    constructor(private router: Router, service: UsersService , private modalService: NgbModal, tokenService: TokenService) {
        this.getTokenSession();
        this.getService = service;
        this.tokenService = tokenService;
        this.visualizacaoOpen = true;
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.confirmaDelete = false;
        this.getUsuarios();
        this.showSpinner = true;
    }



    ngOnInit() {
    }

    deleteClose() {
        this.statusApi = 0
        this.getUsuarios();
        this.criaOrUpdateOpen = false;
        this.createOpen = false;
        this.deleteOpen = false;
        this.visualizacaoOpen = true;
    }

    openDelete(usuario) {
        this.usuarioSelecionado = usuario;
        this.criaOrUpdateOpen = false;
        this.visualizacaoOpen = false;
        this.createOpen = false;
        this.deleteOpen = true;
    }

    deleteUsuario() {
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

    updateUsuario(){
        if(this.criaOrUpdateOpen) {
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
        this.getUsuarios();
    }


    openEditar(usuario) {
        this.usuarioSelecionado = usuario;
        this.criaOrUpdateOpen = true;
        this.visualizacaoOpen = false;
        this.createOpen = false;
    }

    getUsuarios() {

        this.showSpinner = true;
                this.getService.getUsuariosCadastrados(this.access_token).subscribe(
                    datain => {
                        console.log(datain.status);
                        if (datain.status === 200) {
                            console.log(datain);
                            this.usuarios = datain;
                        } else {
                            console.log(datain);
                            this.usuarios = datain;
                        }
                        this.showSpinner = false;
                    },
                    errorin => {
                        console.log(errorin);
                        this.showSpinner = false;
                    }
                );

    }

    updateUsuarioAcao(usuario){
        this.showSpinner = true;
                this.getService.updateUsuario(usuario, this.access_token).subscribe(
                    data => {
                        // console.log(data.status);
                        this.usuarios = data;
                        this.statusApi = 1;
                        this.showSpinner = false;
                    },
                    error => {
                        console.log(error);
                        this.statusApi = 2;
                        this.showSpinner = false;
                    }
                );
    }

    deleteUsuarioAcao(usuario) {
                this.getService.deleteUsuario(usuario, this.access_token).subscribe(
                    data => {
                        this.getUsuarios();
                        this.deleteClose();
                    },
                    error => {
                        this.statusApi = 2;
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
