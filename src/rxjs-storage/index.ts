import { strings } from '@angular-devkit/core';
import { apply, mergeWith, Rule, template, url } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rxjsStorage(_options: any): Rule {
  return copyFiles(_options);
}

function copyFiles(_options: any): Rule {
  const sourceTemplates = url('./files');
  const sourceParameterizedTemplates = apply(sourceTemplates, [
    template({
      ..._options,
      ...strings
    })
  ]);
  return mergeWith(sourceParameterizedTemplates);
}