 const puppeteer = require('puppeteer');
 const hbs = require('handlebars');
 const fs = require('fs-extra');
 const path = require('path')
 const data = require('./data.json')



    const compile = async  (tamplateName,data) => {

        const filepath = path.join(process.cwd(),'templates',`${tamplateName}.hbs`)
        const html = await fs.readFile(filepath,'utf-8')
        return hbs.compile(html)(data)
     
 };

 (async ()=>{
    try {

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        //await page.setContent('<h1> Hello Users </h1> ')
        const content = await compile('index',data)

        await page.setContent(content);

        await page.pdf({
            path:"output.pdf",
            format:"A4",
            printBackground:true
        })
        console.log("Done.....!");
        console.log("git demo")
            browser.close();
            process.exit();
    } catch (e) {
        console.log(e);
        
    }
 })()
