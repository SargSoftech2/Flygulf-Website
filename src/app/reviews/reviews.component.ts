import {
  Component, ViewChildren, QueryList, ElementRef,
  OnInit, OnDestroy, AfterViewInit, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('vcVideoRef') vcVideoRefs!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChildren('vcSlideRef') vcSlideRefs!: QueryList<ElementRef<HTMLElement>>;

  videos: string[] = [
    'assets/videos/Vedio-1.mp4',
    'assets/videos/Vedio-2.mp4',
    'assets/videos/Vedio-3.mp4',
    'assets/videos/Vedio-4.mp4',
    'assets/videos/Vedio-5.mp4',
    'assets/videos/Vedio-6.mp4',
    'assets/videos/Vedio-7.mp4'
  ];

  vcActive          = 0;
  vcAnimating       = false;
  vcBaseOffset      = 0;
  vcDragDelta       = 0;

  vcPlayingMap:     boolean[] = [];
  vcMutedMap:       boolean[] = [];
  vcProgressMap:    number[]  = [];
  vcCurrentTimeMap: string[]  = [];
  vcDurationMap:    string[]  = [];

  vcZoomLevel               = 1;
  private readonly ZOOM_STEP = 0.5;
  private readonly ZOOM_MAX  = 3;
  private readonly ZOOM_MIN  = 1;

  private vcDragging   = false;
  vcIsSwiping          = false;
  private vcDragStartX = 0;

  private readonly ANIM_MS      = 300;
  private readonly SWIPE_THRESH = 50;
  private vcSectionObserver: IntersectionObserver | null = null;

  private get visibleSlides(): number {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  private getSlideWidthPx(): number {
    const slides = this.vcSlideRefs?.toArray();
    if (slides && slides.length > 0)
      return slides[0].nativeElement.getBoundingClientRect().width;
    return window.innerWidth / this.visibleSlides;
  }

  private getMaxOffsetPx(): number {
    const slideW = this.getSlideWidthPx();
    // Allow scrolling all the way to the last video
    return Math.max(0, (this.videos.length - 1) * slideW);
  }

  // ════════════════════════
  //  REVIEW CAROUSEL
  // ════════════════════════

  rcCurrent:   number  = 0;
  rcPrev_:     number  = -1;
  rcDirection: number  = 1;
  rcDragDelta: number  = 0;
  rcAnimating: boolean = false;

  private rcDragging   = false;
  rcIsSwiping          = false;
  private rcDragStartX = 0;
  private rcTimer: any;

  // ════════════════════════
  //  REVIEWS — localStorage persistence
  // ════════════════════════

  private readonly STORAGE_KEY = 'flygulf_reviews';

  private readonly defaultReviews: any[] = [
    { name: 'BHUSHAN',            photo: 'Bhushan.jpg',            comment: 'Excellent training and very helpful instructors! The faculty is highly experienced and always ready to clear doubts. I got placed within 2 months of completing my course. Highly satisfied with the overall experience at FlyGulf Academy.', rating: 5 },
    { name: 'SNEHA',              photo: 'Sneha.jpg',              comment: 'Good course content and very practical sessions. The trainers make sure every student understands the concepts before moving ahead. The study material provided is also very comprehensive and easy to understand.', rating: 4 },
    { name: 'MINAKSHI',           photo: 'Minakshi.jpg',           comment: 'Loved the placement support provided by the team. They helped me prepare for interviews, guided me with my resume, and connected me with top airlines. I am now working with a reputed airline thanks to FlyGulf Academy.', rating: 5 },
    { name: 'SHWETA',             photo: 'Shweta.jpg',             comment: 'Best academy for aviation training in Pune. The infrastructure is world-class, the trainers are professional, and the environment is very encouraging. I would recommend this to anyone looking to build a career in aviation.', rating: 5 },
    { name: 'VISHAKHA',           photo: 'Vishakha.jpg',           comment: 'Trainers explain concepts clearly and with great patience. Even complex topics are broken down in a simple way. The practical sessions gave me real confidence before stepping into the industry. Great overall experience.', rating: 4 },
    { name: 'MAYURI',             photo: 'Mayuri.jpg',             comment: 'Placement support is absolutely amazing here. The team goes above and beyond to ensure every student gets the right opportunity. The mock interview sessions were especially helpful in building my confidence.', rating: 5 },
    { name: 'ARSHDEEP',           photo: 'Arshdeep.jpg',           comment: 'Friendly environment and very supportive staff. From day one, I felt welcomed and guided at every step. The course structure is well planned and covers all the important aspects of aviation training in depth.', rating: 4 },
    { name: 'MAYANK',             photo: 'Mayank.jpg',             comment: 'Highly recommend this institute to anyone serious about a career in aviation. The quality of teaching, the resources available, and the placement assistance are all top notch. FlyGulf truly changed my life.', rating: 5 },
    { name: 'SAURABH',            photo: 'Saurabh.jpg',            comment: 'Good practical exposure and excellent lab facilities. The hands-on training gave me a strong foundation. The instructors are always available for guidance even after class hours. A truly professional institution.', rating: 4 },
    { name: 'MUKESH',             photo: 'Mukesh.jpg',             comment: 'Very supportive faculty and modern labs. The hands-on approach made learning enjoyable and effective. I feel well-prepared for my career in aviation after completing this course.', rating: 3 },
    { name: 'SHRUTIK',            photo: 'Shrutik.jpg',            comment: 'Amazing experience at FlyGulf Academy! The trainers are very knowledgeable and the course structure is excellent. I was able to crack my airline interview in the first attempt thanks to the thorough preparation here.', rating: 5 },
    { name: 'ABHISHEK',           photo: 'Abhishek.jpg',           comment: 'Great institute for aviation training. The faculty is experienced and always willing to help. The placement cell is very active and helped me get placed in a good airline within 3 months of completing the course.', rating: 5 },
    { name: 'IMMANUALE',          photo: 'Immanuale.jpg',          comment: 'The course content is very well structured and covers everything you need to know about the aviation industry. The trainers are passionate and make learning fun. Highly recommended for anyone aspiring to work in aviation.', rating: 4 },
    { name: 'WAJED',              photo: 'Wajed.jpg',              comment: 'FlyGulf Academy gave me the confidence and skills I needed to succeed in the aviation industry. The practical training is top notch and the placement support is excellent. I am now working with a leading airline.', rating: 5 },
    { name: 'GURINDERJEET SINGH', photo: 'Gurinderjeet Singh.jpg', comment: 'Wonderful learning environment with dedicated trainers. The course was challenging but very rewarding. The placement team worked tirelessly to help me find the right opportunity. Truly grateful to FlyGulf Academy.', rating: 4 },
    { name: 'PRASENJET',          photo: 'Prasenjet.jpg',          comment: 'The best decision I made was joining FlyGulf Academy. The training is comprehensive, the faculty is supportive, and the placement assistance is outstanding. I landed my dream job in aviation within 2 months.', rating: 5 },
    { name: 'VAISHNAVI',          photo: 'Vaishnavi.jpg',          comment: 'Very professional institute with excellent infrastructure. The trainers have real industry experience and share valuable insights. The mock interviews and personality development sessions were extremely helpful.', rating: 5 },
    { name: 'AMIT',               photo: 'Amit.jpg',               comment: 'Good training program with practical exposure. The staff is friendly and always ready to assist. The course material is updated and relevant to current industry standards. Would recommend to anyone interested in aviation.', rating: 4 },
    { name: 'SAYALI THORAT',      photo: 'Sayali Thorat.jpg',      comment: 'Joining FlyGulf Academy was the best investment in my career. The trainers are excellent and the placement support is unmatched. I got placed in a top airline and I owe it all to FlyGulf Academy.', rating: 5 },
    { name: 'AJAY THORAT',        photo: 'Ajay Thorat.jpg',        comment: 'Excellent faculty and great learning atmosphere. The course covers all aspects of aviation training in detail. The practical sessions and lab work gave me hands-on experience that proved invaluable in my job.', rating: 4 }
  ];

  reviews: any[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Load saved user reviews from localStorage, then append default reviews
    this.loadReviews();

    this.vcPlayingMap     = this.videos.map(() => false);
    this.vcMutedMap       = this.videos.map(() => false);
    this.vcProgressMap    = this.videos.map(() => 0);
    this.vcCurrentTimeMap = this.videos.map(() => '0:00');
    this.vcDurationMap    = this.videos.map(() => '0:00');
    this.startRcAuto();
  }

  ngAfterViewInit() {
    // Start first video only when user scrolls into the video section
    setTimeout(() => this.setupVideoSectionObserver(), 300);
  }

  private setupVideoSectionObserver() {
    const stage = document.querySelector('.video-section') as HTMLElement;
    if (!stage) { this.playVideo(0); return; }

    this.vcSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // User has scrolled into view — start playing current video
          this.playVideo(this.vcActive);
          // Stop observing after first trigger
          this.vcSectionObserver?.disconnect();
        }
      });
    }, { threshold: 0.3 }); // 30% of section visible triggers it

    this.vcSectionObserver.observe(stage);
  }

  ngOnDestroy() {
    clearInterval(this.rcTimer);
    this.vcSectionObserver?.disconnect();
  }

  // ════════════════════════
  //  localStorage helpers
  // ════════════════════════

  private loadReviews() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const userReviews: any[] = saved ? JSON.parse(saved) : [];
      // User-submitted reviews always appear first, then default reviews
      this.reviews = [...userReviews, ...this.defaultReviews];
    } catch {
      this.reviews = [...this.defaultReviews];
    }
  }

  private saveUserReview(review: any) {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const existing: any[] = saved ? JSON.parse(saved) : [];
      existing.unshift(review); // newest first
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existing));
    } catch {}
  }

  // ════════════════════════
  //  VIDEO CAROUSEL
  // ════════════════════════

  get vcTrackTransform(): string {
    return `translateX(calc(${-this.vcBaseOffset}px + ${this.vcDragDelta}px))`;
  }

  // No transition lock — arrows respond instantly
  vcGoTo(index: number, autoPlay = false) {
    if (index === this.vcActive && !autoPlay) return;
    this.pauseAllVideos();
    this.vcZoomLevel  = 1;
    this.vcDragDelta  = 0;
    this.vcActive     = index;

    const slideW      = this.getSlideWidthPx();
    const rawOffset   = index * slideW;
    const maxOffset   = this.getMaxOffsetPx();
    this.vcBaseOffset = Math.min(maxOffset, Math.max(0, rawOffset));

    this.vcAnimating = true;
    setTimeout(() => {
      this.vcAnimating = false;
      if (autoPlay) this.playVideo(index);
    }, this.ANIM_MS);
  }

  vcNext(autoPlay = false) {
    this.vcGoTo((this.vcActive + 1) % this.videos.length, autoPlay);
  }

  vcPrev() {
    this.vcGoTo((this.vcActive - 1 + this.videos.length) % this.videos.length, false);
  }

  // Arrow buttons — reset auto-timer on manual click
  onVcNext() {
    this.vcNext(true);
  }

  onVcPrev() {
    this.vcPrev();
  }

  vcCardClick(i: number, e: Event) {
    if (this.vcIsSwiping) return;
    e.stopPropagation();
    if (i !== this.vcActive) this.vcGoTo(i, true);
    else this.vcTogglePlay(i, e);
  }

  vcVideoEnded(i: number) {
    this.ngZone.run(() => {
      this.vcPlayingMap[i]     = false;
      this.vcProgressMap[i]    = 0;
      this.vcCurrentTimeMap[i] = '0:00';
      this.vcGoTo((i + 1) % this.videos.length, true);
    });
  }

  vcDragStart(e: MouseEvent | TouchEvent) {
    this.vcDragging   = true;
    this.vcIsSwiping  = false;
    this.vcDragStartX = this.getClientX(e);
    this.vcDragDelta  = 0;
    this.vcAnimating  = false;
  }

  vcDragMove(e: MouseEvent | TouchEvent) {
    if (!this.vcDragging) return;
    const delta   = this.getClientX(e) - this.vcDragStartX;
    const atStart = this.vcActive === 0 && delta > 0;
    const atEnd   = this.vcActive === this.videos.length - 1 && delta < 0;
    this.vcDragDelta = (atStart || atEnd) ? delta * 0.2 : delta;
    if (Math.abs(delta) > 8) this.vcIsSwiping = true;
  }

  vcDragEnd() {
    if (!this.vcDragging) return;
    this.vcDragging  = false;
    const delta      = this.vcDragDelta;
    this.vcAnimating = true;
    if (Math.abs(delta) > this.SWIPE_THRESH) {
      if (delta < 0) this.vcNext(true);
      else           this.vcPrev();
    } else {
      this.vcDragDelta = 0;
      setTimeout(() => { this.vcIsSwiping = false; }, this.ANIM_MS);
    }
  }

  onVcTouchStart(e: TouchEvent) { this.vcDragStart(e); }
  onVcTouchMove(e: TouchEvent) {
    if (!this.vcDragging) return;
    if (Math.abs(this.getClientX(e) - this.vcDragStartX) > 8) e.preventDefault();
    this.vcDragMove(e);
  }
  onVcTouchEnd() { this.vcDragEnd(); }

  private playVideo(i: number) {
    const vids = this.vcVideoRefs?.toArray();
    if (!vids || !vids[i]) return;
    const v = vids[i].nativeElement;
    v.currentTime = 0;
    v.muted = this.vcMutedMap[i];
    v.play().then(() => { this.vcPlayingMap[i] = true; })
      .catch(() => {
        v.muted = true; this.vcMutedMap[i] = true;
        v.play().then(() => this.vcPlayingMap[i] = true).catch(() => {});
      });
  }

  private pauseAllVideos() {
    this.vcVideoRefs?.toArray().forEach((r, i) => {
      r.nativeElement.pause(); this.vcPlayingMap[i] = false;
    });
  }

  vcTogglePlay(i: number, e: Event) {
    e.stopPropagation();
    const vids = this.vcVideoRefs.toArray();
    if (!vids[i]) return;
    const v = vids[i].nativeElement;
    if (this.vcPlayingMap[i]) {
      v.pause(); this.vcPlayingMap[i] = false;
    } else {
      vids.forEach((r, idx) => { if (idx !== i) { r.nativeElement.pause(); this.vcPlayingMap[idx] = false; } });
      v.play().then(() => this.vcPlayingMap[i] = true).catch(() => {});
    }
  }

  vcToggleMute(i: number, e: Event) {
    e.stopPropagation();
    this.vcMutedMap[i] = !this.vcMutedMap[i];
    const v = this.vcVideoRefs.toArray()[i]?.nativeElement;
    if (v) v.muted = this.vcMutedMap[i];
  }

  onTimeUpdate(event: Event, i: number) {
    const v = event.target as HTMLVideoElement;
    if (!v.duration) return;
    this.vcProgressMap[i]    = (v.currentTime / v.duration) * 100;
    this.vcCurrentTimeMap[i] = this.formatTime(v.currentTime);
  }

  onMetaLoaded(event: Event, i: number) {
    this.vcDurationMap[i] = this.formatTime((event.target as HTMLVideoElement).duration);
  }

  seekTo(event: MouseEvent, i: number) {
    const bar = (event.currentTarget as HTMLElement).querySelector('.vc-progress-bg') as HTMLElement;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const v    = this.vcVideoRefs.toArray()[i]?.nativeElement;
    if (v && v.duration) { v.currentTime = pct * v.duration; this.vcProgressMap[i] = pct * 100; }
  }

  vcSeekBy(seconds: number, i: number) {
    const v = this.vcVideoRefs.toArray()[i]?.nativeElement;
    if (v) v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + seconds));
  }

  private formatTime(secs: number): string {
    if (!secs || isNaN(secs)) return '0:00';
    return `${Math.floor(secs / 60)}:${Math.floor(secs % 60).toString().padStart(2, '0')}`;
  }

  vcZoomIn()  { if (this.vcZoomLevel < this.ZOOM_MAX) this.vcZoomLevel = Math.round((this.vcZoomLevel + this.ZOOM_STEP) * 10) / 10; }
  vcZoomOut() { if (this.vcZoomLevel > this.ZOOM_MIN) this.vcZoomLevel = Math.round((this.vcZoomLevel - this.ZOOM_STEP) * 10) / 10; }

  // ════════════════════════
  //  REVIEW CAROUSEL — 3D
  // ════════════════════════

  rcGoTo(i: number, dir: number = 1) {
    if (this.rcAnimating || i === this.rcCurrent) return;
    this.rcDirection = dir;
    this.rcPrev_     = this.rcCurrent;
    this.rcAnimating = true;
    this.rcCurrent   = i;
    setTimeout(() => { this.rcAnimating = false; this.rcPrev_ = -1; }, 450);
  }

  rcNext() {
    clearInterval(this.rcTimer);
    this.rcGoTo((this.rcCurrent + 1) % this.reviews.length, 1);
    this.startRcAuto();
  }

  rcPrev() {
    clearInterval(this.rcTimer);
    this.rcGoTo((this.rcCurrent - 1 + this.reviews.length) % this.reviews.length, -1);
    this.startRcAuto();
  }

  rcDragStart(e: MouseEvent | TouchEvent) {
    this.rcDragging   = true;
    this.rcIsSwiping  = false;
    this.rcDragStartX = this.getClientX(e);
    this.rcDragDelta  = 0;
    clearInterval(this.rcTimer);
  }

  rcDragMove(e: MouseEvent | TouchEvent) {
    if (!this.rcDragging) return;
    const delta = this.getClientX(e) - this.rcDragStartX;
    this.rcDragDelta = delta;
    if (Math.abs(delta) > 8) this.rcIsSwiping = true;
  }

  rcDragEnd() {
    if (!this.rcDragging) return;
    this.rcDragging  = false;
    const delta      = this.rcDragDelta;
    this.rcDragDelta = 0;
    if (Math.abs(delta) > 60) {
      if (delta < 0) this.rcNext();
      else           this.rcPrev();
    } else {
      this.startRcAuto();
    }
    setTimeout(() => { this.rcIsSwiping = false; }, 300);
  }

  onRcTouchStart(e: TouchEvent) { this.rcDragStart(e); }
  onRcTouchMove(e: TouchEvent) {
    if (!this.rcDragging) return;
    if (Math.abs(this.getClientX(e) - this.rcDragStartX) > 8) e.preventDefault();
    this.rcDragMove(e);
  }
  onRcTouchEnd() { this.rcDragEnd(); }

  private startRcAuto() {
    clearInterval(this.rcTimer);
    this.rcTimer = setInterval(() => {
      this.rcGoTo((this.rcCurrent + 1) % this.reviews.length, 1);
    }, 4500);
  }

  private getClientX(e: MouseEvent | TouchEvent): number {
    return e instanceof TouchEvent ? (e.touches[0]?.clientX ?? 0) : e.clientX;
  }

  getStars(r: number)      { return Array(r).fill(0); }
  getEmptyStars(r: number) { return Array(5 - r).fill(0); }

  getSlideClass(i: number): string {
    if (i === this.rcCurrent)
      return this.rcDirection === 1 ? 'rc-enter-from-right' : 'rc-enter-from-left';
    if (i === this.rcPrev_)
      return this.rcDirection === 1 ? 'rc-exit-to-left' : 'rc-exit-to-right';
    return 'rc-hidden';
  }

  getAvatarSrc(r: any): string {
    if (r._photoBase64) return r._photoBase64;
    return 'assets/students/' + r.photo;
  }

  onImgError(event: Event, name: string) {
    const el = event.target as HTMLImageElement;
    if (!el) return;
    el.onerror = null;
    el.src = 'assets/images/default-avatar.png';
    const p = el.parentElement;
    if (p) { p.classList.add('avatar-fallback'); p.setAttribute('data-init', name.charAt(0)); }
  }

  // ════════════════════════
  //  WRITE A REVIEW MODAL
  // ════════════════════════

  showReviewModal  = false;
  reviewSubmitted  = false;
  isSubmitting     = false;
  hoverRating      = 0;

  newReview = {
    name:         '',
    mobile:       '',
    designation:  '',
    course:       '',
    comment:      '',
    rating:       0,
    photoPreview: '' as string | null,
    photoName:    '',
    photoFile:    null as File | null
  };

  formErrors: { name?: string; mobile?: string; comment?: string; rating?: string } = {};

  openReviewModal() {
    this.showReviewModal = true;
    this.reviewSubmitted = false;
    this.isSubmitting    = false;
    this.hoverRating     = 0;
    this.formErrors      = {};
    this.newReview = { name: '', mobile: '', designation: '', course: '', comment: '', rating: 0, photoPreview: null, photoName: '', photoFile: null };
    document.body.style.overflow = 'hidden';
  }

  closeReviewModal() {
    this.showReviewModal = false;
    document.body.style.overflow = '';
  }

  closeOnBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop'))
      this.closeReviewModal();
  }

  setRating(val: number) {
    this.newReview.rating = val;
    this.clearError('rating');
  }

  getRatingLabel(): string {
    const r = this.hoverRating || this.newReview.rating;
    const labels: Record<number, string> = {
      0: 'Tap a star to rate',
      1: '⭐ Poor',
      2: '⭐⭐ Fair',
      3: '⭐⭐⭐ Good',
      4: '⭐⭐⭐⭐ Very Good',
      5: '⭐⭐⭐⭐⭐ Excellent!'
    };
    return labels[r] || '';
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Photo must be under 2MB'); return; }
    this.newReview.photoFile = file;
    this.newReview.photoName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => { this.newReview.photoPreview = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.newReview.photoPreview = null;
    this.newReview.photoName    = '';
    this.newReview.photoFile    = null;
  }

  clearError(field: string) {
    delete (this.formErrors as any)[field];
  }

  private validateForm(): boolean {
    this.formErrors = {};
    if (!this.newReview.name.trim())    this.formErrors.name    = 'Name is required';
    if (!this.newReview.mobile.trim())  this.formErrors.mobile  = 'Mobile number is required';
    if (this.newReview.rating === 0)    this.formErrors.rating  = 'Please select a rating';
    if (!this.newReview.comment.trim()) this.formErrors.comment = 'Review cannot be empty';
    else if (this.newReview.comment.trim().length < 20)
                                        this.formErrors.comment = 'Please write at least 20 characters';
    return Object.keys(this.formErrors).length === 0;
  }

  submitReview() {
    if (!this.validateForm()) return;

    // Build the review object
    const submitted: any = {
      name:         this.newReview.name.trim().toUpperCase(),
      photo:        'default-avatar.png',
      comment:      this.newReview.comment.trim(),
      rating:       this.newReview.rating,
      designation:  this.newReview.designation.trim(),
      course:       this.newReview.course,
      _photoBase64: this.newReview.photoPreview || null
    };

    // Save to localStorage so it persists across page reloads
    this.saveUserReview(submitted);

    // Add to top of the live reviews array immediately
    this.reviews.unshift(submitted);
    this.reviewSubmitted = true;

    // Navigate carousel to show new review, then auto-close modal
    setTimeout(() => {
      this.rcCurrent   = 0;
      this.rcDirection = -1;
      this.rcPrev_     = -1;
      this.rcAnimating = false;
      setTimeout(() => this.closeReviewModal(), 1500);
    }, 300);
  }
} 