import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For structural directives
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-documentation',
 imports: [CommonModule, RouterModule],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css',
})
export class DocumentationComponent implements OnInit {

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    // Sets the title bar text for the browser tab
    this.titleService.setTitle('Credential Verification & Documentation Services | Flygulf');


  }

}
