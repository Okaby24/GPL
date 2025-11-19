import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrowLeft, LucideAngularModule, MessageCircleMore, PlusCircle, PlusIcon, ThumbsDown, ThumbsUp } from 'lucide-angular';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
    imports: [LucideAngularModule, FormsModule , NzDrawerModule]
})
export class ProfileComponent implements OnInit {

    readonly comment = MessageCircleMore;
  readonly like = ThumbsUp;
  readonly dislike = ThumbsDown;
    readonly plus = PlusIcon;
  readonly leftArrow = ArrowLeft;
  readonly dialog = inject(MatDialog);
    private router = inject(Router);
    loading = true;
      posts: any[] = [];
       authorName = '';
  user: any;
  visible = false;


    openDrawer() {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: null },
    });
  }


  constructor(private route: ActivatedRoute) { }

  friendRequests = [
    {
      id: 1,
      name: 'Ahmed Khaled',
      mutualFriends: 4,
      avatar: 'https://avatar.iran.liara.run/public',
    },
    {
      id: 2,
      name: 'Sara Mostafa',
      mutualFriends: 2,
      avatar: 'https://avatar.iran.liara.run/public',
    },
    {
      id: 3,
      name: 'Omar Nasser',
      mutualFriends: 7,
      avatar: 'https://avatar.iran.liara.run/public',
    }
  ];

  acceptRequest(id: number) {
    this.friendRequests = this.friendRequests.filter(req => req.id !== id);
    console.log(`Friend request ${id} accepted`);
  }

  declineRequest(id: number) {
    this.friendRequests = this.friendRequests.filter(req => req.id !== id);
    console.log(`Friend request ${id} declined`);
  }

  goToProfile(name: string) {
    this.router.navigate(['/profile', name]);
  }



   getUserProfile(author: string) {
    // Normally you'd fetch this from an API
    const allUsers = [
      {
        name: 'John Doe',
        avatar: 'https://avatar.iran.liara.run/public',
        bio: 'Frontend Developer | Fitness Enthusiast 💪',
        joined: 'January 2023',
        posts: [
          { id: 1, content: 'Just finished my morning run 🏃‍♂️', likes: 120 },
          { id: 3, content: 'Vacation mode 🌴', likes: 90 }
        ]
      },
      {
        name: 'Jane Smith',
        avatar: 'https://avatar.iran.liara.run/public',
        bio: 'Designer | Traveler ✈️ | Cat Lover 🐱',
        joined: 'March 2023',
        posts: [
          { id: 2, content: 'Beautiful weather today ☀️', likes: 50 }
        ]
      }
    ];

    return allUsers.find(u => u.name === author) || {
      name: author,
      avatar: 'https://avatar.iran.liara.run/public',
      bio: 'This user has no bio yet.',
      joined: 'N/A',
      posts: []
    };
  }


   goBack() {
    this.router.navigate(['/']);
  }
  

  ngOnInit() {

       this.authorName = this.route.snapshot.paramMap.get('author') || 'Unknown User';

    // Simulate fetching user data based on authorName
    this.user = this.getUserProfile(this.authorName);

     setTimeout(() => {
      this.posts = [
        {
          id: 1,
          author: 'John Doe',
          time: '2h',
          content: 'Just finished my workout 💪',
          comments: [
            { name: 'Sarah Lee', photo: 'https://avatar.iran.liara.run/public', text: 'Nice work!' },
            { name: 'Ali Hassan', photo: 'https://avatar.iran.liara.run/public', text: 'Keep it up!' }
          ]
        },
        {
          id: 2,
          author: 'Jane Smith',
          time: '4h',
          content: 'Beautiful weather today ☀️',
          comments: []
        },
        {
          id: 3,
          author: 'John Doe',
          time: '2h',
          content: 'Check out my vacation pics! 🌴',
          images: [
            'https://picsum.photos/id/1011/600/400',
            'https://picsum.photos/id/1012/600/400',
            'https://picsum.photos/id/1013/600/400',
            'https://picsum.photos/id/1014/600/400',
            'https://picsum.photos/id/1015/600/400',
            'https://picsum.photos/id/1016/600/400'
          ],
          comments: [
            { name: 'Adam Ray', photo: 'https://avatar.iran.liara.run/public', text: 'Amazing shots!' }
          ]
        }
      ];
      this.loading = false;
    }, 2000);
  }


  goToFeed(){
  
    this.router.navigate(['/feeds'])
  
  }

 
}
