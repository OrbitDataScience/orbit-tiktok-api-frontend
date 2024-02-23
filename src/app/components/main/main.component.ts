import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor(private mainService: MainService) { }

  senha = ''
  email = ''
  keyword = ''
  dataPostagem = 1
  countPost = 30
  form = ''
  jsonObject: any;
  region = 'BR'
  sort = '0'
  variavel = ''
  ngOnInit(): void { }

  //usado para mostrar o spinner quando estiver aguardando a resposta do back
  loading = false

  // Validação do formulário
  getValues(form: NgForm) {

    if (form.invalid) {
      console.log('Formulário inválido')
      return
    }
    // Coloca um número maximo de postagens
    if (this.countPost > 30) {
      this.countPost = 30
    }
  }

  // Exporta o JSON para um arquivo .xlsx
  public exportJsonToXlsx(jsonData: any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData)
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados TikTok');
    XLSX.writeFile(wb, 'tiktok_data.xlsx');
  }

  // Exporta o JSON para um arquivo .json
  public downloadJson(data: any, filename: string) {
    // Converte o objeto JSON em uma string JSON
    const jsonString = JSON.stringify(data, null, 2); // O segundo parâmetro é para formatação
  
    // Cria um elemento "a" temporário
    const element = document.createElement('a');
  
    // Define o atributo "href" com os dados JSON
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString));
  
    // Define o atributo "download" com o nome do arquivo
    element.setAttribute('download', filename + '.json');
  
    // Esconde o elemento temporário
    element.style.display = 'none';
  
    // Adiciona o elemento temporário ao corpo do documento
    document.body.appendChild(element);
  
    // Simula um clique no elemento para iniciar o download
    element.click();
  
    // Remove o elemento temporário
    document.body.removeChild(element);
  }

  // Envia os dados para o backend
  sendToBackend() {
    // Monta o objeto JSON
    this.jsonObject = {
      "keyword": this.keyword,
      "dataPostagem": this.dataPostagem,
      "region": this.region,
      "sort": this.sort,
      "countPost": this.countPost
    }

      this.loading = true
      this.mainService.sendToBackend(this.jsonObject).pipe(
        catchError((error) => {
          this.loading = false
          console.error('Erro ao enviar dados para o backend:', error);
          return throwError(error); // Re-emitir o erro para que o componente que chamou possa lidar com ele
        })
      ).subscribe((response) => {
        this.loading = false
        const responseArray = Object.values(response);
        this.exportJsonToXlsx(responseArray);
        // this.downloadJson(responseArray, 'tiktok_data');
      });
    }
  
  
}

