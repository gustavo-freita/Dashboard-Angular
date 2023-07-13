import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { InfluencersService } from '../dados/influencers.service';
/* import { CoreService } from '../core/core.service'; */

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent  implements OnInit{
  popUpForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: InfluencersService,
    private _dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.popUpForm = this._fb.group({
      nome:'',
      quantidadeDeInscritos:'',
      nomeDoCanal:'',
      plataforma:'',
      tipoDoConteudo:'',
    })
  }

  ngOnInit(): void {
      this.popUpForm.patchValue(this.data)
  }

  salvarInformacoes() {
    if (this.popUpForm.valid) {
      if(this.data) {
        this._empService.alteracaoInfluencer(this.data.id, this.popUpForm.value).subscribe({
          next: (val: any) => {
            alert('Influencer alterado');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addInfluencer(this.popUpForm.value).subscribe({
          next: (val: any) => {
            alert('Influencer adicionado');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
