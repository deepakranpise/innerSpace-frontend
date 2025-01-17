import fs from 'fs';

// import puppeteer from 'puppeteer';
import handlers from 'handlebars';

// import puppeteer from 'puppeteer-core';
// import chromium from '@sparticuz/chromium';
// const test = require("node:test");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");



export default async function handler(req, res) {
  const { challanNo } = req.body;

  try {
    // read our invoice-template.html file using node fs module
    // const file = fs.readFileSync('./src/views/template/invoice-template.html', 'utf8');

    const file = `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>

  <style>
    body {
      margin-top: 5rem;

    }

    .invoice-box {
      width: 600px;
      max-width: 800px;
      margin: auto;
      padding: 30px;
      /* border: 1px solid #eee; */
      /* box-shadow: 0 0 10px rgba(0, 0, 0, .15); */
      font-size: 16px;
      line-height: 24px;
      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      color: #555;
    }

    .header {
      display: flex;
      justify-content: space-between;
    }

    .title {
      align-items: center;
      display: flex;
      text-decoration: underline;
      font-weight: bold;
    }

    .underline {
      border: 1px solid black;
    }

    .subtext {
      font-size: 9px;
      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }

    .content {
      border: 1px solid black;
    }

    .content-header {
      color: black;
      display: flex;
      font-size: 12px;
      font-family: calibri;
      padding: 2px;
      border-bottom: 1px solid black;
    }

    .bold {
      font-weight: bold;
    }

    .light {
      font-weight: 400;
    }

    table {
      border-collapse: collapse;
      height: 400px;
      border-bottom: 1px solid black;
    }

    tr {
      border: none;
    }

    td {
      /* border-right: solid 1px black; */
      border-left: solid 1px black;
      vertical-align: top;
    }

    th {
      /* border-right: solid 1px black; */
      border-left: solid 1px black;
    }

    .content-footer {

      display: flex;
      /* justify-content: space-between; */
    }

    .left {
      width: 200%;
      font-size: 18px;
      color: black;
      font-weight: bold;
      padding: 3px;
      border-right: 1px solid black;
    }
  </style>
</head>

<body>
  <div class="invoice-box">
    <section>
      <div class="header">
        <div>
          <img src="{{logo}}" alt="logo" height="80px" />
        </div>
        <div class="title">
          Delivery Challan
        </div>
        <div>
          <div>
            <img src="{{tline}}" alt="logo" height="50px" />
          </div>
          <div style="margin-left: 11px;">
            <img style=" margin-top: -8px;" src="{{kb}}" alt="logo" height="40px" width="90px" ; />
          </div>
        </div>
      </div>
    </section>

    <div class="underline">

    </div>

    <div class="subtext">
      OFFICE : 707, 7th Floor, 765 Fly Edge, Kora Kendra Flyover Junction, S.V.Rd, Borivali (W), Mumbai- 400 092.
      Tel :91-22-28052157 / 58 / 59
    </div>
    <div class="subtext" style="margin-top: -8px;">
      GODOWN : C/o Rajlaxmi Industrial Commercial Complex,Gala No.N - 10,11,12 Opp. Durgesh Park, Kalher Village,
      Bhiwandi,Dist. Thane
    </div>

    <div class="content">
      <div class="content-header">
        <div style="line-height: 18px; font-size: 14px; width:320px">
          <span class="bold">M/s. Bolton Industries</span>
          <br>
          Ganesh Nagar, Agra Road,
          <br>
          Near Telephone Office, Aligarh
          <br>
          Uttar Pradesh -202001
          <br>
          <span class="bold">Contact Person : Mr Akhilesh Sharma- 9412757420</span>
          <br>
          <span class="bold"> GSTIN.:09AJLPK1748D1Z6</span>
          <br>
          <span class="bold">STATE :Maharashtra</span>
        </div>
        <div style=" border-left: 1px solid black; padding-left: 10px;">
          <div style="display: flex; ">
            <div class="bold" style="width: 100px;">
              Challan No
            </div>
            <div>
              : 0572
            </div>
          </div>
          <div style="display: flex; ">
            <div style="width: 100px;">
              Date
            </div>
            <div>
              : 10/08/2023
            </div>
          </div>
          <div style="display: flex; ">
            <div class="bold" style="width: 100px;">
              Ref No.
            </div>
            <div>
              : Ref- Inv No 151/Defective Look
            </div>
          </div>

          <div style="display: flex; ">
            <div class="bold" style="width: 100px;">
              Date
            </div>
            <div>
              : 08/07/2022
            </div>
          </div>

        </div>
      </div>
      <!-- sr table columns -->
      <div style="font-size: 13px; color:black;">

        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr class="top" style="border-bottom: 1px solid black;">
              <th class="light" style="width:40px">
                Sr No
              </th>
              <th class="light" style="width: 380px;">
                Description
              </th>
              <th class="light" style="width: 60px;">
                Packing
              </th>
              <th class="light" style="width: 60px;">
                Quantity
              </th>
              <th class="light" style="width: 60px;">
                Remark
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center;">
                1
              </td>
              <td style="width: 380px;">
                SS304 Slider Lock
              </td>
              <td style="width: 60px; text-align: center;">
                No
              </td>
              <td style="width: 60px; text-align: center;">
                77.00
              </td>
              <td style="width: 60px; text-align: center;">

              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- content footer -->
      <div class="content-footer">
        <div class="left">
          <div style=" border-bottom: 1px solid black;">
            GSTIN : 2423423423234
          </div>
          <div style="font-size: 10px; line-height: 16px;">
            Terms & Conditions:
            <br>
            1.Goods received in good condition as per order<br>
            2.Goods oncd sold will not be taken back<br>
            3.Once the good deliverd,it is buyers responsibily to take care of the material<br>
            4.Inner Space is not responsible for ant Damage,Lost quantity or theft after the delivery of
            material at site
          </div>
        </div>
        <div style="     flex-basis: 100%;
                justify-content: center;
                display: flex;
                color:black;
                font-size: 14px;
                font-weight: bold;">
          Receivers Signature
        </div>
      </div>
    </div>

  </div>

</body>

</html>
    `

    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'http'



    chromium.setHeadlessMode = true;

    // Optional: If you'd like to disable webgl, true is the default.
    chromium.setGraphicsMode = false;


    const template = handlers.compile(`${file}`);

    const logo = protocol + '://' + host + '/images/logos/Picture.png';
    const kb = protocol + '://' + host + '/images/logos/kb.png';
    const tline = protocol + '://' + host + '/images/logos/tline.png';

    const html = template({ challanNo, logo, tline, kb });

    // simulate a chrome browser with puppeteer and navigate to a new page
    // const browser = await puppeteer.launch();

    // const browser = await puppeteer.launch({
    //   executablePath: puppeteer.executablePath(),
    // });
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    // send the result to the client
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${challanNo}.pdf`);
    res.send(pdf);

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

  // compile the file with handlebars and inject the customerName variable
  //   const template = handlers.compile(`${file}`);
  //   const html = template({customerName});

  //   // simulate a chrome browser with puppeteer and navigate to a new page
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();

  //   // set our compiled html template as the pages content
  //   // then waitUntil the network is idle to make sure the content has been loaded
  //   await page.setContent(html, {waitUntil: 'networkidle0' });

  //   // convert the page to pdf with the .pdf() method
  //   const pdf = await page.pdf({format: 'A4' });
  //   await browser.close();

  //   // send the result to the client
  //   res.statusCode = 200;
  //   res.send(pdf);
  // } catch (err) {
  // console.log(err);
  // res.status(500).json({ message: err.message });
  // }

}
