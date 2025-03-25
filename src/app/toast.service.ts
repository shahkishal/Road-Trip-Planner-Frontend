import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showMessage(message: string) {
    const toast = document.createElement('div');
    toast.classList.add(
      'toast',
      'show',
      'position-fixed',
      'top-0',
      'end-0',
      'm-3',
      'p-3',
      'bg-dark',
      'text-white'
    );
    toast.style.zIndex = '1050';
    toast.innerHTML = `
        <div class="d-flex align-items-center">
        <span>${message}</span>
        <button type="button" class="btn-close btn-close-white ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
        `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
