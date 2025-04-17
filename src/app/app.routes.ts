import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimComponent } from './components/claim/claim.component';
import { ContractComponent } from './components/contract/contract.component';
import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [

    { path: '', redirectTo: 'claim', pathMatch: 'full' },
    { path: 'claim', component : ClaimComponent, title : 'Claims Management' },
    {path: 'contract', component: ContractComponent, title: 'Contracts Management'},
    {path :'client', component: ClientComponent, title: 'Clients Management'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
