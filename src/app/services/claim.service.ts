import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../models/claim.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  //url backend
  //metodos get, post, put, delete etc

  private apiUrl = 'http://localhost:8080/claims';

  constructor(private http: HttpClient) { 

 
  }


  getAll() {
    return this.http.get<Claim[]>(`${this.apiUrl}/get-all-claims`);

  }

  getClaimById(id: string) {
    return this.http.get<Claim>(`${this.apiUrl}/get-claim-by-id/${id}`);
  }

  getClaimsByClientId(idClient: string) {
    return this.http.get<Claim[]>(`${this.apiUrl}/get-claims-by-client/${idClient}`);
  }

  saveClaim(claim: Claim) {
    return this.http.post<Claim>(`${this.apiUrl}/save-claim`, claim);
  }

  updateClaim(claim: Claim) {
    return this.http.put<Claim>(`${this.apiUrl}/update-claim`, claim);
  }







}

