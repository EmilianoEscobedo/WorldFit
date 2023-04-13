import { Component, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rutina } from 'src/app/Interface/rutina';
import { RutinaService } from 'src/app/Services/rutina.service';
import { RutinasComponent } from '../forms/rutinas/rutinas.component';
import { MatDialog } from '@angular/material/dialog';
import { Ejercicio } from 'src/app/Interface/ejercicio';
import { EndpointsService } from 'src/app/Services/endpoints.service';

@Component({
  selector: 'app-editar-ejercicio',
  templateUrl: './editar-ejercicio.component.html',
  styleUrls: ['./editar-ejercicio.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class EditarEjercicioComponent {
  @Input() dataRutinas:any;
  displayedColumns: string[] = ['title', 'numeroSeries', 'repetition','type', 'quantity', 'unit', 'acciones'];
  dataEjercicios = new MatTableDataSource<Rutina>();
  ejercicio: any
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private datosRutina:RutinaService, public dialog: MatDialog,
   private Api: EndpointsService ) { }
    
  ngOnInit(): void {
    
    this.dataEjercicios = this.dataRutinas.exercises;
   
    
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(RutinasComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.ejercicio= result;
      
    });
  }
  eliminar(id: number): void {
    this.Api.borrarItem(id, "users/routine").subscribe(() => {
      
      
    });
  }
 
}

    
