import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.component.html',
  styleUrls: ['./agregar-contacto.component.scss']
})
export class AgregarContactoComponent implements OnInit {

  contactForm: FormGroup;
  name:string='';
  phone:string='';
  email:number=null;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
    'name' : [null, Validators.required],
    'phone' : [null, Validators.required],
    'email' : [null, Validators.email ]
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addContacto(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/detalle-contacto', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
