import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    conteudo: ['', Validators.compose([
      Validators.required,
      Validators.pattern(/(.|\s)*\S(.|\s)*/),
    ])],
    autoria: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])],
    modelo: ['', Validators.required]
  });

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  };


  constructor(
    private service: PensamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) =>{
      this.form.patchValue({
        id: pensamento.id,
        conteudo: pensamento.conteudo,
        autoria: pensamento.autoria,
        modelo: pensamento.modelo
      });
    });

  }

  editarPensamento(){
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    });
  }

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if(this.form.valid){
      return "botao";
    }else{
      return "botao__desabilitado";
    }
  }

}
