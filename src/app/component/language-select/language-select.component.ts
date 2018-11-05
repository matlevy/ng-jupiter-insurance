import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Route, Routes } from '@angular/router';

import { LoggerService } from '../../../modules/logging/logger.service';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  constructor(
    public translation: TranslateService,
    private router: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe(
      (d) => {
        if (d.lang) {
          this.logger.info(this, `Attempted to change language to '${d.lang}' via query parameter 'lang'.`);
          this.translation.use(d.lang);
        } else {
          this.logger.warn('Cannot change language as no language is given in the query parameters.');
        }
      }
    );
  }

  public setLanguage(language: string): void {
    this.logger.info(this, `setLanguage called on LanguageSelect component. Language should be changed to ${language}`);
    this.translation.use(language);
  }

}
