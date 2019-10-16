import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentFormService } from 'src/app/service/student-form.service';
import { finalize } from 'rxjs/operators'

class FileData{
  uRLResume:string;
  resumeId:string;
  uRLCertificate:string;
  certificateId:string;
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  educationFormGroup:FormGroup;
  percentage:Observable<number>;
  files:FileData = new FileData();

  constructor(public dialogRef: MatDialogRef<StudentFormComponent>,private fb:FormBuilder,private formService:StudentFormService) { 
    this.educationFormGroup = this.fb.group({
      fullName:["",[Validators.required,Validators.minLength(1)]],
      quelification:["",[Validators.required,Validators.minLength(1)]],
      email:["",[Validators.required,Validators.email]],
      phone:["",[Validators.required,Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
    })
  }

  ngOnInit() {
  }

  onClick(){
    this.dialogRef.close();
  }
  onSubmit(value){
    value.files = this.files;
    if(!this.educationFormGroup.valid) return;

    this.formService.postStudentDetails(value);

    this.dialogRef.close();
  }

  onChange(event:Event,name){
    let randomNum;
    let file:FileList = event.target["files"];
    
    if(name == "resume"){
      this.files.resumeId = this.files.resumeId?this.files.resumeId:Math.random().toString(36).substring(7);
      randomNum = this.files.resumeId;
    }else{
      this.files.certificateId = this.files.resumeId?this.files.resumeId:Math.random().toString(36).substring(7);
      randomNum = this.files.certificateId;
    }
    let path = this.formService.getFilepath(file.item(0),randomNum);
    const fileRef = this.formService.fileRef(path)
    let task = this.formService.fileUpload(file.item(0),path)

    this.percentage = task.percentageChanges();
    
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url)=>{
          if(name == "resume"){
            this.files.uRLResume = url;
          }else{
            this.files.uRLCertificate = url;
          }
        })
      })
   )
  .subscribe()
  }

}
