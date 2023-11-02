import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  let sellerService = inject(SellerService)
  
  return sellerService.isSellerLoggedIn;
};