import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule
  ],
  exports: [
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
  ],
})
export class MaterialModule { }
