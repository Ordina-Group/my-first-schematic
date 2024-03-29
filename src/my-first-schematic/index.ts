import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function myFirstSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log(`Hello ${_options.name || 'FamiliarNameMissing'}!`);
    tree.create('hello.txt', `Hello ${_options.name || 'FamiliarNameMissing'}!`);
    return tree;
  };
}
