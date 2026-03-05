import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For structural directives
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-passport',
  imports: [RouterModule],
  templateUrl: './passport.component.html',
  styleUrl: './passport.component.css',
})
export class PassportComponent implements OnInit { // 3. Implemented OnInit

  // 4. Injected Title service in constructor
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    // 5. Set the title for the browser tab
    this.titleService.setTitle('Passport Application & Renewal Assistance | Flygulf');
  }

}