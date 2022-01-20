const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerTransform({
    name: 'sizes/px',
    type: 'value',
    matcher: (token) => ['spacing', 'fontSize', 'fontSizes', 'borderRadius', 'borderWidth', 'sizing', 'letterSpacing', 'paragraphSpacing'].includes(token.type),
    transformer: function(token) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(token.original.value) + 'px';
    }
    });

function buildLightTheme(theme) {
  return {
    "source": [
      `tokens/global.json`,
      `tokens/light.json`,
    ],
    "platforms": {
      "json": {
        "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px"],
        "buildPath": `output/`,
        "files": [{
            "destination": `light.json`,
            "format": "json/nested",
            "selector": `.${theme}-theme`
          },
        ]
      }
    }
  };
}

function buildDarkTheme(theme) {
  return {
    "source": [
      `tokens/global.json`,
      `tokens/dark.json`,
    ],
    "platforms": {
      "json": {
        "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px"],
        "buildPath": `output/`,
        "files": [{
            "destination": `dark.json`,
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

['global', 'dark', 'light'].map(function (theme) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}]`);

    const StyleDictionaryLight = StyleDictionaryPackage.extend(buildLightTheme(theme));
    const StyleDictionaryDark = StyleDictionaryPackage.extend(buildDarkTheme(theme));

    // StyleDictionary.buildPlatform('web');
    StyleDictionaryLight.buildAllPlatforms();
    StyleDictionaryDark.buildAllPlatforms();

    console.log('\nEnd processing');
})

console.log('\n==============================================');
console.log('\nBuild completed!');