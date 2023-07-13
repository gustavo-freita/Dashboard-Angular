import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { InfluencersService } from '../dados/influencers.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-influenciadores',
  templateUrl: './influenciadores.component.html',
  styleUrls: ['./influenciadores.component.css']
})
export class InfluenciadoresComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nome',
    'quantidadeDeInscritos',
    'nomeDoCanal',
    'plataforma',
    'tipoDoConteudo',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: InfluencersService
  ) {}

  ngOnInit(): void {
    this.getInfluencerLista();
  }

  openPopUp() {
    const dialogRef = this._dialog.open(PopUpComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getInfluencerLista();
        }
      },
    })
  }

  getInfluencerLista() {
    this._empService.getInfluencerLista().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletandoInfluencer(id: number) {
    this._empService.deletandoInfluencer(id).subscribe({
      next: (res) => {
        alert('Influencer deletado');
        this.getInfluencerLista();
      },
      error:console.log,
    })
  }

  openAlteracaoInfluencer(data: any) {
    const dialogRef = this._dialog.open(PopUpComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getInfluencerLista();
        }
      },
    });
  }
}
