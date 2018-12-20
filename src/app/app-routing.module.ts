import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactosComponent } from './contactos/contactos.component';
import { DetalleContactoComponent } from './detalle-contacto/detalle-contacto.component';
import { AgregarContactoComponent } from './agregar-contacto/agregar-contacto.component';
import { EditarContactoComponent } from './editar-contacto/editar-contacto.component';


const routes: Routes = [
  {
    path: 'contactos',
    component: ContactosComponent,
    data: { title: 'Lista de Contactos' }
  },
  {
    path: 'detalle-contacto/:id',
    component: DetalleContactoComponent,
    data: { title: 'Datos del contacto' }
  },
  {
    path: 'agregar-contacto',
    component: AgregarContactoComponent,
    data: { title: 'Agregar Contacto' }
  },
  {
    path: 'editar-contacto/:id',
    component: EditarContactoComponent,
    data: { title: 'Editar Contacto' }
  },
  { 
    path: '**',
    component: ContactosComponent,
    data: { title: 'Lista de Contactos' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
