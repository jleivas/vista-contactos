import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Contacto } from '../contacto';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.scss']
})
export class EditarContactoComponent implements OnInit {

  contactForm: FormGroup;
  id:number=null;
  name:string='';
  phone:string='';
  email:string='';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  getContact(id) {
    this.api.getContacto(id).subscribe(data => {
      this.id = data[0].id;
      this.contactForm.setValue({
        id: data[0].id,
        name: data[0].name,
        phone: data[0].phone,
        email: data[0].email
      });
    });
  }

  onFormSubmit(form:NgForm) {
    if(form.name.length < 3){
      alert('El nombre debe contener mas de tres caracteres');
      return;
    }
    this.isLoadingResults = true;
    this.api.updateContacto(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/detalle-contacto', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  contactoDetail() {
    this.router.navigate(['/detalle-contacto', this.id]);
  }

  ngOnInit() {
    this.getContact(this.route.snapshot.params['id']);
    this.contactForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'name' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'email' : [null, Validators.email]
    });
  }

}
