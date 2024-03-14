import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false; // Variável para armazenar o status de autenticação do usuário

  constructor() { }

  // Método para realizar a autenticação do usuário
  login(username: string, password: string): boolean {
    // Aqui você pode implementar a lógica de autenticação, como fazer uma chamada HTTP para autenticar o usuário no servidor
    // Neste exemplo, vamos simular uma autenticação bem-sucedida se o usuário for "admin" e a senha for "admin"
    if (username === '@orbitdatascience' && password === 'psswd@123') {
      this.isAuthenticated = true;
      return true; // Retorna true se a autenticação for bem-sucedida
    } else {
      return false; // Retorna false se a autenticação falhar
    }
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated; // Retorna o status de autenticação do usuário
  }

  // Método para fazer logout do usuário
  logout(): void {
    this.isAuthenticated = false; // Define o status de autenticação como falso para indicar que o usuário não está mais autenticado
  }
}
