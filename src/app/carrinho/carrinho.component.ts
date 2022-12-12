import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit{

  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
  ){}

    calculaTotal(){
    this.total = this.itensCarrinho.reduce((prev,curr) => prev + (curr.preco * curr.quantidade), 0);    
    }

  ngOnInit(): void{
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calculaTotal();
  }
  removerProdutoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
  }
  comprar(){
    alert("Parabéns, você finalizou sua compra.");
    this.carrinhoService.limpaCarrinho();
    this.router.navigate(["produtos"]);
  }
}
