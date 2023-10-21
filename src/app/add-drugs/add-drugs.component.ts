import { Component, OnInit } from '@angular/core';
import { Drugs } from 'src/model/drugs.model';
import { Drugservice } from '../services/drug.service';
import { DrugClass } from 'src/model/DrugClass.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drugs',
  templateUrl: './add-drugs.component.html',
  styleUrls: ['./add-drugs.component.css'],
})
export class AddDrugsComponent implements OnInit {
  newDrugs = new Drugs();

  DrugClass: any;
  newidcl!: number;
  newDrugClass!: DrugClass;

  dclass!: DrugClass[];


  constructor(private drugService: Drugservice, private router: Router) {
    this.DrugClass = this.drugService.listeDrugClass();
  }

  ngOnInit(): void {
    this.drugService.listeDrugClass().subscribe((drugclass) => {
      console.log(drugclass);
      this.DrugClass = drugclass;
    });
  }



  newDrug = new Drugs();
  addDrug() {
  this.newDrug.drugClass = this.DrugClass.find(
    (item: { idcl: number }) => item.idcl == this.newidcl
  )!;

  this.drugService.ajouterDrug(this.newDrug).subscribe((drug) => {
    console.log(drug);
    // Navigate to /drugs after successful addition
    this.router.navigate(['/drugs']);
  });

  
}




}
