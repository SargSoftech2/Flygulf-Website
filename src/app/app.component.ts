import { Component, OnInit } from '@angular/core'; // 1. Import OnInit
import { Router, NavigationEnd, RouterOutlet } from '@angular/router'; // 2. Import Router and NavigationEnd
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs/operators'; // 3. Import filter for cleaner code

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'flygulf';

  // 4. Inject the Router
  constructor(private router: Router) {}

  ngOnInit() {
    // 5. Subscribe to router events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // 6. Scroll to top on navigation end
        window.scrollTo(0, 0);
      });
  }
}