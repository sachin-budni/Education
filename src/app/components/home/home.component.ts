import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  displayedColumns: string[] = ['col1', 'col2', 'col3'];
  dataSource = cols;

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '500px',
      maxHeight:"85vh",
      height:"820px"
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

}

const cols = [
  {col1:"Duration",col2:"1 Month Plan",col3:"3 Months Plan"},
  {col1:"Classes",col2:"1 hour session every day",col3:"1 hour session every day"},
  {col1:"Course",col2:`Choose one.
  <ol>
    <li>JavaScript</li>
    <li>Angular</li>
    <li>React JS</li>
    <li>NodeJs+MongoDb</li>
    <li>Java</li>
  </ol>
  `,col3:`Full stack. Choose one.
  <ol>
    <li>MEAN stack</li>
    <li>MERN stack</li>
    <li>Java + Angular or React JS</li>
  </ol>
  `},
  {col1:"Soft skills",col2:"No",col3:"Yes"},
  {col1:"Data structures",col2:"No",col3:"Yes"},
  {col1:"Certification",col2:"Yes",col3:"Yes"},
  {col1:"Placement assistance",col2:"Yes",col3:"Soft skills development+Mock interviews with Industry experts"},
  {col1:"Fees",col2:"Rs. 12000/-",col3:"Rs. 35000/-"},
]

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];