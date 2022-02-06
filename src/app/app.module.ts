import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutLoginComponent } from './components/layout-login/layout-login.component';
import { RegistreComponent } from './components/registre/registre.component';
import { LayoutRegistreComponent } from './components/layout-registre/layout-registre.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { TechnicienComponent } from './superadmin/technicien/technicien.component';
import { AdminsComponent } from './superadmin/admins/admins.component';
import { StatistiqueComponent } from './superadmin/statistique/statistique.component';
import { EmployeeComponent } from './superadmin/employee/employee.component';
import { EmployeeListComponent } from './superadmin/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './superadmin/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './superadmin/employee-update/employee-update.component';
import { EmployeeViewComponent } from './superadmin/employee-view/employee-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { TechnicienCreateComponent } from './superadmin/technicien-create/technicien-create.component';
import { TechnicienUpdateComponent } from './superadmin/technicien-update/technicien-update.component';
import { TechnicienViewComponent } from './superadmin/technicien-view/technicien-view.component';
import { AdminCreateComponent } from './superadmin/admin-create/admin-create.component';
import { AdminUpdateComponent } from './superadmin/admin-update/admin-update.component';
import { AdminViewComponent } from './superadmin/admin-view/admin-view.component';

import { ProfilComponent } from './profil/profil.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { DemandeinterventionCreateComponent } from './demandes/demandeintervention-create/demandeintervention-create.component';
import { DemandeinterventionUpdateComponent } from './demandes/demandeintervention-update/demandeintervention-update.component';
import { DemandeinterventionViewComponent } from './demandes/demandeintervention-view/demandeintervention-view.component';
import { DemandeinterventionListComponent } from './demandes/demandeintervention-list/demandeintervention-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InterventionCreateComponent } from './intervention/intervention-create/intervention-create.component';
import { InterventionUpdateComponent } from './intervention/intervention-update/intervention-update.component';
import { InterventionViewComponent } from './intervention/intervention-view/intervention-view.component';
import { InterventionListComponent } from './intervention/intervention-list/intervention-list.component';
import { DemandeTraiterComponent } from './demandes/demande-traiter/demande-traiter.component';
import { DemandeNonTraiterComponent } from './demandes/demande-non-traiter/demande-non-traiter.component';
import { DetaildemandeNonTraiterComponent } from './demandes/detaildemande-non-traiter/detaildemande-non-traiter.component';
import { CreateEquipementComponent } from './equipement/create-equipement/create-equipement.component';
import { UpdateEquipementComponent } from './equipement/update-equipement/update-equipement.component';
import { ListeEquipementComponent } from './equipement/liste-equipement/liste-equipement.component';
import { ViewEquipementComponent } from './equipement/view-equipement/view-equipement.component';
import { ViewPiecesComponent } from './pieces/view-pieces/view-pieces.component';
import { UpdatePiecesComponent } from './pieces/update-pieces/update-pieces.component';
import { ListPiecesComponent } from './pieces/list-pieces/list-pieces.component';
import { CreatePiecesComponent } from './pieces/create-pieces/create-pieces.component';
import { CreateFournisseurComponent } from './fournisseur/create-fournisseur/create-fournisseur.component';
import { UpdateFournisseurComponent } from './fournisseur/update-fournisseur/update-fournisseur.component';
import { ListeFournisseurComponent } from './fournisseur/liste-fournisseur/liste-fournisseur.component';
import { ViewFournisseurComponent } from './fournisseur/view-fournisseur/view-fournisseur.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FilterPipe } from './filter.pipe';
import { CreateOrdreComponent } from './ordre/create-ordre/create-ordre.component';
import { ListOrdreInterventionComponent } from './ordre/list-ordre-intervention/list-ordre-intervention.component';
import { ViewOrdreInterventionComponent } from './ordre/view-ordre-intervention/view-ordre-intervention.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateFilterPipe } from './date-filter.pipe';
import { OrdreFilterPipe } from './ordre-filter.pipe';
import { ChartsModule } from 'ng2-charts';
import { OrdreTraiteComponent } from './ordre/ordre-traite/ordre-traite.component';
import { OrdreNonTraiteComponent } from './ordre/ordre-non-traite/ordre-non-traite.component';
import { MessagerieComponent } from './ordre/messagerie/messagerie.component';
import { OrdreTechComponent } from './ordre/ordre-tech/ordre-tech.component';
import { DetailOrdreComponent } from './ordre/detail-ordre/detail-ordre.component';
import { ServiceComponent } from './service/service/service.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
import { RapportComponent } from './intervention/rapport/rapport.component';
import { DemandeEmployeeComponent } from './demandes/demande-employee/demande-employee.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DateordrePipe } from './dateordre.pipe';
import { DemandeEmpolyeeTraiterComponent } from './demandes/demande-empolyee-traiter/demande-empolyee-traiter.component';
 import { UpdateOrdreComponent } from './ordre/update-ordre/update-ordre.component';
 import { HistoryComponent } from './components/history/history.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ModifierlistpieceComponent } from './intervention/modifierlistpiece/modifierlistpiece.component';
import { DetailComponent } from './notification/detail/detail.component';
 
/* const config: NgxSailsConfig = {
  uri: 'http://localhost:1337/',
  // socket.io options
  options: {
         transports: ['polling', 'websocket'],
         autoConnect:false,
       
  },
  // default headers
  headers: {
  
  }
} */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    LayoutComponent,
    LayoutLoginComponent,
    RegistreComponent,
    LayoutRegistreComponent,
    TechnicienComponent,
    AdminsComponent,
    StatistiqueComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    EmployeeViewComponent,
    TechnicienCreateComponent,
    TechnicienUpdateComponent,
    TechnicienViewComponent,
    AdminCreateComponent,
    AdminUpdateComponent,
    AdminViewComponent,
    ProfilComponent,
    ModifierProfilComponent,
    DemandeinterventionCreateComponent,
    DemandeinterventionUpdateComponent,
    DemandeinterventionViewComponent,
    DemandeinterventionListComponent,
    InterventionCreateComponent,
    InterventionUpdateComponent,
    InterventionViewComponent,
    InterventionListComponent,
    DemandeTraiterComponent,
    DemandeNonTraiterComponent,
    DetaildemandeNonTraiterComponent,
    CreateEquipementComponent,
    UpdateEquipementComponent,
    ListeEquipementComponent,
    ViewEquipementComponent,
    ViewPiecesComponent,
    UpdatePiecesComponent,
    ListPiecesComponent,
    CreatePiecesComponent,
    CreateFournisseurComponent,
    UpdateFournisseurComponent,
    ListeFournisseurComponent,
    ViewFournisseurComponent,
    SearchFilterPipe,
    FilterPipe,
    CreateOrdreComponent,
    ListOrdreInterventionComponent,
    ViewOrdreInterventionComponent,
    DateFilterPipe,
    OrdreFilterPipe,
    OrdreTraiteComponent,
    OrdreNonTraiteComponent,
    MessagerieComponent,
    OrdreTechComponent,
    DetailOrdreComponent,
    ServiceComponent,
    CreateServiceComponent,
    UpdateServiceComponent,
    RapportComponent,
    DemandeEmployeeComponent,
    DateordrePipe,
    DemandeEmpolyeeTraiterComponent,
    UpdateOrdreComponent,
    HistoryComponent,
    HistoriqueComponent,
    ModifierlistpieceComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    ReactiveFormsModule,
    NgbModule  ,
    DataTablesModule,
    FormsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
     ToastrModule.forRoot(),
    NgxPaginationModule,
    ChartsModule,
 

  
  ],
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function socketConfig(socketConfig: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

