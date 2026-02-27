import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './aboutus/aboutus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CoursesComponent } from './courses/courses.component';
import { DataFlowComponent } from './data-flow/data-flow.component';
import { ReviewComponent } from './reviews/reviews.component'; // Adjust path as neededimport { BlogsComponent } from './blogs/blogs.component';
import { ContactusComponent } from './contactus/contactus.component';
/*import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { StepsOfBlsComponent } from './steps-of-bls/steps-of-bls.component';*/
import { OetConnectorsComponent } from './oet-connectors/oet-connectors.component';
import { AclsCardiacArrestComponent } from './acls-cardiac-arrest/acls-cardiac-arrest.component';
import { BlsCourseComponent } from './bls-course/bls-course.component';
import { SaudiPrometricComponent } from './saudi-prometric/saudi-prometric.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'courses', component: CoursesComponent },

  { path: 'data-flow', component: DataFlowComponent },
  { path: 'blogs', component: BlogsComponent },

{ path: 'data-flow', component: DataFlowComponent },
  
 
  { path: 'contactus', component: ContactusComponent },
  { path: 'reviews', component: ReviewComponent },
  /*{ path: 'blog/steps-of-bls', component: StepsOfBlsComponent },*/
  { path: 'blog/oet-connectors', component: OetConnectorsComponent },

  { path: 'blog/:id', component: BlogDetailComponent },

 { path: 'acls', component: AclsCardiacArrestComponent },
 { path: 'saudi-prometric', component: SaudiPrometricComponent },
 // Matches routerLink="/about"
 /*{ path: 'blog/:id', component: BlogDetailComponent },*/

  { path: 'contact', component: ContactusComponent },
  
  // Dynamic course detail page - works for ALL courses
  { path: 'course/:slug', component: AclsCardiacArrestComponent },
  
  // Redirect all course routes to dynamic page
  { path: 'acls', redirectTo: 'course/acls', pathMatch: 'full' },
  { path: 'bls', redirectTo: 'course/bls', pathMatch: 'full' },
  { path: 'bls-course', redirectTo: 'course/bls', pathMatch: 'full' },
  { path: 'pals', redirectTo: 'course/pals', pathMatch: 'full' },
  { path: 'nrp', redirectTo: 'course/nrp', pathMatch: 'full' },
  { path: 'heartsaver', redirectTo: 'course/heartsaver', pathMatch: 'full' },
  { path: 'ecg', redirectTo: 'course/ecg', pathMatch: 'full' },
  { path: 'critical-care', redirectTo: 'course/critical-care', pathMatch: 'full' },
  { path: 'dha', redirectTo: 'course/dha', pathMatch: 'full' },
  { path: 'haad', redirectTo: 'course/haad', pathMatch: 'full' },
  { path: 'moh', redirectTo: 'course/moh', pathMatch: 'full' },
  { path: 'saudi-prometric', redirectTo: 'course/saudi-prometric', pathMatch: 'full' },
  { path: 'prometric', redirectTo: 'course/prometric', pathMatch: 'full' },
  { path: 'oet', redirectTo: 'course/oet', pathMatch: 'full' },
  { path: 'ielts', redirectTo: 'course/ielts', pathMatch: 'full' },
  
  { path: '**', redirectTo: '' }
];