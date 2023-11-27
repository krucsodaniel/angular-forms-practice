import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable()
export class UserSkillsService {
  getSkills() {
    return of(['angular', 'react', 'vue']).pipe(delay(1000));
  }
}
