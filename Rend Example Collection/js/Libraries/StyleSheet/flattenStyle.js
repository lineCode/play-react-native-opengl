/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule flattenStyle
 */
'use strict';

var StyleSheetRegistry = require('StyleSheetRegistry');
var mergeIntoFast = require('mergeIntoFast');

function getStyle(style) {
  if (typeof style === 'number') {
    return StyleSheetRegistry.getStyleByID(style);
  }
  return style;
}

function flattenStyle(style) {
  if (!style) {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return getStyle(style);
  }

  var result = {};
  for (var i = 0; i < style.length; ++i) {
    var computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      mergeIntoFast(result, computedStyle);
    }
  }
  return result;
}

module.exports = flattenStyle;
