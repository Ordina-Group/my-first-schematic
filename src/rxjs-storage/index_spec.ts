import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const runner = new SchematicTestRunner('schematics', collectionPath);
let appTree: UnitTestTree;

describe('rxjs-storage', () => {
  beforeEach(async () => {
    appTree = runner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      { name: 'test-workspace', version: '9' }
    );
    appTree = await runner.runExternalSchematicAsync(
      '@schematics/angular',
      'application',
      { name: 'test-app' },
      appTree
    ).toPromise();
    appTree = await runner.runExternalSchematicAsync(
      '@schematics/angular',
      'library',
      { name: 'test-lib' },
      appTree
    ).toPromise();
  })

  it('should add the files to the app tree', () => {

    const tree = runner.runSchematic('rxjs-storage', { name: 'myTest' }, appTree.branch());

    const appFiles = tree.files.filter(file => file.startsWith('/test-app/src/app'));
    expect(appFiles).toContain('/test-app/src/app/+state/my-test/my-test-state.ts');
    expect(appFiles).toContain('/test-app/src/app/+state/my-test/my-test-storage.service.spec.ts');
    expect(appFiles).toContain('/test-app/src/app/+state/my-test/my-test-storage.service.ts');
    expect(appFiles).toContain('/test-app/src/app/domain/my-test.ts');
  });

  it('should add the files to a subdirectory of the app tree', () => {

    const tree = runner.runSchematic('rxjs-storage', { name: 'this/is/myTest' }, appTree.branch());

    const appFiles = tree.files.filter(file => file.startsWith('/test-app/src/app'));
    expect(appFiles).toContain('/test-app/src/app/this/is/+state/my-test/my-test-state.ts');
    expect(appFiles).toContain('/test-app/src/app/this/is/+state/my-test/my-test-storage.service.spec.ts');
    expect(appFiles).toContain('/test-app/src/app/this/is/+state/my-test/my-test-storage.service.ts');
    expect(appFiles).toContain('/test-app/src/app/this/is/domain/my-test.ts');
  });

  it('should add the files to the lib tree', () => {

    const tree = runner.runSchematic('rxjs-storage', { name: 'myTest', project: 'test-lib' }, appTree.branch());

    const libFiles = tree.files.filter(file => file.startsWith('/test-lib/src/lib'));
    expect(libFiles).toContain('/test-lib/src/lib/+state/my-test/my-test-state.ts');
    expect(libFiles).toContain('/test-lib/src/lib/+state/my-test/my-test-storage.service.spec.ts');
    expect(libFiles).toContain('/test-lib/src/lib/+state/my-test/my-test-storage.service.ts');
    expect(libFiles).toContain('/test-lib/src/lib/domain/my-test.ts');
  });

  it('should add the properties to the domain model', () => {
    const tree = runner.runSchematic('rxjs-storage', { name: 'myTest', props: 'latitude:string,longitude:string' }, appTree.branch());

    const fileContent = tree.read('/test-app/src/app/domain/my-test.ts')?.toString();
    expect(fileContent).toContain('latitude: string;');
    expect(fileContent).toContain('longitude: string;');
  })
});
