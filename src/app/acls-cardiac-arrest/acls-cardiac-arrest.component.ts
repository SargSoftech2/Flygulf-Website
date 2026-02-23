import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acls-cardiac-arrest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acls-cardiac-arrest.component.html',
  styleUrls: ['./acls-cardiac-arrest.component.css']
})
export class AclsCardiacArrestComponent implements OnInit {
  // Clear professional header
  headerImg = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80';

  guideSteps = [
    {
      step: '01',
      title: 'Access the Portal',
      desc: 'Visit the official AHA eLearning site to begin your mandatory assessment.',
      links: [
        { name: 'ACLS Portal', url: 'https://elearning.heart.org/course/423' },
        { name: 'PALS Portal', url: 'https://elearning.heart.org/course/426' }
      ],
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
    },
    {
      step: '02',
      title: 'Navigate the Menu',
      desc: 'Click the hamburger menu (three lines) in the top right corner to sign in.',
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
    },
    {
      step: '03',
      title: 'Account Sign-In',
      desc: 'Log in with your credentials. You can use the same account you use for AHA eBooks.',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    },
    {
      step: '04',
      title: 'Launch Assessment',
      desc: 'Search for your specific course and click the "Launch" button to start.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
    }
  ];

  ngOnInit() { window.scrollTo(0, 0); }
}