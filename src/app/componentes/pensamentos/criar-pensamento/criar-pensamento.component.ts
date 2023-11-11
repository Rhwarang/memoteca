import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  form!: FormGroup;


  constructor
  (
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: ['modelo1']
    });
  }


  criarPensamento(){
    if(this.form.valid){
      this.service.criar(this.form.value).subscribe(() =>{
        this.router.navigate(["/listarPensamento"]);
      });
    }


  }

  cancelar(){
    this.router.navigate(["/listarPensamento"]);
  }

  habilitarBotao(): string {
    if(this.form.valid){
      return "botao";
    }else{
      return "botao__desabilitado";
    }
  }

}
