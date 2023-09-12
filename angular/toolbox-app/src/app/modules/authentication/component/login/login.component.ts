import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'dgt-authentication',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
    private document: any = inject(DOCUMENT);
    authService: AuthService = inject(AuthService);

    ngAfterViewInit(): void {
        document.getElementById('dgt-login').style.display = '';
        document.getElementById('dgt-logout').style.display = '';
    }
}
