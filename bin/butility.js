import fs from 'fs';
import path from 'path';
import { minify } from 'terser';
import JavaScriptObfuscator from 'javascript-obfuscator';
import prettier from 'prettier';

const config = JSON.parse(fs.readFileSync("../butility.config.json", "utf-8"));

async function processFiles() {
    const inputFolder = '../classes';
    const outputFolder = config.outputFolder;
    const outputFileName = config.outputFileName;

    let outputContent = '';

    const files = fs.readdirSync(inputFolder);
    for (const file of files) {
        const filePath = path.join(inputFolder, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        outputContent += fileContent + config.mergeSeparator;
    }

    if (config.minify) {
        const minified = await minify(outputContent);
        outputContent = minified.code;
    }

    if (config.obfuscate) {
        const obfuscated = JavaScriptObfuscator.obfuscate(outputContent).getObfuscatedCode();
        outputContent = obfuscated;
    }

    if (config.backupExistingOutput) {
        const existingFilePath = path.join(outputFolder, outputFileName);
        if (fs.existsSync(existingFilePath)) {
            const backupFilePath = path.join(config.backupFolder, outputFileName);
            fs.copyFileSync(existingFilePath, backupFilePath);
        }
    }

    fs.writeFileSync(path.join(outputFolder, outputFileName), outputContent);

    if (config.prettifyOutput) {
        const prettifiedContent = prettier.format(outputContent, config.prettifyOptions);
        fs.writeFileSync(path.join(outputFolder, outputFileName), prettifiedContent);
    }

    if (config.prependBanner) {
        const banner = `/* ${config.bannerText} */\n`;
        const finalContent = banner + fs.readFileSync(path.join(outputFolder, outputFileName), 'utf8');
        fs.writeFileSync(path.join(outputFolder, outputFileName), finalContent);
    }
}

processFiles().catch(console.error);