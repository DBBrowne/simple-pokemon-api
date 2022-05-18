const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: '16',
      },
    },
  ],
]

const env = {
  debug: {
    sourceMaps: 'inline',
    retainLines: true,
  },
}

module.exports =  { presets, env }
