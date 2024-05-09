"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customDataContainerOptions = exports.categories = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("../../advanced");
exports.categories = [
    {
        label: 'Advanced Options',
        expanded: false,
        members: ['dataComponentAttribute'],
    },
];
exports.customDataContainerOptions = {
    model: component_sdk_1.model('Model', {
        value: '',
        configuration: {},
    }),
    ...advanced_1.advanced('CustomDataContainer'),
};
