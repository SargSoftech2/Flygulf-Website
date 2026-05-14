import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Add this

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink], // Add this
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent { }