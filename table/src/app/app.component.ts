import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Api } from "../services/api.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'table';
  dataApi = [];
  dataStorage = [];
  dataInitialStorage = [];

  public regForm: any;
  // tslint:disable-next-line: variable-name
  constructor(private _http: Api, private formBuilder: FormBuilder) {
    this.getData();
  }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      txtNombre: ['', Validators.required],
    });
  }

  getData() {
    this._http.getData().subscribe((result: any) => {
      this.dataApi = result.results[0].Persona;
      console.log(result.results[0].Persona);
      this.dataInitialStorage = JSON.parse(localStorage.getItem('Persona'));
      if (this.dataInitialStorage) {
        this.dataStorage = this.dataInitialStorage;
        this.dataApi = [...this.dataApi, ...this.dataInitialStorage];
      }
    });
  }

  onSubmit() {
    this.dataApi.push({
      Nombre: this.regForm.value.txtNombre,
      Edad: Math.floor((Math.random() * 100) + 1),
      Sexo: '',
      Documento: '',
    });
    this.dataStorage.push({
      Nombre: this.regForm.value.txtNombre,
      Edad: Math.floor((Math.random() * 100) + 1),
      Sexo: '',
      Documento: '',
    });
    localStorage.setItem('Persona', JSON.stringify(this.dataStorage));
    this.regForm.reset();
  }
}
