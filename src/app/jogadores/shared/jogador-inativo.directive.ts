import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[jogadorInativo]'
})
export class JogadorInativoDirective implements OnInit{

  @Input() jogadorInativo :boolean;

  constructor(private el:ElementRef) { }

  ngOnInit(){
    if(this.jogadorInativo){
      this.el.nativeElement.style.textDecoration ="line-through";
    }
  }
}
