import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Contacto } from '../contacto';

@Component({
  selector: 'app-detalle-contacto',
  templateUrl: './detalle-contacto.component.html',
  styleUrls: ['./detalle-contacto.component.scss']
})
export class DetalleContactoComponent implements OnInit {

  contact: Contacto = { id: 0, name: '', phone: '', email: '' };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  
  getDetalleContacto(id) {
    this.api.getContacto(id)
      .subscribe(data => {
        this.contact = data[0];
        console.log(this.contact);
        this.isLoadingResults = false;
      });
  }

  /*
  deleteContact(id) {
    this.isLoadingResults = true;
    this.api.updateContacto(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/contacto']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }*/

  ngOnInit() {
    this.getDetalleContacto(this.route.snapshot.params['id']);
  }

}
