import { strings } from '@angular-devkit/core';
import { apply, mergeWith, Rule, template, url } from '@angular-devkit/schematics';

interface Schema {
  name: string;
  props: string;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rxjsStorage(_options: Schema): Rule {
  return copyFiles(_options);
}

function copyFiles(_options: Schema): Rule {
  const sourceTemplates = url('./files');
  const sourceParameterizedTemplates = apply(sourceTemplates, [
    template({
      ..._options,
      ...strings,
      props: _options.props.split(',')
      .filter((prop: string) => !!prop.trim())
      .map((prop: string) => prop.split(':').map(value => value.trim()))
    })
  ]);
  return mergeWith(sourceParameterizedTemplates);
}