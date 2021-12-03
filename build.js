const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

// StyleDictionaryPackage.registerFormat({
//     name: 'css/variables',
//     formatter: function (dictionary, config) {
//       return `${this.selector} {
//         ${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
//       }`
//     }
//   });  

StyleDictionaryPackage.registerTransform({
    name: 'sizes/px',
    type: 'value',
    matcher: function(token) {
        // You can be more specific here if you only want 'em' units for font sizes    
        return ["fontSizes", "spacing", "borderRadius", "borderWidth", "sizing", "letterSpacing"].includes(token.attributes.category);
    },
    transformer: function(token) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(token.original.value) + 'px';
    }
    });

function getStyleDictionaryConfig(theme) {
  return {
    "source": [
      `tokens/${theme}.json`,
    ],
    "platforms": {
      "web": {
        "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px"],
        "buildPath": `output/`,
        "files": [{
            "destination": `css/${theme}.css`,
            "format": "css/variables",
            "selector": `.${theme}-theme`
          },
        ]
      },
      "json": {
        "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px"],
        "buildPath": `output/`,
        "files": [{
            "destination": `json/${theme}.json`,
            "format": "json/nested",
            "selector": `.${theme}-theme`
          },
        ]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['core', 'dark', 'light'].map(function (theme) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));

    // StyleDictionary.buildPlatform('web');
    StyleDictionary.buildAllPlatforms();

    console.log('\nEnd processing');
})

console.log('\n==============================================');
console.log('\nBuild completed!');