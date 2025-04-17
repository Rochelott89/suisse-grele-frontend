import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClaimService } from '../../services/claim.service';
import { Claim } from '../../models/claim.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], //importante
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css'

})

//FormBuilder for constructor
//ReactiveFormsModule en imports de @Component
//FormGroup para atributo que reemplaza a la entity


export class ClaimComponent implements OnInit {

  //reemplaza hacer un claim : Claim porque estamos creando un form
  claimForm: FormGroup;

  claims: Claim[] = [];

  selectedClaimId: string = '';
  loading: boolean = false;
  errorMessage: string = '';



  constructor(private claimService: ClaimService, private formBuilder: FormBuilder) {

  
     // Initialize form with validation, each attribute 
     this.claimForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      damage_type: ['', Validators.required],
      client_id: ['', Validators.required],
      contract_id: ['', Validators.required]
    });
  }

  //load all claims
  ngOnInit(): void {
    this.getClaims();  
  }

  getClaims() {
    this.loading = true;
    this.claimService.getAll().subscribe({
      next: (claims) => {
        this.claims = claims;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching claims:', error);
        this.errorMessage = 'Error loading claims';
        this.loading = false;
      }
    });
  }

  getClaimById(id: string) {
    this.loading = true;
    this.claimService.getClaimById(id).subscribe({
      next: (claim) => {
        // Instead of this.claim = claim, we use patchValue
        this.claimForm.patchValue({
          title: claim.title,
          description: claim.description,
          damage_type: claim.damage_type,
          client_id: claim.client_id,
          contract_id: claim.contract_id
        });
        this.selectedClaimId = claim.id;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching claim:', error);
        this.errorMessage = 'Error loading claim details';
        this.loading = false;
      }
    });
  }

  
  createNewClaim() {
    this.claimForm.reset();  // Instead of this.claim = new Claim()
    this.selectedClaimId = '';
    this.errorMessage = '';
  }
  

  

  //ITS A SELECT for the current mark that we will work with
  //spread operator is better than this.claim = claim
  //we create a new object with a copy of all properties
  //we prevent modifying the original claim in the claims array
  //maintains inmutability
  editClaim(claim: Claim) {
    // Instead of this.claim = {...claim}
    this.claimForm.patchValue({
      title: claim.title,
      description: claim.description,
      damage_type: claim.damage_type,
      client_id: claim.client_id,
      contract_id: claim.contract_id
    });
    this.selectedClaimId = claim.id;
    this.errorMessage = '';
  }

  // deleteClaim(id: string) {
  //   if (confirm('Are you sure you want to delete this claim?')) {
  //     this.loading = true;
  //     this.claimService.deleteClaim(id).subscribe({
  //       next: () => {
  //         this.getClaims();
  //         if (this.selectedClaimId === id) {
  //           this.createNewClaim();
  //         }
  //         this.loading = false;
  //       },
  //       error: (error) => {
  //         console.error('Error deleting claim:', error);
  //         this.errorMessage = 'Error deleting claim';
  //         this.loading = false;
  //       }
  //     });
  //   }
  // }

  //SAVE OR UPDATE 
  //remember that id will be empty if we are creating a new claim
  onSubmit() {
    if (this.claimForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      // Create a new Claim object from form values
      const claim = new Claim();
      Object.assign(claim, this.claimForm.value);
      if (this.selectedClaimId) {
        claim.id = this.selectedClaimId;
      }

      const request$ = claim.id 
        ? this.claimService.updateClaim(claim)
        : this.claimService.saveClaim(claim);

      request$.subscribe({
        next: (savedClaim) => {
          this.getClaims();
          if (!this.selectedClaimId) {
            this.createNewClaim();
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error processing claim:', error);
          this.errorMessage = 'Error saving claim';
          this.loading = false;
        }
      });
    }
  }

  // Optional: Methods for handling form state
  isFormValid(): boolean {
    return this.claimForm.valid && 
           this.claimForm.get('title')?.value.trim() !== '' && 
           this.claimForm.get('description')?.value.trim() !== '' && 
           this.claimForm.get('damage_type')?.value.trim() !== '' &&
           this.claimForm.get('client_id')?.value.trim() !== '' &&
           this.claimForm.get('contract_id')?.value.trim() !== '';
  }
  
  resetForm() {
    if (confirm('Are you sure you want to reset the form?')) {
      this.createNewClaim();
    }
  }


  getClaimsByClient(clientId: string) {
    this.loading = true;
    this.claimService.getClaimsByClientId(clientId).subscribe({
      next: (claims) => {
        this.claims = claims;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching client claims:', error);
        this.errorMessage = 'Error loading client claims';
        this.loading = false;
      }
    });
  }
}
