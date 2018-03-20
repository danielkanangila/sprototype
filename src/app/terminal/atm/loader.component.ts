import { Component } from '@angular/core';

@Component({
    selector: 'app-loader',
    template: `
        <div class="loader-wrapper">
        <div style="position: relative;top:35%;width: 100px;" class="mx-auto">
            <div class="loader-spinners mx-auto"></div>
            <div class="loader-txt">
            <h1>Process...</h1>
            </div>
        </div>
        </div>
    `,
    styles: [`
        .loader-wrapper {
            position: absolute;
            top: 0px;
            left: 0px;
            bottom: 0px;
            width: 100%;
            height: 100%;
            background: #FF5300;
            transition: background-color .5s;
            text-align: center;
            color: #fff;
            z-index: 1050;
        }

        .loader-txt h1{
            font-size: 20px;
            padding: 1rem;
        }

        .loader-spinners {
            border: 3px solid #f3f3f3; /* Light grey */
            border-top: 5px solid #888787; /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
        }

        /* Safari */
        @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
        }

        @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        }
    `]
})
export class LoaderComponent {}
