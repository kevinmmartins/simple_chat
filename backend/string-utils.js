"use strict";
const htmlEntities = (str) => String(str)
.replace(/&/g, '&amp;').replace(/</g, '&lt;')
.replace(/>/g, '&gt;').replace(/"/g, '&quot;');
exports.htmlEntities= htmlEntities;