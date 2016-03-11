'use strict';

/**
 * @ngdoc service
 * @name ipValuationApp.config
 * @description
 * # config
 * Service in the ipValuationApp.
 */
angular.module('ipValuationApp')
    .constant('configuration', {
        apiBase: 'http://localhost/ip/api',
        technologies: [{
            name: 'Agriculture Engineering & ICT',
            types: ['Machinery and Farm Equipments', 'Post Harvest processes and Products', 'Renewable Energy Gadgets', 'Irrigation and Water Management Equipments', 'Electronics', 'Softwares and DSS']
        }, {
            name: 'Animal Science',
            types: ['Animal Genetic Resources', 'Animal Production and Health', 'Animal Products Technology', 'Diagnostics and Vaccines']
        }, {
            name: 'Fisheries',
            types: ['Fish seed Production', '	Fish Nutrition', 'Fish based food products', 'Fish based Biochemistry technologies']
        }, {
            name: 'Horticulture',
            types: ['Plant varieties', 'Crop Production and Propagation Technologies', 'Crop Protection technologies', 'Post Harvest and processing Technology']
        }, {
            name: 'Crop Science',
            types: ['Plant varities', 'Crop Production and Propagation Technologies', 'Crop Protection technologies', 'Post Harvest and processing Technology']
        }, {
            name: 'Other',
            types: []
        }],
        growthRate: {
            'Business as Usual': 100.01,
            'Slow pace of technology adoption': 100.1,
            'Upside scenario': 101
        },

        priceRate: {
            'Same as competing product': 100,
            'Skimming': 110,
            'Penetrating': 90
        },
        inputFields: {
            'common': [
                {
                    type: 'number',
                    step: 0.01,
                    name: 'fcr',
                    label: 'Fixed costs specific to R&D*',
                    filter: 'currency',
                    methods: ['cost method'],
                    required: 'required'
                },
                {
                    type: 'number',
                    name: 'ifc',
                    step: 0.01,
                    label: 'Incremental Fixed Costs',
                    filter: 'currency',
                    methods: ['cost method'],
                    helpText: 'This is Incremenat Fixed cost'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'pp',
                    label: 'Price/Unit of Closly Compiting Product',
                    filter: 'currency',
                    methods: ['market method']
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'pp',
                    label: 'Product Price (Per Unit)*',
                    filter: 'currency',
                    methods: ['royalty method', 'profit split method'],
                    required: 'required'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'sv',
                    label: 'Sales Volume (Annual)*',
                    filter: 'number',
                    methods: ['royalty method', 'market method', 'profit split method'],
                    required: 'required'
                },

                {
                    type: 'number',
                    step: 0.01,
                    name: 'p',
                    label: 'Expected Profits (in Percentage)',
                    filter: 'percentage',
                    methods: ['cost method', 'market method']
                },
                {
                    type: 'number',
                    step: 1,
                    max: 5,
                    min: 0,
                    name: 'yr',
                    label: 'Expected Life of Technology',
                    methods: ['royalty method', 'market method', 'profit split method']
                },
                {
                    type: 'number',
                    step: 0.1,
                    name: 'dr',
                    label: 'Discount Rate (%)',
                    methods: ['royalty method', 'market method'],
                    filter: 'percentage',
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'adc',
                    label: 'Administration Cost (yearly %)',
                    filter: 'percentage',
                    methods: ['royalty method', 'market method']
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'it',
                    label: 'Income Tax (per year %)',
                    filter: 'percentage',
                    methods: ['royalty method', 'market method']
                },
                {
                    type: 'select',
                    name: 'expectedGrowth',
                    label: 'Expected Sales Growth',
                    options: ['Business as Usual', 'Slow pace of technology adoption', 'Upside scenario', 'Manual'],
                    methods: ['royalty method', 'market method', 'profit split method']
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 200,
                    name: 'g',
                    label: 'Growth Rate (%)',
                    filter: 'percentage',
                    methods: ['royalty method', 'market method', 'profit split method'],
                    required: 'required'
                },
                {
                    type: 'select',
                    name: 'pricingStratagy',
                    label: 'Choice of pricing Strategy',
                    options: ['Same as competing product', 'Skimming', 'Penetrating', 'Manual'],
                    methods: ['royalty method', 'market method', 'profit split method'],
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 200,
                    name: 'pr',
                    label: 'Price Rate (%)',
                    filter: 'percentage',
                    methods: ['royalty method', 'market method', 'profit split method'],
                    required: 'required'
                },
            ],
            'cost method': [
                {
                    type: 'number',
                    name: 'fxa',
                    label: 'Fixed assets used for R&D',
                    filter: 'currency'
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'd',
                    label: 'Depreciation rate (%)',
                    filter: 'percentage'
                }, {
                    type: 'number',
                    step: 0.01,
                    name: 'oc',
                    label: 'Operating Costs( Value per year)',
                    filter: 'currency'

                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 's',
                    label: 'Salary',
                    filter: 'currency'
                },
                {
                    type: 'number',
                    step: 1,
                    name: 't',
                    label: 'Time spent on R&D (in months)'
                },
                {
                    type: 'number',
                    step: 1,
                    name: 'op',
                    label: 'No. of Outputs from R&D'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'oh',
                    label: 'Overheads (if any)',
                    filter: 'currency'
                },

        ],
            'market method': [],
            'royalty method': [
                {
                    type: 'number',
                    step: 0.01,
                    name: 'ry',
                    label: 'Royalty Rate (%)',
                    filter: 'percentage'
                }
            ],
            'profit split method': [
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'psh',
                    label: 'Profit Share(%)',
                    filter: 'percentage'
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'opx',
                    label: 'Operating Expenses(%)',
                    filter: 'percentage'
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'ifx',
                    label: 'Incremental Fixed Costs(%)',
                    filter: 'percentage'
                }
            ]
        }

    });