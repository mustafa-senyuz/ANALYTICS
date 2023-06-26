const express = require('express');

const { pdfcreator } = require('./utility/pdfCreatorUtility');
const { removeFONTdir } = require('./utility/pdfCreatorUtility');

const cmd = require('node-cmd');

const app = express();

const port = 3000;

app.use(express.json());


var resultPATH = " ";

app.get('/', (req, res) => {

    res.send('app got the data!');

});


app.post('/api/info', (req, res) => {


    setTimeout(() => {
        console.log('This message will appear after 1 second.')
    }, 1000);



    var company = req.body.company;

    var sloganOFfunctionality = req.body.sloganOFfunctionality;
    var officeName = req.body.officeName;
    var companylogo = req.body.companylogo;
    var datum = req.body.datum;
    var logo = req.body.logo;
    var contactpersoninfos = req.body.contactpersoninfos;
    var bankinfos = req.body.bankinfos;
    var footnote = req.body.footnote;
    var analysename = req.body.analysename;
    var searchperiod = req.body.searchperiod;
    var result = req.body.result;

    var branch1 = req.body.branch1.name;
    var branch1value = req.body.branch1.value;
    var branch2 = req.body.branch2.name;
    var branch2value = req.body.branch2.value;
    var branch3 = req.body.branch3.name;
    var branch3value = req.body.branch3.value;
    var branch4 = req.body.branch4.name;
    var branch4value = req.body.branch4.value;
    var branch5 = req.body.branch5.name;
    var branch5value = req.body.branch5.value;

    var location = req.body.location;

    /* Branchenverteilung google-facebook-instagram usage */
    var google_accountholder = parseInt(req.body.google_barchart.accountholder);
    var google_NONaccountholder = parseInt(req.body.google_barchart.NONaccountholder);
    var google_accountholder_graphNAME = "google_barchart";

    var facebook_accountholder = parseInt(req.body.facebook_barchart.accountholder);
    var facebook_NONaccountholder = parseInt(req.body.facebook_barchart.NONaccountholder);
    var facebook_accountholder_graphNAME = "facebook_barchart";

    var instagram_accountholder = parseInt(req.body.instagram_barchart.accountholder);
    var instagram_NONaccountholder = parseInt(req.body.instagram_barchart.NONaccountholder);
    var instagram_accountholder_graphNAME = "instagram_barchart";

    /* INFORMATIONEN IN DEN GOOGLE BUSINESS PROFILE */
    var googleprofil_contactinfosHAVE = parseInt(req.body.infoAboutGooglePROFIL.contactinfosHAVE);
    var googleprofil_contactifosNOThave = parseInt(req.body.infoAboutGooglePROFIL.contactifosNOThave);
    var googleprofil_chart1name = "contactinfo";


    var googleprofil_openinghoursHAVE = parseInt(req.body.infoAboutGooglePROFIL.openinghoursHAVE);
    var googleprofil_openinghoursNOThave = parseInt(req.body.infoAboutGooglePROFIL.openinghoursNOThave);
    var googleprofil_chart2name = "openinginfo";


    var googleprofil_postACtive = parseInt(req.body.infoAboutGooglePROFIL.postACtive);
    var googleprofil_postINACTIVE = parseInt(req.body.infoAboutGooglePROFIL.postINACTIVE);
    var googleprofil_chart3name = "postactivinfo";


    var googleprofil_descriptionHAVE = parseInt(req.body.infoAboutGooglePROFIL.descriptionHAVE);
    var googleprofil_descriptionNOThave = parseInt(req.body.infoAboutGooglePROFIL.descriptionNOThave);
    var googleprofil_chart4name = "descriptioninfo";



    /* INFORMATIONEN IN DEN FACEBOOK PROFILE */
    var faceprofil_contactinfosHAVE = parseInt(req.body.infoAboutFacePROFIL.contactinfosHAVE);
    var faceprofil_contactifosNOThave = parseInt(req.body.infoAboutFacePROFIL.contactifosNOThave);
    var faceprofil_chart1name = "contacthaving"


    var faceprofil_websiteHAVE = parseInt(req.body.infoAboutFacePROFIL.websiteHAVE);
    var faceprofil_websiteNOThave = parseInt(req.body.infoAboutFacePROFIL.websiteNOThave);
    var faceprofil_chart2name = "websitehaving";


    var faceprofil_servicesHAVE = parseInt(req.body.infoAboutFacePROFIL.servicesHAVE);
    var faceprofil_servicesNOThave = parseInt(req.body.infoAboutFacePROFIL.servicesNOThave);
    var faceprofil_chart3name = "serviceshaving";


    var faceprofil_emailHAVE = parseInt(req.body.infoAboutFacePROFIL.emailHAVE);
    var faceprofil_emailNOThave = parseInt(req.body.infoAboutFacePROFIL.emailNOThave);
    var faceprofil_chart4name = "emailhaving";


    var faceprofil_adressHAVE = parseInt(req.body.infoAboutFacePROFIL.adressHAVE);
    var faceprofil_adressNOThave = parseInt(req.body.infoAboutFacePROFIL.adressNOThave);
    var faceprofil_chart5name = "adresshaving";


    var faceprofil_phoneHAVE = parseInt(req.body.infoAboutFacePROFIL.phoneHAVE);
    var faceprofil_phoneNOThave = parseInt(req.body.infoAboutFacePROFIL.phoneNOThave);
    var faceprofil_chart6name = "phonehaving";


    /* INFORMATIONEN IN DEN INSTAGRAM PROFILE */
    var instaprofil_contactinfosHAVE = parseInt(req.body.infoAboutInstaPROFIL.contactinfosHAVE);
    var instaprofil_contactifosNOThave = parseInt(req.body.infoAboutInstaPROFIL.contactifosNOThave);
    var instaprofil_chart1name = "contact";


    var instaprofil_openinghoursHAVE = parseInt(req.body.infoAboutInstaPROFIL.openinghoursHAVE);
    var instaprofil_openinghoursNOThave = parseInt(req.body.infoAboutInstaPROFIL.openinghoursNOThave);
    var instaprofil_chart2name = "opentimes";


    var instaprofil_postACtive = parseInt(req.body.infoAboutInstaPROFIL.postACtive);
    var instaprofil_postINACTIVE = parseInt(req.body.infoAboutInstaPROFIL.postINACTIVE);
    var instaprofil_chart3name = "postactivity";


    var instaprofil_bioHAVE = parseInt(req.body.infoAboutInstaPROFIL.bioHAVE);
    var instaprofil_bioNOThave = parseInt(req.body.infoAboutInstaPROFIL.bioNOThave);
    var instaprofil_chart4name = "bio";


    var instaprofil_ifIMAGEmore10 = parseInt(req.body.infoAboutInstaPROFIL.ifIMAGEmore10);
    var instaprofil_ifIMAGEless10 = parseInt(req.body.infoAboutInstaPROFIL.ifIMAGEless10);
    var instaprofil_chart5name = "imagenummer";


    /* ALLGEMEINE VERGLEICHE */
    /* google my business */
    var google_propertiesDISTRIBUTION_area1value = parseInt(req.body.google_propertiesDISTRIBUTION.area1value);
    var google_propertiesDISTRIBUTION_area1name = req.body.google_propertiesDISTRIBUTION.area1name;
    var google_propertiesDISTRIBUTION_area2value = parseInt(req.body.google_propertiesDISTRIBUTION.area2value);
    var google_propertiesDISTRIBUTION_area2name = req.body.google_propertiesDISTRIBUTION.area2name;
    var google_propertiesDISTRIBUTION_area3value = parseInt(req.body.google_propertiesDISTRIBUTION.area3value);
    var google_propertiesDISTRIBUTION_area3name = req.body.google_propertiesDISTRIBUTION.area3name;
    var valuesOFgoogle = [google_propertiesDISTRIBUTION_area1value, google_propertiesDISTRIBUTION_area2value, google_propertiesDISTRIBUTION_area3value];
    var areasOFgoogle = [google_propertiesDISTRIBUTION_area1name, google_propertiesDISTRIBUTION_area2name, google_propertiesDISTRIBUTION_area3name];
    var google_piechartNAME = "googlePIEchart";


    /* facebook */
    var facebook_propertiesDISTRIBUTION_area1value = parseInt(req.body.facebook_propertiesDISTRIBUTION.area1value);
    var facebook_propertiesDISTRIBUTION_area1name = req.body.facebook_propertiesDISTRIBUTION.area1name;
    var facebook_propertiesDISTRIBUTION_area2value = parseInt(req.body.facebook_propertiesDISTRIBUTION.area2value);
    var facebook_propertiesDISTRIBUTION_area2name = req.body.facebook_propertiesDISTRIBUTION.area2name;
    var facebook_propertiesDISTRIBUTION_area3value = parseInt(req.body.facebook_propertiesDISTRIBUTION.area3value);
    var facebook_propertiesDISTRIBUTION_area3name = req.body.facebook_propertiesDISTRIBUTION.area3name;
    var facebook_propertiesDISTRIBUTION_area4value = parseInt(req.body.facebook_propertiesDISTRIBUTION.area4value);
    var facebook_propertiesDISTRIBUTION_area4name = req.body.facebook_propertiesDISTRIBUTION.area4name;
    var valuesOFfacebook = [facebook_propertiesDISTRIBUTION_area1value, facebook_propertiesDISTRIBUTION_area2value, facebook_propertiesDISTRIBUTION_area3value, facebook_propertiesDISTRIBUTION_area4value]
    var areasOFfacebook = [facebook_propertiesDISTRIBUTION_area1name, facebook_propertiesDISTRIBUTION_area2name, facebook_propertiesDISTRIBUTION_area3name, facebook_propertiesDISTRIBUTION_area4name]
    var facebook_piechartNAME = "facebookPIEchart";


    /* instagram */
    var instagram_propertiesDISTRIBUTION_area1value = parseInt(req.body.instagram_propertiesDISTRIBUTION.area1value);
    var instagram_propertiesDISTRIBUTION_area1name = req.body.instagram_propertiesDISTRIBUTION.area1name;
    var instagram_propertiesDISTRIBUTION_area2value = parseInt(req.body.instagram_propertiesDISTRIBUTION.area2value);
    var instagram_propertiesDISTRIBUTION_area2name = req.body.instagram_propertiesDISTRIBUTION.area2name;
    var instagram_propertiesDISTRIBUTION_area3value = parseInt(req.body.instagram_propertiesDISTRIBUTION.area3value);
    var instagram_propertiesDISTRIBUTION_area3name = req.body.instagram_propertiesDISTRIBUTION.area3name;
    var instagram_propertiesDISTRIBUTION_area4value = parseInt(req.body.instagram_propertiesDISTRIBUTION.area4value);
    var instagram_propertiesDISTRIBUTION_area4name = req.body.instagram_propertiesDISTRIBUTION.area4name;
    var instagram_propertiesDISTRIBUTION_area5value = parseInt(req.body.instagram_propertiesDISTRIBUTION.area5value);
    var instagram_propertiesDISTRIBUTION_area5name = req.body.instagram_propertiesDISTRIBUTION.area5name;
    var valuesOFinstagram = [instagram_propertiesDISTRIBUTION_area1value, instagram_propertiesDISTRIBUTION_area2value, instagram_propertiesDISTRIBUTION_area3value, instagram_propertiesDISTRIBUTION_area4value, instagram_propertiesDISTRIBUTION_area5value]
    var areasOFinstagram = [instagram_propertiesDISTRIBUTION_area1name, instagram_propertiesDISTRIBUTION_area2name, instagram_propertiesDISTRIBUTION_area3name, instagram_propertiesDISTRIBUTION_area4name, instagram_propertiesDISTRIBUTION_area5name]
    var instagram_piechartNAME = "instagramPIEchart";




    /* function call */
    pdfcreator(

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
        /*  totalplace,   --  it is branch1value + 2 + 3 + 4 + 5    calculated in pdfCreatorUtility.js   */
        location,

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

    ).then((path) => {

        const download = {
            link: "http://localhost:3000/download",
        };


        res.status(201).json(download);

        resultPATH = path

        removeFONTdir(resultPATH);

        console.log("------then in içi-------------resultPATH---------------------" + resultPATH + "---------------------resultPATH-------------")

    })/* .then(() => { removeFONTdir(resultPATH); }); */


    console.log("--------POST-----------resultPATH---------------------" + resultPATH + "---------------------resultPATH--------POST-----")

});



app.get('/download', function (req, res) {

    //uniqe an output-name set according to folder name
    const myString = resultPATH;
    const delimiter = "/"; // character to split the string

    const myArray = myString.split(delimiter);
    const foldername = myArray[4];
    console.log(foldername);


    const filePath = `${resultPATH}/output-${foldername}.pdf`; // replace with your file path
    const fileName = `output-${foldername}.pdf`;               // replace with your desired file name
    res.download(filePath, fileName);



});


app.listen(port, () => {

    console.log(`API service at  http://localhost:${port} adress running.`);

});