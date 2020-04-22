import { strings } from '@angular-devkit/core';
import { apply, mergeWith, Rule, template, url, Tree, SchematicsException, SchematicContext, move } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';

interface Schema {
  name: string;
  props: string;
  project?: string;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rxjsStorage(_options: Schema): Rule {
  return copyFiles(_options);
}

function copyFiles(_options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const { name, path } = getPath(tree, _options);
    const sourceTemplates = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        props: _options.props.split(',')
          .filter((prop: string) => !!prop.trim())
          .map((prop: string) => prop.split(':').map(value => value.trim())),
        name
      }),
      move(path)
    ]);
    return mergeWith(sourceParameterizedTemplates)(tree, context);
  }
}

function getPath(tree: Tree, _options: Schema) {
  const workspaceConfigBuffer = tree.read('angular.json');
  if (!workspaceConfigBuffer) {
    throw new SchematicsException("Not an Angular CLI workspace");
  }
  const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
  const project = workspaceConfig.projects[_options.project || workspaceConfig.defaultProject];
  const defaultProjectPath = buildDefaultPath(project);
  return parseName(defaultProjectPath, _options.name);
}
