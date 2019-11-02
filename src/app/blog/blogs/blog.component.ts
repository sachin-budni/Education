import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  // items = values.question;
  $items:Observable<any>;
  constructor(private blogService:BlogService) { 
    this.$items = this.blogService.getBlogs.snapshotChanges().pipe(
      map(blogs=>{
        return blogs.map(blog=>{
          return {key :blog.key,...blog.payload.val()};
        })
      })
    )
  }

  ngOnInit() {
  }

  shareBlog(Url,title){
    window.open(Url+encodeURI("https://www.willntrix.com/blog/"+title),'_blank',"toolbar=yes,top=500,left=500,width=400,height=400")
  }

}

 const values =
    {
      header:"what is google",
      subHeader:"",
      question:[
        {
          id:"sdjisjdks",
          image:"assets/BLOG1.jpg",
          data:`[Jobs Roundup] Foodtech Startups are hungry for new talent. Do you have what it takes to ‘deliver’?`,
          name:"Shrishail"
        },
        {
          id:"nzjhjer",
          image:"https://images.yourstory.com/cs/2/60409080-2d6d-11e9-aa97-9329348d4c3e/flattummies_founders1557501179545.png?fm=png&auto=format&h=400&w=800&crop=entropy&fit=crop",
          data:`How this bootstrapped clothing startup is eyeing success by marrying Indian ethnic fashion with international trends`,
          name:"Somashekar"
        },
        {
          id:"nlziejr",
          image:"https://images.yourstory.com/cs/2/2d86ed30-b282-11e8-b2e7-114aea10c711/WhatsApp_Image_2019-03-12_at_71557491356312.47?fm=png&auto=format",
          data:"How “mothers” have helped this homegrown startup get an edge over international competition",
          name:"Shridhar"
        },
        {
          id:"neskjde",
          image:"https://images.yourstory.com/cs/2/a054f130-2d6c-11e9-aa97-9329348d4c3e/booking_booster1557548852374.jpg?fm=png&auto=format",
          data:"Meet the 10 startups that are working on sustainable tourism, and won Booking.com grants",
          name:"Mahadev"
        },
        {
          id:"ocidmekr",
          image:"https://images.yourstory.com/cs/wordpress/2018/02/Uber-Express-POOL.jpg?fm=png&auto=format",
          data:"Uber IPO: Bumpy ride for Uber in its trading debut",
          name:"Akash"
        },
        {
          id:"nlsdijfd",
          image:"https://images.yourstory.com/cs/2/60409080-2d6d-11e9-aa97-9329348d4c3e/Skillmatics_Dhvanil1557486199721.png?fm=png&auto=format",
          data:"This Mumbai startup is the first Indian brand to sell across Hamleys globally",
          name:"Shrikant"
        },
        {
          id:"oienmkds",
          image:"https://images.yourstory.com/cs/2/a054f130-2d6c-11e9-aa97-9329348d4c3e/booking_booster1557548852374.jpg?fm=png&auto=format",
          data:"Meet the 10 startups that are working on sustainable tourism, and won Booking.com grants",
          name:"Mahadev"
        },
        {
          id:"isduifd",
          image:"https://images.yourstory.com/cs/wordpress/2018/02/Uber-Express-POOL.jpg?fm=png&auto=format",
          data:"Uber IPO: Bumpy ride for Uber in its trading debut",
          name:"Akash"
        },
        {
          id:"kfjdskjf",
          image:"https://images.yourstory.com/cs/2/60409080-2d6d-11e9-aa97-9329348d4c3e/Skillmatics_Dhvanil1557486199721.png?fm=png&auto=format",
          data:"This Mumbai startup is the first Indian brand to sell across Hamleys globally",
          name:"Shrikant"
        }
      ]
    }