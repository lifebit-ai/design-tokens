const StyleDictionary = require("style-dictionary");
const webPath = "output/";
const LDS = "../lds/src/themes/";

const modes = [`light`, `dark`, `old`];

// light/default mode
StyleDictionary.extend({
  source: [
    // this is saying find any files in the tokens folder
    // that does not have .dark or .light, but ends in .json5
    `tokens/**/!(*.${modes.join(`|*.`)}).json`,
  ],
  platforms: {
    css: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [
        {
          destination: `light.json`,
          format: `json/nested`,
          options: {
            // this will keep token references intact so that we don't need
            // to generate *all* color resources for dark mode, only
            // the specific ones that change
            outputReferences: true,
          },
        },
      ],
    },
    //...
  },
}).buildAllPlatforms();

// dark mode
StyleDictionary.extend({
  include: [
    // this is the same as the source in light/default above
    `tokens/**/!(*.${modes.join(`|*.`)}).json`,
  ],
  source: [
    // Kind of the opposite of above, this will find any files
    // that have the file extension .dark.json5
    `tokens/color/dark/*.dark.json`,
  ],
  platforms: {
    css: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [
        {
          destination: `dark.json`,
          format: `json/nested`,
          // only outputting the tokens from files with '.dark' in the filepath
          // filter: (token) => token.filePath.indexOf(`.dark`) > -1,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    //...
  },
}).buildAllPlatforms();

// old styles
StyleDictionary.extend({
  include: [`tokens/**/!(*.${modes.join(`|*.`)}).json`],
  source: [
    `tokens/color/old/*.old.json`,
    `tokens/size/old/*.old.json`,
    `tokens/shadow/old/*.old.json`,
  ],
  platforms: {
    css: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [
        {
          destination: `old.json`,
          format: `json/nested`,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    //...
  },
}).buildAllPlatforms();

// light css variables
StyleDictionary.extend({
  source: [`tokens/**/!(*.${modes.join(`|*.`)}).json`],
  platforms: {
    css: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [
        {
          destination: `variables-light.css`,
          format: `css/variables`,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    //...
  },
}).buildAllPlatforms();

// dark css variables
StyleDictionary.extend({
  include: [`tokens/**/!(*.${modes.join(`|*.`)}).json`],
  source: [`tokens/color/dark/*.dark.json`],
  platforms: {
    css: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [
        {
          destination: `variables-dark.css`,
          format: `css/variables`,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    //...
  },
}).buildAllPlatforms();

// node build

// // light/default mode
// StyleDictionary.extend({
//   source: [
//     // this is saying find any files in the tokens folder
//     // that does not have .dark or .light, but ends in .json5
//     `tokens/**/!(*.${modes.join(`|*.`)}).json`
//   ],
//   platforms: {
//     css: {
//       transformGroup: `web`,
//       buildPath: LDS,
//       files: [{
//         destination: `light.json`,
//         format: `json/nested`,
//         options: {
//           // this will keep token references intact so that we don't need
//           // to generate *all* color resources for dark mode, only
//           // the specific ones that change
//           outputReferences: true
//         }
//       }]
//     },
//     //...
//   }
// }).buildAllPlatforms();

// // dark mode
// StyleDictionary.extend({
//   include: [
//     // this is the same as the source in light/default above
//     `tokens/**/!(*.${modes.join(`|*.`)}).json`
//   ],
//   source: [
//     // Kind of the opposite of above, this will find any files
//     // that have the file extension .dark.json5
//     `tokens/color/dark/*.dark.json`
//   ],
//   platforms: {
//     css: {
//       transformGroup: `web`,
//       buildPath: LDS,
//       files: [{
//         destination: `dark.json`,
//         format: `json/nested`,
//         // only outputting the tokens from files with '.dark' in the filepath
//         // filter: (token) => token.filePath.indexOf(`.dark`) > -1,
//         options: {
//           outputReferences: true
//         }
//       }]
//     },
//     //...
//   }
// }).buildAllPlatforms();

// // old styles
// StyleDictionary.extend({
//   include: [
//     `tokens/**/!(*.${modes.join(`|*.`)}).json`
//   ],
//   source: [
//     `tokens/color/old/*.old.json`, `tokens/size/old/*.old.json`, `tokens/shadow/old/*.old.json`
//   ],
//   platforms: {
//     css: {
//       transformGroup: `web`,
//       buildPath: LDS,
//       files: [{
//         destination: `old.json`,
//         format: `json/nested`,
//         options: {
//           outputReferences: true
//         }
//       }]
//     },
//     //...
//   }
// }).buildAllPlatforms();
