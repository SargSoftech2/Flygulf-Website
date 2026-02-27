import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './aboutus/aboutus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CoursesComponent } from './courses/courses.component';
import { DataFlowComponent } from './data-flow/data-flow.component';
import { ReviewComponent } from './reviews/reviews.component'; // Adjust path as neededimport { BlogsComponent } from './blogs/blogs.component';
import { ContactusComponent } from './contactus/contactus.component';
//import { BlogDetailComponent } from './blog-detail/blog-detail.component';
//import { StepsOfBlsComponent } from './steps-of-bls/steps-of-bls.component';
//import { OetConnectorsComponent } from './oet-connectors/oet-connectors.component';
import { AclsCardiacArrestComponent } from './acls-cardiac-arrest/acls-cardiac-arrest.component';
import { BlsCourseComponent } from './bls-course/bls-course.component';
import { SaudiPrometricComponent } from './saudi-prometric/saudi-prometric.component';
//import { BlogsComponent } from './blogs/blogs.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
 { path: 'aboutus', component: AboutComponent }, // Updated
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'courses', component: CoursesComponent },
{ path: 'data-flow', component: DataFlowComponent },
  
  { path: 'contactus', component: ContactusComponent },
  { path: 'reviews', component: ReviewComponent },
  //{ path: 'blog/steps-of-bls', component: StepsOfBlsComponent },
 // { path: 'blog/oet-connectors', component: OetConnectorsComponent },
 { path: 'acls', component: AclsCardiacArrestComponent },
 { path: 'saudi-prometric', component: SaudiPrometricComponent },
 // Matches routerLink="/about"
 //{ path: 'blog/:id', component: BlogDetailComponent },
//{ path: 'blog', component: BlogsComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'bls-course', component: BlsCourseComponent },
  { path: '**', redirectTo: '' }
];