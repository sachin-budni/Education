import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { QuillConfig } from 'ngx-quill';
import { AngularFireAuth } from 'angularfire2/auth';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {

  categoryChips = [];
  selectedCategotyChips = [];
  chip:string = "";
  user:User;
  productForm: FormGroup;
  adminForm:FormGroup;
  constructor(private fb: FormBuilder,private adminSerivce: AdminService,private routes:ActivatedRoute,
    private dialog: MatDialog,private router:Router) {
    this.adminSerivce.fetchCategoryData().then((data:any)=>{
      if(data[0]){
        this.categoryChips = data[0];
      }
    })
  }

  selectedValue: number = 0;
  selectedCar: string;
  editData;
  quillConfig:QuillConfig ={
    modules:{
      toolbar:{
        container:[
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],            // custom button values
          [{ 'header': [1,2,3,4,5,6,false] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'size': ['10px', '20px', '80px'] }]
          ['clean']
        ]
      }
    }
  }


  jsonFormate = { "title": "sachin", "authorName": "shiva", "content": [ { "paragraph": "gsgdfgdfgfd" }, { "image": "" }, { "link": "" }, { "image": "" } ] }
 
  ngOnInit() {
    this.routes.params.subscribe(route=>{
      if(route.id){
        this.blogEdit(route.id)
      }
    })
    this.adminForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(5)]],
      authorName:["",[Validators.required,Validators.minLength(2)]],
      titleImage:['',[Validators.required,Validators.minLength(5)]],
      content:this.fb.array([])
    })
    this.adminSerivce.authData.subscribe(user=>{
      this.user = user;
      this.adminForm.get('authorName').setValue(this.user.displayName)
    })
  }

  get contentForm() {
    return this.adminForm.get('content') as FormArray;
  }

  addSellingPoint(name) {
    switch (name) {
      case "paragraph":
        this.contentForm.insert(this.selectedValue,this.fb.group({"paragraph":''}));
        break;
      case "image" :
        this.contentForm.insert(this.selectedValue,this.fb.group({"image":''}));
        break;
      case "link"  :
        this.contentForm.insert(this.selectedValue,this.fb.group({"link":''}));
        break;
    }
    this.selectedValue = this.contentForm.length;
  }

  blogEdit(id){
    this.adminSerivce.blog(id).valueChanges().subscribe(data=>{
      if(data){
        this.setValueToFormControls(data);
        this.editData = id;
      }
    })
  }

  setValueToFormControls(data){
    console.log(data)
    this.adminForm.get('title').setValue(data.title);
    this.adminForm.get('titleImage').setValue(data.titleImage);
    this.adminForm.get('authorName').setValue(data.authorName);
    this.selectedCategotyChips = data.category;
    
    this.setContentValues(data.content);
  }

  setContentValues(content){
    for (let i = 0; i < content.length; i++) {
      let controlName = Object.keys(content[i])[0]
      this.addSellingPoint(controlName);
      this.contentForm.controls[i]["controls"][controlName].setValue(content[i][controlName]);
    }
  }

  update(){
    this.jsonFormate.content.forEach(element => {
      let f1 = this.fb.group(element);
      this.contentForm.push(f1);
    });
  }
  images:string ='';

  drop(event:CdkDragDrop<any>){
    console.log(event)
    console.log(this.contentForm);
    moveItemInArray(this.contentForm.controls, event.previousIndex, event.currentIndex);
  }

  uplaod(event: Event, name, index) {
    this.adminSerivce.uploadImages(event.srcElement["files"]).then(e => {
      if (index || index == 0) {
        this.contentForm.controls[index]["controls"]["image"].setValue(e as string);
      } else {
        this.adminForm.controls[name].setValue(e as string);
      }
    });
  }

  allData: Observable<any>;

  getData(item) {
    this.allData = this.adminSerivce.getDataDB();
  }


  onSubmit(value) {
    if(this.adminForm.valid && this.selectedCategotyChips.length > 0){
      value.id = this.user.uid;
      value.category = this.selectedCategotyChips;
      if(this.editData){
        this.adminSerivce.blog(this.editData).update(value);
      }else{
        this.adminSerivce.addBlog(value).then(data=>{
          console.log(data)
        }).catch(err=>{
          console.log(err);
        })
      }
      for(let i=0;i<this.selectedCategotyChips.length; i++){
        if(!this.categoryChips.includes(this.selectedCategotyChips[i])){
          this.categoryChips.push(this.selectedCategotyChips[i]);
        }
      }
      this.addChips(this.categoryChips);
      this.router.navigate(['blog']);
    }
  }
  
  addChips(data){
    this.adminSerivce.addChips(this.categoryChips as any);
  }

  deleteSellingPoint(index) {
    this.contentForm.removeAt(index);
  }

  remove(index:number){
    this.selectedCategotyChips.splice(index,1);
  }

  addChip(chipName:string){
    if(!this.selectedCategotyChips.includes(chipName))
    this.selectedCategotyChips.push(chipName);
  }

  addCatogoryChip(event:KeyboardEvent){
    if(event.target["value"].length >3 && !this.selectedCategotyChips.includes(event.target["value"])){
      this.selectedCategotyChips.push(event.target["value"]);
    }
    event.target["value"] = "";
  }
 

}
