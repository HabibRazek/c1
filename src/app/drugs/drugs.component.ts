import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Drugservice } from '../services/drug.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css'],
})
export class DrugsComponent implements OnInit {
  drugs!: any[];

  constructor(
    public drugService: Drugservice,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.drugService.listeDrugs().subscribe((drug) => {
      console.log(drug);
      this.drugs = drug;
    });
  }

  chargerDrugs() {
    this.drugService.listeDrugs().subscribe(drugs => {
      this.drugs = drugs;
    });
  }

  supprimerDrug(d: number) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.drugService.supprimerDrug(d).subscribe(() => {
      console.log('Drug supprimé');
      this.chargerDrugs();
    });
  }
}
