module.exports = function(plop) {
  plop.setGenerator('Page', {
    description: 'create page',
    prompts: [{
      name: 'name',
      message: 'Page name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'pages/{{dashCase name}}/index.tsx',
        templateFile: 'plop-templates/page.hbs',
      },
      {
        type: 'add',
        path: 'pages/{{dashCase name}}/index.module.scss',
        templateFile: 'plop-templates/component-style.hbs',
      },
    ],
  })

  plop.setGenerator('Function + CSS', {
    description: 'two files',
    prompts: [{
      name: 'name',
      message: 'Component name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'components/{{name}}/index.tsx',
        templateFile: 'plop-templates/functional-css.hbs',
      },
      {
        type: 'add',
        path: 'components/{{name}}/index.module.scss',
        templateFile: 'plop-templates/component-style.hbs',
      },
    ],
  })

  plop.setGenerator('Function', {
    description: 'include style jsx',
    prompts: [{
      name: 'name',
      message: 'Component name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'components/{{name}}.tsx',
        templateFile: 'plop-templates/functional-index.hbs',
      },
    ],
  })

  plop.setGenerator('Context', {
    description: 'react context',
    prompts: [{
      name: 'name',
      message: 'Context name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'context/{{snakeCase name}}_state.tsx',
        templateFile: 'plop-templates/context.hbs',
      },
    ],
  })

  plop.setGenerator('Svg', {
    description: 'svg component',
    prompts: [{
      name: 'name',
      message: 'Component name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'components/svg/{{ properCase name }}Svg.tsx',
        templateFile: 'plop-templates/svg.hbs',
      },
    ],
  })
}
