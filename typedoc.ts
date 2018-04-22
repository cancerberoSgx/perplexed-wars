module.exports = {
  src: [
    './types/reducers',
    './types/state',
    './types/unitActionResolvers',
    './types/util',
    // './node_modules/@types/node/index.d.ts',  
    // './node_modules/redux/index.d.ts'
  ],
  "mode": 'file',
  'includeDeclarations': true,
  'tsconfig': 'tsconfig.json',
  'out': './docs',
  'excludePrivate': true,
  'excludeProtected': true,
  'excludeExternals': true,
  'readme': 'README.md',
  'name': 'perplexed-wars'
}
