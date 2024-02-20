import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  deferredPrompt: any;

  constructor() {
    // 'beforeinstallprompt' 이벤트 리스너 추가
    window.addEventListener('beforeinstallprompt', (e) => {
      // 기본 설치 프롬프트 방지
      e.preventDefault();
      // 설치 프롬프트를 나중에 트리거하기 위해 이벤트를 저장
      this.deferredPrompt = e;
    });
  }

  addToHomeScreen() {
    // 사용자가 설치 버튼을 클릭하면 프롬프트 표시
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
    }
  }
}
