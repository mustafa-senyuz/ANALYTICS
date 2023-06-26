const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const cmd = require('node-cmd')
const crypto = require('crypto'); // Generate a random file name const 
const path = require('path');
const fs_extra = require('fs-extra');
const exec = require('child_process').exec;
const { promisify } = require("util");
const execPromise = promisify(exec);

const { barchartGreen } = require('./barchartGreenRed');

const { barchartWhite } = require('./barchartRedWhite');

const { piechart } = require('./piechart');




async function pdfcreator(

    company,

    sloganOFfunctionality,
    officeName,
    companylogo,
    datum,
    logo,
    contactpersoninfos,
    bankinfos,
    footnote,
    analysename,
    searchperiod,
    result,
    branch1, branch1value,
    branch2, branch2value,
    branch3, branch3value,
    branch4, branch4value,
    branch5, branch5value,
    /* totalplace, */
    location,

    /* Branchenverteilung google-facebook-instagram usage */
    google_accountholder,
    google_NONaccountholder,
    google_accountholder_graphNAME,

    facebook_accountholder,
    facebook_NONaccountholder,
    facebook_accountholder_graphNAME,

    instagram_accountholder,
    instagram_NONaccountholder,
    instagram_accountholder_graphNAME,

    /* INFORMATIONEN IN DEN GOOGLE BUSINESS PROFILE */
    googleprofil_contactinfosHAVE, googleprofil_contactifosNOThave, googleprofil_chart1name,
    googleprofil_openinghoursHAVE, googleprofil_openinghoursNOThave, googleprofil_chart2name,
    googleprofil_postACtive, googleprofil_postINACTIVE, googleprofil_chart3name,
    googleprofil_descriptionHAVE, googleprofil_descriptionNOThave, googleprofil_chart4name,

    /* INFORMATIONEN IN DEN FACEBOOK PROFILE */
    faceprofil_contactinfosHAVE, faceprofil_contactifosNOThave, faceprofil_chart1name,
    faceprofil_websiteHAVE, faceprofil_websiteNOThave, faceprofil_chart2name,
    faceprofil_servicesHAVE, faceprofil_servicesNOThave, faceprofil_chart3name,
    faceprofil_emailHAVE, faceprofil_emailNOThave, faceprofil_chart4name,
    faceprofil_adressHAVE, faceprofil_adressNOThave, faceprofil_chart5name,
    faceprofil_phoneHAVE, faceprofil_phoneNOThave, faceprofil_chart6name,

    /* INFORMATIONEN IN DEN INSTAGRAM PROFILE */
    instaprofil_contactinfosHAVE, instaprofil_contactifosNOThave, instaprofil_chart1name,
    instaprofil_openinghoursHAVE, instaprofil_openinghoursNOThave, instaprofil_chart2name,
    instaprofil_postACtive, instaprofil_postINACTIVE, instaprofil_chart3name,
    instaprofil_bioHAVE, instaprofil_bioNOThave, instaprofil_chart4name,
    instaprofil_ifIMAGEmore10, instaprofil_ifIMAGEless10, instaprofil_chart5name,

    /* ALLGEMEINE VERGLEICHE */
    /* google my business */
    valuesOFgoogle, areasOFgoogle, google_piechartNAME,
    /* facebook */
    valuesOFfacebook, areasOFfacebook, facebook_piechartNAME,
    /* instagram */
    valuesOFinstagram, areasOFinstagram, instagram_piechartNAME




) {


    branch1value = parseInt(branch1value);
    branch2value = parseInt(branch2value);
    branch3value = parseInt(branch3value);
    branch4value = parseInt(branch4value);
    branch5value = parseInt(branch5value);

    var totalplace = branch1value + branch2value + branch3value + branch4value + branch5value;



    async function buildDATAxml() {

        // Convert the XML document to a string
        const xmlString =
            `<data>
            <firstpage>
                <companylogo    companylogofile="${companylogo}"/>    
                <sloganOFfunctionality>${sloganOFfunctionality}</sloganOFfunctionality>
                <officeName>${officeName}</officeName>
                <datum>Datum des Online-Checks: ${datum}</datum>
                <contactpersoninfos>${contactpersoninfos}</contactpersoninfos>
                <bankinfos>${bankinfos}</bankinfos>
                <footnote>${footnote}</footnote>       
                <logo   logofile="${logo}"  />
            </firstpage>
            <secondpage>
                 <analysename>analysis results ${analysename}    </analysename>
                 <searchperiod>investigation period: ${searchperiod}</searchperiod>
            </secondpage>
            <thirdpage>
                <result>RESULT: ${result} </result>        
                <branch1>${branch1} ,  ${branch1value} </branch1>
                <branch2>${branch2} ,  ${branch2value} </branch2>
                <branch3>${branch3} ,  ${branch3value} </branch3>
                <branch4>${branch4} ,  ${branch4value} </branch4>
                <branch5>${branch5} ,  ${branch5value} </branch5>
                <totalplace>${totalplace}</totalplace>
                <location> ${location}</location>
                <google_accountholder>(${google_accountholder})</google_accountholder>
                <facebook_accountholder>(${facebook_accountholder})</facebook_accountholder>
                <instagram_accountholder>(${instagram_accountholder})</instagram_accountholder>
            </thirdpage>
            <forthpage>
                <googleprofil_contactinfosHAVE>Contact-details(${googleprofil_contactinfosHAVE})</googleprofil_contactinfosHAVE>
                <googleprofil_openinghoursHAVE>Opening-hours(${googleprofil_openinghoursHAVE})</googleprofil_openinghoursHAVE>
                <googleprofil_postACtive>PostAktive(${googleprofil_postACtive}) </googleprofil_postACtive>
                <googleprofil_descriptionHAVE>Beschreibung(${googleprofil_descriptionHAVE}) </googleprofil_descriptionHAVE>
                <faceprofil_contactinfosHAVE>Contact-details(${faceprofil_contactinfosHAVE})</faceprofil_contactinfosHAVE>
                <faceprofil_websiteHAVE>website(${faceprofil_websiteHAVE})</faceprofil_websiteHAVE>
                <faceprofil_servicesHAVE>services(${faceprofil_servicesHAVE}) </faceprofil_servicesHAVE>
                <faceprofil_emailHAVE>email(${faceprofil_emailHAVE})  </faceprofil_emailHAVE>
                <faceprofil_adressHAVE>address(${faceprofil_adressHAVE}) </faceprofil_adressHAVE>
                <faceprofil_phoneHAVE>phone(${faceprofil_phoneHAVE})  </faceprofil_phoneHAVE>
            </forthpage>
            <fifthpage>
                <instaprofil_contactinfosHAVE>Contact-details(${instaprofil_contactinfosHAVE})</instaprofil_contactinfosHAVE>
                <instaprofil_openinghoursHAVE>Opening-hours(${instaprofil_openinghoursHAVE}) </instaprofil_openinghoursHAVE>
                <instaprofil_postACtive>PostAktive(${instaprofil_postACtive})</instaprofil_postACtive>
                <instaprofil_bioHAVE>Biographie(${instaprofil_bioHAVE})  </instaprofil_bioHAVE>
                <instaprofil_ifIMAGEmore10> (${instaprofil_ifIMAGEmore10})  </instaprofil_ifIMAGEmore10>
            </fifthpage>
            <sixthpage>
            </sixthpage>
</data>`;


        // Write the XML string to a file
        fs.writeFileSync(`C:/ANALYTICS/speedata/${company}/${fileName}/data.xml`, xmlString);
        console.log(`in C:/ANALYTICS/speedata/${company}/${fileName} directory  DATA.xml  was built`);

    }



    // CREATE NEW DIRECTORY
    var now = new Date();
    var timestamp = now.getTime(); // Get the number of milliseconds since Jan 1, 1970 
    var randomBytes = crypto.randomBytes(10).toString('hex');
    fileName = `${timestamp}-${randomBytes}`;

    //a new directory for each request    Output: 1617872198123-56c6aae2405361d6885d
    var path = `C:/ANALYTICS/speedata/${company}/${fileName}`;
    fs.mkdir(path, function (e) {
        if (!e || (e && e.code === 'EEXIST')) {
            console.log(fileName + " named folder created...")
        } else {
            //debug
            console.log(e);
        }
    });






    async function copyFonts() {

        // Source directory path
        const sourceDir = 'C:/ANALYTICS/speedata/ZIMA/fonts';
        // Destination directory path
        const destDir = `${path}/fonts`; // IT CREATES AUTOMATİCALLY A DESTİNATİON FOLDER!!!
        // Copy source directory to destination directory
        fs_extra.copySync(sourceDir, destDir);
        console.log('fonts Directory copied successfully!');


    }



    function createDIR(directoryName) {

        var folderPath = `C:/ANALYTICS/speedata/${company}/${fileName}`;                //C:/ANALYTICS/speedata/ZIMA/1681307502675-d220a619c7528b5c8000
        fs.mkdir(folderPath + '/' + directoryName, { recursive: true }, (err) => {      //C:/ANALYTICS/speedata/ZIMA/1681307502675-d220a619c7528b5c8000/images 
            if (err) {
                console.error(err + "THİS FOLDER ALREADY EXİST");
            } else {
                console.log(`Directory '${directoryName}' created successfully in '${folderPath}' folder.`);
            }
        });
    }



    async function copyLayout() {

        // destination will be created or overwritten by default.
        fs.copyFile(`C:/ANALYTICS/speedata/${company}/layout.xml`, `${path}/layout.xml`, (err) => {
            if (err) throw err;

            renameCHARTSpaths();

            console.log('File was copied to destination and some image paths renamed');

        });
    }

    function renameCHARTSpaths() {

        //Modify layout.xml to get local image files
        var layoutxmlTOupdate = `C:/ANALYTICS/speedata/${company}/${fileName}/layout.xml`;
        console.log("layoutxmlTOupdate ::::: " + layoutxmlTOupdate);
        fs.readFile(layoutxmlTOupdate, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // in orginal layout.xml pathOFall_charts should be replace for each local folder
                var changeddata = data.replace(/pathOFall_charts/g, `C:/ANALYTICS/speedata/${company}/${fileName}/images`);

                // Write the modified data back to the file
                fs.writeFile(layoutxmlTOupdate, changeddata, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`File '${layoutxmlTOupdate}' has been updated.`);
                    }
                });
            }
        });
    }







    async function drawALLcharts() {

        createDIR("images")


        // CREATE CHART IMAGES IN  image folder
        var pathOFimages = `C:/ANALYTICS/speedata/${company}/${fileName}/images`;
        barchartGreen(google_accountholder, google_NONaccountholder, google_accountholder_graphNAME, pathOFimages);
        barchartGreen(facebook_accountholder, facebook_NONaccountholder, facebook_accountholder_graphNAME, pathOFimages);
        barchartGreen(instagram_accountholder, instagram_NONaccountholder, instagram_accountholder_graphNAME, pathOFimages);

        barchartWhite(googleprofil_contactinfosHAVE, googleprofil_contactifosNOThave, googleprofil_chart1name, pathOFimages);
        barchartWhite(googleprofil_openinghoursHAVE, googleprofil_openinghoursNOThave, googleprofil_chart2name, pathOFimages);
        barchartWhite(googleprofil_postACtive, googleprofil_postINACTIVE, googleprofil_chart3name, pathOFimages);
        barchartWhite(googleprofil_descriptionHAVE, googleprofil_descriptionNOThave, googleprofil_chart4name, pathOFimages);

        barchartWhite(faceprofil_contactinfosHAVE, faceprofil_contactifosNOThave, faceprofil_chart1name, pathOFimages);
        barchartWhite(faceprofil_websiteHAVE, faceprofil_websiteNOThave, faceprofil_chart2name, pathOFimages);
        barchartWhite(faceprofil_servicesHAVE, faceprofil_servicesNOThave, faceprofil_chart3name, pathOFimages);
        barchartWhite(faceprofil_emailHAVE, faceprofil_emailNOThave, faceprofil_chart4name, pathOFimages);
        barchartWhite(faceprofil_adressHAVE, faceprofil_adressNOThave, faceprofil_chart5name, pathOFimages);
        barchartWhite(faceprofil_phoneHAVE, faceprofil_phoneNOThave, faceprofil_chart6name, pathOFimages);
        barchartWhite(instaprofil_contactinfosHAVE, instaprofil_contactifosNOThave, instaprofil_chart1name, pathOFimages);
        barchartWhite(instaprofil_openinghoursHAVE, instaprofil_openinghoursNOThave, instaprofil_chart2name, pathOFimages);
        barchartWhite(instaprofil_postACtive, instaprofil_postINACTIVE, instaprofil_chart3name, pathOFimages);
        barchartWhite(instaprofil_bioHAVE, instaprofil_bioNOThave, instaprofil_chart4name, pathOFimages);
        barchartWhite(instaprofil_ifIMAGEmore10, instaprofil_ifIMAGEless10, instaprofil_chart5name, pathOFimages);

        piechart(valuesOFgoogle, areasOFgoogle, google_piechartNAME, pathOFimages);
        piechart(valuesOFfacebook, areasOFfacebook, facebook_piechartNAME, pathOFimages);
        piechart(valuesOFinstagram, areasOFinstagram, instagram_piechartNAME, pathOFimages);

        console.log("charts were drawed.")

    }


    /*     async function command_sp() {     //  sp  --wd=C:/ANALYTICS/speedata/ZIMA/1681342234753-aaad3cf13ee2f5d8895d  --jobname=output  --outputdir=C:/.....
    
            var command = `sp --wd=${path} --jobname=output-${fileName}`;
    
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
    
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
    
    
            })
         
        } */

    /*     try {
            const { stdout, stderr } = await execPromise("ls"); console.log("Komut tamamlandı. Çıktı:", stdout); 
            // başka bir fonksiyonu çağır 
            myOtherFunction(); } catch (error) { console.error("Hata oluştu:", error); } */


    async function command_sp() {

        var command = `sp --wd=${path} --jobname=output-${fileName}`;

        try {
            const { stdout, stderr } = await execPromise(command); console.log("Komut tamamlandı. Çıktı:", stdout);

            removeFONTdir(path);
        }
        catch (error) { console.error("Hata oluştu:", error); }
    }





    async function pushSPtoGENERATEoutput() {

        await copyFonts();
        await buildDATAxml();
        await drawALLcharts();
        await copyLayout();
        await command_sp();


    }

    pushSPtoGENERATEoutput();



    return path;  //  for    app.post('/api/info', (req, res) ... 

}



async function removeFONTdir(path) {

    // Check if a file exists
    fs.access(`${path}/output-${fileName}.pdf`, fs.constants.F_OK, (err) => {

        if (err) {
            console.error(`${path}/output-${fileName}.pdf file doesnt exist.`);
        } else {
            console.log('File exists');

            fs.rm(`${path}/fonts`, { recursive: true }, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`${path}/fonts directory deleted successfully.`);
                }
            });
        }
    });


}

module.exports = { pdfcreator, removeFONTdir }
