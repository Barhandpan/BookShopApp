import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SharedModule } from '../Shared/shared.module';
import { SearchModule } from './Components/search/search.module';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    HeaderComponent,FooterComponent,
  ],
  imports: [
    CommonModule,SharedModule,SearchModule
  ],
  providers: [AuthGuard],
  exports: [ HeaderComponent,
    FooterComponent
    ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    if(parentModule){
      throw new Error('CoreModule is already loaded, import the module only in the AppModule')
    }
  }
 }
