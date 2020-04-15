import { mergeWith, Rule, url } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rxjsStorage(_options: any): Rule {
  return copyFiles();
}

function copyFiles(): Rule {
  const sourceTemplates = url('./files');
  return mergeWith(sourceTemplates);
}