import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {MaterialModule,
MdToolbarModule,
MdButtonModule} from '@angular/material';
import {ROUTES} from './app.routes';
import {ModelComponent} from './routes/model/model.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DecisionTreeComponent } from './routes/model/decision-tree/decision-tree.component';
import { ConfusionMatrixComponent } from './routes/model/confusion-matrix/confusion-matrix.component';
import { FeatureRelevanceComponent } from './routes/model/feature-relevance/feature-relevance.component';
import { ModelRulesComponent } from './routes/model/model-rules/model-rules.component';
import {ServicesModule} from './shared/services/services.module';
import {HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    ModelComponent,
    DecisionTreeComponent,
    ConfusionMatrixComponent,
    FeatureRelevanceComponent,
    ModelRulesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: false,
      preloadingStrategy: PreloadAllModules
    }),
    MaterialModule,
    MdToolbarModule,
    MdButtonModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
