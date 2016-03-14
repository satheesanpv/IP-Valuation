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
                    required: 'required',
                    helpText: 'Fixed Assets/ Buildings/Machinery etc in INR'
                },
                {
                    type: 'number',
                    name: 'ifc',
                    step: 0.01,
                    label: 'Incremental Fixed Costs',
                    filter: 'currency',
                    methods: ['cost method'],
                    helpText: 'Costs incurred if an already established equipment\'s/machinery had been used for R&D.'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'pp',
                    label: 'Price/Unit of Closly Compiting Product',
                    filter: 'currency',
                    methods: ['market method'],
                    helpText: 'Similar existing competing product price in INR'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'pp',
                    label: 'Product Price (Per Unit)*',
                    filter: 'currency',
                    methods: ['royalty method', 'profit split method'],
                    helpText: 'Expected product price in INR'
                },

                {
                    type: 'number',
                    step: 0.01,
                    name: 'sv',
                    label: 'Units Sold Annualy*',
                    filter: 'number',
                    methods: ['market method'],
                    required: 'required',
                    helpText: 'Expected Sales Volume of similar competing product similar product sales volume'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'sv',
                    label: 'Sales Volumn*',
                    filter: 'number',
                    methods: ['royalty method', 'profit split method'],
                    required: 'required',
                    helpText: 'Expected Sales Volume of product annually'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'r',
                    label: 'Revenue *',
                    filter: 'currency',
                    methods: ['market method', 'royalty method', 'profit split method'],
                    helpText: 'Expected Revenue of the product annually'
                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 'p',
                    label: 'Expected Profits (in Percentage)',
                    filter: 'percentage',
                    methods: ['cost method', 'market method'],
                    helpText: 'Margin expected as profits (In percentage)'
                },
                {
                    type: 'number',
                    step: 1,
                    max: 5,
                    min: 0,
                    name: 'yr',
                    label: 'Expected Life of Technology',
                    methods: ['royalty method', 'market method', 'profit split method'],
                    helpText: 'Value in years'
                },
                {
                    type: 'number',
                    step: 0.1,
                    name: 'dr',
                    label: 'Discount Rate (%)',
                    methods: ['royalty method', 'market method'],
                    filter: 'percentage',
                    helpText: 'Prevailing Bank rate/Discount rate'
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'adc',
                    label: 'Administration Cost (yearly %)',
                    filter: 'percentage',
                    methods: ['market method'],
                    helpText: 'Costs incurred for administration purposes'
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 100,
                    name: 'it',
                    label: 'Income Tax (per year %)',
                    filter: 'percentage',
                    methods: ['royalty method', 'market method'],
                    helpText: 'At Institute Level if any tax paid (in percentage)'
                },
                {
                    type: 'select',
                    name: 'expectedGrowth',
                    label: 'Expected Sales Growth',
                    options: ['Business as Usual', 'Slow pace of technology adoption', 'Upside scenario', 'Manual'],
                    methods: ['royalty method', 'market method', 'profit split method'],
                    helpText: 'Expected sales growth of the product yearly'
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
                    required: 'required',
                    helpText: 'Value in percentage'
                },
                {
                    type: 'select',
                    name: 'pricingStratagy',
                    label: 'Choice of pricing Strategy',
                    options: ['Same as competing product', 'Skimming', 'Penetrating', 'Manual'],
                    methods: ['royalty method', 'market method', 'profit split method'],
                    helpText: 'Expected change in price of the product yearly'
                },
                {
                    type: 'number',
                    step: 0.01,
                    min: 0,
                    max: 200,
                    name: 'pr',
                    label: 'Pricing Factor (%)',
                    filter: 'percentage',
                    methods: ['royalty method', 'market method', 'profit split method'],
                    required: 'required',
                    helpText: 'Value in percentage. If the price of the product is x then next year product price will be x*(pf/100)'
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
                    filter: 'percentage',
                    helpText: 'Depreciation Rate of the Equipment\'s/machinery used for R&D. Rates Assumed for the equipments/machineries used. In Percentage'
                }, {
                    type: 'number',
                    step: 0.01,
                    name: 'oc',
                    label: 'Operating Expense( Value per year)',
                    filter: 'currency',
                    helpText: 'Expenses Incurred for the Day to Day activities. One Time value in INR'

                },
                {
                    type: 'number',
                    step: 0.01,
                    name: 's',
                    label: 'Salary',
                    filter: 'currency',
                    helpText: 'Expenses incurred as salaries to all associated Staff. Per Annum values in INR'
                },
                {
                    type: 'number',
                    step: 1,
                    name: 't',
                    label: 'Time spent on R&D (in months)',
                    helpText: 'Time spent on development of the IP/Technology. Value in Months'
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
                    filter: 'percentage',
                    helpText: 'Expressed as percentage of Revenue'
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
                    filter: 'percentage',
                    helpText: 'Profit split rate[ 1:3 = 25% (1/(3+1))]'
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