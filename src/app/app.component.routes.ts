import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './aboutus/aboutus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CoursesComponent } from './courses/courses.component';
import { DataFlowComponent } from './data-flow/data-flow.component';
import { ReviewComponent } from './reviews/reviews.component';
import { ContactusComponent } from './contactus/contactus.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { StepsOfBlsComponent } from './steps-of-bls/steps-of-bls.component';
import { OetConnectorsComponent } from './oet-connectors/oet-connectors.component';
import { AclsCardiacArrestComponent } from './acls-cardiac-arrest/acls-cardiac-arrest.component';
import { SaudiPrometricComponent } from './saudi-prometric/saudi-prometric.component';
import { ServicesComponent } from './service/services/services.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CoachingComponent } from './coaching/coaching.component';
import { VisaComponent } from './visa/visa.component';
import { PassportComponent } from './passport/passport.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { PlacementComponent } from './placement/placement.component';
import {GuidanceComponent } from './guidance/guidance.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'services', component: ServicesComponent },
  
  // Service Sub-pages
  { path: 'services/documentation', component: DocumentationComponent },
  { path: 'data-flow', component: DataFlowComponent },

  // Blog Routes
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog/steps-of-bls', component: StepsOfBlsComponent },
  { path: 'blog/oet-connectors', component: OetConnectorsComponent },
  { path: 'blog/:id', component: BlogDetailComponent },

  // Contact & Reviews
  { path: 'contactus', component: ContactusComponent },
  { path: 'reviews', component: ReviewComponent },

  // Dynamic Course System
  { path: 'course/:slug', component: AclsCardiacArrestComponent },
  
  // Redirects for simplicity
  { path: 'acls', redirectTo: 'course/acls', pathMatch: 'full' },
  { path: 'saudi-prometric', redirectTo: 'course/saudi-prometric', pathMatch: 'full' },
{ path: 'services/documentation', component: DocumentationComponent },
  { path: 'services/data-flow', component: DataFlowComponent },
  { path: 'services/coaching', component: CoachingComponent },
  { path: 'services/visa', component: VisaComponent },
  { path: 'services/passport', component: PassportComponent },
  { path: 'services/accomodation', component: AccomodationComponent },
  { path: 'services/placement', component: PlacementComponent },
  { path: 'services/consultancy', component: GuidanceComponent },
  // Wildcard (Always Last)
  { path: '**', redirectTo: '' }
];