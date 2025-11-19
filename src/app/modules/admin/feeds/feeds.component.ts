import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { LucideAngularModule, MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-angular';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeds',
  standalone: true,
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
  imports: [LucideAngularModule, FormsModule]
})
export class FeedsComponent implements OnInit {
  loading = true;
  expanded = false;
  posts: any[] = [];
  selectedPost: any;
  newComment: string = '';

  readonly comment = MessageCircleMore;
  readonly like = ThumbsUp;
  readonly dislike = ThumbsDown;
  readonly dialog = inject(MatDialog);
    private router = inject(Router);

  @ViewChild('submitComment') submitComment!: TemplateRef<any>;

  ngOnInit() {
    // Simulate fetching posts
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

  toggleExpand(post: any) {
    post.expanded = !post.expanded;
  }

  openCommentDialog(post: any) {
    this.selectedPost = post;
    this.newComment = '';

    this.dialog.open(this.submitComment, {
      width: '600px',
      panelClass: ['center-dialog', 'custom-scroll-dialog'],
    });
  }

  addComment() {
    if (!this.newComment.trim()) return;

    const comment = {
      name: 'John Doe',
      photo: 'https://avatar.iran.liara.run/public',
      text: this.newComment.trim(),
    };

    this.selectedPost.comments.push(comment);
    this.newComment = '';
  }

  liked() {
    console.log('liked');
  }
  disliked() {
    console.log('disliked');
  }

  signOut() {
    alert('Signed out!');
  }


  friendSuggestions = [
  {
    id: 1,
    name: 'Mona Ibrahim',
    mutualFriends: 3,
    avatar: 'https://avatar.iran.liara.run/public',
  },
  {
    id: 2,
    name: 'Karim Adel',
    mutualFriends: 5,
    avatar: 'https://avatar.iran.liara.run/public',
  },
  {
    id: 3,
    name: 'Nour Samir',
    mutualFriends: 1,
    avatar: 'https://avatar.iran.liara.run/public',
  }
];

addFriend(id: number) {
  this.friendSuggestions = this.friendSuggestions.filter(f => f.id !== id);
  console.log(`Sent friend request to user ${id}`);
}

// goToProfile(name: string) {
//   this.router.navigate(['/profile'], { queryParams: { user: name } });
// }


    goToProfile(author:string){
    this.router.navigate(['/profile' , author])
  }
}
