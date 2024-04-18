import inquirer from "inquirer";

interface ConversionRates {
    [currency: string]: {
        [currency: string]: number;
    };
}

async function currencyConverter() {
    console.log('-----------------------------');
    console.log('Welcome to Currency Converter');
    console.log('-----------------------------');
    console.log("Pakistan Rupees (PKR)\nUnited States Dollar (USD)\nEuro (EUR)\nBritish Pound Sterling (GBP)\nCanadian Dollar (CAD)");

    const conversionRates: ConversionRates = {
        PKR: { USD: 0.0038, EUR: 0.0035, GBP: 0.0031, CAD: 0.0052 },
        USD: { PKR: 263.16, EUR: 0.92, GBP: 0.78, CAD: 1.36 },
        EUR: { PKR: 285.71, USD: 1.09, GBP: 0.83, CAD: 1.44 },
        GBP: { PKR: 322.58, USD: 1.28, EUR: 1.20, CAD: 1.67 },
        CAD: { PKR: 192.31, USD: 0.74, EUR: 0.69, GBP: 0.60 }
    };

    const { fromCurrency } = await inquirer.prompt([
        {
            name: 'fromCurrency',
            message: `Choose the currency you want to convert from:`,
            type: 'list',
            choices: Object.keys(conversionRates)
        }
    ]);

    const { toCurrency } = await inquirer.prompt([
        {
            name: 'toCurrency',
            message: `Choose the currency you want to convert to:`,
            type: 'list',
            choices: Object.keys(conversionRates[fromCurrency]) 
        }
    ]);

    const { amount } = await inquirer.prompt([
        {
            name: 'amount',
            message: `Enter the amount to be converted:`,
            type: 'number',
        }
    ]);

    const conversionRate = conversionRates[fromCurrency][toCurrency];
    const convertedAmount = amount * conversionRate;

    console.log(`According to April 18, 2024 Exchange Rates`);
    console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(3)} ${toCurrency}`);

    const { anotherConversion } = await inquirer.prompt([
        {
            name: 'anotherConversion',
            message: `Do you want to perform another currency conversion? (Y/N)`,
            type: 'confirm',
        }
    ]);

    if (anotherConversion) {
        currencyConverter();
    } else {
        console.log('Thank you for using Currency Converter.');
    }
}

currencyConverter();
